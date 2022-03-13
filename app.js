const express = require('express');
const path = require('path');
const { exec } = require('child_process');
const { execSync } = require('child_process');
const { stdout } = require('process');

const app = express();

app.use(express.json());
app.use(express.static("public"))

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.listen({ port: 8080 }, async () => {
    console.log('Server up @ http://localhost:8080/ !')
})

/**
 * listens for put request: calls child processes and sends back alignment visualization
 */
app.put('/',  async (req, res) => {
    /**
     * calls bowtie2 
     */
    exec('./bowtie/bowtie2 -x indices/populus_tremula_hap1 -a -c ' + String(req.body.sequence) + ' --no-hd' , (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
        }
        // parse standard output for nice visualization
        console.log(stdout);
        stdout = parse(String(req.body.sequence), stdout);
        res.send(stdout);
    });
})

/**
 * parses the SAM file input and gathers reference sequence.
 * @param sequence input read 
 * @param sam SAM file  
 */
function parse(sequence, sam) {
    res = "input read:\t" + sequence + "\ndatabase:\t717v5\n\n\n"; // instatiate string
    sam = sam.split("\n");
    for (var i = 0; i < sam.length - 1; i++) {
        target = sam[i].split("\t");
        if (target[2] != "*") { // valid target
            res += "target " + String(i + 1) + " - " + target[2] + " : " + target[3] + "\n";
            /* parse SAM file - get CIGAR, read, and reference sequence */
            cigar = target[5];
            read = target[9];
            reference = String(execSync('samtools faidx 717v5/Populus_tremula_x_alba_var_717_IB4.HAP1.mainGenome.fasta ' + 
                                 target[2] + ":" + target[3] + "-" + (parseInt(target[3]) + sequence.length - 1) + ' | sed 1d'));
            res += illustrate(cigar, read, reference); 
        } else {
            res += "no targets found\n\n";
            break;
        } // if
    } // for
    console.log(res)
    return res;
} // parse 

/**
 * illustrates the alignment between the read & reference.
 * @param cigar CIGAR string of SAM
 * @param read sequence of read 
 * @param reference sequence of reference 
 * @returns illustration of alignment
 */
function illustrate(cigar, read, reference) {
    var illustration = "Q:\t" + read + "\n\t"; // string illustrating alignment
    //var ptr = 0;
    /* TODO - parse cigar  */
    /* build illustration  */
    for (var i = 0; i < Math.max(read.length, reference.length); i++) {
        if (read.substring(i, i + 1) == reference.substring(i, i + 1)) {
            illustration += "|";
        } else {
            illustration += " ";
        }

    } // for
    illustration += "\nT:\t" + reference + "\n";
    return illustration;

} // illustrate













/*
notes
`````
insertion = extra nucleotide in read - add space in reference 
            eg, 3M2I3M:
            read: A T G C A T G C
             ref: A T G     T G C
                

deletion = extra nucleotide in reference: add space in read 
            eg, 3M2D3M:
            read: A T G     T G C
             ref: A T G G C T G C
*/


/*
code
````
// other possible CIGAR letters //
cigar.substring(i, cigar.length).indexOf("D"), cigar.substring(i, cigar.length).indexOf("N"),
cigar.substring(i, cigar.length).indexOf("S"), cigar.substring(i, cigar.length).indexOf("H"),
cigar.substring(i, cigar.length).indexOf("P")); 

// parsing CIGAR //
for (var i = 0; i < cigar.length; i++) {
        var M, I = cigar.length - 1;
        // find index of first letter
        if (cigar.substring(i, cigar.length).indexOf("M") != -1) { M = cigar.substring(i, cigar.length).indexOf("M") }
        if (cigar.substring(i, cigar.length).indexOf("I") != -1) { I = cigar.substring(i, cigar.length).indexOf("I") }
        var split = Math.min(M, I) + i; 
        var letter = cigar.charAt(split);
        //console.log(letter);
        //console.log(split);
        var nucleotides = parseInt(cigar.substring(i, split));
        if (letter === 'M') {
            for (var j = 0; j < nucleotides; j++) {
                reference += read.substring(ptr, ptr + 1);
                ptr++;
            } // for
        } else if (letter === "I") {
            for (var j = 0; j < nucleotides; j++) {
                reference += " ";
                ptr++;
            } // for
        }
        if (split != cigar.length - 1) {
            i = split;
        } // if
*/