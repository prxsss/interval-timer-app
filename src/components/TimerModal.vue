<script setup lang="ts">
import { ref, inject, reactive, onMounted, computed } from 'vue';
import { removeIntervalKey, updateIntervalKey } from '../types/injectionKeys';
import type { Interval } from '../types/interval';

const props = defineProps<{
  interval: Interval;
}>();

const minutes = ref(0);
const seconds = ref(0);

const formData = reactive({
  id: '',
  name: '',
  timeLeft: 0,
  originalTime: 0,
});

const updateInterval = inject(updateIntervalKey);
const removeInterval = inject(removeIntervalKey);

const formattedMins = computed(() => {
  return minutes.value.toString().padStart(2, '0');
});

const formattedSecs = computed(() => {
  return seconds.value.toString().padStart(2, '0');
});

const handleChangeMinutes = (action: string) => {
  if (action === 'increase') {
    if (minutes.value === 59) {
      minutes.value = 0;
      return;
    }
    minutes.value++;
  } else {
    if (minutes.value === 0) {
      minutes.value = 59;
      return;
    }
    minutes.value--;
  }
};

const handleChangeSeconds = (action: string) => {
  if (action === 'increase') {
    if (seconds.value === 59) {
      seconds.value = 0;
      return;
    }
    seconds.value++;
  } else {
    if (seconds.value === 0) {
      seconds.value = 59;
      return;
    }
    seconds.value--;
  }
};

const handleSave = () => {
  formData.timeLeft = minutes.value * 60 + seconds.value;
  formData.originalTime = formData.timeLeft;
  updateInterval?.(formData);
  (
    document.getElementById(
      `my_modal_${props.interval.id}`
    ) as HTMLDialogElement
  ).close();
};

const closeModal = () => {
  const modal = document.getElementById(
    `my_modal_${props.interval.id}`
  ) as HTMLDialogElement;
  if (modal) {
    modal.close();
  }
};

onMounted(() => {
  formData.id = props.interval.id;
  formData.name = props.interval.name;
  formData.timeLeft = props.interval.timeLeft;
  formData.originalTime = props.interval.originalTime;

  minutes.value = Math.floor(formData.timeLeft / 60);
  seconds.value = formData.timeLeft % 60;
});
</script>

<template>
  <dialog :id="`my_modal_${props.interval.id}`" class="modal">
    <div class="modal-box w-80">
      <div class="mb-6 flex items-center justify-between">
        <h3 class="text-lg font-bold">Edit Timer</h3>
        <button @click="removeInterval?.(props.interval.id)">
          <i class="pi pi-trash"></i>
        </button>
      </div>
      <div class="mb-6 flex justify-center space-x-4">
        <div class="flex flex-col items-center">
          <button @click="handleChangeMinutes('increase')" class="p-2">
            <i class="pi pi-angle-up"></i>
          </button>
          <div class="w-16 text-center text-4xl font-medium">
            {{ formattedMins }}
          </div>
          <button @click="handleChangeMinutes('decrease')" class="p-2">
            <i class="pi pi-angle-down"></i>
          </button>
        </div>
        <div class="self-center text-4xl">:</div>
        <div class="flex flex-col items-center">
          <button @click="handleChangeSeconds('increase')" class="p-2">
            <i class="pi pi-angle-up"></i>
          </button>
          <div class="w-16 text-center text-4xl font-medium">
            {{ formattedSecs }}
          </div>
          <button @click="handleChangeSeconds('decrease')" class="p-2">
            <i class="pi pi-angle-down"></i>
          </button>
        </div>
      </div>
      <label class="input input-bordered mb-6 flex items-center gap-2">
        <i class="pi pi-pen-to-square"></i>
        <input
          v-model="formData.name"
          type="text"
          class="grow"
          placeholder="Timer name"
        />
      </label>
      <div class="flex space-x-3">
        <button @click="handleSave" class="btn btn-neutral flex-1">Save</button>
        <button @click="closeModal" class="btn flex-1">Cancel</button>
      </div>
    </div>

    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>
