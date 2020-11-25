import {
  JigsawElementBase,
  JigsawElementsForm,
  JigsawComponentStyle,
  swap,
} from "@lowinc/jigsawpuzzle-lib";
import immer from "immer";
import get from "lodash/get";
import React, {useEffect, useMemo, useState} from "react";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import ReciverMain from "../../components/reciver-main";
import {JigsawComponentsRecive, JigsawElements} from "../../setup";
import {mockData} from "../../setup/data";
import {useCache} from "../../utils/cache";
import {Iframe} from "../../utils/postmessage";
import RenderJigsawComponents from "./components/jigsaw-components";
import RenderJigsawElement from "./components/jigsaw-elements";
import JigsawElementForm from "./components/jigsaw-elements-form";
import style from "./index.module.css";

const iframe = new Iframe();

const Jigsaw = () => {
  const [arr, setArr] = useState<JigsawElementBase[]>([]);

  function arrErrorFilter(arr: any[]) {
    return setArr(arr.filter((item) => !!item));
  }

  const [edit, setEdit] = useState(
    {} as {
      elementIndex: number;
      componentIndex: number;
      elementType: JigsawElements;
    }
  );

  // 当前编辑的元素的表单
  const editElement = useMemo(() => {
    return get(arr[edit.componentIndex], `value[${edit.elementIndex}]`, {});
  }, [arr, edit.componentIndex, edit.elementIndex]);

  // 当前编辑组件的样式
  const editCompoentStyle: JigsawComponentStyle = useMemo(() => {
    return get(arr[edit.componentIndex], "style", {});
  }, [arr, edit.componentIndex]);

  const cache = useCache<JigsawElementBase>(arr);

  useEffect(() => {
    arrErrorFilter(cache.data);
  }, [cache.data]);

  useEffect(() => {
    if (iframe.isFind("livePage")) {
      iframe.postData(arr);
      return;
    }

    setTimeout(() => {
      iframe.find("livePage");
      iframe.postData(arr);
    }, 300);
  }, [arr]);

  const handleComponentDropEnd = (item: any, dropResult: any) => {
    const newArr: JigsawElementBase[] = immer(arr, (draft) => {
      return [
        ...draft,
        {
          __key: new Date().getTime(),
          type: item.name,
          value: [],
          style: {},
        },
      ];
    });

    arrErrorFilter(newArr);
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
            __key: new Date().getTime(),
            type: item.type,
            value: [],
          },
        ];
        return draft;
      }

      const oldItems = arr[result.index].value || [];
      const value = [
        ...oldItems,
        {
          __key: new Date().getTime(),
          type: item.type,
          value: [],
          style: {},
        },
      ];
      draft[result.index].value = value;
      return draft;
    });

    arrErrorFilter(newArr);
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
    arrErrorFilter(swap(arr, dragIndex, hoverIndex));
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

    arrErrorFilter(
      immer(arr, (draft) => {
        draft[componentIndex].value = swap(
          arr[componentIndex].value,
          dragIndex,
          hoverIndex
        );
      })
    );
  };

  const handleSubmitElementValue = (form: JigsawElementsForm) => {
    arrErrorFilter(
      immer(arr, (draft) => {
        draft[edit.componentIndex].value[edit.elementIndex].value = form;
      })
    );
  };

  const handleSubmitComponentStyle = (form: JigsawComponentStyle) => {
    arrErrorFilter(
      immer(arr, (draft) => {
        draft[edit.componentIndex].style = form;
      })
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={style["page"]}>
        <div className={style["layout"]}>
          <div className={style["operater"]}>
            <div>
              <button className={style["reset"]} onClick={cache.clear}>
                重置
              </button>
            </div>
            <div>
              <button
                className={style["reset"]}
                onClick={() => arrErrorFilter(mockData as any)}
              >
                使用测试数据
              </button>
            </div>
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
            <div>内容</div>
            <JigsawElementForm
              type={edit.elementType}
              elementIndex={edit.elementIndex}
              componentIndex={edit.componentIndex}
              componentStyle={editCompoentStyle}
              valueForm={editElement.value}
              onSubmit={handleSubmitElementValue}
              onSubmitComponentStyle={handleSubmitComponentStyle}
            />
          </div>
          <div className={style["livePage"]}>
            <div>预览</div>
            <iframe
              id='livePage'
              src='https://lowinc.github.io/mobile/index.html'
              // src='http://localhost:10090/mobile'
              title='livePage'
              className={style["iframe"]}
            />
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default Jigsaw;
