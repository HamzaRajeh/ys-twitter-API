import * as React from 'react';
 import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function BasicDatePicker({input}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}  >
         <DatePicker onChange={(val)=>input.value=val}   value={input.Value} label={input.label}  slotProps={{ textField: { helperText:input.helperText , size:input.size??"small"} }}   sx={{ direction:'ltr'}}  />
     </LocalizationProvider>
  );
}