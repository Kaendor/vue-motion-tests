<script setup lang="ts">
import { Progress } from '@ark-ui/vue/progress'
import { useElementBounding, useWindowSize } from '@vueuse/core'
import confetti from 'canvas-confetti'
import { useMotionValue, animate, motion, useSpring } from 'motion-v'
import { ref, useTemplateRef, watch } from 'vue'
const properties = defineProps(['value', 'min', 'max'])

const animateValue = useMotionValue(properties.value)
const progressValueReference = ref(properties.value)
const scaleY = useMotionValue(1)
const track = useTemplateRef('track')

// @ts-ignore
const pos = useElementBounding(track)
const { width, height } = useWindowSize()

watch(() => properties.value,
  (progress) => {
    if (progress >= 100) {
      animate(animateValue, progress, {
        type: 'tween',
        duration: 1,
        ease: [1, -1.01, 0.35, 0.95],
      })
      const a = animate(scaleY, [2, 1], {
        type: 'tween',
        duration: 1,
        ease: [1, -1.01, 0.15, 0.95],
      })
      a.then(() => {
        const x = (pos.left.value + pos.width.value - 10) / width.value
        const y = (pos.top.value + pos.height.value) / height.value
        confetti({
          particleCount: 30,
          gravity: 0.1,
          drift: 0.3,
          angle: 0,
          origin: { x, y },
          startVelocity: 10,
          zIndex: 100,
        })
      })
    }
    else {
      animate(animateValue, progress, {
        type: 'tween',
        visualDuration: 1,
        ease: 'easeOut',
      })
    }
  },
)

animateValue.on('change', (value) => {
  progressValueReference.value = value
})

const ProgressComponent = motion.create(Progress.Track)
</script>

<template>
  <Progress.Root
    :default-value="properties.value"
    :min="min"
    :max="max"
    :model-value="progressValueReference"
  >
    <ProgressComponent
      ref="track"
      class="track"
      :style="{ scaleY: scaleY }"
    >
      <Progress.Range
        class="range"
      />
    </ProgressComponent>
    <Progress.ValueText />
  </Progress.Root>
</template>

<style>
  .track {
    width: 100px;
    height: 10px;
    background-color: #FA5D89;
    border-radius: 5px;
    margin-top: 10px;
  }

  .range {
    background-color: #FFC1E3;
    border-radius: 5px;
    height: 10px;
  }
</style>
