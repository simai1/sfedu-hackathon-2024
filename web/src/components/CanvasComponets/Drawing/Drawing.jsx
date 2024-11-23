import React, { useState } from "react";
import { Stage, Layer, Line } from "react-konva";

const DrawingApp = () => {
  const [lines, setLines] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);

  const handleMouseDown = (e) => {
    setIsDrawing(true);
    const point = e.evt;
    // Запоминаем начальную точку
    setStartPoint({ x: point.clientX, y: point.clientY });
    setEndPoint({ x: point.clientX, y: point.clientY }); // Начинаем с точки, где нажали
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;

    const point = e.evt;
    setEndPoint({ x: point.clientX, y: point.clientY });
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    if (startPoint && endPoint) {
      setLines([...lines, { start: startPoint, end: endPoint }]);
    }
    setStartPoint(null);
    setEndPoint(null);
  };

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={handleMouseDown}
      onMousemove={handleMouseMove}
      onMouseup={handleMouseUp}
    >
      <Layer>
        {lines.map((line, index) => (
          <Line
            key={index}
            points={[line.start.x, line.start.y, line.end.x, line.end.y]}
            stroke="black"
            strokeWidth={2}
            tension={0.5}
            lineCap="round"
            lineJoin="round"
          />
        ))}
        {isDrawing && endPoint && (
          <Line
            points={[startPoint.x, startPoint.y, endPoint.x, endPoint.y]}
            stroke="black"
            strokeWidth={2}
            tension={0.5}
            lineCap="round"
            lineJoin="round"
          />
        )}
      </Layer>
    </Stage>
  );
};

export default DrawingApp;
