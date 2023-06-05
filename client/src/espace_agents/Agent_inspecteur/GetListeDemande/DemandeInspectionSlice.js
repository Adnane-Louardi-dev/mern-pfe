import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import getDemandes from "./DemandeList";

const initialState = {
  list: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Get Liste de Demandes En Attente d'inspection
export const ListDemandes = createAsyncThunk(
  "espaceAgent/Inspection/getDemandes",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.Agentuser.token;
      return await getDemandes(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toSting();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const DemandeList_Slice = createSlice({
  name: "ListeDemandeAttInspection",
  initialState,
  reducers: {
    resetList: (state) => {
      (state.list = []),
        (state.isError = false),
        (state.isSuccess = false),
        (state.isLoading = false),
        (state.message = "");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(ListDemandes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(ListDemandes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.list = action.payload;
      })
      .addCase(ListDemandes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetList } = DemandeList_Slice.actions;
export default DemandeList_Slice.reducer;
