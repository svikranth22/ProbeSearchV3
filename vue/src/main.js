import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')

/**
async function runAlignment() {
    var sequence = document.getElementById("sequence_input");        // input sequence
    var resdiv = document.getElementById("results");                 // div showing alignment results
    var search_button = document.getElementById("search_button");
    var reload_button = document.getElementById("reload_button");

    const payload = {
        sequence: sequence.value
    };
    const res = await axios.put('/', payload);                       // call bowtie alignment

    search_button.style.display = "none";
    reload_button.style.display = "block";

    resdiv.classList.add('animate__animated','animate__fadeInUp');   // create visualization div and show 
    resdiv.style.display = "block";
    resdiv.innerHTML = res.data;
    
    setTimeout(() => {
        resdiv.classList.remove('animate__fadeInUp');
    }, 1000);
    
} // runAlignment
*/