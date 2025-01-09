import "./index.css";
import { Avatar, Button, Card, Col, Flex, Row, Table, TableProps, Tag } from "antd";
import { RiShareForwardLine } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import { Product } from "../../../configs/types/product";
import { BsApple } from "react-icons/bs";
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { SiShopee } from "react-icons/si";
import { IoStatsChart } from "react-icons/io5";
import { FaChartLine } from "react-icons/fa";
import { useEffect } from "react";

const CardHeader = ({ title, icon }: { title: React.ReactNode; icon?: React.ReactNode }) => {
  return (
    <Flex justify="space-between">
      {title}
      {icon}
    </Flex>
  );
};

const getRandomIcon = () => {
  const icons = [
    <BsApple className="icon" />,
    <FaGoogle className="icon" />,
    <FaFacebook className="icon" />,
    <SiShopee className="icon" />,
  ];
  const randomIndex = Math.floor(Math.random() * icons.length);
  return icons[randomIndex];
};

const getRandomTag = () => {
  const tags = [
    <Tag className="bg-success tag">LOW</Tag>,
    <Tag className="bg-danger tag">HIGH</Tag>,
    <Tag className="bg-warn tag">MEDIUM</Tag>,
  ];
  const randomIndex = Math.floor(Math.random() * tags.length);
  return tags[randomIndex];
};

const columns: TableProps<Product>["columns"] = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: text => (
      <Flex gap={8} align="center">
        {getRandomIcon()}
        <strong className="text-lg">{text}</strong>
        {getRandomTag()}
      </Flex>
    ),
  },
  {
    title: "Price $",
    dataIndex: "basePrice",
    key: "basePrice",
    render: text => `$${text}`,
  },
  {
    title: "Discount %",
    dataIndex: "discountPercentage",
    key: "discountPercentage",
    render: text => `${text}%`,
  },
  {
    title: "Stock",
    dataIndex: "stock",
    key: "stock",
  },
  {
    key: "action",
    render: () => (
      <Button className="border border-tertiaryBackground bg-white rounded-2xl text-xs font-semibold text-textPrimary">
        View details
      </Button>
    ),
  },
];

const data: Product[] = [
  {
    id: "6f4ca8a4-8aa0-4302-ac1b-7b5547f01b0a",
    name: "Brand black wheelchair",
    urlName: "brand-black-wheelchair",
    picture: "image.jpg",
    basePrice: 70,
    discountPercentage: 10,
    stock: 42,
    description: "Black wheelchair for offices",
    createdAt: "2022-03-26T15:41:28.527Z",
  },
  {
    id: "6f4ca8a4-8aa0-4302-ac1b-7b5547f01b0b",
    name: "Brand black wheelchair",
    urlName: "brand-black-wheelchair",
    picture: "image.jpg",
    basePrice: 70,
    discountPercentage: 10,
    stock: 42,
    description: "Black wheelchair for offices",
    createdAt: "2022-03-26T15:41:28.527Z",
  },
  {
    id: "6f4ca8a4-8aa0-4302-ac1b-7b5547f01b0c",
    name: "Brand black wheelchair",
    urlName: "brand-black-wheelchair",
    picture: "image.jpg",
    basePrice: 70,
    discountPercentage: 10,
    stock: 42,
    description: "Black wheelchair for offices",
    createdAt: "2022-03-26T15:41:28.527Z",
  },
  {
    id: "6f4ca8a4-8aa0-4302-ac1b-7b5547f01b0d",
    name: "Brand black wheelchair",
    urlName: "brand-black-wheelchair",
    picture: "image.jpg",
    basePrice: 70,
    discountPercentage: 10,
    stock: 42,
    description: "Black wheelchair for offices",
    createdAt: "2022-03-26T15:41:28.527Z",
  },
];

