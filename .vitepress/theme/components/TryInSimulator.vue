<template>
  <div class="try-section">
    <h3>&#9658; Try it in the Simulator</h3>
    <p class="try-desc" v-if="description">{{ description }}</p>
    <p class="try-desc" v-else>Test this component interactively directly in your browser without any physical hardware.</p>
    
    <button class="try-btn" @click="openSimulator">
      &#9658; &nbsp;Try in Simulator
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  circuit: {
    type: Object,
    default: null
  },
  description: {
    type: String,
    default: ""
  }
});

const openSimulator = () => {
  let url = 'http://localhost:5173/simulator';
  if (props.circuit) {
    url += '?circuit=' + encodeURIComponent(JSON.stringify(props.circuit));
  }
  window.open(url, '_blank');
};
</script>

<style scoped>
.try-section {
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 14px;
  padding: 32px 40px;
  margin: 44px 0;
}

.try-section h3 {
  font-size: 20px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 12px;
  border-top: none;
}

.try-section .try-desc {
  color: var(--vp-c-text-2);
  font-size: 15px;
  margin-bottom: 22px;
  line-height: 1.8;
}

.try-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background-color: var(--vp-c-brand-1);
  color: var(--vp-c-bg); /* Use background color for text to ensure contrast */
  border: none;
  padding: 12px 28px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;
}

.try-btn:hover {
  background-color: var(--vp-c-brand-2);
}

.try-btn:active {
  transform: scale(0.98);
}
</style>
