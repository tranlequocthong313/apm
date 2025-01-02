import { Avatar, Button, Dropdown, Flex, Input, Layout, MenuProps } from "antd";
import { MdOutlineSettings } from "react-icons/md";
import classNames from "classnames";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { VscSettings } from "react-icons/vsc";
import { RiNotification4Line } from "react-icons/ri";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../store";
import { logout } from "../../store/slices/authSlice";
import { useNavigate } from "react-router";
import { IoLogOutOutline, IoMenu } from "react-icons/io5";
import React from "react";

const { Header } = Layout;

interface Props {
  onToggle: () => void;
}

const Navbar: React.FC<Props> = ({ onToggle }) => {
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
          className="mr-6 text-white bg-tertiaryBackground border-none !p-5 rounded-lg md:hidden"
          icon={<IoMenu className="w-7 h-7" />}
        />
        <Input
          placeholder="Search..."
          prefix={<HiMagnifyingGlass />}
          className="border-none outline-none lg:w-96 w-full h-10 rounded-lg"
        />
      </Flex>

      <Flex gap={10}>
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
            size={40}
            src={`https://ui-avatars.com/api/?name=${user?.name}&background=00A8A4&color=ffffff`}
          />
        </Dropdown>
      </Flex>
    </Header>
  );
};

export default Navbar;
