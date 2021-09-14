import ProForm, {ProFormColorPicker} from "@ant-design/pro-form";
import {JigsawComponentStyle} from "@lowinc/jigsawpuzzle-lib";
import {Card, Col, Form, InputNumber, Row} from "antd";
import React from "react";

interface Props {
  componentStyle: JigsawComponentStyle;
  onSubmit: (data: JigsawComponentStyle) => any;
}

const initData: Required<JigsawComponentStyle> = {
  margin: 0,
  padding: 0,
  backgroundColor: "#fff",
  title: {
    color: "",
    fontSize: 16,
  },
  desc: {
    color: "",
    fontSize: 14,
  },
};

const transform = (form: {
  titleColor: string;
  titleSize: number;
  descColor: string;
  descSize: number;
  margin: number;
  padding: number;
}): JigsawComponentStyle => ({
  title: {
    color: form.titleColor ?? initData.title.color,
    fontSize: form.titleSize ?? initData.title.fontSize,
  },
  desc: {
    color: form.descColor ?? initData.desc.color,
    fontSize: form.descSize ?? initData.desc.fontSize,
  },
  margin: form.margin ?? initData.margin,
  padding: form.padding ?? initData.padding,
});

const transformPropsToInitVal = (
  style: JigsawComponentStyle
): Required<JigsawComponentStyle> => ({
  backgroundColor: "",
  margin: style.margin ?? initData.margin,
  padding: style.padding ?? initData.padding,
  title: {
    color: style.title?.color ?? initData.title.color,
    fontSize: style.title?.fontSize ?? initData.title.fontSize,
  },
  desc: {
    color: style.desc?.color ?? initData.desc.color,
    fontSize: style.desc?.fontSize ?? initData.desc.fontSize,
  },
});

const FormStyleElement: React.FC<Props> = (props) => {
  const initialValue = transformPropsToInitVal(props.componentStyle);
  const [form] = Form.useForm();

  return (
    <Card>
      <ProForm<JigsawComponentStyle>
        initialValues={initialValue}
        onReset={() => {
          form.resetFields();
        }}
        onFinish={async (data) => {
          // props.onSubmit(transform(data));
        }}
      >
        <Row gutter={10}>
          <Col span={12}>
            <ProFormColorPicker name='titleColor' label='标题颜色' />
          </Col>
          <Col span={12}>
            <Form.Item name='titleSize' label='标题字号'>
              <InputNumber name='titleSize' />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col span={12}>
            <Form.Item name='descColor' label='描述颜色'>
              <ProFormColorPicker />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name='descSize' label='描述字号'>
              <InputNumber />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name='margin' label='内间距'>
          <InputNumber />
        </Form.Item>
        <Form.Item name='padding' label='外边距'>
          <InputNumber />
        </Form.Item>
      </ProForm>
    </Card>
  );
};

export default FormStyleElement;
