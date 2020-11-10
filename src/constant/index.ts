import {JigsawComponents, JigsawElements} from "dd-lib";

// 组件 元素
export {JigsawComponents, JigsawElements};

// 组件接受的元素
export const JigsawComponentsRecive = {
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
};
