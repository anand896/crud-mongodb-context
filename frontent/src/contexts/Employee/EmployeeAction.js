import axios from "axios";

// Set Loading
export const setLoading = (dispatch, status) =>
  dispatch({ type: "SET_LOADING", payload: status });


// Set Error
export const setError = (dispatch, error) =>
  dispatch({
    type: "SET_ERROR",
    payload: { error: error.status, message: error.message }
  });


// Get Employee
export const getEmployee = async dispatch => {
  setLoading(dispatch, true);

  await axios
    .get(`http://localhost:5000/api/employee`)
    .then(res => {
      dispatch({
        type: "SET_EMPLOYEE_LIST",
        payload: [...res.data]
      });
      setLoading(dispatch, false);
    })
    .catch(error => {
      setError(dispatch, {status : true, message: "Something went wrong"})
    });
};


// Get Single Employee
export const getSingleEmployee = async (dispatch, id) => {
  setLoading(dispatch, true);

  await axios
    .get(`http://localhost:5000/api/employee/${id}`)
    .then(res => {
      const result = res.data;
      dispatch({
        type: "SET_EMPLOYEE",
        payload: result
      });
    })
    .catch(error => {
      setError(dispatch, {status : true, message: "Something went wrong"})
    });
    setLoading(dispatch, false);
};



// Add New Employee
export const addEmployee = async (dispatch, newEmployee) => {
  const formData = new FormData();
  formData.append("name", newEmployee.name);
  formData.append("age", newEmployee.age);
  formData.append("email", newEmployee.email);
  formData.append("dateOfBirth", newEmployee.dateOfBirth);
  formData.append("address", newEmployee.address);
  formData.append("photo", newEmployee.photo);

  await axios
    .post(`http://localhost:5000/api/employee`, formData)
    .then(res => {
      const result = res.data;
      dispatch({
        type: "SET_EMPLOYEE",
        payload: result,
        message:"Employee Added Successfully"
      });
    })
    .catch(error => {
      setError(dispatch, {status : true, message: "Something went wrong"})
    });
};



// Edit Employee
export const editEmployee = async (dispatch, updatedEmployee, id) => {
  console.log(updatedEmployee)
  const formData = new FormData();
  formData.append("name", updatedEmployee.name);
  formData.append("age", updatedEmployee.age);
  formData.append("email", updatedEmployee.email);
  formData.append("dateOfBirth", updatedEmployee.dateOfBirth);
  formData.append("address", updatedEmployee.address);
  formData.append("photo", updatedEmployee.photo);

  await axios
    .put(`http://localhost:5000/api/employee/${id}`, formData)
    .then(res => {
      console.log(res)
    })
    .catch(error => {
      setError(dispatch, {status : true, message: "Something went wrong"})
    });
};



// Delete Employee
export const deleteEmployee = async (dispatch, id) => {
  await axios
    .delete(`http://localhost:5000/api/employee/${id}`)
    .then(res => {
      getEmployee(dispatch);
    })
    .catch(error => {
      setError(dispatch, {status : true, message: "Something went wrong"})
    });
};