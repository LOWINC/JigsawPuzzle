import {swap} from "dd-lib";
import immer from "immer";
import React, {useEffect, useState} from "react";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import Form from "../../components/form";
import ReciverMain from "../../components/reciver-main";
import {
  JigsawComponents,
  JigsawComponentsRecive,
  JigsawElements,
} from "../../constant";
import {useCache} from "../../utils/cache";
import style from "./index.module.css";
import RenderJigsawComponents from "./jigsaw-components";
import RenderJigsawElement from "./jigsaw-elements";

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

  const cache = useCache<{
    value: {
      type: JigsawElements;
      __key: number;
      [key: string]: any;
    }[];
    type: JigsawComponents;
    __key: number;
  }>(arr);

  useEffect(() => {
    setArr(cache.data);
  }, [cache.data]);

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
    // 如果不是被accept的元素 放下会出现 result.index === undefined
    if (result.index === undefined) {
      return;
    }
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
            <button className={style["reset"]} onClick={cache.clear}>
              重置
            </button>
            <div className={style["components"]}>
              <RenderJigsawComponents
                handleComponentDropEnd={handleComponentDropEnd}
              />
            </div>
            <div className={style["elements"]}>
              <RenderJigsawElement
                handleElementDropEnd={handleElementDropEnd}
              />
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
