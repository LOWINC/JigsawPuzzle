import React from "react";
import {useDrop} from "react-dnd";
import {JigsawComponents} from "../../constant";
import style from "./index.module.css";

interface Props {
  value: any[];
}

const ReciverComponent: React.FC<Props> = (props) => {
  const [{canDrop, isOver}, drop] = useDrop({
    accept: Object.keys(JigsawComponents),
    drop: () => ({name: "ReciverComponent"}),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  console.log("canDrop:", canDrop, "isOver:", isOver);

  return (
    <div ref={drop} className={style["component"]}>
      <div className={style["box"]}>
        {props.value.map((item, index) => (
          <div key={`${item.name}-${index}`}>{item.name}</div>
        ))}
      </div>
    </div>
  );
};

export default ReciverComponent;
