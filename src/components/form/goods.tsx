import ProForm, {ProFormText} from "@ant-design/pro-form";
import {JigsawElementsFormType} from "@lowinc/jigsawpuzzle-lib";
import {Card, Form} from "antd";
import React from "react";

type GoodsForm = JigsawElementsFormType["GoodsForm"];

interface Props {
  data: GoodsForm;
  onSubmit: (data: GoodsForm) => any;
}

const FormGoods: React.FC<Props> = (props) => {
  const [form] = Form.useForm();

  return (
    <Card>
      <ProForm<GoodsForm>
        initialValues={props.data}
        onReset={() => {
          form.resetFields();
        }}
        onFinish={async (data) => {
          props.onSubmit(data);
        }}
      >
        <ProFormText
          name='goodsId'
          label='商品ID'
          required
          rules={[{required: true, message: "请输入商品"}]}
          placeholder='请输入商品'
        />
        <ProFormText
          name='title'
          label='标题'
          required
          rules={[{required: true, message: "请输入标题"}]}
          placeholder='请输入标题'
        />
        <ProFormText
          required
          rules={[{required: true, message: "请输入描述"}]}
          name='desc'
          label='描述'
          placeholder='请输入描述'
        />
        <ProFormText
          required
          rules={[{required: true, message: "请输入图片"}]}
          name='img'
          label='图片'
          placeholder='请输入图片'
        />
        <ProFormText
          required
          rules={[{required: true, message: "请输入链接"}]}
          name='link'
          label='链接'
          placeholder='请输入链接'
        />
      </ProForm>
    </Card>
  );
};

export default FormGoods;
