import {
  JigsawComponentStyle,
  JigsawElements,
  JigsawElementsForm,
} from "@lowinc/jigsawpuzzle-lib";
import React, {useEffect, useState} from "react";
import {JigsawElementsFormConfig} from "../../../setup";

interface Props {
  type: JigsawElements;
  valueForm: any; // TODO:  通过 JigsawElements 限值 valueForm
  elementIndex: number;
  componentIndex: number;
  componentStyle: JigsawComponentStyle;
  onSubmit: (form: JigsawElementsForm) => any;
  onSubmitComponentStyle: (form: JigsawComponentStyle) => any;
}

const JigsawElementForm: React.FC<Props> = ({
  type,
  valueForm,
  componentIndex,
  elementIndex,
  onSubmit,
  componentStyle,
  onSubmitComponentStyle,
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
      <element.Form data={valueForm} onSubmit={onSubmit} />
      <element.FormStyle
        componentStyle={componentStyle}
        onSubmit={onSubmitComponentStyle}
      />
    </div>
  );
};

export default JigsawElementForm;
