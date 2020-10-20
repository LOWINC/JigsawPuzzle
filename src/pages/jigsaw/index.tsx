import React, {useState} from "react";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import ComponentBlock from "../../components/component-block";
import ComponentLine from "../../components/component-line";
import ComponentSwiper from "../../components/component-swiper";
import ElementBanner from "../../components/element-banner";
import ElementCard from "../../components/element-card";
import ElementGoods from "../../components/element-goods";
import PreviewJson from "../../components/reciver-component";

import {JigsawComponents, JigsawElements} from "../../constant";
import style from "./index.module.css";

const Jigsaw = () => {
  const handleDropEnd = (item: any, dropResult: any) => {
    console.log("item:", item, "dropResult:", dropResult);
    setArr([...arr, {...item}]);
  };

  const [arr, setArr] = useState([] as any[]);
  console.log("arr:", arr);

  const components = [
    {
      type: JigsawComponents.Block,
      render: () => (
        <ComponentBlock name={JigsawComponents.Block} onEnd={handleDropEnd} />
      ),
    },
    {
      type: JigsawComponents.Line,
      render: () => (
        <ComponentLine name={JigsawComponents.Line} onEnd={handleDropEnd} />
      ),
    },
    {
      type: JigsawComponents.Swiper,
      render: () => (
        <ComponentSwiper name={JigsawComponents.Swiper} onEnd={handleDropEnd} />
      ),
    },
  ];

  const elements = [
    {
      type: JigsawElements.Banner,
      render: () => <ElementBanner />,
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
              <PreviewJson value={arr} />
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default Jigsaw;
