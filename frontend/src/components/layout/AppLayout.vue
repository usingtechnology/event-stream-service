<script setup lang="ts">
import { Header, Footer } from '@/components/layout';
defineProps({
  appTitle: {
    type: String,
    default: 'Event Stream Service Manager'
  }
});
</script>

<template>
  <div class="w-full min-h-screen flex flex-column">
    <!-- Header/Nav -->
    <div class="layout-head">
      <Header :app-title="appTitle" />
      <slot name="nav" />
    </div>

    <!-- Main views -->
    <main class="m-3 lg:mx-8 flex-auto">
      <slot name="main" />
    </main>

    <!-- Footer -->
    <footer class="flex-shrink-0">
      <Footer />
    </footer>
  </div>
</template>
