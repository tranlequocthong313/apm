import React from "react";
import { FacebookOutlined, TwitterOutlined, InstagramOutlined } from "@ant-design/icons";
import { FaCcVisa, FaCcMastercard, FaPaypal } from "react-icons/fa";
import { Layout } from "antd";

const { Footer: AntdFooter } = Layout;

const Footer: React.FC = () => {
  return (
    <AntdFooter className="bg-gray-900 text-gray-300 text-center md:text-start">
      <div className="container mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Apps Cyclone</h2>
          <p className="text-sm">
            Discover a variety of products to fit your every need. Experience shopping like never
            before!
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="/about" className="hover:text-white">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-white">
                Contact Us
              </a>
            </li>
            <li>
              <a href="/faq" className="hover:text-white">
                FAQ
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:text-white">
                Terms & Conditions
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex space-x-4 text-2xl justify-center md:justify-normal">
            <a href="https://facebook.com" className="hover:text-blue-500">
              <FacebookOutlined />
            </a>
            <a href="https://twitter.com" className="hover:text-blue-400">
              <TwitterOutlined />
            </a>
            <a href="https://instagram.com" className="hover:text-pink-500">
              <InstagramOutlined />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mb-4">We Accept</h3>
          <div className="flex space-x-4 text-3xl justify-center md:justify-normal">
            <FaCcVisa className="text-blue-500" />
            <FaCcMastercard className="text-red-600" />
            <FaPaypal className="text-blue-400" />
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-10 py-6">
        <p className="text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Apps Cyclone. All rights reserved.
        </p>
      </div>
    </AntdFooter>
  );
};

export default Footer;
