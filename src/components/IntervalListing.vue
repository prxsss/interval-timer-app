<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Interval } from '../types/interval';

import TimerModal from './TimerModal.vue';

const props = defineProps<{
  interval: Interval;
}>();

const isShow = ref(false);

const formattedTime = computed(() => {
  const min = Math.floor(props.interval.originalTime / 60)
    .toString()
    .padStart(2, '0');
  const sec = (props.interval.originalTime % 60).toString().padStart(2, '0');
  return `${min}:${sec}`;
});

const openModal = () => {
  const modal = document.getElementById(
    `my_modal_${props.interval.id}`
  ) as HTMLDialogElement;
  if (modal) {
    isShow.value = true;
    modal.showModal();
  }
};

const closeModal = () => {
  const modal = document.getElementById(
    `my_modal_${props.interval.id}`
  ) as HTMLDialogElement;
  if (modal) {
    isShow.value = false;
    modal.close();
  }
};
</script>

<template>
  <div class="rounded-xl bg-base-100 shadow dark:bg-base-200">
    <div class="flex items-center space-x-4">
      <div class="handle cursor-move -space-x-2 pl-4 pt-4 text-sm">
        <i class="pi pi-ellipsis-v"></i>
        <i class="pi pi-ellipsis-v"></i>
      </div>
      <div
        @click="openModal"
        class="flex flex-1 cursor-pointer items-center justify-between pr-4 pt-4 font-medium"
      >
        <div>{{ props.interval.name }}</div>
        <div>{{ formattedTime }}</div>
      </div>
    </div>
    <div class="px-4 pb-4">
      <progress
        class="progress progress-primary [&::-moz-progress-bar]:transition-all [&::-webkit-progress-value]:transition-all"
        :value="props.interval.originalTime - props.interval.timeLeft"
        :max="props.interval.originalTime"
      ></progress>
    </div>
    <TimerModal
      v-show="isShow"
      :interval="props.interval"
      :is-show="isShow"
      :close-modal="closeModal"
    />
  </div>
</template>
