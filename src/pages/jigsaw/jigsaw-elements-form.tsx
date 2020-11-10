import {JigsawElements, JigsawElementsForm} from "dd-lib";
import React from "react";
import FormBanner from "../../components/form/banner";
import FormCard from "../../components/form/card";
import FormGoods from "../../components/form/goods";
import FormText from "../../components/form/text";

interface Props {
  type: JigsawElements;
  data: any; // TODO:  通过 JigsawElements 限值 data
  onSubmit: (form: JigsawElementsForm) => any;
}

const JigsawElementForm: React.FC<Props> = ({data, type, onSubmit}) => {
  console.log(data);
  return (
    <div>
      {type === JigsawElements.Banner && (
        <FormBanner data={data} onSubmit={onSubmit} />
      )}
      {type === JigsawElements.Card && (
        <FormCard data={data} onSubmit={onSubmit} />
      )}
      {type === JigsawElements.Goods && (
        <FormGoods data={data} onSubmit={onSubmit} />
      )}
      {type === JigsawElements.Text && (
        <FormText data={data} onSubmit={onSubmit} />
      )}
    </div>
  );
};

export default JigsawElementForm;
