<template>
  <div
    class="scrollContainer h-100vh overflow-auto"
    @scroll.passive="doScroll"
    ref="scrollBox"
  >
    <div :style="blankStyle" style="height: 100%">
      <div
        v-for="item in tempList"
        :key="item.id"
        class="h-148px border-1px border-solid border-black flex justify-between items-center px-20"
      >
        <span>{{ item.msg }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import { throttle } from './utils/throttle';

interface DataItem {
  id: string;
  msg: string;
}

const allData = ref<DataItem[]>([]);
// every item height in the list
const itemHeight = ref<number>(150);
// The height of the visible area
const boxHeight = ref<number>(0);
// The index of the element start
const startIndex = ref<number>(0);
// The index of the element end
const scrollBox = ref<HTMLElement | null>(null);

const getAllData = (count: number) => {
  const length = allData.value.length;
  for (let i = 0; i < count; i++) {
    allData.value.push({
      id: `Weko${length + i}`,
      msg: `${length + i}号`,
    });
  }
};
getAllData(30);

// get the height of the visible area
const getScrollBoxHeight = () => {
  boxHeight.value = (
    document.querySelector('.scrollContainer') as HTMLElement
  ).clientHeight;
};

const mql = window.matchMedia('(orientation: portrait)');
// Monitor screen rotations
const handleOrientationChange = (e: MediaQueryListEvent) => {
  if (e.matches) {
    // Portrait mode
    getScrollBoxHeight();
  } else {
    // Landscape mode
    getScrollBoxHeight();
  }
};

// throttle the scroll event
// The scroll event of the visible area is monitored
const doScroll = throttle(() => {
  console.log('scroll');
  if (!scrollBox.value) return;
  // ~~: Round down to the nearest whole number
  const index = ~~(scrollBox.value.scrollTop / itemHeight.value);
  console.log(index, startIndex.value, 'index, startIndex.value');
  if (index === startIndex.value) return;
  startIndex.value = index;
  if (startIndex.value + itemNum.value > allData.value.length - 1) {
    getAllData(30);
  }
}, 200);

// Calculate the number of items that can be displayed in the visible areas
const itemNum = computed(() => {
  return ~~(boxHeight.value / itemHeight.value) + 2;
});

const endIndex = computed(() => {
  // Multiply by 2 because if the scroll is too fast, a white screen may appear, so load one page of data in advance
  let index = startIndex.value + itemNum.value * 2;
  // If the index is greater than the length of the data, the index is the length of the data minus 1
  if (!allData.value[index]) {
    index = allData.value.length - 1;
  }
  return index;
});

const tempList = computed(() => {
  let startIndex = 0;
  if (startIndex <= itemNum.value) {
    startIndex = 0;
  } else {
    startIndex = startIndex - itemNum.value;
  }
  return allData.value.slice(startIndex, endIndex.value + 1);
});

const blankStyle = () => {
  let startIndex = 0;
  if (startIndex <= itemNum.value) {
    startIndex = 0;
  } else {
    startIndex = startIndex - itemNum.value;
  }
  return {
    paddingTop: `${startIndex * itemHeight.value}px`,
    paddingBottom: `${(allData.value.length - endIndex.value - 1) * itemHeight.value}px`,
  };
};

onMounted(() => {
  getScrollBoxHeight();
  window.onresize = getScrollBoxHeight;
  mql.addEventListener('change', handleOrientationChange);
});

// Remove the listener when the component is unmounted
onBeforeUnmount(() => {
  mql.removeEventListener('change', handleOrientationChange);
});
</script>

<style scoped lang="scss"></style>
