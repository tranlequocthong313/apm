import { Layout } from "antd";
import { Outlet } from "react-router";
import classnames from "classnames";
import "./index.css";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import Navbar from "../components/Navbar";

const { Content } = Layout;

const NavAndSidebarLayout = () => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Layout className="bg-white">
      <Sidebar collapsed={collapsed} onCollapse={value => setCollapsed(value)} />

      <Layout
        className={classnames(
          collapsed ? "ml-[100px]" : "ml-[280px]",
          "transition-all",
          "duration-500",
        )}
      >
        <Navbar />
        <Content className="bg-white px-10 pt-7">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default NavAndSidebarLayout;
