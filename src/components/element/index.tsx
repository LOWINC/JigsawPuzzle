import React from "react";
import {DragSourceMonitor, useDrag} from "react-dnd";
import style from "./index.module.css";

interface Props {
  name: string;
  onEnd: (item: any, dropResult: any) => any;
}

const Element: React.FC<Props> = (props) => {
  const [, drag] = useDrag({
    item: {name: props.name, type: props.name},
    end: (item: {name: string} | undefined, monitor: DragSourceMonitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        props.onEnd(item, dropResult);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} className={style["component"]}>
      <button className={style["btn"]}>{props.children}</button>
    </div>
  );
};

export default Element;
