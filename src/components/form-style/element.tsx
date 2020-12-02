import {JigsawComponentStyle} from "@lowinc/jigsawpuzzle-lib";
import {Card, Col, Row} from "antd";
import {Formik} from "formik";
import {Form, FormItem, Input, SubmitButton} from "formik-antd";
import React from "react";

interface Props {
  componentStyle: JigsawComponentStyle;
  onSubmit: (data: JigsawComponentStyle) => any;
}

const initData: Required<JigsawComponentStyle> = {
  margin: 10,
  padding: 10,
  backgroundColor: "#fff",
  title: {
    color: "#14b9d7",
    fontSize: 16,
  },
  desc: {
    color: "#909893",
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

  const handleSubmit = (form: any) => {
    props.onSubmit(transform(form));
  };

  return (
    <Card>
      <Formik initialValues={initialValue} onSubmit={handleSubmit}>
        <Form layout='horizontal'>
          <Row gutter={10}>
            <Col span={12}>
              <FormItem name='titleColor' label='标题颜色'>
                <Input
                  type='color'
                  name='titleColor'
                  defaultValue={initialValue.title.color}
                />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem name='titleSize' label='标题字号'>
                <Input
                  name='titleSize'
                  type='number'
                  defaultValue={initialValue.title.fontSize}
                />
              </FormItem>
            </Col>
          </Row>
          <Row gutter={10}>
            <Col span={12}>
              <FormItem name='descColor' label='描述颜色'>
                <Input
                  type='color'
                  name='descColor'
                  defaultValue={initialValue.desc.color}
                />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem name='descSize' label='描述字号'>
                <Input
                  name='descSize'
                  type='number'
                  defaultValue={initialValue.desc.fontSize}
                />
              </FormItem>
            </Col>
          </Row>

          <FormItem name='margin' label='内间距'>
            <Input
              name='margin'
              type='number'
              defaultValue={initialValue.margin}
            />
          </FormItem>
          <FormItem name='pading' label='外边距'>
            <Input
              name='pading'
              type='number'
              defaultValue={initialValue.padding}
            />
          </FormItem>

          <SubmitButton loading={false}>确定</SubmitButton>
        </Form>
      </Formik>
    </Card>
  );
};

export default FormStyleElement;
