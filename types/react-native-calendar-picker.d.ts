// src/@types/react-native-calendar-picker.d.ts
declare module 'react-native-calendar-picker' {
  import { Component } from 'react';
  import { ViewStyle, TextStyle } from 'react-native';

  interface CustomDateStyle {
    date: Date;
    style?: ViewStyle;
    textStyle?: TextStyle;
    containerStyle?: ViewStyle;
    allowDisabled?: boolean;
  }

  interface CalendarPickerProps {
    onDateChange: (date: Date, type?: 'START_DATE' | 'END_DATE') => void;
    startFromMonday?: boolean;
    allowRangeSelection?: boolean;
    minDate?: Date;
    maxDate?: Date;
    maxRangeDuration?: number;
    weekdays?: string[];
    months?: string[];
    previousTitle?: string;
    nextTitle?: string;
    todayBackgroundColor?: string;
    selectedDayColor?: string;
    selectedDayTextColor?: string;
    textStyle?: TextStyle;
    todayTextStyle?: TextStyle;
    customDatesStyles?: CustomDateStyle[] | ((date: Date) => CustomDateStyle);
    customDayHeaderStyles?: (
      dayOfWeek: number,
      month: number,
      year: number
    ) => { style?: ViewStyle; textStyle?: TextStyle };
    scaleFactor?: number;
    width?: number;
    height?: number;
    scrollable?: boolean;
    horizontal?: boolean;
    enableDateChange?: boolean;
    restrictMonthNavigation?: boolean;
    onMonthChange?: (date: Date) => void;
    initialDate?: Date;
    selectedStartDate?: Date;
    selectedEndDate?: Date;
    selectedRangeStartStyle?: ViewStyle;
    selectedRangeEndStyle?: ViewStyle;
    selectedRangeStyle?: ViewStyle;
    disabledDates?: Date[] | ((date: Date) => boolean);
    disabledDatesTextStyle?: TextStyle;
    todayTextStyle?: TextStyle;
    selectedDisabledDatesTextStyle?: TextStyle;
    // Add more props as needed based on the library's documentation
  }

  export default class CalendarPicker extends Component<CalendarPickerProps> {}
}
