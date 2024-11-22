import React from "react";
import { Rect, Transformer, Text } from "react-konva";
import { useDispatch } from "react-redux";
import { setSelectedElement } from "../../../store/CanvasSlice/canvas.Slice";

const Rectangle = ({
  shapeProps,
  isSelected,
  onSelect,
  onChange,
  text,
  zIndex,
}) => {
  const shapeRef = React.useRef();
  const trRef = React.useRef();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  const onContextCkick = (elem) => {
    // dispatch(deleteElem({ id: elem.id }));
    dispatch(setSelectedElement({ id: elem.id }));
  };

  return (
    <React.Fragment>
      <Rect
        onClick={(e) => {
          onSelect(); // вызываем onSelect
          onContextCkick(shapeProps); // передаем событие в onContextClick
        }}
        onMouseDown={() => onContextCkick(shapeProps)}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        zIndex={zIndex}
        onTransformEnd={(e) => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          });
        }}
      />

      {isSelected && (
        <Transformer
          ref={trRef}
          flipEnabled={false}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
      {text && (
        <Text
          text={text} // текст, который вы хотите отобразить
          x={shapeProps.x} // фиксируем координаты текста
          y={shapeProps.y} // чтобы текст находился внутри прямоугольника
          fontSize={16} // размер шрифта
          fill="black" // цвет текста
          width={shapeProps.width} // ширина текста
          align="center" // выравнивание текста по центру
        />
      )}
    </React.Fragment>
  );
};

export default Rectangle;
