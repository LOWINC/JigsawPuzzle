import ProForm, {ProFormText} from "@ant-design/pro-form";
import {JigsawElementsFormType} from "@lowinc/jigsawpuzzle-lib";
import {Card, Form} from "antd";
import React from "react";

type TextForm = JigsawElementsFormType["TextForm"];

interface Props {
  data: TextForm;
  onSubmit: (data: TextForm) => any;
}

const FormText: React.FC<Props> = (props) => {
  const [form] = Form.useForm();
  return (
    <Card>
      <ProForm<TextForm>
        initialValues={props.data}
        onReset={() => {
          form.resetFields();
        }}
        onFinish={async (data) => {
          props.onSubmit(data);
        }}
      >
        <ProFormText
          required
          rules={[{required: true, message: "请输入标题"}]}
          name='title'
          label='标题'
          placeholder='请输入标题'
        />
        <ProFormText
          required
          rules={[{required: true, message: "请输入描述"}]}
          name='desc'
          label='描述'
          placeholder='请输入描述'
        />
      </ProForm>
    </Card>
  );
};

export default FormText;
