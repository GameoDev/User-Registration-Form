import Link from "next/link";

const Home = () => {
  return (
    <>
      <h1>YOU ARE HERE AS A GUEST</h1>
      <br />
      <Link href={"/components/login-form"}>LOG IN</Link>
      <br />
      <br />
      <Link href={"/components/signup"}>SIGN UP</Link>
    </>
  );
};
export default Home;

{
  // import Mycart from "./components/cart-item/page";
  // import CheckOut from "./components/check-out/page";
  // import Dashboard from "./components/dashboard/page";
  // import LoadPosts from "./components/load-posts/page";
  // import Products from "./components/load-products/page";
  // import Login from "./components/login-form/page";
  // import UploadMulitple from "./components/multiple-files/page";
  // import Signup from "./components/signup/page";
  // export default function Home() {
  //   return (
  //     <>
  //       <h1>YOU ARE HERE AS A GUEST</h1>
  //       <link href="/components/login-form">SignIn</link>
  //       {/* <Signup />
  //       <Login />
  //       <Dashboard />
  //       <UploadMulitple />*/}
  //       {/* <LoadPosts /> */}
  //       <Products />
  //       {/* <Mycart />
  //       <CheckOut /> */}
  //     </>
  //   );
  // }
}
