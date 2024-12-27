import { Button, Flex, Input, Layout } from "antd";
import { MdOutlineSettings } from "react-icons/md";
import classNames from "classnames";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { VscSettings } from "react-icons/vsc";
import { RiNotification4Line } from "react-icons/ri";
import "./index.css";

const { Header } = Layout;

const Navbar = () => {
  return (
    <Header
      className={classNames(
        "px-10",
        "items-center",
        "bg-white",
        "flex",
        "justify-between",
        "pt-7",
        "h-20",
      )}
    >
      <Input
        placeholder="Search..."
        prefix={<HiMagnifyingGlass />}
        className="border-none outline-none w-96 h-10 rounded-lg "
      />
      <Flex gap={30}>
        <Button className="bg-secondaryBackground border-none rounded-lg h-10" title="Customize">
          <VscSettings className="w-5 h-5" />
        </Button>
        <Button className="bg-secondaryBackground border-none rounded-lg h-10" title="Notification">
          <RiNotification4Line className="w-5 h-5" />
        </Button>
        <Button className="bg-secondaryBackground border-none rounded-lg h-10" title="Setting">
          <MdOutlineSettings className="w-5 h-5" />
        </Button>
      </Flex>
    </Header>
  );
};

export default Navbar;
