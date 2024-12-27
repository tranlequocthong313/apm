import { Avatar, Image, Layout, Menu, MenuProps } from "antd";
import { Link } from "react-router";
import { User } from "../../configs/types/user";
import { MdOutlineCategory, MdOutlineDashboard, MdOutlineWarehouse } from "react-icons/md";
import React from "react";
import miniLogo from "../../assets/images/ac-mini-logo.jpeg";
import bigLogo from "../../assets/images/ac-logo.png";
import { useSelector } from "react-redux";
import { IRootState } from "../../store";
import "./index.css";

const { Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const getItems = (user: User): MenuItem[] => [
  getItem(
    user.name,
    "1",
    <Avatar
      size={48}
      src={`https://ui-avatars.com/api/?name=${user.name}&background=00A8A4&color=ffffff`}
    />,
  ),
  getItem(
    "Home",
    "2",
    <Link to={"/"}>
      <MdOutlineDashboard className="w-7 h-7" />
    </Link>,
  ),
  getItem(
    "Products",
    "3",
    <Link to={"/products"}>
      <MdOutlineWarehouse className="w-7 h-7" />
    </Link>,
  ),
  getItem(
    "Categories",
    "4",
    <Link to={"/categories"}>
      <MdOutlineCategory className="w-7 h-7" />
    </Link>,
  ),
];

interface Props {
  collapsed: boolean;
  onCollapse: (value: boolean) => void;
}

const Sidebar: React.FC<Props> = ({ collapsed, onCollapse }) => {
  const user = useSelector((state: IRootState) => state.auth.user)!;

  return (
    <Sider
      collapsedWidth={100}
      width={280}
      collapsible
      collapsed={collapsed}
      className="fixed top-0 bottom-0 overflow-auto transition-all duration-500"
      trigger={null}
      onMouseEnter={() => onCollapse(false)}
      onMouseLeave={() => onCollapse(true)}
    >
      <Link to={"/"}>
        {collapsed ? (
          <Image
            className="rounded-2xl mx-auto mt-8 !w-12"
            wrapperClassName="!w-full"
            preview={false}
            src={miniLogo}
            alt="logo"
          />
        ) : (
          <Image
            className="mx-auto mt-12 !w-[160px] !h-[32px]"
            src={bigLogo}
            preview={false}
            alt="logo"
            wrapperClassName="!w-full"
          />
        )}
      </Link>

      <Menu
        className="mt-40"
        defaultSelectedKeys={["2"]}
        mode="inline"
        theme="dark"
        items={getItems(user)}
      />
    </Sider>
  );
};

export default Sidebar;
