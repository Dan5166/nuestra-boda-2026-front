import { Outlet, useSearchParams } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  return (
    <>
      <Navbar code={code} />
      <Outlet />
    </>
  );
}
