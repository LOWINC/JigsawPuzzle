import ProForm, {ProFormText} from "@ant-design/pro-form";
import {JigsawElementsFormType} from "@lowinc/jigsawpuzzle-lib";
import {Card, Form} from "antd";
import React from "react";

type BannerForm = JigsawElementsFormType["BannerForm"];

interface Props {
  data: BannerForm;
  onSubmit: (data: BannerForm) => any;
}

const FormBanner: React.FC<Props> = (props) => {
  const [form] = Form.useForm();

  return (
    <Card>
      <ProForm<BannerForm>
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
          label='标题'
          name='title'
          placeholder='请输入标题'
        />
        <ProFormText
          required
          rules={[{required: true, message: "请输入描述"}]}
          label='描述'
          name='desc'
          placeholder='请输入描述'
        />
        <ProFormText
          required
          rules={[{required: true, message: "请输入图片"}]}
          label='图片'
          name='img'
          placeholder='请输入图片'
        />
        <ProFormText
          required
          rules={[{required: true, message: "请输入链接"}]}
          label='链接'
          name='link'
          placeholder='请输入链接'
        />
      </ProForm>
    </Card>
  );
};

export default FormBanner;
