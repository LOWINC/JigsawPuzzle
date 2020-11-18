import {JigsawElements, JigsawElementsName} from "dd-lib";
import React from "react";
import Element from "../../../components/element";

interface Props {
  handleElementDropEnd: (item: any, dropResult: any) => any;
}

const RenderJigsawElement: React.FC<Props> = ({handleElementDropEnd}) => {
  return (
    <div>
      <div className='title'>元素</div>
      {Object.values(JigsawElements).map((item) => (
        <Element key={item} name={item} onEnd={handleElementDropEnd}>
          {JigsawElementsName[item]}
        </Element>
      ))}
    </div>
  );
};

export default RenderJigsawElement;
