// 组件
export enum JigsawComponents {
  Swiper = "Swiper",
  Block = "Block",
  Line = "Line",
  Title = "Title",
}

// 元素
export enum JigsawElements {
  Goods = "Goods",
  Card = "Card",
  Banner = "Banner",
  Text = "Text",
}

// 组件接受的元素
export const JigsawComponentsRecive = {
  [JigsawComponents.Swiper]: {
    multiple: true,
    elements: [JigsawElements.Banner, JigsawElements.Card],
  },
  [JigsawComponents.Block]: {
    multiple: true,
    elements: [JigsawElements.Goods],
  },
  [JigsawComponents.Line]: {
    multiple: true,
    elements: [JigsawElements.Goods],
  },
  [JigsawComponents.Title]: {
    multiple: false,
    elements: [JigsawElements.Text],
  },
};