const Dashboard = () => {
  useEffect(() => {
    document.title = "Dashboard - Appscyclone Ecommerce Management";
  }, []);

  return (
    <Flex vertical className="dashboard">
      <Row gutter={18}>
        <Col className="mb-5 lg:mb-0" lg={6} span={24}>
          <Card
            title={
              <CardHeader
                title={<span className="text-sm text-white">Read more</span>}
                icon={<RiShareForwardLine className="bg-white rounded-full p-1" size={20} />}
              />
            }
            className="bg-[#581edd] rounded-2xl"
          >
            <h3 className="w-4/5 text-h3 text-white font-bold">Product prices will increase</h3>
            <FaChartLine className="mt-6 w-40 h-40 ml-auto mr-5 text-[#efdc5a]" />
          </Card>
        </Col>
        <Col lg={6} span={24} className="mb-5 lg:mb-0">
          <Flex gap={18} vertical>
            <Card
              title={
                <CardHeader
                  title={<span className="text-sm text-textPrimary">Read more</span>}
                  icon={<RiShareForwardLine className="bg-white rounded-full p-1" size={20} />}
                />
              }
              className="bg-success rounded-2xl"
            >
              <Flex justify="space-between" align="flex-end" className="mb-5 lg:mb-0">
                <h2 className="w-3/5 text-h2 text-textPrimary font-bold">32h</h2>
                <IoStatsChart className="w-32 h-32" />
              </Flex>
            </Card>
            <Row gutter={18}>
              <Col lg={18} span={24} className="mb-5 lg:mb-0">
                <Card
                  title={
                    <CardHeader
                      title={<span className="text-sm text-white">Read more</span>}
                      icon={<RiShareForwardLine className="bg-white rounded-full p-1" size={20} />}
                    />
                  }
                  className="bg-danger rounded-2xl"
                >
                  <h2 className="text-h2 text-white font-bold">+80%</h2>
                </Card>
              </Col>
              <Col span={24} lg={6}>
                <div className="border-tertiaryBackground border h-full rounded-2xl flex items-center">
                  <IoMdAdd className="w-10 h-10 mx-auto" />
                </div>
              </Col>
            </Row>
          </Flex>
        </Col>
        <Col lg={7} span={24} className="mb-5 lg:mb-0">
          <Flex vertical justify="space-between" className="bg-info rounded-2xl h-full px-6 py-5">
            <Flex vertical gap={20}>
              <h6 className="text-white text-h6 font-semibold">Product Management Insights</h6>
              <Card title="Sales Overview" className="bg-success rounded-2xl">
                <h4 className="text-h4 text-textPrimary font-bold">$45,000</h4>
                <p className="text-textPrimary text-sm">Total sales this month</p>
              </Card>
              <Card title="Active Products" className="bg-warn rounded-2xl">
                <h4 className="text-h4 text-textPrimary font-bold">120 Products</h4>
                <p className="text-textPrimary text-sm">Active in inventory</p>
              </Card>
            </Flex>
          </Flex>
        </Col>
        <Col span={24} lg={5}>
          <Flex
            vertical
            justify="space-between"
            gap={60}
            className="bg-tertiaryBackground rounded-2xl px-6 py-5"
          >
            <Flex vertical gap={30}>
              <h5 className="text-white text-h5 font-semibold felx-1">
                Until August choose a discount product. The best discount will always help you.
              </h5>
              <Avatar.Group>
                <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
                <a href="https://ant.design">
                  <Avatar style={{ backgroundColor: "#f56a00" }}>K</Avatar>
                </a>
                <a href="https://ant.design">
                  <Avatar style={{ backgroundColor: "#c01100" }}>T</Avatar>
                </a>
              </Avatar.Group>
            </Flex>
            <Flex justify="space-between">
              <span className="text-white text-[14px]">Import start</span>
              <strong className="text-white text-[14px]">06/08/2023</strong>
            </Flex>
          </Flex>
        </Col>
      </Row>

      <Table<Product>
        columns={columns}
        dataSource={data}
        pagination={false}
        rowKey={record => record.id}
        scroll={{ x: true }}
      />
    </Flex>
  );
};

export default Dashboard;
