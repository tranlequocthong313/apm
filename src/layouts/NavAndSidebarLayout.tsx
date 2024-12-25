import {
  Avatar,
  Button,
  Flex,
  Image,
  Input,
  Layout,
  Menu,
  MenuProps,
} from 'antd';
import { useState } from 'react';
import { Outlet } from 'react-router';
import classnames from 'classnames';
import miniLogo from '../assets/images/ac-mini-logo.jpeg';
import { VscSettings } from 'react-icons/vsc';
import bigLogo from '../assets/images/ac-logo.png';
import {
  MdOutlineDashboard,
  MdOutlineCategory,
  MdOutlineSettings,
  MdOutlineWarehouse,
} from 'react-icons/md';
import { RiNotification4Line } from 'react-icons/ri';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import './index.css';
import { useSelector } from 'react-redux';
import { IRootState } from '../store';
import { User } from '../configs/types/user';

const { Header, Content, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
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
    '1',
    <Avatar
      size={48}
      src={`https://ui-avatars.com/api/?name=${user.name}&background=00A8A4&color=ffffff`}
    />
  ),
  getItem('Home', '2', <MdOutlineDashboard className='w-7 h-7' />),
  getItem('Products', '3', <MdOutlineWarehouse className='w-7 h-7' />),
  getItem('Categories', '4', <MdOutlineCategory className='w-7 h-7' />),
];

const NavAndSidebarLayout = () => {
  const user = useSelector((state: IRootState) => state.auth.user)!;
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Layout className='bg-white'>
      <Sider
        collapsible
        collapsed={collapsed}
        className='fixed top-0 bottom-0 overflow-auto'
        trigger={null}
        onMouseEnter={() => setCollapsed(false)}
        onMouseLeave={() => setCollapsed(true)}
      >
        {collapsed ? (
          <Image
            className='rounded-2xl mx-auto mt-8 !w-12'
            wrapperClassName='!w-full'
            preview={false}
            src={miniLogo}
            alt='logo'
            width={50}
          />
        ) : (
          <Image
            className='mx-auto mt-10 !w-[160px]'
            src={bigLogo}
            preview={false}
            alt='logo'
            wrapperClassName='!w-full'
          />
        )}

        <Menu
          className='mt-40'
          defaultSelectedKeys={['2']}
          mode='inline'
          theme='dark'
          items={getItems(user)}
        />
      </Sider>

      <Layout className={classnames(collapsed ? 'ml-20' : 'ml-[200px]')}>
        <Header
          className={classnames(
            'px-10',
            'items-center',
            'bg-white',
            'flex',
            'justify-between',
            'pt-7',
            'h-20'
          )}
        >
          <Input
            placeholder='Search...'
            prefix={<HiMagnifyingGlass />}
            className='border-none outline-none w-96 h-10 rounded-lg '
          />
          <Flex gap={30}>
            <Button
              className='bg-secondaryBackground border-none rounded-lg h-10'
              title='Customize'
            >
              <VscSettings className='w-5 h-5' />
            </Button>
            <Button
              className='bg-secondaryBackground border-none rounded-lg h-10'
              title='Notification'
            >
              <RiNotification4Line className='w-5 h-5' />
            </Button>
            <Button
              className='bg-secondaryBackground border-none rounded-lg h-10'
              title='Setting'
            >
              <MdOutlineSettings className='w-5 h-5' />
            </Button>
          </Flex>
        </Header>
        <Content className='bg-white px-10 pt-7'>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default NavAndSidebarLayout;
