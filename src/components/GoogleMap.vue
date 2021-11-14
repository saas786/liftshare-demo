<template>
  <GMapMap
    ref="GMapRef"
    :markers="markers"
    :center="center"
    :zoom="zoom"
    map-type-id="terrain"
    v-on:fitToBounds="fitToBounds"
  >
    <GMapMarker
      :key="index"
      v-for="(m, index) in markers"
      :position="m ? m.position : null"
      :clickable="true"
      :draggable="true"
    />
  </GMapMap>
</template>

<script setup lang="ts">
import { watch } from "vue";
import { fitToBounds } from "../utils/utils";
import { MarkerType } from "../types/GoogleMapTypes";

// Can't be extracted to file yet: https://github.com/vuejs/vue-next/issues/4294
interface GoogleMapProps {
  markers: MarkerType[];
  center: { lat: number; lng: number };
  zoom: number;
}

const props = defineProps<GoogleMapProps>();
const GMapRef = ref();

let gmap: google.maps.Map;

watch(GMapRef, (googleMap) => {
  if (googleMap) {
    googleMap.$mapPromise.then((map: google.maps.Map) => {
      gmap = map;
      fitToBounds(map, props.markers);
    });
  }
});

watch(
  props.markers,
  (markers) => {
    fitToBounds(gmap, markers);
  },
  { deep: true }
);
</script>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({});
</script>

<style lang="postcss">
.vue-map {
  @apply min-h-screen !important;
}
</style>
