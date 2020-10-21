import React from "react";
import {useDrop} from "react-dnd";
import {JigsawElements} from "../../constant";
import style from "./index.module.css";

interface Props {
  value: {type: JigsawElements}[];
  index: number;
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

  return (
    <div ref={drop} className={style["component"]}>
      <div className={style["box"]}>
        {props.value.map((item, index) => (
          <div className={style["item"]} key={`${item.type}-${index}`}>
            {item.type}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReciverElement;
