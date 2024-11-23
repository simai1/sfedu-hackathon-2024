import React, { useState } from "react";
import { Stage, Layer, Line } from "react-konva";

const DrawingApp = () => {
  const [points, setPoints] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);

  const handleMouseDown = (e) => {
    setIsDrawing(true);
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    setPoints([...points, point.x, point.y]); // добавляем координаты точки
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    setPoints([...points, point.x, point.y]); // обновляем координаты для рисования
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  return (
    <div>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <Layer>
          <Line
            points={points}
            stroke="black"
            strokeWidth={5}
            tension={0.5} // сглаживание линии
            lineCap="round" // скругление концов линии
            lineJoin="round" // скругление соединений
          />
        </Layer>
      </Stage>
    </div>
  );
};

export default DrawingApp;
