import React from "react";

import style from "./index.module.css";

const ValueElement = () => {
  return (
    <div className={style["component"]}>
      <div className='title'></div>
      <div className='desc'></div>
      <div className='link'></div>
      <div className='img'></div>
    </div>
  );
};

export default ValueElement;
