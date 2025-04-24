import { Outlet } from "react-router-dom";
import Navbar from "../../shared/navbar/Navbar";
import Footer from "../../shared/footer/Footer";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="h-[80vh] overflow-y-auto container-todo">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
