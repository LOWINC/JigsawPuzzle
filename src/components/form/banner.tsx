import {Field, Form, Formik} from "formik";
import React from "react";
import style from "./index.module.css";

interface BaseForm {
  title?: string;
  link?: string;
  img?: string;
}

interface Props {
  data: BaseForm;
  onSubmit: (data: any) => any;
}

const FormBanner: React.FC<Props> = (props) => {
  return (
    <Formik initialValues={props.data} onSubmit={props.onSubmit}>
      <Form className={style["form"]}>
        <div className={style["form-cell"]}>
          <label className={style["form-label"]} htmlFor='title'>
            标题
          </label>
          <Field
            className={style["form-value"]}
            id='title'
            name='title'
            placeholder='title'
          />
        </div>
        <div className={style["form-cell"]}>
          <label className={style["form-label"]} htmlFor='link'>
            链接
          </label>
          <Field
            className={style["form-value"]}
            id='link'
            name='link'
            placeholder='link'
          />
        </div>
        <div className={style["form-cell"]}>
          <label className={style["form-label"]} htmlFor='img'>
            图片
          </label>
          <Field
            className={style["form-value"]}
            id='img'
            name='img'
            placeholder='img'
          />
        </div>
        <button className={style["submit"]} type='submit'>
          确定
        </button>
      </Form>
    </Formik>
  );
};

export default FormBanner;
