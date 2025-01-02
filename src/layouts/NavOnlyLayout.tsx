import { Layout } from "antd";
import { Outlet } from "react-router";
import "./index.css";
import Navbar from "../components/Navbar2";

const { Content } = Layout;

const NavOnlyLayout = () => {
  return (
    <Layout className="bg-white pt-2.5">
      <Navbar />
      <Content className="bg-white pt-2.5">
        <Outlet />
      </Content>
    </Layout>
  );
};

export default NavOnlyLayout;
