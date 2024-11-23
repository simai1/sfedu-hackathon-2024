import React, { useEffect, useRef, useState } from "react";
import { Layer, Image as KonvaImage, Transformer } from "react-konva";
import { useDispatch, useSelector } from "react-redux";
import {
  setRotation,
  setSelectedElement,
} from "../../../../store/CanvasSlice/canvas.Slice";

const MyPolygonWithImage = ({ rect, onChange }) => {
  const imageRef = useRef();
  const transformerRef = useRef();
  const dispatch = useDispatch();
  const canvasSlice = useSelector((state) => state.CanvasSlice);

  useEffect(() => {
    const img = new window.Image();
    img.src = rect.svgPath;
    img.onload = () => {
      imageRef.current.image(img);
      imageRef.current.getLayer().batchDraw();
    };
    img.onerror = () => {
      console.error("Ошибка загрузки изображения:", img.src);
    };
  }, [rect.svgPath]);

  useEffect(() => {
    // Показать трансформатор, если элемент выбран
    if (canvasSlice.selectedElement === rect.id) {
      transformerRef.current.nodes([imageRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [canvasSlice.selectedElement]);

  const handleDragEnd = (e) => {
    const newX = e.target.x();
    const newY = e.target.y();
    onChange({ ...rect, x: newX, y: newY, rotation: canvasSlice.rotation });
  };

  const handleClick = () => {
    dispatch(setSelectedElement({ id: rect.id }));
    onContextCkick(rect);
  };

  const onContextCkick = (elem) => {
    dispatch(setSelectedElement({ id: elem.id }));
  };

  const handleRotate = (e) => {
    const angle = e.evt.movementX; // Измените это для более точного вращения
    dispatch(
      setRotation({ id: rect.id, rotation: canvasSlice.rotation + angle })
    );
  };

  return (
    <React.Fragment>
      <KonvaImage
        onMouseDown={handleClick}
        onClick={handleClick}
        ref={imageRef}
        x={rect.x}
        y={rect.y}
        width={rect.width}
        height={rect.height}
        offsetX={rect.width / 2}
        offsetY={rect.height / 2}
        draggable={rect.draggable}
        rotation={rect.rotation} // Уставливаем угол поворота
        onDragEnd={handleDragEnd}
        // onMouseMove={selected ? handleRotate : undefined} // Если элемент выбран, вращаем
      />
      {canvasSlice.selectedElement === rect.id && (
        <Transformer
          ref={transformerRef}
          rotateEnabled={true}
          //   boundBoxFunc={(oldBox, newBox) => {
          //     // Ограничьте размер (по желанию)
          //     return newBox;
          //   }}
        />
      )}
    </React.Fragment>
  );
};

export default MyPolygonWithImage;
