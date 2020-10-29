import {Banner, Block, Line, Title} from "dd-ui";
import React from "react";
import {useDrop} from "react-dnd";
import {JigsawComponents, JigsawElements} from "../../constant";
import {Sort} from "../sort";
import style from "./index.module.css";

interface Props {
  value: {type: JigsawElements}[];
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
    props.onElementMove({
      componentIndex: props.index,
      dragIndex: dragIndex,
      hoverIndex: hoverIndex,
    });
  };

  return (
    <div ref={drop} className={style["component"]}>
      <div className={style["box"]}>
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
                {props.componentType === JigsawComponents.Title && (
                  <Title
                    name={`组件：${props.componentType} / 元素：${item.type}`}
                    desc={`组件：${props.componentType} / 元素：${item.type}`}
                  />
                )}
                {props.componentType === JigsawComponents.Line && (
                  <Line
                    name={`组件：${props.componentType} / 元素：${item.type}`}
                    desc={`组件：${props.componentType} / 元素：${item.type}`}
                    img='https://interest-image-dev.billbear.cn/dev/GOODS/tn-iEEAi-2tPTbMjX9CmotygqJ55YAx_08-x4WrFFPs=@big'
                  />
                )}
                {props.componentType === JigsawComponents.Block && (
                  <Block
                    name={`组件：${props.componentType} / 元素：${item.type}`}
                    desc={`组件：${props.componentType} / 元素：${item.type}`}
                    img='https://interest-image-dev.billbear.cn/dev/GOODS/tn-iEEAi-2tPTbMjX9CmotygqJ55YAx_08-x4WrFFPs=@big'
                  />
                )}
                {props.componentType === JigsawComponents.Swiper && (
                  <Banner
                    name={`组件：${props.componentType} / 元素：${item.type}`}
                    desc={`组件：${props.componentType} / 元素：${item.type}`}
                    img='https://interest-image-dev.billbear.cn/dev/GOODS/tn-iEEAi-2tPTbMjX9CmotygqJ55YAx_08-x4WrFFPs=@big'
                  />
                )}
              </div>
            </Sort>
          ) : null
        )}
      </div>
    </div>
  );
};

export default ReciverElement;
