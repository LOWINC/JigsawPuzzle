import React from "react";
import {useDrop} from "react-dnd";
import {JigsawComponents, JigsawElements} from "../../constant";
import ReciverElement from "../reciver-element";
import style from "./index.module.css";

interface Props {
  value: {
    type: JigsawComponents;
    value: {
      type: JigsawElements;
      [key: string]: any;
    }[];
  }[];
  onElementMove: (params: {
    componentIndex: number;
    dragIndex: number;
    hoverIndex: number;
  }) => any;
}

const ReciverMain: React.FC<Props> = (props) => {
  const [, drop] = useDrop({
    accept: Object.keys(JigsawComponents),
    drop: () => {
      return {name: "ReciverMain"};
    },
    collect: (monitor) => {
      return {
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      };
    },
  });

  return (
    <div ref={drop} className={style["component"]}>
      <div className={style["box"]}>
        {props.value.map((item, index) => (
          <div className={style["item"]} key={index}>
            <ReciverElement
              index={index}
              value={item.value || []}
              onElementMove={props.onElementMove}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReciverMain;
