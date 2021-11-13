<template>
  <div
    class="w-full flex flex-col sm:flex-row flex-wrap sm:flex-nowrap flex-grow"
  >
    <div class="w-fixed w-full flex-shrink flex-grow-0 px-4">
      <div class="p-4 w-full h-full mb-6">
        <LocationInput
          v-on:startLocChanged="setStartLoc"
          v-on:endLocChanged="setEndLoc"
        />

        <div class="text-left text-sm mt-4">Departure Date:</div>
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
        <div class="text-left text-sm mt-4">Return Date:</div>
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
        <ButtonProcess
          :disabled="saveDisabled"
          :processing="saveProcessing"
          @click="save"
          data-testid="save-button"
        />
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
import { computed, reactive, ref } from "vue";
import { MarkerType, PositionType } from "./types/GoogleMapTypes";
import ButtonProcess from "./components/ButtonProcess.vue";
import GoogleMap from "./components/GoogleMap.vue";
import LocationInput from "./components/LocationInput.vue";
import DateTimePicker from "./components/DateTimePicker.vue";
import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";

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

let saveProcessing = ref(false);

const saveDisabled = computed(
  () =>
    !(
      startDateTime &&
      startDateTime.value &&
      endDateTime &&
      endDateTime.value &&
      markers &&
      markers.length > 1 &&
      markers[0].position &&
      markers[1].position &&
      !saveProcessing.value
    )
);

const save = () => {
  saveProcessing.value = true;

  const body = {
    journey_start: {
      location: markers[0].position,
      datetime: startDateTime.value?.toISOString(),
    },
    journey_end: {
      location: markers[1].position,
      datetime: endDateTime.value?.toISOString(),
    },
  };
  fetch("/api/journey", { method: "post", body: JSON.stringify(body) })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network Error");
      }
      return res.json();
    })
    .then((data) => {
      createToast("Planet Saved!", {
        type: "success",
        toastBackgroundColor: "#11b981",
      });
    })
    .catch((err) => {
      createToast("Planet Not Saved!", {
        type: "danger",
      });
    })
    .finally(() => (saveProcessing.value = false));
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
