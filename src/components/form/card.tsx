import ProForm, {ProFormText} from "@ant-design/pro-form";
import {JigsawElementsFormType} from "@lowinc/jigsawpuzzle-lib";
import {Card, Form} from "antd";
import React from "react";

type CardForm = JigsawElementsFormType["CardForm"];

interface Props {
  data: CardForm;
  onSubmit: (data: CardForm) => any;
}

const FormVipCard: React.FC<Props> = (props) => {
  const [form] = Form.useForm();

  return (
    <Card>
      <ProForm<CardForm>
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
          label='会员卡'
          name='vipCardId'
          rules={[{required: true, message: "请输入会员卡id"}]}
          placeholder='请输入会员卡id'
        />
        <ProFormText
          required
          label='标题'
          name='title'
          rules={[{required: true, message: "请输入标题"}]}
          placeholder='请输入标题'
        />
        <ProFormText
          required
          label='描述'
          name='desc'
          rules={[{required: true, message: "请输入描述"}]}
          placeholder='请输入描述'
        />
        <ProFormText
          required
          label='图片'
          name='img'
          rules={[{required: true, message: "请输入图片"}]}
          placeholder='请输入图片'
        />
        <ProFormText
          required
          label='链接'
          name='link'
          rules={[{required: true, message: "请输入链接"}]}
          placeholder='请输入链接'
        />
      </ProForm>
    </Card>
  );
};

export default FormVipCard;
