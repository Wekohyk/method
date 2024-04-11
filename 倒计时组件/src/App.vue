<template>
  <BaseCountdown v-slot="timeObj" :time="countDown">
    <div class="count-down">
      <div class="icon"></div>
      {{ timeObj.d }}天{{ timeObj.hh }}小时{{ timeObj.mm }}分钟{{
        timeObj.ss
      }}秒
    </div>
  </BaseCountdown>
</template>

<script setup lang="ts">
import BaseCountdown from './components/BaseCountdown.vue';
const countDown = 1715400732;
// Get the number of minutes
// var StartMinute = startDate.getMinutes().toString().length >= 2 ? startDate.getMinutes() : '0' + startDate.getHours();
</script>

<style scoped lang="scss"></style>
