import { createSlice } from "@reduxjs/toolkit";

const EquipmentSlice = createSlice({
  name: "equipmentSlice",
  initialState: {
    equipment: [],
    office: [],
    selectedOffice: null,
    selectedFloor: null,
    worker: [],
  },

  reducers: {
    //! добавить в массив фильтрацию по заголовку
    setEquipment(state, action) {
      const { data } = action.payload;
      state.equipment = data;
    },

    setWorker(state, action) {
      const { data } = action.payload;
      state.worker = data;
    },
    setOffice(state, action) {
      const { data } = action.payload;
      state.office = data;
    },

    setSelectedOffice(state, action) {
      const { id } = action.payload;
      state.selectedOffice = id;
    },

    setSelectedFloor(state, action) {
      const { id } = action.payload;
      state.selectedFloor = id;
    },
  },
});

export const {
  setEquipment,
  setOffice,
  setSelectedOffice,
  setSelectedFloor,
  setWorker,
} = EquipmentSlice.actions;

export default EquipmentSlice.reducer;
