import React, {useRef} from "react";
import {useDrag, useDrop} from "react-dnd";
import {JigsawComponents, JigsawElements} from "../../constant";
import style from "./index.module.css";

export const Sort: React.FC<{
  index: number;
  move: (dragIndex: number, hoverIndex: number) => any;
  type: JigsawElements | JigsawComponents;
  acceptType: any; // JigsawElements | JigsawComponents
}> = (props) => {
  const {index, move} = props;

  const ref = useRef<any>(null);
  const [, drop] = useDrop({
    accept: Object.keys(props.acceptType),
    hover(item: any, monitor: any) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      move(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [, drag] = useDrag({
    item: {type: props.type, index},
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));
  return (
    <div ref={ref} className={style["position"]}>
      {props.children}
    </div>
  );
};
