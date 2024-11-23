import { createSlice } from "@reduxjs/toolkit";
import { components } from "./components";

const CanvasSlice = createSlice({
  name: "canvas",
  initialState: {
    elements: [],
    selectedElement: "",
    mode: 0,
    pointsLines: [],
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

    setMode(state, action) {
      const { mode } = action.payload;
      state.mode = mode;
    },

    setPointsLines(state, action) {
      const { points } = action.payload;
      state.pointsLines = points;
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

    setPointsElem(state, action) {
      const { id, points } = action.payload;
      state.elements = state.elements.map((elem) => {
        if (elem.id === id) {
          return {
            ...elem,
            points: points,
          };
        }
        return elem;
      });
    },

    addElemOfis(state, action) {
      state.elements = [...state.elements, action.payload];
      state.pointsLines = [];
    },

    setPositionElem(state, action) {
      const { id, x, y } = action.payload;
      state.elements = state.elements.map((elem) => {
        if (elem.id === id) {
          return {
            ...elem,
            x: x,
            y: y,
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
  setPointsElem,
  setMode,
  setPointsLines,
  addElemOfis,
  setPositionElem,
} = CanvasSlice.actions;

export default CanvasSlice.reducer;
