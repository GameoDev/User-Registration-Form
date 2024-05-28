import Dashboard from "./components/dashboard/page";
import LoadPosts from "./components/load-posts/page";
import Products from "./components/load-products/page";
import Login from "./components/login-form/page";
import UploadMulitple from "./components/multiple-files/page";
import Signup from "./components/signup/page";

export default function Home() {
  return (
    <>
      {/* <Signup />
      <Login />
      <Dashboard />
      <UploadMulitple />*/}
      {/* <LoadPosts /> */}
      <Products />
    </>
  );
}
