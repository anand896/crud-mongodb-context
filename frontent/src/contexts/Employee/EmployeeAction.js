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
export const addEmployee = async (dispatch, newEmployee) => {
  setLoading(dispatch, true);

  await axios
    .post(`http://localhost:5000/api/employee`, newEmployee)
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



// Edit Employee
export const editEmployee = async (dispatch, updatedEmployee, id) => {
  setLoading(dispatch, true);
  await axios
    .put(`http://localhost:5000/api/employee/${id}`, {...updatedEmployee})
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