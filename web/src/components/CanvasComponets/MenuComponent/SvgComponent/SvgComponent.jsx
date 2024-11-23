import React, { useEffect, useRef } from "react";
import { Layer, Image as KonvaImage } from "react-konva";
import { useDispatch } from "react-redux";
import { setSelectedElement } from "../../../../store/CanvasSlice/canvas.Slice";

const MyPolygonWithImage = ({ rect, onChange }) => {
  const imageRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    const img = new window.Image();
    img.src = rect.svgPath; // Используем переданный путь
    img.onload = () => {
      imageRef.current.image(img);
      imageRef.current.getLayer().batchDraw();
    };
    img.onerror = () => {
      console.error("Ошибка загрузки изображения:", img.src);
    };
  }, [rect.svgPath]); // Добавляем зависимость от svgPath

  const handleDragEnd = (e) => {
    const newX = e.target.x();
    const newY = e.target.y();

    // Вызываем onChange для обновления позиции в родительском компоненте
    onChange({ ...rect, x: newX, y: newY });
  };

  const onContextCkick = (elem) => {
    // dispatch(deleteElem({ id: elem.id }));
    dispatch(setSelectedElement({ id: elem.id }));
  };

  return (
    <KonvaImage
      onMouseDown={() => onContextCkick(rect)}
      onClick={(e) => {
        onContextCkick(rect); // передаем событие в onContextClick
      }}
      ref={imageRef}
      x={rect.x} // Используем координаты из rect
      y={rect.y} // Используем координаты из rect
      width={100}
      height={100}
      offsetX={50} // Центрирование изображения
      offsetY={50} // Центрирование изображения
      draggable={rect.draggable}
      onDragEnd={handleDragEnd} // Обработчик окончания перетаскивания
    />
  );
};

export default MyPolygonWithImage;
