import {JigsawElementStyle} from "@lowinc/jigsawpuzzle-lib";
import {Card, Col, Row} from "antd";
import {Formik} from "formik";
import {Form, FormItem, Input, SubmitButton} from "formik-antd";
import merge from "lodash/merge";
import React from "react";

interface Props {
  elementStyle: JigsawElementStyle;
  onSubmit: (data: JigsawElementStyle) => any;
}

const initData: Required<JigsawElementStyle> = {
  margin: [10, 0, 10, 0],
  padding: [0, 0, 0, 0],
  borderRadius: 0,
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
  borderRadius: number;
  titleColor: string;
  titleSize: number;
  descColor: string;
  descSize: number;
  marginTop: number;
  marginRight: number;
  marginBottom: number;
  marginLeft: number;
  paddingTop: number;
  paddingRight: number;
  paddingBottom: number;
  paddingLeft: number;
}): JigsawElementStyle => ({
  borderRadius: form.borderRadius,
  title: {
    color: form.titleColor,
    fontSize: form.titleSize,
  },
  desc: {
    color: form.descColor,
    fontSize: form.descSize,
  },
  margin: [
    form.marginTop,
    form.marginRight,
    form.marginBottom,
    form.marginLeft,
  ],
  padding: [
    form.paddingTop,
    form.paddingRight,
    form.paddingBottom,
    form.paddingLeft,
  ],
});

const FormStyleElement: React.FC<Props> = (props) => {
  const initialValue = merge(props.elementStyle, initData);

  const handleSubmit = (form: any) => {
    const data = merge(initialValue, transform(form));
    props.onSubmit(data);
  };

  return (
    <Card>
      <Formik initialValues={initialValue} onSubmit={handleSubmit}>
        <Form layout='horizontal'>
          <FormItem name='borderRadius' label='圆角'>
            <Input
              type='number'
              name='borderRadius'
              defaultValue={initialValue.borderRadius}
            />
          </FormItem>

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

          <Row gutter={10}>
            <Col span={4}>外边距：</Col>
            <Col span={5}>
              <FormItem name='marginTop'>
                <Input
                  name='marginTop'
                  type='number'
                  placeholder='上'
                  defaultValue={initialValue.margin[0]}
                />
              </FormItem>
            </Col>
            <Col span={5}>
              <FormItem name='marginRight'>
                <Input
                  name='marginRight'
                  type='number'
                  placeholder='右'
                  defaultValue={initialValue.margin[1]}
                />
              </FormItem>
            </Col>
            <Col span={5}>
              <FormItem name='marginBottom'>
                <Input
                  name='marginBottom'
                  type='number'
                  placeholder='下'
                  defaultValue={initialValue.margin[2]}
                />
              </FormItem>
            </Col>
            <Col span={5}>
              <FormItem name='marginLeft'>
                <Input
                  name='marginLeft'
                  type='number'
                  placeholder='左'
                  defaultValue={initialValue.margin[3]}
                />
              </FormItem>
            </Col>
          </Row>
          <Row gutter={10}>
            <Col span={4}>内边距：</Col>
            <Col span={5}>
              <FormItem name='paddingTop'>
                <Input
                  name='paddingTop'
                  type='number'
                  placeholder='上'
                  defaultValue={initialValue.padding[0]}
                />
              </FormItem>
            </Col>
            <Col span={5}>
              <FormItem name='paddingRight'>
                <Input
                  name='paddingRight'
                  type='number'
                  placeholder='右'
                  defaultValue={initialValue.padding[1]}
                />
              </FormItem>
            </Col>
            <Col span={5}>
              <FormItem name='paddingBottom'>
                <Input
                  name='paddingBottom'
                  type='number'
                  placeholder='下'
                  defaultValue={initialValue.padding[2]}
                />
              </FormItem>
            </Col>
            <Col span={5}>
              <FormItem name='paddingLeft'>
                <Input
                  name='paddingLeft'
                  type='number'
                  placeholder='左'
                  defaultValue={initialValue.padding[3]}
                />
              </FormItem>
            </Col>
          </Row>

          <SubmitButton loading={false}>确定</SubmitButton>
        </Form>
      </Formik>
    </Card>
  );
};

export default FormStyleElement;
