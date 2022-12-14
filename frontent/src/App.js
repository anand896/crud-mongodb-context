import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import { EmployeeState } from "./contexts/Employee/EmployeeState";
import Home from "./Home";
import Edit from "./Edit";
import AddNew from "./AddNew";
import './style.css';
import {Button} from "react-bootstrap"


export default function App() {
  return (
    <EmployeeState>
      <div className="mainWraper">
        <Router>
            <div className="namBar">
                <Link to="/">
                  <Button variant="success" type="button">
                    Home
                  </Button>
                </Link>

                <Link to="/add-new" style={{"marginLeft" : "10px"}}>
                  <Button variant="warning" type="button">
                    Add New
                  </Button>
                </Link>
            </div>

            <hr />
            <br />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add-new" element={<AddNew />} />
              <Route path="/edit/:userId" element={<Edit />} />
            </Routes>
        </Router>
      </div>
    </EmployeeState>
  );
}