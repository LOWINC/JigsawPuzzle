import React from "react";
import {useDrop} from "react-dnd";
import {JigsawElements} from "../../constant";
import {Sort} from "../sort";
import style from "./index.module.css";

interface Props {
  value: {type: JigsawElements}[];
  index: number;
  onElementMove: (params: {
    componentIndex: number;
    dragIndex: number;
    hoverIndex: number;
  }) => any;
}

const ReciverElement: React.FC<Props> = (props) => {
  const [, drop] = useDrop({
    accept: Object.keys(JigsawElements),
    drop: () => {
      return {
        index: props.index,
        name: "ReciverElement",
      };
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const handleMove = (dragIndex: number, hoverIndex: number) => {
    console.log({
      componentIndex: props.index,
      dragIndex: dragIndex,
      hoverIndex: hoverIndex,
    });
    props.onElementMove({
      componentIndex: props.index,
      dragIndex: dragIndex,
      hoverIndex: hoverIndex,
    });
  };

  return (
    <div ref={drop} className={style["component"]}>
      <div className={style["box"]}>
        {props.value.map((item, index) => (
          <Sort
            key={`${item.type}-${index}`}
            index={index}
            type={item.type}
            move={handleMove}
          >
            <div className={style["item"]}>{item.type}</div>
          </Sort>
        ))}
      </div>
    </div>
  );
};

export default ReciverElement;
