import {JigsawElements, JigsawElementsForm} from "@lowinc/jigsawpuzzle-lib";
import {Loading} from "@lowinc/jigsawpuzzle-ui";
import React, {useEffect, useState} from "react";
import {JigsawElementsFormConfig} from "../../../setup";

interface Props {
  type: JigsawElements;
  data: any; // TODO:  通过 JigsawElements 限值 data
  elementIndex: number;
  componentIndex: number;
  onSubmit: (form: JigsawElementsForm) => any;
}

const JigsawElementForm: React.FC<Props> = ({
  data,
  type,
  onSubmit,
  componentIndex,
  elementIndex,
}) => {
  const [isRefresh, setisRefresh] = useState(true);

  const element = JigsawElementsFormConfig[type];

  useEffect(() => {
    setisRefresh(false);
    setTimeout(() => {
      setisRefresh(true);
    }, 30);
  }, [componentIndex, elementIndex]);

  if (!element || !isRefresh) {
    return null;
  }

  return (
    <div>
      <element.Form data={data} onSubmit={onSubmit} />
      <element.FormStyle elementStyle={{}} onSubmit={console.log} />
    </div>
  );
};

export default JigsawElementForm;
