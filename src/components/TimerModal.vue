<script setup lang="ts">
const props = defineProps<{
    modalId: string
}>()

const closeModal = () => {
    const modal = document.getElementById(props.modalId) as HTMLDialogElement
    if (modal) {
        modal.close()
    }
}
</script>

<template>
    <dialog :id="props.modalId" class="modal">
        <div class="modal-box w-80">
            <div class="mb-6 flex items-center justify-between">
                <h3 class="text-lg font-bold">Edit Timer</h3>
                <button><i class="pi pi-trash"></i></button>
            </div>
            <div class="mb-6 flex justify-center space-x-4">
                <div class="flex flex-col items-center">
                    <button class="p-2"><i class="pi pi-angle-up"></i></button>
                    <div class="w-16 text-center text-4xl font-medium">00</div>
                    <button class="p-2">
                        <i class="pi pi-angle-down"></i>
                    </button>
                </div>
                <div class="self-center text-4xl">:</div>
                <div class="flex flex-col items-center">
                    <button class="p-2"><i class="pi pi-angle-up"></i></button>
                    <div class="w-16 text-center text-4xl font-medium">00</div>
                    <button class="p-2">
                        <i class="pi pi-angle-down"></i>
                    </button>
                </div>
            </div>
            <label class="input input-bordered mb-6 flex items-center gap-2">
                <i class="pi pi-pen-to-square"></i>
                <input type="text" class="grow" placeholder="Timer name" />
            </label>
            <div class="flex space-x-3">
                <button class="btn btn-neutral flex-1">Save</button>
                <button @click="closeModal" class="btn flex-1">Cancel</button>
            </div>
        </div>

        <form method="dialog" class="modal-backdrop">
            <button>close</button>
        </form>
    </dialog>
</template>
