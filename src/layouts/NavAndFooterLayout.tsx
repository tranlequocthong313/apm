import { Layout } from "antd";
import { Outlet } from "react-router";
import "./index.css";
import Navbar from "../components/Navbar2";
import Footer from "../components/Footer";

const { Content } = Layout;

const NavAndFooterLayout = () => {
  return (
    <Layout className="bg-white pt-2.5">
      <Navbar />
      <Content className="bg-white pt-2.5">
        <Outlet />
      </Content>
      <Footer />
    </Layout>
  );
};

export default NavAndFooterLayout;
