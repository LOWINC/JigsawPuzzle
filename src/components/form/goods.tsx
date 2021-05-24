import { JigsawElementsFormType } from "@lowinc/jigsawpuzzle-lib";
import { Button, Card, Form, Input, } from 'antd';
import React, { useMemo } from "react";


type IForm = JigsawElementsFormType["GoodsForm"];

interface Props {
  data: IForm;
  onSubmit: (data: IForm) => any;
}

const layout = {
  wrapperCol: { span: 16 },
};

const initData: Required<IForm> = {
  goodsId: "",
  img: "",
  desc: "",
  link: "",
  title: "",
};

const FormGoods: React.FC<Props> = (props) => {

  const [form] = Form.useForm<IForm>();

  const initForm = useMemo(
    () => ({
      ...initData,
      ...props.data,
    }),
    [props.data]
  );

  const onFinish = async (values: any) => {
    console.log('onFinish', values)

    try {
      const fields = await form.validateFields()
      console.log('Success:', fields);
    } catch (error) {
      console.log('Failed:', error);
    }
  };

  return (
    <Card>
      <Form
        {...layout}
        form={form}
        name="basic"
        initialValues={initForm}
        onFinish={onFinish}
      >
        <Form.Item name='goodsId' label='商品ID' rules={[
          {
            required: true,
            message: "请输入商品",
          }
        ]}>
          <Input placeholder='请输入商品' />
        </Form.Item>
        <Form.Item name='title' label='标题' rules={[
          ({ getFieldValue }) => ({
            validator (rule, value) {
              if (!value) {
                return Promise.reject(new Error('请输入标题'))
              }
              return Promise.resolve()
            }
          })
        ]}>
          <Input placeholder='请输入标题' />
        </Form.Item>
        <Form.Item name='desc' label='描述'>
          <Input placeholder='请输入描述' />
        </Form.Item>
        <Form.Item name='img' label='图片'>
          <Input placeholder='请输入图片' />
        </Form.Item>
        <Form.Item name='link' label='链接'>
          <Input placeholder='请输入链接' />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit"> Submit </Button>
        </Form.Item>
      </Form>
    </Card >

  );
};

export default FormGoods;
