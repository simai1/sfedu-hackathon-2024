import { createSlice } from "@reduxjs/toolkit";
import { components } from "./components";

function funGetPoints(points, elem) {
  if (points[2] !== elem.points[2] && points[3] !== elem.points[3]) {
    return [points[2], points[3], elem.points[2], elem.points[3]];
  } else {
    return points;
  }
}

function funGetPoints2(points, elem) {
  if (points[0] !== elem.points[0] && points[1] !== elem.points[1]) {
    return [elem.points[0], elem.points[1], points[0], points[1]];
  } else {
    return points;
  }
}

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
      const { id, idEquipment } = action.payload;
      const newElement = {
        ...components.find((component) => component.elemId === id),
        id: Date.now().toString(),
        idEquipment: idEquipment,
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

    setRotation(state, action) {
      const { id, rotation } = action.payload;
      state.elements = state.elements.map((elem) => {
        if (elem.id === id) {
          return {
            ...elem,
            rotation: rotation,
          };
        }
        return elem;
      });
    },

    setPointsElem(state, action) {
      const { id, points, x, y } = action.payload;

      state.elements = [...state.elements].map((elem) => {
        if (elem.id === id) {
          return {
            ...elem,
            points: points,
          };
        }
        return elem;
      });

      let element = null;
      let se = 0;
      if (points && points.length > 0) {
        element = [...state.elements].find(
          (el) =>
            el.figure &&
            el.figure === "2" &&
            Math.abs(el.points[0] - x) < 50 &&
            Math.abs(el.points[1] - y) < 50
        );
        console.log("ee", element);
      }

      if (points && points.length > 0) {
        let e = [...state.elements].find(
          (el) =>
            el.figure &&
            el.figure === "2" &&
            Math.abs(el.points[2] - x) < 50 &&
            Math.abs(el.points[3] - y) < 50
        );
        if (e) {
          element = e;
          console.log("e", e);
          se = 1;
        }
      }
      if (element) {
        // console.log("element", element);
        state.elements = state.elements.map((elem) => {
          if (elem.id === element.id && elem.id) {
            return {
              ...elem,
              points:
                se === 0
                  ? funGetPoints(points, elem)
                  : funGetPoints2(points, elem),
            };
          }
          return elem;
        });
      }
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
  setRotation,
} = CanvasSlice.actions;

export default CanvasSlice.reducer;
