import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateTimeRangeSelector = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState({ hour: "00", minute: "00" });
  const [endTime, setEndTime] = useState({ hour: "00", minute: "00" });

  const handleStartTimeChange = (field, value) => {
    setStartTime({ ...startTime, [field]: value });
  };

  const handleEndTimeChange = (field, value) => {
    setEndTime({ ...endTime, [field]: value });
  };

  const handleDateChange = (date) => {
    setStartDate(date);
  };

  return (
    <div>
      <label>
        Date:
        <DatePicker selected={startDate} onChange={handleDateChange} />
      </label>
    </div>
  );
};

export default DateTimeRangeSelector;
