import { Avatar, Button, Dropdown, Flex, Input, Layout, MenuProps } from "antd";
import { MdHome, MdOutlineSettings } from "react-icons/md";
import classNames from "classnames";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { VscSettings } from "react-icons/vsc";
import { RiNotification4Line } from "react-icons/ri";
import "./index.css";
import { useNavigate } from "react-router";
import { IoLogOutOutline, IoMenu } from "react-icons/io5";
import React from "react";
import { useTranslation } from "react-i18next";
import { GrLanguage } from "react-icons/gr";
import useUser from "../../hooks/useUser";
import useLanguage from "../../hooks/useLanguage";
import useLogout from "../../hooks/useLogout";
import useChangeLanguage from "../../hooks/useChangeLanguage";

const { Header } = Layout;

interface Props {
  onToggle: () => void;
}

const Navbar: React.FC<Props> = ({ onToggle }) => {
  const { t } = useTranslation();
  const language = useLanguage();
  const user = useUser();
  const navigate = useNavigate();
  const logout = useLogout();
  const changeLanguage = useChangeLanguage();

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Flex
          gap={30}
          align="center"
          className="p-2"
          onClick={() => {
            navigate("/");
          }}
        >
          <MdHome className="w-6 h-6" />
          {t("home")}
        </Flex>
      ),
    },
    {
      key: "3",
      label: (
        <Flex gap={30} align="center" className="p-2">
          <GrLanguage className="w-6 h-6" />
          {t("language")}
        </Flex>
      ),
      children: [
        {
          key: "en",
          label: (
            <Flex
              className={classNames("p-2", language === "en" ? "text-primaryMain font-bold" : "")}
              align="center"
              gap={30}
              onClick={() => changeLanguage("en")}
            >
              <span>English</span>
            </Flex>
          ),
        },
        {
          key: "vi",
          label: (
            <Flex
              align="center"
              className={classNames("p-2", language === "vi" ? "text-primaryMain font-bold" : "")}
              gap={30}
              onClick={() => changeLanguage("vi")}
            >
              <span>Tiếng việt</span>
            </Flex>
          ),
        },
      ],
    },
    { type: "divider" },
    {
      key: "2",
      label: (
        <Flex
          gap={30}
          align="center"
          className="text-danger p-2"
          onClick={() => {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            logout();
            navigate("/login");
          }}
        >
          <IoLogOutOutline className="w-6 h-6" />
          {t("logout")}
        </Flex>
      ),
    },
  ];

  return (
    <Header
      className={classNames(
        "px-10",
        "items-center",
        "bg-white",
        "flex",
        "justify-between",
        "pt-7",
        "md:h-20",
        "h-32",
        "flex-col",
        "md:flex-row",
        "navbar",
      )}
    >
      <Flex align="center" className="w-full md:mr-10">
        <Button
          onClick={onToggle}
          className="mr-6 text-white bg-tertiaryBackground border-none !p-5 rounded-lg lg:hidden"
          icon={<IoMenu className="w-7 h-7" />}
        />
        <Input
          placeholder={t("search") + "..."}
          prefix={<HiMagnifyingGlass />}
          className="border-none outline-none lg:w-96 w-full h-10 rounded-lg"
        />
      </Flex>

      <Flex gap={32}>
        <Button className="bg-secondaryBackground border-none rounded-lg h-10" title="Customize">
          <VscSettings className="w-5 h-5" />
        </Button>
        <Button className="bg-secondaryBackground border-none rounded-lg h-10" title="Notification">
          <RiNotification4Line className="w-5 h-5" />
        </Button>
        <Button className="bg-secondaryBackground border-none rounded-lg h-10" title="Setting">
          <MdOutlineSettings className="w-5 h-5" />
        </Button>

        <Dropdown menu={{ items }} trigger={["click"]}>
          <Avatar
            className="cursor-pointer"
            size={40}
            src={`https://ui-avatars.com/api/?name=${user?.name}&background=00A8A4&color=ffffff`}
          />
        </Dropdown>
      </Flex>
    </Header>
  );
};

export default Navbar;
