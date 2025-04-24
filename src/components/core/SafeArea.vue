<script lang="ts" setup>

</script>

<template>
  <div class="safe-area">
    <slot/>
  </div>
</template>

<style scoped>
.safe-area {
  padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
}
</style>
