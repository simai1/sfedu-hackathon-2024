import { createSlice } from "@reduxjs/toolkit";
import { components } from "./components";

const CanvasSlice = createSlice({
  name: "canvas",
  initialState: {
    elements: [],
    selectedElement: "",
  },

  reducers: {
    addElem(state, action) {
      const { id } = action.payload;
      const newElement = {
        ...components.find((component) => component.elemId === id),
        id: Date.now().toString(),
      };
      // Добавляем новый элемент в массив
      state.elements = [...state.elements, newElement];
      // Сортируем элементы по zIndex
      state.elements.sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0));
    },

    setElem(state, action) {
      const { mass } = action.payload;
      state.elements = mass;
    },

    setDraggable(state, action) {
      const { id } = action.payload;
      console.log("id", id);

      state.elements = state.elements.map((elem) => {
        if (elem.id === id) {
          return {
            ...elem,
            draggable: !elem.draggable,
          };
        }
        return elem;
      });
    },

    setSelectedElement(state, action) {
      const { id } = action.payload;
      state.selectedElement = id;
    },

    deleteElem(state, action) {
      const { id } = action.payload;
      state.elements = state.elements.filter((elem) => elem.id !== id);
    },
  },
});
export const {
  addElem,
  setElem,
  deleteElem,
  setSelectedElement,
  setDraggable,
} = CanvasSlice.actions;

export default CanvasSlice.reducer;