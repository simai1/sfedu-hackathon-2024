import React from "react";
import { Stage, Layer, Line } from "react-konva";
import { useDispatch, useSelector } from "react-redux";
import { setElem } from "../../store/CanvasSlice/canvas.Slice";
import Rectangle from "../../components/CanvasComponets/Rectangle/Rectangle";
import Setka from "../../components/CanvasComponets/Setka/Setka";

const Konva = () => {
  const canvasSlice = useSelector((state) => state.CanvasSlice);
  const dispatch = useDispatch();

  // const [rectangles, setRectangles] = React.useState(canvasSlice.elements);
  const [selectedId, selectShape] = React.useState(null);

  const checkDeselect = (e) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={checkDeselect}
      onTouchStart={checkDeselect}
    >
      <Layer>
        <Setka />
      </Layer>
      <Layer>
        {canvasSlice.elements.map((rect, i) => {
          return (
            <Rectangle
              text={rect.name}
              zIndex={rect.zIndex}
              key={i}
              shapeProps={rect}
              isSelected={rect.id === selectedId}
              onSelect={() => {
                selectShape(rect.id);
              }}
              onChange={(newAttrs) => {
                const rects = canvasSlice.elements.slice();
                rects[i] = newAttrs;
                console.log("rects", rects);
                // setRectangles(rects);
                dispatch(setElem({ mass: rects }));
              }}
            />
          );
        })}
      </Layer>
    </Stage>
  );
};

export default Konva;
