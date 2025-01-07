import { Avatar, Badge, Button, Dropdown, Flex, Image, Input, Layout, MenuProps } from "antd";
import classNames from "classnames";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { AiOutlineShoppingCart } from "react-icons/ai";
import bigLogo from "../../assets/images/ac-logo.png";
import { RiNotification4Line } from "react-icons/ri";
import { MdFavoriteBorder } from "react-icons/md";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../store";
import { logout } from "../../store/slices/authSlice";
import { Link, useNavigate } from "react-router";
import { IoLogOutOutline } from "react-icons/io5";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const { Header } = Layout;

const Navbar = () => {
  const user = useSelector((state: IRootState) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Flex
          gap={50}
          justify="space-between"
          align="center"
          className="text-danger"
          onClick={() => {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            dispatch(logout());
            navigate("/login");
          }}
        >
          Logout
          <IoLogOutOutline className="w-6 h-6" />
        </Flex>
      ),
    },
  ];

  return (
    <Header
      className={classNames(
        "items-center",
        "bg-white",
        "flex",
        "justify-between",
        "flex-col",
        "md:flex-row",
        "navbar",
        "px-3 lg:px-[50px]",
        "h-28 md:h-[64px]",
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
          <Button className="bg-secondaryBackground border-none rounded-lg h-10" title="Customize">
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
          <Button className="bg-secondaryBackground border-none rounded-lg h-10" title="Setting">
            <MdFavoriteBorder className="w-5 h-5" />
          </Button>
        </Badge>

        {user ? (
          <Dropdown menu={{ items }} trigger={["click"]}>
            <Flex align="center" className="leading-5 cursor-pointer" gap={12}>
              <Avatar
                size={46}
                src={`https://ui-avatars.com/api/?name=${user?.name}&background=00A8A4&color=ffffff`}
              />
              <Flex className="hidden lg:flex" vertical gap={5}>
                <span className="text-sm text-textSecondary">Welcome Back!</span>
                <strong>{user?.name}</strong>
              </Flex>
              <MdOutlineKeyboardArrowDown className="w-5 h-5" />
            </Flex>
          </Dropdown>
        ) : (
          <Button className="rounded-3xl bg-primaryMain border-none text-white py-5 px-6 font-bold">
            <Link to={"/login"}>Login / Register</Link>
          </Button>
        )}
      </Flex>
    </Header>
  );
};

export default Navbar;
