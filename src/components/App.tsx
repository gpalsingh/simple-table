import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import SubjectsPage from './subjects';
import TimeTable from './timeTable';

const LandingPage = () => (
  <div>
    <TimeTable />
    <Link to="/manageSubjects/">Manage subject</Link>
  </div>
);

const App = () => (
  <Router>
    <Link to="/">
      <h3>
        SimpleTable
      </h3>
    </Link>
    <Route path="/" exact component={LandingPage} />
    <Route path="/manageSubjects/" component={SubjectsPage} />
  </Router>
);

export default App;
