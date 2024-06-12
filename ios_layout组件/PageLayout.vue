<script setup lang="ts">
  import { useAttrs } from 'vue';

  interface Props {
    transparentNavigationBar?: boolean;
    hideBack?: boolean;
    pageTitle?: string;
    floatHeader?: boolean;
    scrollable?: boolean;
    background?: string;
    navBackgroundColor?: string;
    enableBackToTop?: boolean;
  }
  withDefaults(defineProps<Props>(), { scrollable: true });

  interface Emits {
    (e: 'back'): void;
  }
  const emit = defineEmits<Emits>();
  interface Slots {
    default(param: any): void;
    navigationBarLeading(param: any): any;
    navigationBarCenter(param: any): any;
    navigationBarTrailing(param: any): any;
  }
  defineSlots<Slots>();

  const attrs = useAttrs();
  const back = () => {
    if (Reflect.has(attrs, 'onBack')) {
      emit('back');
    } else {
      tw.router.close();
    }
  };
</script>

<template>
  <div
    class="h-100vh w-full flex flex-col items-stretch bg-top bg-contain bg-no-repeat bg-$primaryBackground"
    :style="{
      background: background,
    }"
  >
    <!-- backdrop-filter backdrop-blur-2 -->
    <header
      class="top-0 w-full flex-shrink-0 adapt-pt-0 z-1"
      :class="{
        'bg-transparent': transparentNavigationBar,
        '!fixed left-0': floatHeader,
      }"
      :style="{ backgroundColor: navBackgroundColor ?? 'unset' }"
    >
      <div class="navigation-bar grid grid-cols-[1fr_auto_1fr]">
        <div class="flex-1 flex items-center h-44 pl-9px">
          <div class="flex items-center mt-1" v-if="!hideBack" @click="back">
            <GlyIcon
              FIGMA_KEY="4e671fd0853c20e938ab4920d790da031c4bc3ae"
              name="nav_icon_back"
              icon="c81906612980b11a62d17dd6cca40337"
              color="currentColor"
              :size="32"
            />
          </div>
          <slot name="navigationBarLeading"></slot>
        </div>
        <div
          class="adapt-top-0 left-0 w-full flex-shrink flex items-center justify-center text-18 font-semibold"
        >
          <slot name="navigationBarCenter">
            <div v-if="pageTitle" class="h-44 flex items-center justify-center">
              {{ pageTitle }}
            </div>
          </slot>
        </div>
        <div class="flex-1 pr-16px flex items-center justify-end h-44">
          <slot name="navigationBarTrailing"></slot>
        </div>
      </div>
    </header>
    <main
      v-back-to-top="enableBackToTop"
      class="relative flex-1 overflow-x-hidden z-999"
      :style="{ overflowY: scrollable ? 'scroll' : 'hidden' }"
    >
      <div
        class="fixed left-0 z-50 adapt-top-44 bottom-0"
        style="width: 15pt"
        @touchmove.prevent
      ></div>
      <slot></slot>
    </main>
  </div>
</template>
