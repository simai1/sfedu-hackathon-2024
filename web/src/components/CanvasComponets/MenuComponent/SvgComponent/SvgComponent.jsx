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
  const [rotation, setRotationState] = useState(rect.rotation); // Track rotation state

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
      dispatch(setRotation({ id: rect.id, rotation })); // Dispatch initial rotation
    }
  }, [canvasSlice.selectedElement, rotation]); // Add rotation to dependencies

  useEffect(() => {
    if (canvasSlice.selectedElement === rect?.id && transformerRef?.current) {
      const currentRotation = transformerRef.current.attrs.rotation;
      if (currentRotation !== rotation) { // Check if rotation has changed
        setRotationState(currentRotation); // Update local rotation state
        dispatch(setRotation({ id: rect?.id, rotation: currentRotation })); // Dispatch rotation
      }
    }
  }, [transformerRef.current?.attrs?.rotation]); // Listen for rotation changes

  const handleDragEnd = (e) => {
    const newX = e.target.x();
    const newY = e.target.y();
    onChange({ ...rect, x: newX, y: newY, rotation });
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
    const newRotation = rotation + angle; // Calculate new rotation
    setRotationState(newRotation); // Update local rotation state
    dispatch(setRotation({ id: rect.id, rotation: newRotation })); // Dispatch new rotation
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
        rotation={rotation} // Use local rotation state
        onDragEnd={handleDragEnd}
        // onMouseMove={canvasSlice.selectedElement ? handleRotate : undefined} // If element is selected, rotate
      />
      {canvasSlice.selectedElement === rect.id && (
        <Transformer
          ref={transformerRef}
          rotateEnabled={true}
        />
      )}
    </React.Fragment>
  );
};

export default MyPolygonWithImage;