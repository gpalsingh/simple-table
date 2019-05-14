import React, { useState } from 'react';
import Popup from "reactjs-popup";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import { addPeriod, removePeriod } from '../redux/actions';
import { getSubjectById, getSubjectNamesAndIds } from '../utils/redux';

const week_days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

const max_periods = 9;

const NoSubjectsFound = ({ addSubPromptState, addSubjectPromptClose }) => (
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
            Ok
          </button>
        </div>
      </div>
    )}
  </Popup>
);

const AddSubjectPrompt = ({ addSubPromptState, addSubjectPromptClose, subjects, addPeriod }) => {
  if (subjects.length < 1) {
    return (
      <NoSubjectsFound
      addSubPromptState={addSubPromptState}
      addSubjectPromptClose={addSubjectPromptClose}
      />
    );
  }
  let [selectedSubjectID, setSelectedSubject] = useState(Number(subjects[0]['id']));

  const handleOptionChange = (event) => {
    setSelectedSubject(Number(event.target.value));
  }

  const subject_options = [];
  const id_to_sub_name = getSubjectNamesAndIds(subjects);

  for (let [id, sub_name] of Object.entries(id_to_sub_name)) {
    subject_options.push(
      <option value={id} key={id}>{sub_name}</option>
    );
  }

  const handleSubmit = (event, close) => {
    addPeriod(selectedSubjectID, {
      day: addSubPromptState.currentCell[0],
      periodNo: addSubPromptState.currentCell[1]
    });
    event.preventDefault()
    close()
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
            <button onClick={close}>
              Cancel
            </button>
          </div>
        </form>
      )}
    </Popup>
  );
}

const TimeTableCell = ({ day_index, period_no, period_info, subjects, fillTableCell, resetTableCell }) => {
  const default_sub_name = '+'

  if (!period_info) {
    return (
      <td
        style={{
          padding: "5px",
          border: "1px solid black"
        }}
        onClick={() => fillTableCell(day_index, period_no)}
      >{default_sub_name}</td>
    );
  }

  const sub_id = period_info.sub_id;
  const subject_info = getSubjectById(subjects, sub_id);

  const subject_name = subject_info['name'];

  return (
    <td
      style={{
        padding: "5px",
        border: "1px solid black"
      }}
      onClick={() => resetTableCell(day_index, period_no)}
    >{subject_name}</td>
  );
}

const TimeTable = ({ periods, subjects, addPeriod, removePeriod }) => {
  let schedule = [];
  let [addSubPromptState, setAddSubPromptState] = useState({
    isOpen: false,
    currentCell: [1, 1]
  });
  const fillTableCell = (day_index, period_no) => {
    setAddSubPromptState({
      isOpen: true,
      currentCell: [day_index, period_no]
    });
  }
  const addSubjectPromptClose = () => {
    setAddSubPromptState({
      isOpen: false,
    });
  }

  for (let day_index in week_days) {
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
          fillTableCell={fillTableCell}
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
    <AddSubjectPrompt
      addSubPromptState={addSubPromptState}
      addSubjectPromptClose={addSubjectPromptClose}
      subjects={subjects}
      addPeriod={addPeriod}
    />

    <table style={{border: "1px solid black", borderSpacing: "15px", borderCollapse: "separate"}}>
      <tbody>
        {schedule}
      </tbody>
    </table>
    </div>
  );
};

const mapStateToProps = state => {
  const { periods, subjects } = state;
  return { periods, subjects };
}

export default connect(mapStateToProps, { addPeriod, removePeriod })(TimeTable);