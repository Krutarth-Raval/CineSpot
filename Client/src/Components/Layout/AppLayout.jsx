import { useNavigation, Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { Loading } from "../../Pages/Loading";
 import { ToastContainer, toast } from 'react-toastify';
const AppLayout = () => {
  const navigation = useNavigation();

  if (navigation.state === "loading") {
    return <Loading />;
  }
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
       <ToastContainer/>
    </>
  );
};
export default AppLayout;
