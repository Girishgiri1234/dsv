import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useCart } from "../../../views/context/CartContext";
import { IoMdMenu, IoMdClose } from "react-icons/io";


const Header = () => {
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const [isSidebarOpen, setSidebarOpen] = useState(false);



  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 bg-white shadow-md flex flex-col z-30 transition-transform duration-300 transform 
        md:translate-x-0 md:static md:h-screen w-64
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        {/* Brand */}
        <div className="p-6 flex justify-between items-center">
          <div className="text-xl font-bold text-orange-600">Admin</div>
          <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
            <IoMdClose size={24} />
          </button>
        </div>

        {/* Menu */}
        <nav className="px-4 space-y-2 flex-1 overflow-auto">
          <NavLink
            to="/dashboard"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg ${isActive
                ? "bg-orange-100 text-orange-700"
                : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/userlist"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg ${isActive
                ? "bg-orange-100 text-orange-700"
                : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            Users
          </NavLink>
          <NavLink
            to="/Speakers"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg ${isActive
                ? "bg-orange-100 text-orange-700"
                : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            Speakers
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="flex justify-between md:justify-end items-center bg-white shadow px-6 py-4 gap-4">
          <button
            className="md:hidden text-gray-700"
            onClick={() => setSidebarOpen(true)}
          >
            <IoMdMenu size={28} />
          </button>

          <div className="flex items-center gap-4">
            {/* Cart Count */}
            <div
              onClick={() => navigate("/cart")}
              className="flex items-center gap-2 bg-orange-100 px-4 py-2 rounded-lg cursor-pointer hover:bg-orange-200 transition"
            >
              <span className="text-orange-700 font-semibold">Cart: {cartCount}</span>
            </div>

            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Header;
