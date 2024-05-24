import Dashboard from "./components/dashboard/page";
import Login from "./components/login-form/page";
import UploadMulitple from "./components/multiple-files/page";
import Signup from "./components/signup/page";

export default function Home() {
  return (
    <>
      <Signup />
      <Login />
      <Dashboard />
      <UploadMulitple />
    </>
  );
}
