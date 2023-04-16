'use client'

import { DateRange, Range, RangeKeyDict } from "react-date-range";

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

interface CalendarProps {
    value: Range;
    disabledDates?: Date[];
    onChange: (value: RangeKeyDict) => void;
}


const Calendar: React.FC<CalendarProps> = ({
    value,
    disabledDates,
    onChange,

}) => {
  return (
    <DateRange
    rangeColors={['#FD5B61']}
    ranges={[value]}
    date = {new Date()}
    onChange={onChange}
    direction="vertical"
    showDateDisplay={false}
    minDate={new Date()}
    disabledDates={disabledDates}
    />

    
  )
}

export default Calendar