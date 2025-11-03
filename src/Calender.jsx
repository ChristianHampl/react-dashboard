import {
  DatePicker,
  DateInput,
  DateSegment,
  Button,
  Popover,
  Dialog,
  Calendar
} from "react-aria-components";
import { useState } from "react";

export default function Calender() {
  const [value, setValue] = useState(null);

  return (
    <div className="date-picker-wrapper">
      <label className="date-label">Wähle ein Datum:</label>

      <DatePicker value={value} onChange={setValue}>
        <DateInput className="date-input">
          {(segment) => <DateSegment segment={segment} />}
        </DateInput>
        <Button className="calendar-button" slot="button">📅</Button>
        <Popover className="calendar-popover">
          <Dialog className="calendar-dialog">
            <Calendar />
          </Dialog>
        </Popover>
      </DatePicker>

      {value && (
        <p className="date-result">
          Ausgewählt: {value.toString()}
        </p>
      )}
    </div>
  );
}