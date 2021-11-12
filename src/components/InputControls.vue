<template>
  <div>
    <div class="text-left text-sm mt-6">Start of Journey:</div>
    <div class="mt-1">
      <GMapAutocomplete
        placeholder="Start of Journey"
        @place_changed="startLocChanged"
        class="input-rounded"
      >
      </GMapAutocomplete>
    </div>
    <div class="text-left text-sm mt-6">End of Journey:</div>
    <div class="mt-1">
      <GMapAutocomplete
        placeholder="End of Journey"
        @place_changed="endLocChanged"
        class="input-rounded"
      >
      </GMapAutocomplete>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["startLocChanged", "endLocChanged"]);

const startLocChanged = (place: google.maps.places.PlaceResult) => {
  if (place && place.geometry && place.geometry.location) {
    emit("startLocChanged", {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    });
  } else {
    emit("startLocChanged", null);
  }
};

const endLocChanged = (place: google.maps.places.PlaceResult) => {
  if (place && place.geometry && place.geometry.location) {
    emit("endLocChanged", {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    });
  } else {
    emit("endLocChanged", null);
  }
};
</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({});
</script>
