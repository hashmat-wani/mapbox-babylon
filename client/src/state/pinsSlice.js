import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { instance, privateInstance } from "../utils/apiInstances";

const initialState = [];

const pinsSlice = createSlice({
  name: "pins",
  initialState,
  reducers: {
    setPins: (state, action) => action.payload,
  },
});

export const { setPins } = pinsSlice.actions;
export default pinsSlice.reducer;

export const createPin =
  ({ comment, longitude, latitude, setNewPlace }) =>
  (dispatch) => {
    privateInstance
      .post("/api/v1/pins", {
        comment,
        longitude,
        latitude,
      })
      .then(() => {
        setNewPlace(null);
        toast.success("Added successfully!");
        dispatch(fetchPins());
      })
      .catch(() => {
        toast.error("Something went wrong. Try again..!");
      });
  };

export const fetchPins = () => (dispatch) => {
  instance
    .get("/api/v1/pins")
    .then(({ data }) => {
      dispatch(setPins(data.pins));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deletePin =
  ({ id }) =>
  (dispatch) => {
    privateInstance
      .delete(`/api/v1/pins/${id}`)
      .then(() => {
        toast.success("Deleted successfully");
        dispatch(fetchPins());
      })
      .catch((err) => {
        const message = err?.response?.data?.message;
        toast.error(message || "Something went wrong.");
      });
  };
