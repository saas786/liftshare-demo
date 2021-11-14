export interface DateTimeType {
  value?: Date;
}

export interface DatePickerProps {
  date: DateTimeType;
  format?: Function;
  state?: boolean;
}
