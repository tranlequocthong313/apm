import { Button, Flex, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import classNames from "classnames";
import { IoMdClose } from "react-icons/io";

interface Props {
  onRemove?: () => void;
  onChange?: (f: File) => void;
  onPreview?: () => void;
  src?: File | null | string;
  modal?: boolean;
}

const ImageWithActions: React.FC<Props> = ({ onRemove, src, onChange, onPreview, modal }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [modalImagePreview, setModalImagePreview] = useState<string | null>(null);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [image, setImage] = useState<File>();

  useEffect(() => {
    if (!src) {
      setImagePreview(null);
      return;
    }
    if (typeof src === "string") {
      setImagePreview(src);
      setModalImagePreview(src);
    } else {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
        setModalImagePreview(reader.result as string);
      };
      reader.readAsDataURL(src);
    }
  }, [src]);

  const handleImageChange = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleModalImageChange = (file: File) => {
    setImage(file);
    const reader = new FileReader();
    reader.onload = () => setModalImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    onRemove?.();
    setImagePreview(null);
  };

  const handleChangeImage = () => {
    document.getElementById("file-input")?.click();
  };

  if (!src) {
    return <></>;
  }

  return (
    <>
      <Modal
        open={openModal && modal}
        closable={true}
        onClose={() => setOpenModal(false)}
        onCancel={() => setOpenModal(false)}
        okText={"Save"}
        onOk={() => {
          if (image) {
            onChange?.(image);
          }
          setOpenModal(false);
        }}
        title={"Edit product image"}
      >
        <Flex className="my-10" vertical gap={50}>
          <input
            id="file-input"
            type="file"
            onChange={e => {
              if (e.target.files && e.target.files[0]) {
                handleModalImageChange(e.target.files[0]);
              }
            }}
          />

          <img
            src={modalImagePreview || ""}
            alt="Image"
            className="w-full max-w-xs mx-auto rounded shadow-md"
          />
        </Flex>
      </Modal>

      <div className="relative mt-8 group !max-w-full !w-auto h-auto mx-auto">
        <img
          src={imagePreview || ""}
          alt="Image"
          className="w-full max-w-xs mx-auto rounded shadow-md"
        />
        <div
          className={classNames(
            "absolute",
            "inset-0",
            "lg:bg-black",
            "lg:bg-opacity-50",
            "lg:opacity-0",
            "group-hover:lg:opacity-100",
            "transition-opacity",
            "flex",
            "justify-center",
            "items-center",
            "space-x-4",
          )}
        >
          <Button
            shape="circle"
            icon={<EyeOutlined />}
            onClick={() => {
              onPreview?.();
              setIsPreviewVisible(true);
            }}
            title="Preview"
          />
          {onChange && (
            <Button
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => (modal ? setOpenModal(true) : handleChangeImage())}
              title="Change"
            />
          )}
          {onRemove && (
            <Button
              shape="circle"
              icon={<DeleteOutlined />}
              danger
              onClick={handleRemoveImage}
              title="Remove"
            />
          )}
        </div>
        {!modal && (
          <input
            id="file-input"
            type="file"
            className="!hidden"
            onChange={e => {
              if (e.target.files && e.target.files[0]) {
                handleImageChange(e.target.files[0]);
                onChange?.(e.target.files[0]);
              }
            }}
          />
        )}
      </div>

      {isPreviewVisible && imagePreview && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
          onClick={e => {
            if (e.target === e.currentTarget) {
              setIsPreviewVisible(false);
            }
          }}
        >
          <img src={imagePreview} alt="Preview Fullscreen" className="max-w-full max-h-full" />
          <Button
            className="absolute top-4 right-4 border-none hover:!bg-transparent hover:opacity-80"
            type="text"
            onClick={() => setIsPreviewVisible(false)}
            icon={<IoMdClose className="w-10 h-10 text-white" />}
          />
        </div>
      )}
    </>
  );
};

export default ImageWithActions;
