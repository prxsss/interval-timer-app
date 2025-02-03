<script setup lang="ts">
import { ref, computed } from 'vue';
import soundFile from './assets/sounds/mixkit-mouse-click-close-1113.wav';

import IntervalListing from './components/IntervalListing.vue';

let timer: number | null = null;
let isPaused = false;
const isRunning = ref(false);
const minutes = ref(1);
const seconds = ref(0);
const timeLeft = ref(0);
const rounds = ref(1);
const intervals = ref(1);

const formattedTime = computed(() => {
  const min = Math.floor(timeLeft.value / 60)
    .toString()
    .padStart(2, '0');
  const sec = (timeLeft.value % 60).toString().padStart(2, '0');
  return `${min}:${sec}`;
});

const startCountdown = () => {
  if (timer && timeLeft.value > 0) {
    isPaused = false;
    isRunning.value = true;
    return;
  }
  timeLeft.value = minutes.value * 60 + seconds.value;
  if (timeLeft.value <= 0) return;

  isRunning.value = true;

  timer = setInterval(() => {
    if (timeLeft.value > 0) {
      if (!isPaused) {
        timeLeft.value--;
      }
    } else {
      resetCountdown();
    }
  }, 1000);
};

const pauseCountdown = () => {
  isPaused = true;
  isRunning.value = false;
};

const resetCountdown = () => {
  clearInterval(timer as number);
  timer = null;
  timeLeft.value = 0;
  isPaused = false;
  isRunning.value = false;
};

const handleStartAndPause = () => {
  if (isRunning.value) {
    pauseCountdown();
  } else {
    startCountdown();
  }
};

const incrementRounds = () => {
  rounds.value++;
};

const decrementRounds = () => {
  if (rounds.value > 1) {
    rounds.value--;
  }
};

const toggleSound = () => {
  const soundEffect = new Audio(soundFile);
  soundEffect.play();
};
</script>

<template>
  <div class="flex min-h-screen w-full items-center justify-center bg-base-200">
    <div class="w-full max-w-3xl space-y-6 rounded-xl bg-base-100 p-6 shadow">
      <div class="text-center text-3xl font-semibold">
        {{ formattedTime }}
      </div>
      <div class="space-x-4 text-center">
        <button
          @click="handleStartAndPause"
          :class="[
            'btn swap btn-neutral text-lg',
            { 'swap-active': isRunning },
          ]"
        >
          <i class="pi pi-pause swap-on"></i>
          <i class="pi pi-play swap-off"></i>
        </button>
        <button @click="resetCountdown" class="btn btn-neutral text-lg">
          <i class="pi pi-refresh"></i>
        </button>
      </div>
      <div class="flex items-center justify-between">
        <div class="space-x-4">
          <span class="text-lg font-semibold">Rounds: </span>
          <button @click="decrementRounds" class="btn">
            <i class="pi pi-minus"></i>
          </button>
          <span>{{ rounds }}</span>
          <button @click="incrementRounds" class="btn">
            <i class="pi pi-plus"></i>
          </button>
        </div>
        <div class="form-control">
          <label class="label cursor-pointer space-x-2">
            <span class="label-text">Sound</span>
            <input @change="toggleSound" type="checkbox" class="toggle" />
          </label>
        </div>
      </div>
      <div class="max-h-72 space-y-4 overflow-y-auto">
        <IntervalListing
          v-for="(_, index) in new Array(intervals)"
          :id="index"
          :key="index"
        />
      </div>
      <div>
        <button @click="intervals++" class="btn btn-neutral btn-sm w-full">
          Add Interval
        </button>
      </div>
    </div>
  </div>
</template>
