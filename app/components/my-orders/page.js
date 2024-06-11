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

const MyOrders = () => {
  const hasFetchedData = useRef(false);
  const [data, setData] = useState([]);
  const [visibleDropdowns, setVisibleDropdowns] = useState({});

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
    if (!hasFetchedData.current) {
      hasFetchedData.current = true;

      const fetchData = async () => {
        try {
          const formData = {};
          const storedValue = localStorage.getItem("userId");
          const userID = Number(storedValue);
          formData["userId"] = userID;

          const response = await fetch(`http://localhost:3000/api/order`, {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const _fetchedData = await response.json();
          console.log(_fetchedData);
          setData(_fetchedData);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
  }, []);

  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const toggleDropdown = (index) => {
    setVisibleDropdowns((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleClick = async (event, index, message) => {
    event.preventDefault(); // Prevent the default anchor behavior if needed

    toggleDropdown(index);

    document.querySelector(`#dropDown-${index}`).innerHTML = message;

    const formData = {
      to: "gameotrixdev@gmail.com",
      subject: "Order Confirmation",
      text: `We are Happy To Share That Your Order is ${message}. For Further Information Feel Free To Contact Us At : 111-11-72772`,
    };

    try {
      const response = await fetch("http://localhost:3000/api/send-email", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "content-type": "application/json",
        },
      });

      const result = await response.json();
      console.log(result);

      if (response.ok) {
        alert("Email sent successfully");
      } else {
        alert("Error sending email");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Error sending email");
    }
  };

  const HandleShowDetail = (index) => {
    localStorage.setItem("selectedOrder", JSON.stringify(data[index]));
    router.push("/components/order-details");
  };

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
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">
                <div></div>
              </div>
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="p-4">
                      <div className="flex items-center"></div>
                    </th>
                    <th scope="col" className="px-20 py-3">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Total Products
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Total
                    </th>
                    <th scope="col" className="px-40 py-3">
                      Status
                    </th>
                  </tr>
                </thead>
                {data.map((d, i) => {
                  const totalQuantity = d?.orderedProdcuts?.length;

                  const orders = d?.orderedProdcuts;
                  let totalCost = 0;
                  for (let index = 0; index < orders.length; index++) {
                    totalCost +=
                      orders[index].product.price *
                      orders[index].product_quantity;
                  }
                  return (
                    <>
                      <tbody>
                        <tr
                          onClick={(event) => HandleShowDetail(i)}
                          className="cursor-pointer bg-white border-b dark:border-gray-700 hover:bg-gray-50"
                        >
                          <td className="w-4 p-4">
                            <div className="flex items-center"></div>
                          </td>
                          <th
                            scope="row"
                            className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            <div className="ps-3">
                              <div className="text-base font-semibold text-black">
                                {d?.orderedTime
                                  ? new Date(d.orderedTime).toLocaleString()
                                  : ""}
                              </div>
                            </div>
                          </th>

                          <td className="px-6 py-4">
                            <div className="flex items-center text-black ml-10">
                              {totalQuantity}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center text-black">
                              {totalCost}$
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="relative ml-20">
                              <button
                                // onClick={() => toggleDropdown(i)}
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-20 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                // type="button"
                                id={`${"dropDown"}-${i}`}
                              >
                                {d?.status}
                              </button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </>
                  );
                })}
              </table>
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

export default MyOrders;
