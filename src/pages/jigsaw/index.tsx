import immer from "immer";
import React, {useState} from "react";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import Component from "../../components/component";
import Element from "../../components/element";
import ReciverMain from "../../components/reciver-main";
import {JigsawComponents, JigsawElements} from "../../constant";
import style from "./index.module.css";

const Jigsaw = () => {
  const [arr, setArr] = useState<
    {
      value: {
        type: JigsawElements;
        [key: string]: any;
      }[];
      type: JigsawComponents;
    }[]
  >([]);

  const handleComponentDropEnd = (item: any, dropResult: any) => {
    console.log(item);
    console.log(dropResult);

    const newArr = immer(arr, (draft) => {
      return [...draft, item];
    });

    setArr(newArr);
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

  const components = [
    {
      Element: (
        <Component
          name={JigsawComponents.Swiper}
          onEnd={handleComponentDropEnd}
        >
          {JigsawComponents.Swiper}
        </Component>
      ),
    },
    {
      Element: (
        <Component name={JigsawComponents.Block} onEnd={handleComponentDropEnd}>
          {JigsawComponents.Block}
        </Component>
      ),
    },
    {
      Element: (
        <Component name={JigsawComponents.Line} onEnd={handleComponentDropEnd}>
          {JigsawComponents.Line}
        </Component>
      ),
    },
  ];

  const elements = [
    {
      Element: (
        <Element name={JigsawElements.Banner} onEnd={handleElementDropEnd}>
          {JigsawElements.Banner}
        </Element>
      ),
    },
    {
      Element: (
        <Element name={JigsawElements.Card} onEnd={handleElementDropEnd}>
          {JigsawElements.Card}
        </Element>
      ),
    },
    {
      Element: (
        <Element name={JigsawElements.Goods} onEnd={handleElementDropEnd}>
          {JigsawElements.Goods}
        </Element>
      ),
    },
  ];

  console.dir(arr);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={style["page"]}>
        <div className={style["layout"]}>
          <div className={style["operater"]}>
            <div className={style["components"]}>
              {components.map((item, index) => (
                <div key={index}>{item.Element}</div>
              ))}
            </div>
            <div className={style["elements"]}>
              {elements.map((item, index) => (
                <div key={index}>{item.Element}</div>
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
