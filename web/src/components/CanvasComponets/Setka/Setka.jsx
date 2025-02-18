import React from "react";
import { Line } from "react-konva";
function Setka() {
  return (
    <div>
      {Array.from({ length: window.innerWidth / 20 }).map((_, i) => (
        <Line
          key={`v-${i}`}
          points={[i * 20, 0, i * 20, window.innerHeight]}
          stroke="#E7E7E7"
          strokeWidth={1}
          lineCap="round"
        />
      ))}
      {Array.from({ length: window.innerHeight / 20 }).map((_, i) => (
        <Line
          key={`v-${i}`}
          points={[0, i * 20, window.innerWidth, i * 20]}
          stroke="#E7E7E7"
          strokeWidth={1}
          lineCap="round"
        />
      ))}
    </div>
  );
}

export default Setka;
