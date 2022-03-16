<script>
export default {
  name: "SequenceForm",
}
</script>

<template>
  <form>
    <div style="display: flex; flex-direction: column;">
      <p class="instructions" style="text-decoration: underline;">
        input a read and search the 717v5 database with the bowtie2 aligner
      </p>
      <textarea rows="6" placeholder="GGGTTCTGCCAATTTAAGCCACATGGCTCAATGGGAGAGTGCTCGACTAGAGGCCGAAGCCAGATTG"></textarea> 
      <hr><hr><hr>
      <button type="submit">
        <p> -align- </p>
      </button>
    </div>
  </form>
</template>

/* TODO
 * - dynamically change textarea
 * - create results component 
 * - make transition 
 */

<style scoped>
p {
  margin: 5px;
  font-family: 'DM Mono', monospace; 
  font-size: 16px;
  font-weight: 300;
}
.instructions {
  color: hsla(160, 100%, 37%, 1);
  align-self: center;
  transition: 0.4s;
}
textarea {
  width: 100%;
  padding: 4px;
  font-family: 'DM Mono', monospace; 
  font-size: 16px;
  font-weight: 500px;
  color: rgba(60, 60, 60, 1);
  border: 1px solid hsla(160, 100%, 37%, 1);
}
button {
  width: 100%;
  padding: 5px;
  font-size: 16px;
  color: rgba(60, 60, 60, 1);
  font-family: 'DM Mono', monospace;
  background-color: hsla(160, 100%, 37%, 1);
  cursor: pointer;
  float: right;
  border: 1px solid hsla(160, 100%, 37%, 1);
}
button:hover {
  /* background-color: rgba(214, 161, 214, 0.685); */
  text-decoration: underline overline white;
  color: white;
  border: 1px solid white;
}
hr {
  color: rgba(60, 60, 60, 1);
}

@media (min-width: 1024px) {
}

</style>