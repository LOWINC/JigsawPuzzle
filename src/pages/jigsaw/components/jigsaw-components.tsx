import {JigsawComponents, JigsawComponentsName} from "@lowinc/jigsawpuzzle-lib";
import React from "react";
import Component from "../../../components/component";

interface Props {
  handleComponentDropEnd: (item: any, dropResult: any) => any;
}

const RenderJigsawComponents: React.FC<Props> = ({handleComponentDropEnd}) => {
  return (
    <div>
      <div className='title'>外壳</div>
      {Object.values(JigsawComponents).map((item) => (
        <div key={item}>
          <Component name={item} onEnd={handleComponentDropEnd}>
            {JigsawComponentsName[item]}
          </Component>
        </div>
      ))}
    </div>
  );
};

export default RenderJigsawComponents;
