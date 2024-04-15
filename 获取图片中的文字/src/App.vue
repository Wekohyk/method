<template>
  <div></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { getImgText } from './utils/gitImgText';

const requestImgsEn = () => {
  return ['/text1_en.jpeg', '/text2_en.jpeg', '/text3_en.jpeg'].map(img => ({
    name: img,
    src: img,
  }));
};

const requestImgsZh = () => {
  return ['/text1_zh.jpeg', '/text2_zh.jpg', '/text3_zh.jpeg'].map(img => ({
    name: img,
    src: img,
  }));
};

onMounted(() => {
  // get english
  getImgText(requestImgsEn, 'eng');
  // get chinese
  getImgText(requestImgsZh, 'chi_sim');
});
</script>

<style scoped lang="scss"></style>
