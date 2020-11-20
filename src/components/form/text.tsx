import {JigsawElementsFormType} from "@lowinc/jigsawpuzzle-lib";
import React, {useState, useEffect} from "react";
import style from "./index.module.css";

interface Props {
  data: JigsawElementsFormType["TextForm"];
  onSubmit: (data: JigsawElementsFormType["TextForm"]) => any;
}

const FormText: React.FC<Props> = (props) => {
  const [form, setForm] = useState(props.data);

  useEffect(() => {
    setForm(props.data);
    return () => setForm({} as any);
  }, [props.data]);

  const handleChange = (key: string) => (event: any) =>
    setForm({
      ...form,
      [key]: event.target.value,
    });

  const handleSubmit = () => {
    props.onSubmit(form);
  };

  return (
    <div className='form'>
      <div className={style["form-cell"]}>
        <div className={style["form-label"]}>标题</div>
        <input
          type='text'
          className={style["form-value"]}
          value={form.title}
          placeholder='请输入标题'
          onChange={handleChange("title")}
        />
      </div>
      <div className={style["form-cell"]}>
        <div className={style["form-label"]}>描述</div>
        <input
          type='text'
          className={style["form-value"]}
          value={form.desc}
          placeholder='请输入描述'
          onChange={handleChange("desc")}
        />
      </div>
      <button className={style["submit"]} onClick={handleSubmit}>
        确定
      </button>
    </div>
  );
};

export default FormText;
