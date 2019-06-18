import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import SubjectsPage from './subjects';
import TimeTable from './timeTable';
import { AppNavBar } from './navbar';

const LandingPage = () => (
  <div>
    <h3>Manage Timetable</h3>
    <TimeTable />
  </div>
);

const App = () => (
  <Router>
    <div className="AppBody">
      <AppNavBar />
      <div className="content container">
        <Route path="/" exact component={LandingPage} />
        <Route path="/manageSubjects/" component={SubjectsPage} />
      </div>
    </div>
  </Router>
);

export default App;
