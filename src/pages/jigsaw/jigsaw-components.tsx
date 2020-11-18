import {JigsawComponents, JigsawComponentsName} from "dd-lib";
import React from "react";
import Component from "../../components/component";

interface Props {
  handleComponentDropEnd: (item: any, dropResult: any) => any;
}

const RenderJigsawComponents: React.FC<Props> = ({handleComponentDropEnd}) => {
  const components = [
    {
      Element: (
        <div>
          <Component
            name={JigsawComponents.Swiper}
            onEnd={handleComponentDropEnd}
          >
            {JigsawComponentsName[JigsawComponents.Swiper]}
          </Component>
        </div>
      ),
    },
    {
      Element: (
        <Component name={JigsawComponents.Title} onEnd={handleComponentDropEnd}>
          {JigsawComponentsName[JigsawComponents.Title]}
        </Component>
      ),
    },
    {
      Element: (
        <Component name={JigsawComponents.Block} onEnd={handleComponentDropEnd}>
          {JigsawComponentsName[JigsawComponents.Block]}
        </Component>
      ),
    },
    {
      Element: (
        <Component name={JigsawComponents.Line} onEnd={handleComponentDropEnd}>
          {JigsawComponentsName[JigsawComponents.Line]}
        </Component>
      ),
    },
    {
      Element: (
        <Component name={JigsawComponents.Big} onEnd={handleComponentDropEnd}>
          {JigsawComponentsName[JigsawComponents.Big]}
        </Component>
      ),
    },
    {
      Element: (
        <Component name={JigsawComponents.Roll} onEnd={handleComponentDropEnd}>
          {JigsawComponentsName[JigsawComponents.Roll]}
        </Component>
      ),
    },
    {
      Element: (
        <Component name={JigsawComponents.Cube} onEnd={handleComponentDropEnd}>
          {JigsawComponentsName[JigsawComponents.Cube]}
        </Component>
      ),
    },
    {
      Element: (
        <Component
          name={JigsawComponents.CubeRow4}
          onEnd={handleComponentDropEnd}
        >
          {JigsawComponentsName[JigsawComponents.CubeRow4]}
        </Component>
      ),
    },
  ];

  return (
    <div>
      <div className='title'>外壳</div>
      {components.map((item, index) => (
        <div key={index}>{item.Element}</div>
      ))}
    </div>
  );
};

export default RenderJigsawComponents;
