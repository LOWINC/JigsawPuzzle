import {JigsawComponents, JigsawElements} from "dd-lib";
import FormBanner from "../components/form/banner";
import FormCard from "../components/form/card";
import FormGoods from "../components/form/goods";
import FormText from "../components/form/text";

// 组件 元素
export {JigsawComponents, JigsawElements};

// 组件接受的元素
export const JigsawComponentsRecive: Record<
  JigsawComponents,
  {
    multiple: boolean;
    elements: JigsawElements[];
  }
> = {
  [JigsawComponents.Swiper]: {
    multiple: true,
    elements: [JigsawElements.Card],
  },
  [JigsawComponents.Block]: {
    multiple: true,
    elements: [JigsawElements.Goods],
  },
  [JigsawComponents.Line]: {
    multiple: true,
    elements: [JigsawElements.Goods, JigsawElements.Banner],
  },
  [JigsawComponents.Title]: {
    multiple: false,
    elements: [JigsawElements.Text],
  },
  [JigsawComponents.Big]: {
    elements: [JigsawElements.Goods, JigsawElements.Banner],
    multiple: true,
  },
  [JigsawComponents.Roll]: {
    elements: [JigsawElements.Goods, JigsawElements.Banner],
    multiple: true,
  },
  [JigsawComponents.Cube]: {
    elements: [JigsawElements.Goods, JigsawElements.Banner],
    multiple: true,
  },
  [JigsawComponents.CubeRow4]: {
    elements: [JigsawElements.Goods, JigsawElements.Banner],
    multiple: true,
  },
};

// 元素对应的表单
export const JigsawElementsFormConfig: Record<
  JigsawElements,
  {
    Form: any; // TODO: 元素的ts定义？
  }
> = {
  Banner: {
    Form: FormBanner,
  },
  Card: {
    Form: FormCard,
  },
  Goods: {
    Form: FormGoods,
  },
  Text: {
    Form: FormText,
  },
};