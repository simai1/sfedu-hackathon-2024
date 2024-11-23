import React, { useState } from "react";
import { Stage, Layer, Line, Circle } from "react-konva";
import { useDispatch, useSelector } from "react-redux";
import {
  setElem,
  setPointsElem,
  setSelectedElement,
} from "../../store/CanvasSlice/canvas.Slice";
import Rectangle from "../../components/CanvasComponets/Rectangle/Rectangle";
import Setka from "../../components/CanvasComponets/Setka/Setka";
import DrawingApp from "../../components/CanvasComponets/Drawing/Drawing";
import MyPolygonWithImage from "../../components/CanvasComponets/MenuComponent/SvgComponent/SvgComponent";

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

  // line
  const [points, setPoints] = useState([200, 200, 200, 400]);

  const [isDragging, setIsDragging] = useState(false);
  const [selectedPointIndex, setSelectedPointIndex] = useState(null);
  const handleMouseDown = (e, points) => {
    console.log("points", points);
    const { x, y } = e.target.getStage().getPointerPosition();
    // Проверяем, на какой точке мы кликнули
    const index = points.findIndex(
      (point, i) =>
        i % 2 === 0 &&
        Math.abs(point - x) < 10 &&
        Math.abs(points[i + 1] - y) < 10
    );

    if (index >= 0) {
      setSelectedPointIndex(index);
      setIsDragging(true);
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && selectedPointIndex !== null) {
      const { x, y } = e.target.getStage().getPointerPosition();
      const newPoints = [...points];
      newPoints[selectedPointIndex] = x; // Изменяем X
      newPoints[selectedPointIndex + 1] = y; // Изменяем Y
      setPoints(newPoints);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setSelectedPointIndex(null);
  };

  const handleLineClick = (e) => {
    const { x, y } = e.target.getStage().getPointerPosition();
    setPoints([...points, x, y]); // Добавляем новую точку
  };

  return (
    <>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={checkDeselect}
        onTouchStart={checkDeselect}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {/* //!сетка */}
        <Layer>
          <Setka />
        </Layer>
        <Layer>
          {canvasSlice.elements.map((rect, i) => {
            return (
              <>
                {rect.figure === "1" && (
                  <Rectangle
                    text={rect.name}
                    zIndex={rect.zIndex}
                    draggable={rect.draggable}
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
                )}
                {rect.figure === "2" && (
                  <>
                    <Line
                      points={rect.points}
                      stroke=" #989898" // Цвет линии
                      strokeWidth={2} // Толщина линии
                      lineCap="round" // Закругление концов линии
                      lineJoin="round" // Закругление углов линии
                      onMouseDown={(e) => handleMouseDown(e, rect.points)}
                      onSelect={() => {
                        dispatch(setSelectedElement({ id: rect.id }));
                      }}
                      // onClick={handleLineClick}
                    />
                    {[
                      { x: rect.points[0], y: rect.points[1] }, // Первая точка
                      { x: rect.points[2], y: rect.points[3] }, // Вторая точка
                    ].map((point, index) => (
                      <Circle
                        key={index}
                        x={point.x}
                        y={point.y}
                        radius={4}
                        fill=" #989898"
                        draggable
                        onMouseDown={(e) => handleMouseDown(e, rect.points)}
                        onDragMove={(e) => {
                          const { x, y } = e.target
                            .getStage()
                            .getPointerPosition();
                          const newPoints = [...rect.points];
                          newPoints[index * 2] = x; // Изменяем X
                          newPoints[index * 2 + 1] = y; // Изменяем Y
                          dispatch(
                            setPointsElem({ id: rect.id, points: newPoints })
                          );
                        }}
                      />
                    ))}
                  </>
                )}
                {rect.figure === "3" && (
                  <MyPolygonWithImage
                    rect={rect}
                    onChange={(newAttrs) => {
                      const rects = canvasSlice.elements.slice();
                      rects[i] = newAttrs;
                      dispatch(setElem({ mass: rects }));
                    }}
                  />
                )}
              </>
            );
          })}
        </Layer>
      </Stage>
    </>
  );
};

export default Konva;
