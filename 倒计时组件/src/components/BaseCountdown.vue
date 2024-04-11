<template>
  <div class="base-count-down">
    <div class="countdownContainer">
      <slot
        v-bind="{
          d: days,
          h: hours,
          m: minutes,
          s: seconds,
          hh: `00${hours}`.slice(-2),
          mm: `00${minutes}`.slice(-2),
          ss: `00${seconds}`.slice(-2),
        }"
      ></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { durationFormatter } from '../utils/GetTime';

const props = defineProps({
  time: {
    type: [Number, String],
    default: 0,
  },
  isMilliSeconds: {
    type: Boolean,
    default: false,
  },
  // The end time of the countdown
  end: {
    type: [Number, String],
    default: 0,
  },
  refreshCounter: {
    type: [Number, String],
    default: 0,
  },
});

const days = ref<number | string>('0');
const hours = ref<number | string>('00');
const minutes = ref<number | string>('00');
const seconds = ref<number | string>('00');
const timer = ref<number | null>(null);
const curTime = ref<number>(0);

// This function will return the time in seconds
const duration = computed(() => {
  if (props.end) {
    // If the length of the end time is greater than 13, it is milliseconds
    let end = String(props.end).length > 13 ? +props.end : +props.end * 1000;
    end -= Date.now();
    return end;
  }
  const time = props.isMilliSeconds
    ? Math.round(+props.time / 1000)
    : Math.round(+props.time);
  return time;
});

const countDown = () => {
  // show time on the page
  curTime.value = Date.now();
  getTime(duration.value);
};

const getTime = (duration: number | string) => {
  timer.value && clearInterval(timer.value);
  const durationNumber = Number(duration);
  // clear last setTimeout
  if (durationNumber < 0) return;
  const { dd, hh, mm, ss } = durationFormatter(durationNumber);
  days.value = dd || 0;
  // hours.value = `00${hh || ''}`.slice(-2);
  // mins.value = `00${mm || ''}`.slice(-2);
  // seconds.value = `00${ss || ''}`.slice(-2);
  hours.value = hh || 0;
  minutes.value = mm || 0;
  seconds.value = ss || 0;
  timer.value = setTimeout(() => {
    // SetTimeOut will not be accurate, so we need to calculate the difference
    // The time when the callback function of setTimeout is executed.
    const now = Date.now();
    // The time when the last time the callback function of setTimeout was executed.
    const diffTime = Math.floor((now - curTime.value) / 1000);
    //When the page is in the background, it will not count down. Compare the time difference, and reset the countdown if it is greater than 1s
    const step = diffTime > 1 ? diffTime : 1;
    // update current time
    curTime.value = now;
    getTime(durationNumber - step);
  }, 1000);
};

watch(duration, () => {
  countDown();
});
watch(
  () => props.refreshCounter,
  () => {
    countDown();
  },
);

onMounted(() => {
  countDown();
});
</script>

<style scoped lang="scss"></style>
