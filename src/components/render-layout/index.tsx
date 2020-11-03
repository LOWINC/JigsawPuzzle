import {LayoutBlock, LayoutSwiper} from "dd-ui";
import React from "react";
import {JigsawComponents} from "../../constant";

interface Props {
  componentType: JigsawComponents;
}

const RenderLayout: React.FC<Props> = (props) => {
  if (props.componentType === JigsawComponents.Swiper) {
    return <LayoutSwiper onChange={console.log}>{props.children}</LayoutSwiper>;
  }

  if (props.componentType === JigsawComponents.Block) {
    return <LayoutBlock>{props.children}</LayoutBlock>;
  }

  return <div>{props.children}</div>;
};

export default RenderLayout;
