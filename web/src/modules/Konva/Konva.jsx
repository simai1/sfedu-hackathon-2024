import React, { useState } from "react";
import { Stage, Layer, Line, Circle } from "react-konva";
import { useDispatch, useSelector } from "react-redux";
import {
  setElem,
  setPointsElem,
  setPointsLines,
  setPositionElem,
  setSelectedElement,
} from "../../store/CanvasSlice/canvas.Slice";
import Rectangle from "../../components/CanvasComponets/Rectangle/Rectangle";
import Setka from "../../components/CanvasComponets/Setka/Setka";
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
  // const [points, setPoints] = useState([200, 200, 200, 400]);

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
    const points = canvasSlice.selectedElement
      ? canvasSlice.elements.find(
          (elem) => elem.id === canvasSlice.selectedElement
        )?.points
      : [];
    if (isDragging && selectedPointIndex !== null) {
      const { x, y } = e.target.getStage().getPointerPosition();
      const newPoints = [...points];
      newPoints[selectedPointIndex] = x; // Изменяем X
      newPoints[selectedPointIndex + 1] = y; // Изменяем Y
      // setPoints(newPoints);
      dispatch(setPointsElem(canvasSlice.selectedElement, newPoints));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setSelectedPointIndex(null);
  };

  const addPointsInCanvas = (e) => {
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    if (
      Math.abs(point.x - canvasSlice.pointsLines[0]) < 50 &&
      Math.abs(point.y - canvasSlice.pointsLines[1]) < 50
    ) {
      dispatch(
        setPointsLines({
          points: [
            ...canvasSlice.pointsLines,
            canvasSlice.pointsLines[0],
            canvasSlice.pointsLines[1],
          ],
        })
      );
    } else {
      dispatch(
        setPointsLines({
          points: [...canvasSlice.pointsLines, point.x, point.y],
        })
      );
    }
  };

  console.log("canvasSlice", canvasSlice);
  return (
    <>
      <Stage
        // onClick={
        //   canvasSlice.selectedElement
        //     ? () => dispatch(setSelectedElement({ id: null }))
        //     : null
        // }
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={canvasSlice.mode === 1 ? addPointsInCanvas : checkDeselect}
        onTouchStart={checkDeselect}
        onMouseMove={canvasSlice.mode === 1 ? null : handleMouseMove}
        onMouseUp={canvasSlice.mode === 1 ? null : handleMouseUp}
      >
        {/* //!сетка */}
        <Layer>
          <Setka />
        </Layer>

        {canvasSlice.pointsLines && (
          <Layer>
            <Line
              points={canvasSlice.pointsLines}
              stroke=" #989898" // Цвет линии
              strokeWidth={2} // Толщина линии
              // tension={0.5} // сглаживание линии
              lineCap="round" // скругление концов линии
              lineJoin="round" // скругление соединений
            />
          </Layer>
        )}

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
                      onMouseDown={(e) => {
                        handleMouseDown(e, rect.points);
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
                        onMouseDown={(e) => {
                          handleMouseDown(e, rect.points);
                          dispatch(setSelectedElement({ id: rect.id }));
                        }}
                        onDragMove={(e) => {
                          const { x, y } = e.target
                            .getStage()
                            .getPointerPosition();
                          const newPoints = [...rect.points];
                          newPoints[index * 2] = x; // Изменяем X
                          newPoints[index * 2 + 1] = y; // Изменяем Y
                          dispatch(
                            setPointsElem({
                              id: rect.id,
                              points: newPoints,
                              x,
                              y,
                            })
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
                {rect.figure === "4" && rect.points && (
                  <Line
                    points={rect.points}
                    draggable={rect.draggable}
                    stroke=" #989898" // Цвет линии
                    strokeWidth={2} // Толщина линии
                    lineCap="round" // скругление концов линии
                    lineJoin="round" // скругление соединений
                    onMouseDown={(e) => {
                      dispatch(setSelectedElement({ id: rect.id }));
                    }}
                    onDragMove={(e) => {
                      const { x, y } = e.target.getStage().getPointerPosition();
                      const dx = x - rect.points[0]; // изменение по x с начальной позиции
                      const dy = y - rect.points[1]; // изменение по y с начальной позиции
                      const newPoints = rect.points.map((point, index) => {
                        return index % 2 === 0 ? point + dx : point + dy;
                      });
                      dispatch(
                        setPointsElem({ id: rect.id, points: newPoints })
                      );
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
