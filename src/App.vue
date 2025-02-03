<script setup lang="ts">
import { ref } from 'vue'
import soundFile from './assets/sounds/mixkit-mouse-click-close-1113.wav'

import IntervalListing from './components/IntervalListing.vue'

const rounds = ref(1)
const intervals = ref(1)

const incrementRounds = () => {
    rounds.value++
}

const decrementRounds = () => {
    if (rounds.value > 1) {
        rounds.value--
    }
}

const toggleSound = () => {
    const soundEffect = new Audio(soundFile)
    soundEffect.play()
}
</script>

<template>
    <div
        class="flex min-h-screen w-full items-center justify-center bg-base-200"
    >
        <div
            class="w-full max-w-3xl space-y-6 rounded-xl bg-base-100 p-6 shadow"
        >
            <div class="text-center text-3xl font-semibold">00:00</div>
            <div class="space-x-4 text-center">
                <button class="btn btn-neutral text-lg">
                    <i class="pi pi-play"></i>
                </button>
                <button class="btn btn-neutral text-lg">
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
                        <input
                            @change="toggleSound"
                            type="checkbox"
                            class="toggle"
                        />
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
                <button
                    @click="intervals++"
                    class="btn btn-neutral btn-sm w-full"
                >
                    Add Interval
                </button>
            </div>
        </div>
    </div>
</template>
