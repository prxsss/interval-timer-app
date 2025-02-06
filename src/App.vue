<script setup lang="ts">
import { ref, provide } from 'vue';
import { computed } from 'vue';
import {
  removeIntervalKey,
  intervalsKey,
  updateIntervalKey,
} from './types/injectionKeys';
import { v4 as uuidv4 } from 'uuid';
import soundFile from './assets/sounds/mixkit-mouse-click-close-1113.wav';
import type { Interval } from './types/interval';

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
          v-for="interval in intervals"
          :interval="interval"
          :key="interval.id"
        />
      </div>
      <div>
        <button @click="addInterval" class="btn btn-neutral btn-sm w-full">
          Add Interval
        </button>
      </div>
    </div>
  </div>
</template>
