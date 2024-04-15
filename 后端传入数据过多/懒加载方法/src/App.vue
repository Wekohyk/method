<template>
  <!-- You need to set overflow-auto here, otherwise the scroll element will not trigger  -->
  <div
    class="h-100vh overflow-auto"
    id="container"
    @scroll="handleScroll"
    ref="container"
  >
    <div class="flex padding-10" v-for="item in showList" :key="item.tid">
      <span>{{ item.text }}</span>
    </div>
    <div ref="blank"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { getList } from './api/getList';

// get container and blank node
const container = ref<HTMLElement>();
const blank = ref<HTMLElement>();
// list data
const list = ref<any>([]);
// page number
const page = ref(1);
// one page show count
const limit = 200;
// max page number
const maxPage = computed(() => Math.ceil(list.value.length / limit));
// show list
const showList = computed(() => list.value.slice(0, page.value * limit));
const handleScroll = () => {
  // compare the current page number with the maximum page number
  if (page.value > maxPage.value) return;
  const clientHeight = container.value?.clientHeight;
  const blankTop = blank.value?.getBoundingClientRect().top;
  if (
    blankTop !== undefined &&
    clientHeight !== undefined &&
    blankTop <= clientHeight
  ) {
    // If the blank appears in the view, the current page number plus 1
    page.value++;
  }
};

onMounted(async () => {
  const res = await getList();
  list.value = res;
});
</script>

<style scoped lang="scss"></style>
