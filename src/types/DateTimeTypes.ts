export interface DateTimeType {
  value: Date | undefined;
}

export interface DatePickerProps {
  date: DateTimeType;
  format?: Function;
  state?: boolean;
}
