import immer from "immer";
import React, {useState} from "react";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import ComponentBlock from "../../components/component-block";
import ComponentLine from "../../components/component-line";
import ComponentSwiper from "../../components/component-swiper";
import ElementBanner from "../../components/element-banner";
import ElementCard from "../../components/element-card";
import ElementGoods from "../../components/element-goods";
import ReciverMain from "../../components/reciver-main";
import {JigsawComponents, JigsawElements} from "../../constant";
import style from "./index.module.css";

const Jigsaw = () => {
  const [arr, setArr] = useState<
    {
      value: any[];
      type: JigsawComponents;
    }[]
  >([]);

  const components = [
    {
      type: JigsawComponents.Block,
      render: () => (
        <ComponentBlock
          name={JigsawComponents.Block}
          onEnd={handleComponentDropEnd}
        />
      ),
    },
    {
      type: JigsawComponents.Line,
      render: () => (
        <ComponentLine
          name={JigsawComponents.Line}
          onEnd={handleComponentDropEnd}
        />
      ),
    },
    {
      type: JigsawComponents.Swiper,
      render: () => (
        <ComponentSwiper
          name={JigsawComponents.Swiper}
          onEnd={handleComponentDropEnd}
        />
      ),
    },
  ];

  const elements = [
    {
      type: JigsawElements.Banner,
      render: () => (
        <ElementBanner
          name={JigsawElements.Banner}
          onEnd={handleElementDropEnd}
        />
      ),
    },
    {
      type: JigsawElements.Card,
      render: () => <ElementCard />,
    },
    {
      type: JigsawElements.Goods,
      render: () => <ElementGoods />,
    },
  ];

  const handleComponentDropEnd = (item: any, dropResult: any) => {
    setArr([...arr, {...item}]);
  };

  const handleElementDropEnd = (
    item: {name: string; type: JigsawElements},
    result: {index: number}
  ) => {
    const newArr = immer(arr, (draft) => {
      const oldItems = arr[result.index].value || [];
      const value = [...oldItems, item];
      draft[result.index].value = value;
      return draft;
    });
    setArr(newArr);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={style["page"]}>
        <div className={style["layout"]}>
          <div className={style["operater"]}>
            <div className={style["components"]}>
              {components.map((item) => (
                <div key={item.type}>{item.render()}</div>
              ))}
            </div>
            <div className={style["elements"]}>
              {elements.map((item) => (
                <div key={item.type}>{item.render()}</div>
              ))}
            </div>
          </div>

          <div className={style["preview"]}>
            <div className={style["json"]}>
              <ReciverMain value={arr} />
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default Jigsaw;
