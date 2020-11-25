import {JigsawElementBase} from "@lowinc/jigsawpuzzle-lib";
import React from "react";
import {useDrop} from "react-dnd";
import {JigsawComponents, JigsawElements} from "../../setup";
import ReciverElement from "../reciver-element";
import {Sort} from "../sort";
import style from "./index.module.css";

interface Props {
  value: JigsawElementBase[];
  onElementMove: (params: {
    componentIndex: number;
    dragIndex: number;
    hoverIndex: number;
  }) => any;
  onElementSelect: (params: {
    elementIndex: number;
    componentIndex: number;
    elementType: JigsawElements;
  }) => any;
  onComponentMove: (params: {
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
        {props.value.map((item, index) =>
          !!item ? (
            <Sort
              key={item.__key}
              index={index}
              type={item.type}
              acceptType={JigsawComponents}
              move={(dragIndex, hoverIndex) =>
                props.onComponentMove({
                  componentIndex: index,
                  dragIndex: dragIndex,
                  hoverIndex: hoverIndex,
                })
              }
            >
              <div className={style["elementWrapper"]}>
                {item.type}
                <div className={style["item"]}>
                  <ReciverElement
                    style={item.style}
                    index={index}
                    componentType={item.type}
                    value={item.value || []}
                    onElementMove={props.onElementMove}
                    onElementSelect={({elementIndex, elementType}) =>
                      props.onElementSelect({
                        elementIndex: elementIndex,
                        elementType: elementType,
                        componentIndex: index,
                      })
                    }
                  />
                </div>
              </div>
            </Sort>
          ) : null
        )}
      </div>
    </div>
  );
};

export default ReciverMain;
