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
      const result = res.data;
      dispatch({
        type: "SET_EMPLOYEE",
        payload: [...result]
      });
    })
    .catch(error => {
      const result = error;

      dispatch({
        type: "SET_ERROR",
        payload: {
          error: true,
          message: result
        }
      });
    });

    setLoading(dispatch, false);
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
      const result = error;

      dispatch({
        type: "SET_ERROR",
        payload: {
          error: true,
          message: result
        }
      });
    });

    setLoading(dispatch, false);
};




// Add New Employee
export const addEmployee = async (dispatch, newEmployee, photo) => {
  setLoading(dispatch, true);
  const formData = new FormData();
  formData.append("name", newEmployee.name);
  formData.append("age", newEmployee.age);
  formData.append("email", newEmployee.email);
  formData.append("dateOfBirth", newEmployee.dateOfBirth);
  formData.append("address", newEmployee.address);
  formData.append("photo", photo);

  await axios
    .post(`http://localhost:5000/api/employee`, formData)
    .then(res => {
      console.log(res);
    })
    .catch(error => {
      const result = error;

      dispatch({
        type: "SET_ERROR",
        payload: {
          error: true,
          message: result
        }
      });
    });

    setLoading(dispatch, false);
};



// Edit Employee
export const editEmployee = async (dispatch, updatedEmployee, id, photo) => {
  setLoading(dispatch, true);

  const formData = new FormData();
  if(updatedEmployee.name) formData.append("name", updatedEmployee.name);
  if(updatedEmployee.age) formData.append("age", updatedEmployee.age);
  if(updatedEmployee.email) formData.append("email", updatedEmployee.email);
  if(updatedEmployee.dateOfBirth) formData.append("dateOfBirth", updatedEmployee.dateOfBirth);
  if(updatedEmployee.address) formData.append("address", updatedEmployee.address);
  if(photo) formData.append("photo", photo);

  await axios
    .put(`http://localhost:5000/api/employee/${id}`, formData)
    .then(res => {
      const result = res;
    })
    .catch(error => {
      const result = error;

      dispatch({
        type: "SET_ERROR",
        payload: {
          error: true,
          message: result
        }
      });
    });

    setLoading(dispatch, false);
};


// Delete Employee
export const deleteEmployee = async (dispatch, id) => {
  setLoading(dispatch, true);
  await axios
    .delete(`http://localhost:5000/api/employee/${id}`)
    .then(res => {
      getEmployee(dispatch)
    })
    .catch(error => {
      const result = error;

      dispatch({
        type: "SET_ERROR",
        payload: {
          error: true,
          message: result
        }
      });
    });

    setLoading(dispatch, false);
};