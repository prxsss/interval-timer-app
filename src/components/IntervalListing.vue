<script setup lang="ts">
import TimerModal from './TimerModal.vue'

const props = defineProps<{
    id: number
}>()

const openModal = () => {
    const modal = document.getElementById(
        `my_modal_${props.id}`
    ) as HTMLDialogElement
    if (modal) {
        modal.showModal()
    }
}
</script>

<template>
    <div class="flex items-center space-x-4 rounded-xl bg-base-200">
        <div class="cursor-move -space-x-2 py-4 pl-4 text-sm">
            <i class="pi pi-ellipsis-v"></i>
            <i class="pi pi-ellipsis-v"></i>
        </div>
        <div
            @click="openModal"
            class="flex flex-1 cursor-pointer items-center justify-between py-4 pr-4 font-medium"
        >
            <div>IntervalListing</div>
            <div>0:00</div>
        </div>
    </div>
    <TimerModal :modal-id="`my_modal_${props.id}`" />
</template>
