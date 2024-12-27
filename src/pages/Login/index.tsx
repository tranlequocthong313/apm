import { Button, Checkbox, Flex, Form, Input } from "antd";
import logo from "../../assets/images/ac-mini-logo.jpeg";
import { FaAt, FaLock, FaLockOpen } from "react-icons/fa";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";
import createLoginSchema from "../../configs/schemas/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginErrorFields, LoginResponse } from "../../configs/types/auth";
import woman1 from "../../assets/images/woman1.png";
import "./index.css";
import http from "../../configs/apis";
import AUTH_ENDPOINT from "../../configs/apis/endpoints/auth";
import USER_ENDPOINT from "../../configs/apis/endpoints/user";
import { User } from "../../configs/types/user";
import { useNavigate } from "react-router";
import { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { login as loginAction } from "../../store/slices/authSlice";

const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const schema = createLoginSchema(t);
  const {
    control,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    document.title = "Login - Appscyclone Product Management";
  }, []);

  useEffect(() => {
    const names: (keyof LoginErrorFields)[] = Object.keys(errors) as (keyof LoginErrorFields)[];
    if (names.length > 0) {
      const name: LoginErrorFields = names[0] as LoginErrorFields;
      setFocus(name);
    }
  }, [errors, setFocus]);

  const login = async (data: { [key: string]: string | boolean }) => {
    try {
      const response = await http.post<LoginResponse>(AUTH_ENDPOINT.login, {
        email: data.email,
        password: data.password,
      });
      const { accessToken, refreshToken } = response.data;
      const profile = await getProfile(accessToken);
      if (!profile) {
        toast.error(t("somethingWentWrong"));
        return;
      }
      const isAdmin = profile.role === "ADMIN";
      if (!isAdmin) {
        toast.error(t("notAllowed"));
        return;
      }

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      dispatch(loginAction(profile));

      navigate("/");
    } catch (error) {
      if (error instanceof AxiosError && String(error.status).startsWith("4")) {
        toast.error(t("invalidEmailOrPassword"));
      } else {
        toast.error(t("somethingWentWrong"));
      }
    }
  };

  const getProfile = async (accessToken: string) => {
    try {
      const response = await http.get<User>(USER_ENDPOINT.profile, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch {
      toast.error(t("somethingWentWrong"));
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

              <Form onFinish={handleSubmit(login)} className="w-full">
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

                <Flex justify="space-between" align="center" className="mb-10">
                  <Form.Item
                    name="rememberMe"
                    validateStatus={errors.rememberMe ? "error" : ""}
                    help={
                      <p className="error-message">
                        {errors.rememberMe ? errors.rememberMe.message : ""}
                      </p>
                    }
                  >
                    <Controller
                      name="rememberMe"
                      control={control}
                      render={({ field }) => (
                        <Checkbox {...field} checked={field.value} className="text-textSecondary">
                          {t("rememberMe")}
                        </Checkbox>
                      )}
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      className="text-primaryMain hover:!text-primaryMain hover:opacity-80 hover:!bg-transparent px-0"
                      type="text"
                    >
                      {t("recoveryPassword")}
                    </Button>
                  </Form.Item>
                </Flex>

                <Form.Item>
                  <Button htmlType="submit" type="primary" className="w-full h-14 rounded-lg">
                    {t("login")}
                  </Button>
                </Form.Item>
              </Form>
            </Flex>
          </Flex>

          <Flex align="center" justify="center" className="mb-10">
            <p className="text-textSecondary">{t("noAccount")}</p>
            <Button
              className="text-primaryMain ml-2.5 font-semibold text-[16px] hover:opacity-80 hover:!text-primaryMain hover:!bg-transparent px-0"
              type="text"
            >
              {t("signUp")}
            </Button>
          </Flex>
        </Flex>
      </section>
    </Flex>
  );
};

export default LoginPage;
