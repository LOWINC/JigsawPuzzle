import {JigsawElements, JigsawElementsForm} from "@lowinc/jigsawpuzzle-lib";
import React from "react";
import {JigsawElementsFormConfig} from "../../../setup";

interface Props {
  type: JigsawElements;
  data: any; // TODO:  通过 JigsawElements 限值 data
  onSubmit: (form: JigsawElementsForm) => any;
}

const JigsawElementForm: React.FC<Props> = ({data, type, onSubmit}) => {
  const element = JigsawElementsFormConfig[type];
  if (!element) {
    return null;
  }

  return <element.Form data={data} onSubmit={onSubmit} />;
};

export default JigsawElementForm;
