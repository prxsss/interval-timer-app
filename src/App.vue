<script setup lang="ts">
import { ref, provide, onMounted } from 'vue';
import { computed } from 'vue';
import {
  removeIntervalKey,
  intervalsKey,
  updateIntervalKey,
} from './types/injectionKeys';
import { v4 as uuidv4 } from 'uuid';
import soundFile from './assets/sounds/mixkit-mouse-click-close-1113.wav';
import type { Interval } from './types/interval';
import { themeChange } from 'theme-change';

import IntervalListing from './components/IntervalListing.vue';

let timer: number | null = null;
let isPaused = false;
const isRunning = ref(false);
const timeLeft = ref(0);
const rounds = ref(1);
const intervals = ref<Interval[]>([
  {
    id: uuidv4(),
    name: 'Interval 1',
    timeLeft: 100,
    originalTime: 100,
  },
  {
    id: uuidv4(),
    name: 'Interval 2',
    timeLeft: 30,
    originalTime: 30,
  },
]);

const formattedTime = computed(() => {
  const min = Math.floor(timeLeft.value / 60)
    .toString()
    .padStart(2, '0');
  const sec = (timeLeft.value % 60).toString().padStart(2, '0');
  return `${min}:${sec}`;
});

const startCountdown = async () => {
  if (timer && timeLeft.value > 0) {
    isPaused = false;
    isRunning.value = true;
    return;
  }

  isRunning.value = true;

  for (let i = 0; i < rounds.value; i++) {
    for (let j = 0; j < intervals.value.length; j++) {
      if (intervals.value[j].timeLeft <= 0) {
        continue;
      }
      await runCountdown(intervals.value[j]);
    }
    if (i < rounds.value - 1) {
      resetCountdown();
    }
  }

  isRunning.value = false;
};

const runCountdown = (interval: Interval) => {
  return new Promise<void>((resolve) => {
    timeLeft.value = interval.timeLeft;
    timer = setInterval(() => {
      if (interval.timeLeft > 0) {
        if (!isPaused) {
          interval.timeLeft--;
          timeLeft.value--;
        }
      } else {
        clearInterval(timer as number);
        resolve();
      }
    }, 1000);
  });
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
  intervals.value.forEach((interval) => {
    interval.timeLeft = interval.originalTime;
  });
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

const addInterval = () => {
  intervals.value.push({
    id: uuidv4(),
    name: `Interval ${intervals.value.length + 1}`,
    timeLeft: 30,
    originalTime: 30,
  });
};

const updateInterval = (newInterval: Interval) => {
  const index = intervals.value.findIndex(
    (interval) => interval.id == newInterval.id
  );
  if (index >= 0) {
    if (isRunning.value) {
      resetCountdown();
    }

    intervals.value[index].name = newInterval.name;
    intervals.value[index].timeLeft = newInterval.timeLeft;
    intervals.value[index].originalTime = newInterval.originalTime;
  }
};

const removeInterval = (id: string) => {
  intervals.value = intervals.value.filter((interval) => interval.id !== id);
};

provide(intervalsKey, intervals);
provide(updateIntervalKey, updateInterval);
provide(removeIntervalKey, removeInterval);

onMounted(() => {
  themeChange(false);
});
</script>

<template>
  <div class="flex min-h-screen w-full items-center justify-center bg-base-200">
    <div
      class="relative w-full max-w-3xl space-y-6 rounded-xl bg-base-100 p-6 shadow"
    >
      <label class="swap swap-rotate absolute right-5 top-5 text-base-content">
        <!-- this hidden checkbox controls the state -->
        <input
          type="checkbox"
          data-toggle-theme="mocha,latte"
          data-act-class="ACTIVECLASS"
        />

        <!-- sun icon -->
        <svg
          class="swap-on h-7 w-7 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"
          />
        </svg>

        <!-- moon icon -->
        <svg
          class="swap-off h-7 w-7 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"
          />
        </svg>
      </label>
      <div class="text-center text-3xl font-semibold">
        {{ formattedTime }}
      </div>
      <div class="space-x-4 text-center">
        <button
          @click="handleStartAndPause"
          :class="[
            'btn btn-primary swap text-lg',
            { 'swap-active': isRunning },
          ]"
        >
          <i class="pi pi-pause swap-on"></i>
          <i class="pi pi-play swap-off"></i>
        </button>
        <button @click="resetCountdown" class="btn btn-primary text-lg">
          <i class="pi pi-refresh"></i>
        </button>
      </div>
      <div class="flex items-center justify-between">
        <div class="space-x-4">
          <span class="text-lg font-semibold">Rounds: </span>
          <button @click="decrementRounds" class="btn btn-ghost">
            <i class="pi pi-minus"></i>
          </button>
          <span>{{ rounds }}</span>
          <button @click="incrementRounds" class="btn btn-ghost">
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
      <div class="max-h-72 space-y-4 overflow-y-auto p-1">
        <IntervalListing
          v-for="interval in intervals"
          :interval="interval"
          :key="interval.id"
        />
      </div>
      <div>
        <button @click="addInterval" class="btn btn-primary btn-sm w-full">
          Add Interval
        </button>
      </div>
    </div>
  </div>
</template>
