<script setup lang="ts">
// import { animate } from 'motion';
import { animate, Motion } from 'motion-v';
import { ref } from 'vue';

const display = ref("10");

animate(10, 100, {
  ease: "circOut",
  duration: 1,
  onUpdate: (latest) => {
    display.value = new Intl.NumberFormat().format(latest);
  }
});

</script>

<template>
  <Motion 
    class="box" 
    :transition="{
      duration: 1,
    }"
    :hover="{
      scale: 2.5,
    }"
    :initial="{
      rotate: 180,
      scale: 1,
    }" 
    :animate="{
      rotate: 0,
      scale: 2,
    }">{{display}}</Motion>
</template>

 <style>
    .box {
        width: 100px;
        height: 100px;
        background-color: #FA5D89;
        border-radius: 10px;
        text-align: center;
        vertical-align: middle;
        display: table-cell;
    }
</style>
