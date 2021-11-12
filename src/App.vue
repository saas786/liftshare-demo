<template>
  <div
    class="w-full flex flex-col sm:flex-row flex-wrap sm:flex-nowrap flex-grow"
  >
    <div class="w-fixed w-full flex-shrink flex-grow-0 px-4">
      <div class="p-4 w-full h-full mb-6">
        <InputControls
          v-on:startLocChanged="setStartLoc"
          v-on:endLocChanged="setEndLoc"
        />

        <div class="text-left text-sm mt-6">Departure Date:</div>
        <DateTimePicker
          class="mt-1 mb-1"
          :state="startValidationState.value"
          :date="startDateTime.value"
          v-on:dateUpdated="setStartDateTime"
        />
        <div
          class="text-right text-red-400 text-sm"
          v-if="
            startValidationState.value === undefined
              ? false
              : !startValidationState.value
          "
        >
          Must be in the present!
        </div>
        <div class="text-left text-sm mt-6">Return Date:</div>
        <DateTimePicker
          class="mt-1 mb-1"
          :state="endValidationState.value"
          :date="endDateTime.value"
          v-on:dateUpdated="setEndDateTime"
        />
        <div
          class="text-right text-red-400 text-sm"
          v-if="
            endValidationState.value === undefined
              ? false
              : !endValidationState.value
          "
        >
          Must be after start time!
        </div>
        <button
          data-testid="btn-save-planet"
          class="btn--green my-6 float-right"
          type="button"
          v-on:click="save"
        >
          Save Planet!
        </button>
      </div>
    </div>
    <main class="w-full flex-grow">
      <div>
        <GoogleMap
          class="contents"
          :zoom="10"
          :markers="markers"
          :center="{ lat: 52.6259989, lng: 1.3172468 }"
        />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { MarkerType, PositionType } from "./types/GoogleMapTypes";
import GoogleMap from "./components/GoogleMap.vue";
import InputControls from "./components/InputControls.vue";
import DateTimePicker from "./components/DateTimePicker.vue";

const markers: MarkerType[] = reactive<MarkerType[]>([] as MarkerType[]);
const startDateTime: { value: Date | undefined } = reactive<{
  value: Date | undefined;
}>({ value: undefined });
const endDateTime: { value: Date | undefined } = reactive<{
  value: Date | undefined;
}>({ value: undefined });
const startValidationState: { value: boolean | undefined } = reactive<{
  value: boolean | undefined;
}>({ value: undefined });
const endValidationState: { value: boolean | undefined } = reactive<{
  value: boolean | undefined;
}>({ value: undefined });

const setStartLoc = (loc: PositionType) => {
  if (loc && markers) {
    markers[0] = { position: loc };
  } else {
    markers[0].position = null;
  }
};

const setEndLoc = (loc: PositionType) => {
  if (loc && markers) {
    markers[1] = { position: loc };
  } else {
    markers[1].position = null;
  }
};

const validateDates = () => {
  // Validate start datetime
  if (
    startDateTime &&
    startDateTime.value &&
    startDateTime.value < new Date(Date.now())
  ) {
    startValidationState.value = false;
  } else {
    startValidationState.value = undefined;
  }
  // Validate end datetime
  if (
    startDateTime &&
    startDateTime.value &&
    endDateTime &&
    endDateTime.value &&
    startDateTime.value.getTime() > endDateTime.value.getTime()
  ) {
    endValidationState.value = false;
  } else {
    endValidationState.value = undefined;
  }
};

const setStartDateTime = (date: Date) => {
  startDateTime.value = date;
  validateDates();
};

const setEndDateTime = (date: Date) => {
  endDateTime.value = date;
  validateDates();
};
</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
