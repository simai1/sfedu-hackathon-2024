import { createSlice } from "@reduxjs/toolkit";

const EquipmentSlice = createSlice({
  name: "equipmentSlice",
  initialState: {
    equipment: [],
    office: [],
    selectedOffice: null,
  },

  reducers: {
    //! добавить в массив фильтрацию по заголовку
    setEquipment(state, action) {
      const { data } = action.payload;
      state.equipment = data;
    },
    setOffice(state, action) {
      const { data } = action.payload;
      state.office = data;
    },

    setSelectedOffice(state, action) {
      const { id } = action.payload;
      state.selectedOffice = id;
    },
  },
});

export const { setEquipment, setOffice, setSelectedOffice } =
  EquipmentSlice.actions;

export default EquipmentSlice.reducer;
