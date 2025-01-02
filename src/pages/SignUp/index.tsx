import { Button, Flex, Form, Input } from "antd";
import logo from "../../assets/images/ac-mini-logo.jpeg";
import { FaAddressBook, FaAt, FaLock, FaLockOpen } from "react-icons/fa";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";
import { signUpSchema } from "../../configs/schemas/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignUpErrorFields } from "../../configs/types/auth";
import woman1 from "../../assets/images/woman1.png";
import "./index.css";
import http from "../../configs/apis";
import AUTH_ENDPOINT from "../../configs/apis/endpoints/auth";
import { Link, useNavigate } from "react-router";
import { AxiosError } from "axios";
import { IoPersonSharp } from "react-icons/io5";

const SignUpPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const schema = signUpSchema(t);
  const {
    control,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    document.title = "SignUp - Appscyclone Product Management";
  }, []);

  useEffect(() => {
    const names: (keyof SignUpErrorFields)[] = Object.keys(errors) as (keyof SignUpErrorFields)[];
    if (names.length > 0) {
      const name: SignUpErrorFields = names[0] as SignUpErrorFields;
      setFocus(name);
    }
  }, [errors, setFocus]);

  const signUp = async (data: { [key: string]: string | boolean }) => {
    try {
      await http.post(AUTH_ENDPOINT.signUp, {
        email: data.email,
        password: data.password,
        name: data.name,
        address: data.address,
      });
      navigate("/login");
    } catch (error) {
      if (error instanceof AxiosError && String(error.status).startsWith("4")) {
        toast.error(t("invalidEmailOrPassword"));
      } else {
        toast.error(t("somethingWentWrong"));
      }
    }
  };

  return (
    <Flex className="animate__animated animate__fadeIn">
      <ToastContainer />

      {/* Left Section */}
      {/* TODO: Swiper */}
      {/* TODO: Animation */}
      <Flex className="h-screen flex-1 hidden lg:block bg-primaryMain">
        <img
          src={woman1}
          alt="woman"
          className="animate__animated animate__fadeInLeft absolute bottom-0"
        />
      </Flex>

      {/* Right Section */}
      <section className="h-screen flex-1">
        <Flex vertical className="h-screen">
          <Flex vertical align="center" justify="center" className="h-full">
            <Flex vertical gap={40} className="lg:w-1/2 w-full md:w-4/5 px-3" align="center">
              <img src={logo} alt="logo" width={80} height={80} />

              <Flex vertical gap={20} align="center">
                <h1 className="text-h4">{t("welcomeTitle")}</h1>
                <p className="text-center text-[15px] text-textSecondary">
                  {t("welcomeDescription")}
                </p>
              </Flex>

              <Form onFinish={handleSubmit(signUp)} className="w-full">
                <Form.Item
                  className="mb-8"
                  name="name"
                  validateStatus={errors.name ? "error" : ""}
                  help={<p className="error-message">{errors.name ? errors.name.message : ""}</p>}
                >
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder={t("namePlaceholder")}
                        className="h-14 px-5"
                        suffix={<IoPersonSharp className="w-5 h-5 text-primaryMain" />}
                      />
                    )}
                  />
                </Form.Item>

                <Form.Item
                  className="mb-8"
                  name="address"
                  validateStatus={errors.address ? "error" : ""}
                  help={
                    <p className="error-message">{errors.address ? errors.address.message : ""}</p>
                  }
                >
                  <Controller
                    name="address"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder={t("addressPlaceholder")}
                        className="h-14 px-5"
                        suffix={<FaAddressBook className="w-5 h-5 text-primaryMain" />}
                      />
                    )}
                  />
                </Form.Item>

                <Form.Item
                  className="mb-8"
                  name="email"
                  validateStatus={errors.email ? "error" : ""}
                  help={<p className="error-message">{errors.email ? errors.email.message : ""}</p>}
                >
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder={t("emailPlaceholder")}
                        className="h-14 px-5"
                        suffix={<FaAt className="w-5 h-5 text-primaryMain" />}
                      />
                    )}
                  />
                </Form.Item>

                <Form.Item
                  className="mb-8"
                  name="password"
                  validateStatus={errors.password ? "error" : ""}
                  help={
                    <p className="error-message">
                      {errors.password ? errors.password.message : ""}
                    </p>
                  }
                >
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder={t("passwordPlaceholder")}
                        className="h-14 px-5"
                        type={showPassword ? "text" : "password"}
                        suffix={
                          showPassword ? (
                            <FaLockOpen
                              onClick={() => setShowPassword(false)}
                              className="w-5 h-5 text-primaryMain cursor-pointer hover:opacity-80"
                            />
                          ) : (
                            <FaLock
                              onClick={() => setShowPassword(true)}
                              className="w-5 h-5 text-primaryMain cursor-pointer hover:opacity-80"
                            />
                          )
                        }
                      />
                    )}
                  />
                </Form.Item>

                <Form.Item
                  className="mb-8"
                  name="passwordConfirm"
                  validateStatus={errors.passwordConfirm ? "error" : ""}
                  help={
                    <p className="error-message">
                      {errors.passwordConfirm ? errors.passwordConfirm.message : ""}
                    </p>
                  }
                >
                  <Controller
                    name="passwordConfirm"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder={t("passwordConfirmPlaceholder")}
                        className="h-14 px-5"
                        type={showPassword ? "text" : "password"}
                        suffix={
                          showPassword ? (
                            <FaLockOpen
                              onClick={() => setShowPassword(false)}
                              className="w-5 h-5 text-primaryMain cursor-pointer hover:opacity-80"
                            />
                          ) : (
                            <FaLock
                              onClick={() => setShowPassword(true)}
                              className="w-5 h-5 text-primaryMain cursor-pointer hover:opacity-80"
                            />
                          )
                        }
                      />
                    )}
                  />
                </Form.Item>

                <Flex justify="space-between" align="center" className="mb-10">
                  <Form.Item>
                    <Button
                      className="text-primaryMain hover:!text-primaryMain hover:opacity-80 hover:!bg-transparent px-0 border-none"
                      type="text"
                    >
                      {t("recoveryPassword")}
                    </Button>
                  </Form.Item>
                </Flex>

                <Form.Item>
                  <Button htmlType="submit" type="primary" className="w-full h-14 rounded-lg">
                    {t("signUp")}
                  </Button>
                </Form.Item>
              </Form>
            </Flex>
          </Flex>

          <Flex align="center" justify="center" className="mb-10">
            <p className="text-textSecondary">{t("haveAccount")}</p>
            <Button
              className="text-primaryMain ml-2.5 font-semibold text-[16px] hover:opacity-80 hover:!text-primaryMain hover:!bg-transparent px-0 border-none"
              type="text"
            >
              <Link to={"/login"}>{t("login")}</Link>
            </Button>
          </Flex>
        </Flex>
      </section>
    </Flex>
  );
};

export default SignUpPage;
