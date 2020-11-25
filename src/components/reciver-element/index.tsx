import {
  JigsawComponentStyle,
  JigsawElementBase,
} from "@lowinc/jigsawpuzzle-lib";
import {
  AppointLayout,
  Banner,
  Block,
  Line,
  Title,
  Big,
  Cube,
  Roll,
} from "@lowinc/jigsawpuzzle-ui";
import get from "lodash/get";
import React from "react";
import {useDrop} from "react-dnd";
import {
  JigsawComponents,
  JigsawComponentsRecive,
  JigsawElements,
} from "../../setup";
import {Sort} from "../sort";
import style from "./index.module.css";

interface Props {
  value: JigsawElementBase["value"];
  style: JigsawComponentStyle;
  index: number;
  componentType: JigsawComponents;
  onElementMove: (params: {
    componentIndex: number;
    dragIndex: number;
    hoverIndex: number;
  }) => any;
  onElementSelect: (params: {
    elementIndex: number;
    elementType: JigsawElements;
  }) => any;
}

const ReciverElement: React.FC<Props> = (props) => {
  const [, drop] = useDrop({
    accept: JigsawComponentsRecive[props.componentType].elements,
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
    props.onElementMove({
      componentIndex: props.index,
      dragIndex: dragIndex,
      hoverIndex: hoverIndex,
    });
  };

  return (
    <div ref={drop} className={style["component"]}>
      <div className={style["box"]}>
        <AppointLayout componentType={props.componentType} style={props.style}>
          {props.value.map((item, index) =>
            !!item ? (
              <Sort
                key={`${item.type}-${index}`}
                index={index}
                type={item.type}
                move={handleMove}
                acceptType={JigsawElements}
              >
                <div
                  className={style["item"]}
                  onClick={() =>
                    props.onElementSelect({
                      elementIndex: index,
                      elementType: item.type,
                    })
                  }
                >
                  {props.componentType === JigsawComponents.Roll && (
                    <Roll
                      style={props.style}
                      name={get(props.value[index], "value.title")}
                      desc={get(props.value[index], "value.desc")}
                      img={get(props.value[index], "value.img")}
                    />
                  )}

                  {props.componentType === JigsawComponents.Big && (
                    <Big
                      style={props.style}
                      name={get(props.value[index], "value.title")}
                      desc={get(props.value[index], "value.desc")}
                      img={get(props.value[index], "value.img")}
                    />
                  )}

                  {props.componentType === JigsawComponents.Cube && (
                    <Cube img={get(props.value[index], "value.img")} />
                  )}
                  {props.componentType === JigsawComponents.CubeRow4 && (
                    <Cube img={get(props.value[index], "value.img")} />
                  )}

                  {props.componentType === JigsawComponents.Title && (
                    <Title
                      style={props.style}
                      name={get(
                        props.value[index],
                        "value.title",
                        "请输入标题"
                      )}
                      desc={get(props.value[index], "value.desc")}
                    />
                  )}
                  {props.componentType === JigsawComponents.Line && (
                    <Line
                      style={props.style}
                      name={get(props.value[index], "value.title")}
                      desc={get(props.value[index], "value.desc")}
                      img={get(props.value[index], "value.img")}
                    />
                  )}
                  {props.componentType === JigsawComponents.Block && (
                    <Block
                      style={props.style}
                      name={get(props.value[index], "value.title")}
                      desc={get(props.value[index], "value.desc")}
                      img={get(props.value[index], "value.img")}
                    />
                  )}
                  {props.componentType === JigsawComponents.Swiper && (
                    <Banner
                      style={props.style}
                      img={get(props.value[index], "value.img")}
                    />
                  )}
                </div>
              </Sort>
            ) : null
          )}
        </AppointLayout>
      </div>
    </div>
  );
};

export default ReciverElement;
