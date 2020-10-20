import React from "react";
import ComponentBlock from "../../components/component-block";
import ComponentLine from "../../components/component-line";
import ComponentSwiper from "../../components/component-swiper";
import ElementBanner from "../../components/element-banner";
import ElementCard from "../../components/element-card";
import ElementGoods from "../../components/element-goods";
import PreviewJson from "../../components/preview-json";
import {JigsawComponents, JigsawElements} from "../../constant";

type TElement = {
  type: JigsawElements;
  title?: string;
  desc?: string;
  link?: string;
  img?: string;
};

type TComponent = {
  type: JigsawComponents;
  title?: string;
  desc?: string;
  link?: string;
  img?: string;
};

const Jigsaw = () => {
  const components = [
    {
      type: JigsawComponents.Block,
      render: () => <ComponentBlock />,
    },
    {
      type: JigsawComponents.Line,
      render: () => <ComponentLine />,
    },
    {
      type: JigsawComponents.Swiper,
      render: () => <ComponentSwiper />,
    },
  ];

  const elements = [
    {
      type: JigsawElements.Banner,
      render: () => <ElementBanner />,
    },
    {
      type: JigsawElements.Card,
      render: () => <ElementCard />,
    },
    {
      type: JigsawElements.Goods,
      render: () => <ElementGoods />,
    },
  ];

  return (
    <div>
      <div className='operater'>
        <div className='components'>
          {components.map((item) => (
            <div key={item.type}>{item.render()}</div>
          ))}
        </div>
        <div className='elements'>
          {elements.map((item) => (
            <div key={item.type}>{item.render()}</div>
          ))}
        </div>
      </div>

      <div className='preview'>
        <div className='json'>
          <PreviewJson />
        </div>
      </div>
    </div>
  );
};

export default Jigsaw;
