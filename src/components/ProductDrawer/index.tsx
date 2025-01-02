import { Button, Col, Drawer, Form, Input, Row, Select, Space, UploadFile } from "antd";
import Dragger from "antd/es/upload/Dragger";
import ImageWithActions from "../ImageWithActions";
import { InboxOutlined } from "@ant-design/icons";
import { Category, Product } from "../../configs/types/product";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../configs/apis";
import PRODUCT_ENDPOINT from "../../configs/apis/endpoints/product";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createProductSchema, editProductSchema } from "../../configs/schemas/product";
import { useTranslation } from "react-i18next";
import { MdDelete } from "react-icons/md";
import CATEGORY_ENDPOINT from "../../configs/apis/endpoints/category";
import { IoMdCheckmark, IoMdClose } from "react-icons/io";

interface Props {
  onClose: () => void;
  open: boolean;
  onCreated: (p: Product) => void;
  product?: Product;
  isEditing: boolean;
}

const ProductDrawer: React.FC<Props> = ({ onClose, open, onCreated, isEditing, product }) => {
  const { t } = useTranslation();
  const [categoryOptions, setCategoryOptions] = useState<{ label: string; value: string }[]>([
    { label: "", value: "" },
  ]);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [image, setImageFile] = useState<File | null | string>();
  const {
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(isEditing ? editProductSchema(t) : createProductSchema(t)),
    defaultValues: isEditing ? { ...product, categories: [] } : {},
  });

  useEffect(() => {
    if (product) {
      setImageFile(`http://${product?.picture}`);
    }
  }, [product]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get<{ categories: Category[]; total: number }>(
          CATEGORY_ENDPOINT.categories,
        );
        const options = response.data.categories.map(category => ({
          label: category.name,
          value: category.id || "",
        }));
        setCategoryOptions(options);
      } catch (error) {
        console.log("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (isEditing && product) {
      reset({ ...product, categories: [] });
      setFileList(
        product.picture
          ? [
              {
                uid: "1",
                name: product.picture.split("/").pop() || "image",
                status: "done",
                url: product.picture,
              },
            ]
          : [],
      );
    }
  }, [reset, product, isEditing]);

  const handleUploadAfterCreate = async (productId: string) => {
    if (image) {
      const formData = new FormData();
      formData.append("file", image);
      try {
        const response = await axiosInstance.patch<Product>(
          PRODUCT_ENDPOINT.upload(productId),
          formData,
        );
        return response.data.picture;
      } catch (error) {
        console.log(error);
      }
    }
  };

  const onSubmit = async (data: { [key: string]: string | number | (string | undefined)[] }) => {
    try {
      let response;
      if (isEditing && product) {
        response = await axiosInstance.patch<Product>(PRODUCT_ENDPOINT.update(product.id), {
          name: data.name,
          basePrice: data.basePrice,
          discountPercentage: data.discountPercentage,
          description: data.description,
          stock: data.stock,
        });
      } else {
        response = await axiosInstance.post<Product>(PRODUCT_ENDPOINT.create, data);
      }
      if (image) {
        const picture = await handleUploadAfterCreate(response.data.id);
        if (picture) {
          response.data.picture = picture;
        }
      }

      onClose();
      onCreated(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const resetAll = () => {
    reset({
      name: "",
      basePrice: 0,
      discountPercentage: 0,
      stock: 0,
      description: "",
      categories: [],
    });
    setImageFile(null);
    setFileList([]);
  };

  const handleClose = () => {
    onClose();
    resetAll();
  };

  return (
    <Drawer
      title={isEditing ? "Edit product" : "Create a new product"}
      width={720}
      onClose={handleClose}
      open={open}
      extra={
        <Space>
          <Button
            className="rounded-3xl border-none p-5 hover:!bg-slate-400 hidden md:flex"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            className="rounded-3xl border-none p-5 hover:!bg-slate-400 bg-secondaryBackground text-textPrimary md:hidden !w-10 !h-10"
            onClick={handleClose}
            icon={<IoMdClose />}
          />
          <Button
            className="rounded-3xl border-none p-5 hidden md:flex"
            htmlType="submit"
            onClick={handleSubmit(onSubmit)}
            type="primary"
          >
            Submit
          </Button>
          <Button
            className="rounded-3xl border-none p-5 md:hidden !w-10 !h-10"
            htmlType="submit"
            onClick={handleSubmit(onSubmit)}
            type="primary"
            icon={<IoMdCheckmark />}
          />
        </Space>
      }
    >
      <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
        <Row>
          <Button
            onClick={resetAll}
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
        <Row gutter={16}>
          <Col span={24} md={8}>
            <Form.Item
              name="basePrice"
              label="Base price $"
              validateStatus={errors.basePrice ? "error" : ""}
              help={
                <p className="error-message">{errors.basePrice ? errors.basePrice.message : ""}</p>
              }
            >
              <Controller
                name="basePrice"
                control={control}
                render={({ field }) => (
                  <Input defaultValue={0} {...field} className="h-12 rounded-lg" />
                )}
              />
            </Form.Item>
          </Col>
          <Col span={24} md={8}>
            <Form.Item
              name="discountPercentage"
              label="Discount %"
              validateStatus={errors.discountPercentage ? "error" : ""}
              help={
                <p className="error-message">
                  {errors.discountPercentage ? errors.discountPercentage.message : ""}
                </p>
              }
            >
              <Controller
                name="discountPercentage"
                control={control}
                render={({ field }) => (
                  <Input defaultValue={0} {...field} className="h-12 rounded-lg" />
                )}
              />
            </Form.Item>
          </Col>
          <Col span={24} md={8}>
            <Form.Item
              name="stock"
              label="Stock"
              validateStatus={errors.stock ? "error" : ""}
              help={<p className="error-message">{errors.stock ? errors.stock.message : ""}</p>}
            >
              <Controller
                name="stock"
                control={control}
                render={({ field }) => (
                  <Input defaultValue={0} {...field} className="h-12 rounded-lg" />
                )}
              />
            </Form.Item>
          </Col>
        </Row>
        {!isEditing && (
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="categories"
                label="Category"
                validateStatus={errors.categories ? "error" : ""}
                help={
                  <p className="error-message">
                    {errors.categories ? errors.categories.message : ""}
                  </p>
                }
              >
                <Controller
                  name="categories"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      mode="multiple"
                      placeholder="Select categories"
                      className="w-full h-12 rounded-lg !bg-secondaryBackground"
                      options={categoryOptions}
                    />
                  )}
                />
              </Form.Item>
            </Col>
          </Row>
        )}
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="description"
              label="Description"
              validateStatus={errors.description ? "error" : ""}
              help={
                <p className="error-message">
                  {errors.description ? errors.description.message : ""}
                </p>
              }
            >
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <Input.TextArea {...field} rows={4} className="rounded-lg" />
                )}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item name="picture" label="Picture">
              <Dragger
                beforeUpload={file => {
                  setImageFile(file);
                  setFileList([file]);
                  return false;
                }}
                onRemove={() => {
                  setImageFile(null);
                  setFileList([]);
                }}
                customRequesto={() => {}}
                maxCount={1}
                fileList={fileList}
                className="h-40 rounded-lg"
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
              </Dragger>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <ImageWithActions
              src={image}
              onChange={file => {
                setImageFile(file);
                const uploadFile: UploadFile = {
                  uid: `uid-${Date.now()}`,
                  name: file.name,
                  status: "done",
                  size: file.size,
                  type: file.type,
                  originFileObj: {
                    ...file,
                    lastModifiedDate: new Date(),
                    uid: `uid-${Date.now()}`,
                  },
                };
                setFileList([uploadFile]);
              }}
              onRemove={() => {
                setImageFile(null);
                setFileList([]);
              }}
            />
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

export default ProductDrawer;
