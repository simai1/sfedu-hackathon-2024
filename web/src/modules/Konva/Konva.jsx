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
import styles from "./Konva.module.scss";
const Konva = () => {
  const canvasSlice = useSelector((state) => state.CanvasSlice);
  const dispatch = useDispatch();

  const [selectedId, selectShape] = React.useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedPointIndex, setSelectedPointIndex] = useState(null);
  const [draggingStage, setDraggingStage] = useState(false);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });
  const [stagePosition, setStagePosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1); // Масштаб сцены

  const checkDeselect = (e) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

  const handleMouseDown = (e, points) => {
    const { x, y } = e.target.getStage().getPointerPosition();
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
      newPoints[selectedPointIndex] = x;
      newPoints[selectedPointIndex + 1] = y;
      dispatch(setPointsElem(canvasSlice.selectedElement, newPoints));
    }

    if (draggingStage) {
      const { x, y } = e.target.getStage().getPointerPosition();
      const dx = x - lastPosition.x;
      const dy = y - lastPosition.y;

      setStagePosition({
        x: stagePosition.x + dx,
        y: stagePosition.y + dy,
      });
      setLastPosition({ x, y });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setSelectedPointIndex(null);
    setDraggingStage(false);
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

  const handleStageMouseDown = (e) => {
    setLastPosition(e.target.getStage().getPointerPosition());
    setDraggingStage(true);
  };

  const handleStageMouseUp = () => {
    setDraggingStage(false);
  };

  // Увеличение/уменьшение масштаба
  const zoomIn = () => {
    setScale(scale + 0.1); // Увеличиваем масштаб на 10%
  };

  const zoomOut = () => {
    if (scale > 0.2) {
      setScale(scale - 0.1); // Уменьшаем масштаб на 10%
    }
  };

  console.log("canvasSlice", canvasSlice);

  return (
    <>
      <div className={styles.zoomButtons}>
        <button onClick={zoomIn}><img src="/img/plusCard.svg"/></button>
        <p>{(scale * 100).toFixed(0)}%</p>
        <button onClick={zoomOut}><img src="/img/minus.svg"/></button>
      </div>

      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={(e) => {
          if (canvasSlice.mode === 1) {
            addPointsInCanvas(e);
          } else {
            checkDeselect(e);
          }
          handleStageMouseDown(e);
        }}
        onTouchStart={checkDeselect}
        onMouseMove={canvasSlice.mode === 1 ? null : handleMouseMove}
        onMouseUp={() => {
          if (canvasSlice.mode !== 1) {
            handleMouseUp();
          }
          handleStageMouseUp();
        }}
        x={stagePosition.x}
        y={stagePosition.y}
        scaleX={scale} // Устанавливаем масштаб по оси X
        scaleY={scale} // Устанавливаем масштаб по оси Y
      >
        <Layer>
          <Setka />
        </Layer>

        {canvasSlice.pointsLines && (
          <Layer>
            <Line
              points={canvasSlice.pointsLines}
              stroke=" #989898"
              strokeWidth={2}
              lineCap="round"
              lineJoin="round"
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
                      dispatch(setElem({ mass: rects }));
                    }}
                  />
                )}
                {rect.figure === "2" && (
                  <>
                    <Line
                      points={rect.points}
                      stroke=" #989898"
                      strokeWidth={2}
                      lineCap="round"
                      lineJoin="round"
                      onMouseDown={(e) => {
                        handleMouseDown(e, rect.points);
                        dispatch(setSelectedElement({ id: rect.id }));
                      }}
                    />
                    {[
                      { x: rect.points[0], y: rect.points[1] },
                      { x: rect.points[2], y: rect.points[3] },
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
                          newPoints[index * 2] = x;
                          newPoints[index * 2 + 1] = y;
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
                    stroke=" #989898"
                    strokeWidth={2}
                    lineCap="round"
                    lineJoin="round"
                    onMouseDown={(e) => {
                      dispatch(setSelectedElement({ id: rect.id }));
                    }}
                    onDragMove={(e) => {
                      const { x, y } = e.target.getStage().getPointerPosition();
                      const dx = x - rect.points[0];
                      const dy = y - rect.points[1];
                      const newPoints = rect.points.map((point, index) => {
                        return index % 2 === 0 ? point + dx : point + dy;
                      });
                      dispatch(setPointsElem({ id: rect.id, points: newPoints }));
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
