import React, { useState } from 'react';
import Popup from "reactjs-popup";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import { addPeriod, removePeriod } from '../redux/actions';
import { getSubjectById, getSubjectNamesAndIds } from '../utils/redux';
import {
  StateSubjectDataInterface,
  StatePeriodsDataInterface,
  StoreStateInterface
} from '../types/store';
import { PeriodsCellInterface } from '../types/reducers';

interface TimeTableProps {
  periods: StatePeriodsDataInterface,
  subjects: StateSubjectDataInterface[],
  addPeriod: typeof addPeriod,
  removePeriod: typeof removePeriod
}

interface TimeTableCellProps {
  day_index: number,
  period_no: number,
  period_info: PeriodsCellInterface,
  subjects: StateSubjectDataInterface[],
  handleTableCellClick: any
}

interface SubPromptStateInterface {
  isOpen: boolean,
  showResetButton: boolean,
  currentCell: Array<number>
}

interface TableCellClickPromptProps {
  addSubPromptState: SubPromptStateInterface,
  addSubjectPromptClose:any,
  subjects: StateSubjectDataInterface[],
  addPeriod: typeof addPeriod,
  removePeriod: typeof removePeriod
}

const week_days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

const max_periods = 9;

const NoSubjectsFound = ({ addSubPromptState, addSubjectPromptClose }: any) => (
  <Popup
    open={addSubPromptState.isOpen}
    onClose={addSubjectPromptClose}
    modal
  >
    {close => (
      <div>
        Add some subjects first
        <div>
          <Link to="/manageSubjects/">
            Add now
          </Link>
          <button onClick={close}>
            Cancel
          </button>
        </div>
      </div>
    )}
  </Popup>
);

const TableCellClickPrompt = ({ addSubPromptState, addSubjectPromptClose, subjects, addPeriod, removePeriod }: TableCellClickPromptProps) => {
  /* Set initial state as the id or -1 if no subjects available
     useState must come before all conditional returns */
  let [selectedSubjectID, setSelectedSubjectID] = useState(subjects[0] ? subjects[0]["id"] : -1);
  /* Prompt to add subjects if none available */
  if (selectedSubjectID < 0) {
    return (
      <NoSubjectsFound
      addSubPromptState={addSubPromptState}
      addSubjectPromptClose={addSubjectPromptClose}
      />
    );
  }

  /* Callbacks */
  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubjectID(Number(event.target.value));
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>, close: any) => {
    addPeriod(selectedSubjectID, {
      day: addSubPromptState.currentCell[0],
      periodNo: addSubPromptState.currentCell[1]
    });
    event.preventDefault()
    close()
  }

  /* Make subject options list */
  const subject_options: Array<JSX.Element> = [];
  const id_to_sub_name = getSubjectNamesAndIds(subjects);

  for (let [id, sub_name] of Object.entries(id_to_sub_name)) {
    subject_options.push(
      <option value={id} key={id}>{sub_name}</option>
    );
  }

  /* Show reset button too if cell already filled */
  let resetButton: any;
  const resetCell = () => {
    removePeriod({
      day: addSubPromptState.currentCell[0],
      periodNo: addSubPromptState.currentCell[1]
    });
    addSubjectPromptClose();
  };
  if (addSubPromptState.showResetButton === true) {
    resetButton =
      <button onClick={resetCell}>
        Reset
      </button>
    ;
  }

  return (
    <Popup
      open={addSubPromptState.isOpen}
      onClose={addSubjectPromptClose}
      modal
    >
      {close => (
        <form onSubmit={(event) => handleSubmit(event, close)}>
          <label>
            Select subject
            <select value={selectedSubjectID} onChange={handleOptionChange}>
              {subject_options}
            </select>
          </label>
          <div>
            <input type="submit" value="Submit" />
            {resetButton}
            <button onClick={close}>
              Cancel
            </button>
          </div>
        </form>
      )}
    </Popup>
  );
}

const TimeTableCell = ({ day_index, period_no, period_info, subjects, handleTableCellClick }: TimeTableCellProps) => {
  let subject_name = '+';
  let is_filled = false;

  if (period_info && (Object.entries(period_info).length > 0)) {
    const sub_id = period_info.sub_id;
    const subject_info = getSubjectById(subjects, sub_id);
    if (subject_info) {
      subject_name = subject_info['short_name'];
      is_filled = true;
    }
  }

  return (
    <td
      style={{
        padding: "5px",
        border: "1px solid black"
      }}
      onClick={() => handleTableCellClick(day_index, period_no, is_filled)}
    >{subject_name}</td>
  );
}

const TimeTable = ({ periods, subjects, addPeriod, removePeriod }: TimeTableProps) => {
  let schedule = [];
  let [addSubPromptState, setAddSubPromptState] = useState({
    isOpen: false,
    showResetButton: false,
    currentCell: [1, 1]
  });
  const handleTableCellClick = (day_index: number, period_no:number, is_filled: boolean) => {
    setAddSubPromptState({
      isOpen: true,
      showResetButton: is_filled,
      currentCell: [day_index, period_no]
    });
  }
  const addSubjectPromptClose = () => {
    setAddSubPromptState({
      ...addSubPromptState,
      isOpen: false,
    });
  }

  for (let day_index_str in week_days) {
    let day_index = parseInt(day_index_str);
    const day = week_days[day_index];
    /* Create schedule for day */
    let schedule_for_day = [];
    for (let i = 0; i < max_periods; i++) {
      /* Check if period info filled by user */
      const period_info = periods[day_index][i];

      schedule_for_day.push(
        <TimeTableCell
          day_index={day_index}
          period_no={i}
          period_info={period_info}
          subjects={subjects}
          key={i}
          handleTableCellClick={handleTableCellClick}
        />
      );
    }
    /* Add to main schedule */
    schedule.push(
      <tr key={day}>{schedule_for_day}</tr>
    );
  }

  return (
    <div>
    <TableCellClickPrompt
      addSubPromptState={addSubPromptState}
      addSubjectPromptClose={addSubjectPromptClose}
      subjects={subjects}
      addPeriod={addPeriod}
      removePeriod={removePeriod}
    />

    <table style={{border: "1px solid black", borderSpacing: "15px", borderCollapse: "separate"}}>
      <tbody>
        {schedule}
      </tbody>
    </table>
    </div>
  );
};

const mapStateToProps = (state: StoreStateInterface) => {
  const { periods, subjects } = state;
  return { periods, subjects };
}

export default connect(mapStateToProps, { addPeriod, removePeriod })(TimeTable);