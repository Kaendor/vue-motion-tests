<script setup lang="ts">
import confetti from "canvas-confetti";
import { animate, Motion, AnimatePresence } from 'motion-v';
import { useElementBounding, useWindowSize, type MaybeElement } from "@vueuse/core";
import { ref, useTemplateRef } from 'vue';

const display = ref("10");
const button = useTemplateRef("button");
const { width, height } = useWindowSize();

animate(10, 100, {
  ease: "circOut",
  duration: 1,
  onUpdate: (latest) => {
    display.value = new Intl.NumberFormat().format(latest);
  }
});

function handlePress() {
  const pos = useElementBounding(button as unknown as MaybeElement);;
  const x = (pos.left.value + pos.width.value / 2) / width.value ;
  const y = (pos.top.value + pos.height.value / 2) / height.value ;

  confetti({
    particleCount: 300,
    spread: 360,
    origin: { x, y },
    startVelocity: 20,
    zIndex: 100
  });
}
</script>

<template>
  <AnimatePresence>
    <Motion
      class="box"
      ref="button"
      :initial="{ scale: 0 }"
      :animate="{ rotate: 180, scale: 1 }"
      :exit="{ rotate: 0, scale: 0 }"
      :whilePress="{ scale: 0.8 }"
      :whileHover="{ scale: 1.2 }"
      @press-start="handlePress"
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
      z-index: 200;
    }
</style>
