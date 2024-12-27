import { Button, Col, Drawer, Form, Input, Row, Space } from "antd";
import React, { useEffect } from "react";
import axiosInstance from "../../configs/apis";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { MdDelete } from "react-icons/md";
import { Category } from "../../configs/types/category";
import { createCategorySchema } from "../../configs/schemas/category";
import CATEGORY_ENDPOINT from "../../configs/apis/endpoints/category";

interface Props {
  onClose: () => void;
  open: boolean;
  onCreated: (p: Category) => void;
  category?: Category;
  isEditing: boolean;
}

const CategoryDrawer: React.FC<Props> = ({ onClose, open, onCreated, isEditing, category }) => {
  const { t } = useTranslation();
  const {
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createCategorySchema(t)),
    defaultValues: isEditing ? category : {},
  });

  const onSubmit = async (data: { [key: string]: string }) => {
    try {
      let response;
      if (isEditing && category) {
        response = await axiosInstance.patch<Category>(CATEGORY_ENDPOINT.update(category.id), {
          name: data.name,
        });
      } else {
        response = await axiosInstance.post<Category>(CATEGORY_ENDPOINT.create, data);
      }

      onClose();
      onCreated(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isEditing && category) {
      reset({ ...category });
    }
  }, [reset, category, isEditing]);

  return (
    <Drawer
      title={isEditing ? "Edit category" : "Create a new category"}
      width={720}
      onClose={onClose}
      open={open}
      extra={
        <Space>
          <Button className="rounded-3xl border-none p-5 hover:!bg-slate-400" onClick={onClose}>
            Cancel
          </Button>
          <Button
            className="rounded-3xl border-none p-5"
            htmlType="submit"
            onClick={handleSubmit(onSubmit)}
            type="primary"
          >
            Submit
          </Button>
        </Space>
      }
    >
      <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
        <Row>
          <Button
            onClick={() => {
              reset({
                name: "",
              });
            }}
            title="Clear all"
            className="active:translate-y-1 bg-danger text-white border-none hover:!bg-danger hover:opacity-80 ml-auto !w-10 !h-10"
            icon={<MdDelete className="w-6 h-6" />}
          />
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="name"
              label="Name"
              validateStatus={errors.name ? "error" : ""}
              help={<p className="error-message">{errors.name ? errors.name.message : ""}</p>}
            >
              <Controller
                name="name"
                control={control}
                render={({ field }) => <Input {...field} className="h-12 rounded-lg" />}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

export default CategoryDrawer;
