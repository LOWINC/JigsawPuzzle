import immer from "immer";
import {clone} from "lodash";
import React, {useEffect, useState} from "react";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import Component from "../../components/component";
import Element from "../../components/element";
import Form from "../../components/form";
import ReciverMain from "../../components/reciver-main";
import {JigsawComponents, JigsawElements} from "../../constant";
import {Iframe} from "../../utils/postmessage";
import style from "./index.module.css";

let iframe = {} as Iframe;

const Jigsaw = () => {
  const [edit, setEdit] = useState(
    {} as {
      elementIndex: number;
      componentIndex: number;
      elementType: JigsawElements;
    }
  );

  const [arr, setArr] = useState<
    {
      value: {
        type: JigsawElements;
        [key: string]: any;
      }[];
      type: JigsawComponents;
    }[]
  >([]);

  useEffect(() => {
    iframe = new Iframe("iframe");
  }, []);

  useEffect(() => {
    iframe.postMessage(arr);
  }, [arr]);

  const handleComponentDropEnd = (item: any, dropResult: any) => {
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

  const handleElementSelect = (params: {
    elementIndex: number;
    elementType: JigsawElements;
    componentIndex: number;
  }) => {
    setEdit({
      componentIndex: params.componentIndex,
      elementIndex: params.elementIndex,
      elementType: params.elementType,
    });

    console.log(params);
  };

  const handleElementMove = (params: {
    componentIndex: number;
    dragIndex: number;
    hoverIndex: number;
  }) => {
    const {componentIndex, dragIndex, hoverIndex} = params;

    if (typeof dragIndex !== "number" || typeof hoverIndex !== "number") {
      return;
    }

    const data = arr[componentIndex].value;

    const dragVal = data[dragIndex];
    const hoverVal = data[hoverIndex];
    const temp = clone(data);
    temp[dragIndex] = hoverVal;
    temp[hoverIndex] = dragVal;

    const newArr = immer(arr, (draft) => {
      draft[componentIndex].value = temp;
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
              <ReciverMain
                value={arr}
                onElementMove={handleElementMove}
                onElementSelect={handleElementSelect}
              />
            </div>
          </div>
          <div className='html'>
            <iframe
              id='iframe'
              className={style["iframe"]}
              title='html'
              src='http://localhost:10090/mobile'
            />
          </div>
          <div className={style["form"]}>
            <Form type={edit.elementType} onConfirm={console.log}></Form>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default Jigsaw;
