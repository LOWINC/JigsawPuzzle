import {JigsawElementsFormType} from "@lowinc/jigsawpuzzle-lib";
import {Card} from "antd";
import {Formik} from "formik";
import {Form, FormItem, Input, SubmitButton} from "formik-antd";
import React, {useMemo} from "react";
import * as yup from "yup";

type Form = JigsawElementsFormType["CardForm"];

interface Props {
  data: Form;
  onSubmit: (data: Form) => any;
}

const initData: Required<Form> = {
  vipCardId: "",
  img: "",
  desc: "",
  link: "",
  title: "",
};

const FormVipCard: React.FC<Props> = (props) => {
  const initForm = useMemo(
    () => ({
      ...initData,
      ...props.data,
    }),
    [props.data]
  );

  return (
    <Card>
      <Formik
        validationSchema={yup.object({
          vipCardId: yup.string().required("请输入会员卡id"),
          title: yup.string().required("请输入标题"),
          desc: yup.string().required("请输入描述"),
          img: yup.string().required("请输入图片"),
          link: yup.string().required("请输入链接"),
        })}
        initialValues={initForm}
        onSubmit={props.onSubmit}
      >
        <Form layout='horizontal'>
          <FormItem name='vipCardId' label='标题'>
            <Input name='vipCardId' placeholder='请输入标题' />
          </FormItem>
          <FormItem name='title' label='标题'>
            <Input name='title' placeholder='请输入标题' />
          </FormItem>
          <FormItem name='desc' label='描述'>
            <Input name='desc' placeholder='请输入描述' />
          </FormItem>
          <FormItem name='img' label='图片'>
            <Input name='img' placeholder='请输入图片' />
          </FormItem>
          <FormItem name='link' label='链接'>
            <Input name='link' placeholder='请输入链接' />
          </FormItem>
          <SubmitButton type='primary' htmlType='submit'>
            确定
          </SubmitButton>
        </Form>
      </Formik>
    </Card>
  );
};

export default FormVipCard;
