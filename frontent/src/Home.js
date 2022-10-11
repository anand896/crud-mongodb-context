import React, { useEffect } from "react";
import { useEmployee } from "./contexts/Employee/EmployeeState";
import { getEmployee, setLoading } from "./contexts/Employee/EmployeeAction";
import {Table, Button} from 'react-bootstrap';
import {deleteEmployee} from "./contexts/Employee/EmployeeAction";

import {
  Link
} from "react-router-dom";

const Home = () => { 
  const [employeeState, employeeDispatch] = useEmployee();
  const { employee, loading } = employeeState;

  useEffect(() => {
    setLoading(employeeDispatch, true);
    getEmployee(employeeDispatch);
  }, [employeeDispatch]);

  return (
    <>
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Age</th>
          <th>Email</th>
          <th>Date Of Birth</th>
          <th>Address</th>
          <th>Photo</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        { !loading && employee.length > 0 &&
          employee?.map((employee, index)=>{
            return(
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{employee.name}</td>
                <td>{employee.age}</td>
                <td>{employee.email}</td>
                <td>{employee.dateOfBirth}</td>
                <td>{employee.address}</td>
                <td>{employee.photo && <img style={{"width":"100px"}} src={`http://localhost:5000/${employee.photo}`} alt={employee.name} /> }</td>
                <td>
                  <Link to={`/edit/${employee._id}`}>
                    <Button variant="warning" type="button" style={{"marginRight":"10px"}}>
                      Edit
                    </Button>
                  </Link>

                  <Button onClick={()=>{deleteEmployee(employeeDispatch, employee._id)}} variant="danger" type="button">
                      Delete
                  </Button>
                </td>
              </tr>
            )
         })
        }
      </tbody>
    </Table>
    </>
  );
};

export default Home;
