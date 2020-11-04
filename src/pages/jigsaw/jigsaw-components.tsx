import {JigsawComponents} from "dd-lib";
import React from "react";
import Component from "../../components/component";

interface Props {
  handleComponentDropEnd: (item: any, dropResult: any) => any;
}

const RenderJigsawComponents: React.FC<Props> = ({handleComponentDropEnd}) => {
  const components = [
    {
      Element: (
        <Component
          name={JigsawComponents.Swiper}
          onEnd={handleComponentDropEnd}
        >
          {JigsawComponents.Swiper}
        </Component>
      ),
    },
    {
      Element: (
        <Component name={JigsawComponents.Title} onEnd={handleComponentDropEnd}>
          {JigsawComponents.Title}
        </Component>
      ),
    },
    {
      Element: (
        <Component name={JigsawComponents.Block} onEnd={handleComponentDropEnd}>
          {JigsawComponents.Block}
        </Component>
      ),
    },
    {
      Element: (
        <Component name={JigsawComponents.Line} onEnd={handleComponentDropEnd}>
          {JigsawComponents.Line}
        </Component>
      ),
    },
  ];

  return (
    <div>
      {components.map((item, index) => (
        <div key={index}>{item.Element}</div>
      ))}
    </div>
  );
};

export default RenderJigsawComponents;
