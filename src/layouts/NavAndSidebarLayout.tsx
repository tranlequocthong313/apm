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
          collapsed ? "md:ml-[100px]" : "md:ml-[280px]",
          "transition-all",
          "duration-500",
          "px-3 md:px-0",
          "bg-white",
        )}
      >
        <Navbar onToggle={() => setCollapsed(!collapsed)} />
        <Content className="bg-white md:px-10 pt-7">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default NavAndSidebarLayout;
