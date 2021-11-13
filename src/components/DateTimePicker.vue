<template>
  <Datepicker
    v-model="date"
    locale="en-GB"
    minutesIncrement="1"
    :format="format"
    :previewFormat="format"
    :state="state"
  ></Datepicker>
</template>

<script setup lang="ts">
import { watch } from "vue";
import { format } from "../utils/utils";

// This interface can't be extracted to file yet: https://github.com/vuejs/vue-next/issues/4294
interface DatePickerProps {
  date?: Date;
  format?: Function;
  state?: boolean;
}

const props = withDefaults(defineProps<DatePickerProps>(), {
  // Date should be blank when form loads
  date: undefined,
  // Formatter for en_GB style dates
  // FIXME: use user's locale
  format: (date: Date) => format(date),
  // Validation state should be 'undefined' when form loads
  // i.e. the state has no effect (true gives green border,
  // false gives red border to input component)
  state: undefined,
});

const emit = defineEmits(["dateUpdated"]);

// FIXME: wrap the date object and watch that,
// watching entire props prob not necessary
watch(props, (newProp) => {
  emit("dateUpdated", newProp.date);
});
</script>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Datepicker from "vue3-date-time-picker";
import "vue3-date-time-picker/dist/main.css";
export default defineComponent({});
</script>
