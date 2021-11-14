<template>
  <Datepicker
    v-model="date.value"
    locale="en-GB"
    minutesIncrement="1"
    :format="format"
    :previewFormat="format"
    :state="state"
  ></Datepicker>
</template>

<script setup lang="ts">
import { watch, reactive } from "vue";
import { format } from "../utils/utils";
import { DateTimeType } from "../types/DateTimeTypes";

// This interface can't be extracted to file yet: https://github.com/vuejs/vue-next/issues/4294
interface DatePickerProps {
  date: DateTimeType;
  format?: Function;
  state?: boolean;
}

const props = withDefaults(defineProps<DatePickerProps>(), {
  // Date should be blank when form loads
  date: () => {
    return { value: undefined };
  },
  // Formatter for en_GB style dates
  // FIXME: use user's locale
  format: (date: DateTimeType) => format(date.value),
  // Validation state should be 'undefined' when form loads
  // i.e. the state has no effect (true gives green border,
  // false gives red border to input component)
  state: undefined,
});

const emit = defineEmits(["dateUpdated"]);

watch(
  props.date,
  (newDate) => {
    emit("dateUpdated", newDate.value);
  },
  { deep: true }
);
</script>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Datepicker from "vue3-date-time-picker";
import "vue3-date-time-picker/dist/main.css";
export default defineComponent({});
</script>

<style scoped lang="postcss">
.dp__theme_light {
  --dp-background-color: #ffffff;
  --dp-text-color: rgba(55, 65, 81, 1);
  --dp-hover-color: #f3f3f3;
  --dp-hover-text-color: #212121;
  --dp-hover-icon-color: #959595;
  --dp-primary-color: #1976d2;
  --dp-primary-text-color: #f8f5f5;
  --dp-secondary-color: #c0c4cc;
  --dp-border-color: rgba(229, 231, 235, 1);
  --dp-border-color-hover: rgba(209, 213, 219, 1);
  --dp-disabled-color: #f6f6f6;
  --dp-scroll-bar-background: #f3f3f3;
  --dp-scroll-bar-color: #959595;
  --dp-success-color: #76d275;
  --dp-icon-color: #959595;
  --dp-danger-color: #ff6f60;
}
</style>
