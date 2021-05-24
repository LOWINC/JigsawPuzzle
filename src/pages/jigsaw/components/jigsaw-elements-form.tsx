import {
  JigsawComponentStyle,
  JigsawElements,
  JigsawElementsForm,
  JigsawElementsFormType,
} from "@lowinc/jigsawpuzzle-lib";
import React, { ReactElement, useEffect, useState } from "react";
import { JigsawElementsFormConfig } from "../../../setup";

interface BaseProps {
  componentStyle: JigsawComponentStyle;
  onSubmitComponentStyle: (form: JigsawComponentStyle) => any;
}

interface PropsBanner extends BaseProps {
  type: JigsawElements.Banner;
  valueForm: JigsawElementsFormType["BannerForm"];
  onSubmit: (form: JigsawElementsFormType["BannerForm"]) => any;
}
interface PropsCard extends BaseProps {
  type: JigsawElements.Card;
  valueForm: JigsawElementsFormType["CardForm"];
  onSubmit: (form: JigsawElementsFormType["CardForm"]) => any;
}
interface PropsGoods extends BaseProps {
  type: JigsawElements.Goods;
  valueForm: JigsawElementsFormType["GoodsForm"];
  onSubmit: (form: JigsawElementsFormType["GoodsForm"]) => any;
}
interface PropsText extends BaseProps {
  type: JigsawElements.Text;
  valueForm: JigsawElementsFormType["TextForm"];
  onSubmit: (form: JigsawElementsFormType["TextForm"]) => any;
}

interface PropsAll extends BaseProps {
  type: JigsawElements;
  valueForm: any;
  onSubmit: (form: JigsawElementsForm) => any;
}

// function JigsawElementForm(props: PropsBanner): ReactElement;
// function JigsawElementForm(props: PropsCard): ReactElement;
// function JigsawElementForm(props: PropsGoods): ReactElement;
// function JigsawElementForm(props: PropsText): ReactElement;
// function JigsawElementForm(props: PropsAll): ReactElement;
function JigsawElementForm (props: PropsAll): ReactElement {
  const {
    type,
    valueForm,
    onSubmit,
    componentStyle,
    onSubmitComponentStyle,
  } = props;

  const [isRefresh, setisRefresh] = useState(true);

  const element = JigsawElementsFormConfig[type];

  useEffect(() => {
    setisRefresh(false);
    setTimeout(() => {
      setisRefresh(true);
    }, 30);
  }, []);

  if (!element || !isRefresh) {
    return <div></div>;
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
}

export default JigsawElementForm;
