"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("Option 1", "1", <PieChartOutlined />),
  getItem("Option 2", "2", <DesktopOutlined />),
  getItem("User", "sub1", <UserOutlined />, [
    getItem("Tom", "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),
  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Files", "9", <FileOutlined />),
];

const OrderDetails = () => {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState();
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  //   useEffect(() => {
  //     const checkAuth = async () => {
  //       const token = localStorage.getItem("sessionToken");
  //       if (!token) {
  //         console.log("no token");
  //         router.push("/");
  //         return;
  //       }

  //       try {
  //         const response = await fetch("/api/session", {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         });

  //         const data = await response.json();
  //         console.log(data);

  //         if (data.authenticated) {
  //           setAuthenticated(true);
  //         } else {
  //           console.log("no authentication");
  //           router.push("/");
  //         }
  //       } catch (error) {
  //         console.log("Error during authentication check:", error);
  //         router.push("/");
  //       }
  //     };

  //     checkAuth();
  //   }, [router]);

  useEffect(() => {
    const storedValue = localStorage.getItem("selectedOrder");
    const parsedValue = storedValue ? JSON.parse(storedValue) : [];
    setProgress((parsedValue.statusIndex / 4) * 100);
    setStatus(parsedValue.status);
    setData(parsedValue.orderedProdcuts);
  }, {});

  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />

        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            {/* <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item> */}
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 900,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <div class="w-full mb-20 p-4 text-center bg-yellow border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
              <h5 class="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
                {status}!
              </h5>
              <p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
                Your Order is {status}, You Will be Updated Once The Status is
                Changed
              </p>
              <div class="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
                <div
                  id="parentBar"
                  className="justify-center mt-3 w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 w-2/3"
                >
                  {/* <div id="bar" class="bg-blue-600 h-2.5 rounded-full w-0"></div> */}
                  <div
                    style={{
                      backgroundColor: "#2563eb", // bg-blue-600
                      height: "0.625rem", // h-2.5 (2.5 * 0.25rem = 0.625rem)
                      borderRadius: "9999px", // rounded-full (sets border-radius to a large value)
                      width: `${progress}%`, // w-0
                    }}
                  ></div>
                </div>
              </div>
            </div>

            <div>
              {data.map((d, i) => {
                return (
                  <a
                    key={i}
                    href="#"
                    className="flex flex-col mb-20 items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                  >
                    <img
                      className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                      src={d.product.avatar.replace(/['"]+/g, "")}
                      alt="product image"
                    />
                    <div className="flex flex-col justify-between p-4 leading-normal">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {d?.product.title}
                      </h5>
                      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        {d?.product.description}
                      </p>
                      <div className="flex justify-between w-full">
                        <span className="text-3xl font-bold text-gray-900 dark:text-white">
                          {d?.product_quantity}
                        </span>
                        <span className="text-3xl font-bold text-gray-900 dark:text-white">
                          ${d?.product.price}
                        </span>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default OrderDetails;
