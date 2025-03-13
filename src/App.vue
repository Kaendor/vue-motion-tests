<script setup lang="ts">
// import { animate } from 'motion';
import { animate, Motion, AnimatePresence } from 'motion-v';
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
  <AnimatePresence>
    <Motion
      class="box"
      :initial="{ scale: 0 }"
      :animate="{ rotate: 180, scale: 1 }"
      :exit="{ rotate: 0, scale: 0 }"
      :press="{ scale: 0.8 }"
      :hover="{ scale: 1.2 }"
    >

    </Motion>
  </AnimatePresence>
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
        cursor: pointer;
    }
</style>
