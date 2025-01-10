import { Image, Layout, Menu, MenuProps } from "antd";
import { Link } from "react-router";
import { MdOutlineCategory, MdOutlineDashboard, MdOutlineWarehouse } from "react-icons/md";
import React, { useState } from "react";
import miniLogo from "../../assets/images/ac-mini-logo.jpeg";
import bigLogo from "../../assets/images/ac-logo.png";
import { AiOutlineShoppingCart } from "react-icons/ai";
import useSelectedMenuItem from "../../hooks/useSelectedMenuItem";
import "./index.css";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

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

const menuItems = (t: (val: string) => string): MenuItem[] => [
  getItem(
    t("home"),
    "/admin",
    <Link to={"/admin"}>
      <MdOutlineDashboard className="w-7 h-7" />
    </Link>,
  ),
  getItem(
    t("products"),
    "/admin/products",
    <Link to={"/admin/products"}>
      <MdOutlineWarehouse className="w-7 h-7" />
    </Link>,
  ),
  getItem(
    t("categories"),
    "/admin/categories",
    <Link to={"/admin/categories"}>
      <MdOutlineCategory className="w-7 h-7" />
    </Link>,
  ),
  getItem(
    t("purchases"),
    "/admin/purchases",
    <Link to={"/admin/purchases"}>
      <AiOutlineShoppingCart className="w-7 h-7" />
    </Link>,
  ),
];

interface Props {
  collapsed: boolean;
  onCollapse: (value: boolean) => void;
}

const Sidebar: React.FC<Props> = ({ collapsed, onCollapse }) => {
  const { t } = useTranslation();
  const [onTablet, setOnTablet] = useState(false);
  const { selectedMenuItem, setSelectedMenuItem } = useSelectedMenuItem();

  return (
    <Sider
      collapsedWidth={onTablet ? 0 : 100}
      width={onTablet ? "100%" : 280}
      collapsible
      collapsed={collapsed}
      className="fixed top-0 bottom-0 overflow-auto transition-all duration-500 z-50"
      trigger={null}
      onMouseEnter={() => onCollapse(false)}
      onMouseLeave={() => onCollapse(true)}
      breakpoint="lg"
      onBreakpoint={setOnTablet}
    >
      <Link to={"/admin"}>
        {collapsed ? (
          <Image
            className="rounded-2xl md:mx-auto mt-8 !w-12 ml-5"
            wrapperClassName="!w-full"
            preview={false}
            src={miniLogo}
            alt="logo"
          />
        ) : (
          <Image
            className="md:mx-auto mt-12 !w-[160px] !h-[32px] mx-auto"
            src={bigLogo}
            preview={false}
            alt="logo"
            wrapperClassName="!w-full"
          />
        )}
      </Link>

      <Menu
        selectedKeys={[selectedMenuItem]}
        onClick={e => {
          setSelectedMenuItem(e.key);
          onCollapse(true);
        }}
        defaultSelectedKeys={["1"]}
        mode="inline"
        theme="dark"
        items={menuItems(t)}
      />

      {onTablet && (
        <div
          className="w-full bg-primaryMain/30 p-5 cursor-pointer"
          onClick={() => onCollapse(true)}
        >
          <FaCircleArrowLeft className="mx-auto w-8 h-8 text-white" />
        </div>
      )}
    </Sider>
  );
};

export default Sidebar;
