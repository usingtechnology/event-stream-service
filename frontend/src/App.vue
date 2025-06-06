<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onBeforeMount, onErrorCaptured, ref, computed } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import { AppLayout, Navbar, ProgressLoader } from '@/components/layout';
import { ConfirmDialog, Toast, useToast } from '@/lib/primevue';
import { useAppStore, useAuthStore, useConfigStore } from '@/store';

import type { Ref } from 'vue';

const appStore = useAppStore();
const { getIsLoading } = storeToRefs(appStore);

const ready: Ref<boolean> = ref(false);

const route = useRoute();

const appTitle = computed(() => {
  const title = import.meta.env.VITE_TITLE;
  return route && route.meta && route.meta.title ? `${title} - ${route.meta.title}` : title;
});

onBeforeMount(async () => {
  appStore.beginDeterminateLoading();
  await useConfigStore().init();
  await useAuthStore().init();
  appStore.endDeterminateLoading();
  ready.value = true;
});

// Top level error handler
onErrorCaptured((e: Error) => {
  const toast = useToast();
  toast.error('Error', e.message);
});
</script>

<template>
  <div class="container">
    <ConfirmDialog />
    <ProgressLoader v-if="getIsLoading" />
    <Toast />

    <AppLayout :app-title="appTitle">
      <template #nav>
        <Navbar />
      </template>
      <template #main>
        <RouterView v-if="ready" />
      </template>
    </AppLayout>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
}
</style>
