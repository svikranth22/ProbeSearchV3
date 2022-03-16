<script setup>
import SequenceForm from './components/SequenceForm.vue'
import AlignmentResults from './components/AlignmentResults.vue'
</script>

<template>
  <div class="main">
    
    <img src="./assets/aspendb.png"/>
    <div class="wrapper">
      <SequenceForm/>
    </div>
    <!--
    <div>
      <AlignmentResults/>
    </div>
    -->

  
  </div>
</template>

<style>
@import './assets/base.css';

#app {
  background-color: var(--color-background);
  display: flex;
  padding: 4rem;
  font-weight: normal;
  border: 2px solid hsla(160, 100%, 37%, 1);
  align-self: center;
}

.main {
  margin: 2em 3rem 5rem 3rem;
  display: flex; 
  flex-direction: column;
  align-items: center; 
  justify-content: center;
  width: 100%;
}


@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

@media (min-width: 1024px) {
  body {
    display: flex;
    align-items: flex-start;
    justify-content: center;
  }

  #app {
    /* display: grid; */
    grid-template-columns: 1fr 1fr;
    padding: 2rem 2rem 2rem 2rem;
  }

  .wrapper {
    display: flex;
    justify-content: center;
    align-content: center;
    place-items: flex-start; 
    flex-wrap: wrap;
  }

  .logo {
    margin: 0 2rem 0 0;
  }
}
</style>
