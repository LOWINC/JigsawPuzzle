import React from "react";
import {useDrop} from "react-dnd";
import {JigsawComponents} from "../../constant";
import ReciverElement from "../reciver-element";
import style from "./index.module.css";

interface Props {
  value: any[];
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

  const handleElementDrop = (params: any) => {
    console.log("handleElementDrop:", params);
  };

  return (
    <div ref={drop} className={style["component"]}>
      <div className={style["box"]}>
        {props.value.map((item, index) => (
          <ReciverElement
            key={index}
            index={index}
            value={item.value || []}
            onDrop={handleElementDrop}
          />
        ))}
      </div>
    </div>
  );
};

export default ReciverMain;
