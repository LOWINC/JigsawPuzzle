import immer from "immer";
import React, {useState} from "react";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import Component from "../../components/component";
import Element from "../../components/element";
import Form from "../../components/form";
import ReciverMain from "../../components/reciver-main";
import {
  JigsawComponents,
  JigsawComponentsRecive,
  JigsawElements,
} from "../../constant";
import {swap} from "dd-lib";
import style from "./index.module.css";

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
        __key: number;
        [key: string]: any;
      }[];
      type: JigsawComponents;
      __key: number;
    }[]
  >([]);

  const handleComponentDropEnd = (item: any, dropResult: any) => {
    const newArr = immer(arr, (draft) => {
      return [
        ...draft,
        {
          ...item,
          __key: new Date().getTime(),
        },
      ];
    });

    setArr(newArr.filter((item) => !!item));
  };

  const handleElementDropEnd = (
    item: {name: string; type: JigsawElements},
    result: {index: number}
  ) => {
    const componentIype = arr[result.index].type;
    const multiple = JigsawComponentsRecive[componentIype].multiple;

    const newArr = immer(arr, (draft) => {
      if (!multiple) {
        draft[result.index].value = [
          {
            ...item,
            __key: new Date().getTime(),
          },
        ];
        return draft;
      }

      const oldItems = arr[result.index].value || [];
      const value = [
        ...oldItems,
        {
          ...item,
          __key: new Date().getTime(),
        },
      ];
      draft[result.index].value = value;
      return draft;
    });

    setArr(newArr.filter((item) => !!item));
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
        <Component name={JigsawComponents.Title} onEnd={handleComponentDropEnd}>
          {JigsawComponents.Title}
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
    {
      Element: (
        <Element name={JigsawElements.Text} onEnd={handleElementDropEnd}>
          {JigsawElements.Text}
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

  const handleComponentMove = (params: {
    componentIndex: number;
    dragIndex: number;
    hoverIndex: number;
  }) => {
    const {dragIndex, hoverIndex} = params;
    if (typeof dragIndex !== "number" || typeof hoverIndex !== "number") {
      return;
    }
    setArr(swap(arr, dragIndex, hoverIndex));
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

    setArr(
      immer(arr, (draft) => {
        draft[componentIndex].value = swap(
          arr[componentIndex].value,
          dragIndex,
          hoverIndex
        );
      })
    );
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
                onComponentMove={handleComponentMove}
              />
            </div>
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
