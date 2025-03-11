<script setup lang="ts">
import { animate } from 'motion';
import { onMounted, ref, useTemplateRef } from 'vue';

const display = ref("10");
const percent = useTemplateRef("percent");

animate(10, 100, {
  ease: "circOut",
  duration: 1,
  onUpdate: (latest) => {
    display.value = new Intl.NumberFormat().format(latest);
  }
});


// onMounted mandatory to obtain the ref
onMounted(() => {
  animate(percent.value, {scale: 2}, {duration: 1});
  console.log(percent.value);
  percent.value.onmouseover = () => {
    animate(percent.value, {scale: 2.5}, {duration: 0.2});
  };
  percent.value.onmouseout = () => {
    animate(percent.value, {scale: 2}, {duration: 0.2});
  };
  return () => {
    animate(percent.value, {scale: 1});
  };
});

</script>

<template>
  <div class="box" ref="percent">{{display}}</div>
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
