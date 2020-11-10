import {
  JigsawElementBase,
  JigsawElements,
  JigsawElementsConfig,
  JigsawElementsForm,
} from "dd-lib";
import React from "react";
import FormBanner from "../../components/form/banner";

interface Props {
  type: JigsawElements;
  data: JigsawElementsForm;
  onSubmit: (form: JigsawElementsForm) => any;
}

const JigsawElementForm: React.FC<Props> = ({data, type, onSubmit}) => {
  const formMap: JigsawElementsConfig<{render: any}> = {
    Banner: {
      render: () => <FormBanner data={data} onSubmit={onSubmit} />,
    },
    Card: {
      render: () => {
        return <div></div>;
      },
    },
    Goods: {
      render: () => {
        return <div></div>;
      },
    },
    Text: {
      render: () => {
        return <div></div>;
      },
    },
  };

  return <div>{formMap[type] && formMap[type].render()}</div>;
};

export default JigsawElementForm;
