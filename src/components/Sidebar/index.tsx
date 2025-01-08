import { Avatar, Button, Col, Flex, Image, Layout, Menu, MenuProps, Row } from "antd";
import { Link } from "react-router";
import { MdOutlineCategory, MdOutlineDashboard, MdOutlineWarehouse } from "react-icons/md";
import React, { useState } from "react";
import miniLogo from "../../assets/images/ac-mini-logo.jpeg";
import bigLogo from "../../assets/images/ac-logo.png";
import { useSelector } from "react-redux";
import { IRootState } from "../../store";
import "./index.css";
import { IoMdClose } from "react-icons/io";
import { AiOutlineShoppingCart } from "react-icons/ai";

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

const menuItems: MenuItem[] = [
  getItem(
    "Home",
    "2",
    <Link to={"/admin"}>
      <MdOutlineDashboard className="w-7 h-7" />
    </Link>,
  ),
  getItem(
    "Products",
    "3",
    <Link to={"/admin/products"}>
      <MdOutlineWarehouse className="w-7 h-7" />
    </Link>,
  ),
  getItem(
    "Categories",
    "4",
    <Link to={"/admin/categories"}>
      <MdOutlineCategory className="w-7 h-7" />
    </Link>,
  ),
  getItem(
    "Purchases",
    "5",
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
  const user = useSelector((state: IRootState) => state.auth.user)!;
  const [onMobile, setOnMobile] = useState(false);

  return (
    <Sider
      collapsedWidth={onMobile ? 0 : 100}
      width={onMobile ? "100%" : 280}
      collapsible
      collapsed={collapsed}
      className="fixed top-0 bottom-0 overflow-auto transition-all duration-500 z-50"
      trigger={null}
      onMouseEnter={() => onCollapse(false)}
      onMouseLeave={() => onCollapse(true)}
      breakpoint="xs"
      onBreakpoint={setOnMobile}
    >
      <Row>
        <Col span={16} md={24}>
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
                className="md:mx-auto mt-12 !w-[160px] !h-[32px] ml-5"
                src={bigLogo}
                preview={false}
                alt="logo"
                wrapperClassName="!w-full"
              />
            )}
          </Link>
        </Col>

        <Col span={8} className="md:hidden flex items-center justify-end pr-5">
          <Button
            type="text"
            icon={<IoMdClose className="w-8 h-8" />}
            className="mt-8 text-white border-none md:hidden"
            onClick={() => onCollapse(true)}
          />
        </Col>
      </Row>

      <Menu defaultSelectedKeys={["2"]} mode="inline" theme="dark" items={menuItems} />

      <Flex className="mt-96" justify="center" align="center">
        <Avatar
          className=""
          size={48}
          src={`https://ui-avatars.com/api/?name=${user.name}&background=00A8A4&color=ffffff`}
        />
      </Flex>
    </Sider>
  );
};

export default Sidebar;
