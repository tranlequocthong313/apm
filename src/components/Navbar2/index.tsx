import { Avatar, Badge, Button, Dropdown, Flex, Image, Input, Layout, MenuProps } from "antd";
import classNames from "classnames";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { AiOutlineShoppingCart } from "react-icons/ai";
import bigLogo from "../../assets/images/ac-logo.png";
import { RiNotification4Line } from "react-icons/ri";
import { MdDashboard, MdFavoriteBorder } from "react-icons/md";
import "./index.css";
import { Link, useNavigate } from "react-router";
import { IoLogOutOutline } from "react-icons/io5";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { User } from "../../configs/types/user";
import { GrLanguage } from "react-icons/gr";
import { useTranslation } from "react-i18next";
import useUser from "../../hooks/useUser";
import useLanguage from "../../hooks/useLanguage";
import useLogout from "../../hooks/useLogout";
import useChangeLanguage from "../../hooks/useChangeLanguage";

const { Header } = Layout;

const Navbar = () => {
  const { t } = useTranslation();
  const user = useUser();
  const language = useLanguage();
  const navigate = useNavigate();
  const logout = useLogout();
  const changeLanguage = useChangeLanguage();

  const items = (user: User): MenuProps["items"] => {
    const dropdownItems: MenuProps["items"] = [];
    if (user.role === "ADMIN") {
      dropdownItems.push({
        key: "1",
        label: (
          <Flex
            gap={30}
            align="center"
            className="p-2"
            onClick={() => {
              navigate("/admin");
            }}
          >
            <MdDashboard className="w-6 h-6" />
            {t("dashboard")}
          </Flex>
        ),
      });
    }

    dropdownItems.push({ type: "divider" });
    dropdownItems.push({
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
    });

    dropdownItems.splice(dropdownItems.length - 2, 0, {
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
    });

    return dropdownItems;
  };

  return (
    <Header
      className={classNames(
        "items-center",
        "bg-white",
        "flex",
        "justify-between",
        "flex-col",
        "md:flex-row",
        "px-3 lg:px-[50px]",
        "h-28 md:h-[64px]",
        "navbar2",
      )}
    >
      <Flex className="lg:gap-10 gap-5" align="center">
        <Link to={"/"} className="items-center hidden md:flex">
          <Image src={bigLogo} preview={false} alt="logo" className="lg:!w-[200px]" />
        </Link>

        <Input
          placeholder="What are you looking for?"
          prefix={<HiMagnifyingGlass />}
          className="border-none outline-none lg:w-96 md:w-38 h-10 rounded-lg"
        />
      </Flex>

      <Flex className="lg:gap-8 gap-5" align="center">
        <Badge count={5}>
          <Button className="bg-secondaryBackground border-none rounded-lg h-10" title="Cart">
            <AiOutlineShoppingCart className="w-5 h-5" />
          </Button>
        </Badge>
        <Badge count={19}>
          <Button
            className="bg-secondaryBackground border-none rounded-lg h-10"
            title="Notification"
          >
            <RiNotification4Line className="w-5 h-5" />
          </Button>
        </Badge>
        <Badge count={0}>
          <Button className="bg-secondaryBackground border-none rounded-lg h-10" title="Purchase">
            <Link reloadDocument to={"/purchases"}>
              <MdFavoriteBorder className="w-5 h-5" />
            </Link>
          </Button>
        </Badge>

        {user ? (
          <Dropdown menu={{ items: items(user) }} trigger={["click"]}>
            <Flex align="center" className="leading-5 cursor-pointer" gap={12}>
              <Avatar
                size={46}
                src={`https://ui-avatars.com/api/?name=${user?.name}&background=00A8A4&color=ffffff`}
              />
              <Flex className="hidden lg:flex" vertical gap={5}>
                <span className="text-sm text-textSecondary">{t("welcomeBack")}!</span>
                <strong>{user?.name}</strong>
              </Flex>
              <MdOutlineKeyboardArrowDown className="w-5 h-5" />
            </Flex>
          </Dropdown>
        ) : (
          <Button className="rounded-3xl bg-primaryMain border-none text-white py-5 px-6 font-bold">
            <Link to={"/login"}>
              {t("login")} / {t("register")}
            </Link>
          </Button>
        )}
      </Flex>
    </Header>
  );
};

export default Navbar;
