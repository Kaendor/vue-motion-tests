<script setup lang="ts">
import confetti from 'canvas-confetti'
import { Motion, AnimatePresence } from 'motion-v'
import { useElementBounding, useWindowSize } from '@vueuse/core'
import { ref, useTemplateRef } from 'vue'
import ProgressBar from './components/progress-linear.vue'
import Calculator from './components/calculator-idle.vue'

const button = useTemplateRef('button')
const { width, height } = useWindowSize()

function handlePress() {
  // @ts-ignore
  const pos = useElementBounding(button)
  const x = (pos.left.value + pos.width.value / 2) / width.value
  const y = (pos.top.value + pos.height.value / 2) / height.value

  progressValue.value += 50

  confetti({
    particleCount: 300,
    spread: 360,
    origin: { x, y },
    startVelocity: 20,
    zIndex: 100,
  })

  if (progressValue.value > 100) {
    progressValue.value = 0
  }
}

const progressValue = ref(0)

</script>

<template>
  <Calculator />
  <ProgressBar :value="progressValue" />
  <AnimatePresence>
    <Motion
      ref="button"
      class="box"
      as="button"
      :initial="{ scale: 0, rotate: 180 }"
      :animate="{ rotate: 0, scale: 1 }"
      :exit="{ rotate: 0, scale: 0 }"
      :while-press="{ scale: 0.8 }"
      :while-hover="{ scale: 1.2, rotate: [0, 5, -5, 0] }"
      @press-start="handlePress"
    />
  </AnimatePresence>
</template>

 <style>
    .box {
        border: none;
      margin-top: 50px;
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
