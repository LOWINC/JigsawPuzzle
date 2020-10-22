import React from "react";
import {JigsawElements} from "../../constant";

import style from "./index.module.css";

interface Props {
  type: JigsawElements;
  onConfirm: (form: any) => any;
}

const Form: React.FC<Props> = (props) => {
  const map: Record<JigsawElements, any> = {
    Banner: () => {
      return null;
    },
    Card: () => {
      return (
        <div>
          <input placeholder='请输入会员卡id' type='text' className='val' />
        </div>
      );
    },
    Goods: () => {
      return (
        <div>
          <input placeholder='请输入商品id' type='text' className='val' />
        </div>
      );
    },
  };

  const render = map[props.type];

  const RestCell = typeof render === "function" ? render() : null;

  return (
    <div className={style["page"]}>
      <div className='cell'>
        <input placeholder='请输入名称' type='text' className='val' />
        <input placeholder='请输入图片' type='text' className='val' />
        <input placeholder='请输入链接' type='text' className='val' />
      </div>
      <div>{RestCell}</div>
      <button onClick={props.onConfirm}>更新</button>
    </div>
  );
};

export default Form;
