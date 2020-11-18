import {JigsawElements, JigsawElementsName} from "dd-lib";
import React from "react";
import Element from "../../components/element";

interface Props {
  handleElementDropEnd: (item: any, dropResult: any) => any;
}

const RenderJigsawElement: React.FC<Props> = ({handleElementDropEnd}) => {
  const elements = [
    {
      Element: (
        <Element name={JigsawElements.Banner} onEnd={handleElementDropEnd}>
          {JigsawElementsName[JigsawElements.Banner]}
        </Element>
      ),
    },
    {
      Element: (
        <Element name={JigsawElements.Card} onEnd={handleElementDropEnd}>
          {JigsawElementsName[JigsawElements.Card]}
        </Element>
      ),
    },
    {
      Element: (
        <Element name={JigsawElements.Goods} onEnd={handleElementDropEnd}>
          {JigsawElementsName[JigsawElements.Goods]}
        </Element>
      ),
    },
    {
      Element: (
        <Element name={JigsawElements.Text} onEnd={handleElementDropEnd}>
          {JigsawElementsName[JigsawElements.Text]}
        </Element>
      ),
    },
  ];

  return (
    <div>
      <div className='title'>元素</div>
      {elements.map((item, index) => (
        <div key={index}>{item.Element}</div>
      ))}
    </div>
  );
};

export default RenderJigsawElement;
