// src/components/Layout.jsx
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { Menu, Home, ShoppingCart, Send, DollarSign, Wallet, History, BarChart3, Users, Settings, LogOut, User, Moon, Sun, Bell } from "lucide-react";
import { useState, useEffect } from "react";
import { useLogout } from "../utils/logout";  // or wherever you put it

const navItems = [
  { to: "/", label: "Dashboard", icon: Home },
  { to: "/orders", label: "Orders", icon: ShoppingCart },
  { to: "/send-funds", label: "Send Funds", icon: Send },
  { to: "/rates", label: "Exchange Rates", icon: DollarSign },
  { to: "/wallets", label: "Wallets", icon: Wallet },
  { to: "/transactions", label: "Transactions", icon: History },
  { to: "/reports", label: "Reports", icon: BarChart3 },
  { to: "/customers", label: "Customers", icon: Users },
  { to: "/staff", label: "Staff Management", icon: Users },
  { to: "/settings", label: "Settings", icon: Settings },
];

export default function Layout() {
  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const logout = useLogout();

  const user = { name: "Erick Mgongolwa", role: "Cashier" };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 992) setSidebarOpen(false);
      else setSidebarOpen(true);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="d-flex flex-grow-1">
        {/* Sidebar */}
        <div
          id="sidebar"
          className={`border-end shadow-sm transition-all duration-300 ${sidebarOpen ? "w-72" : "w-20"}`}
          style={{ minWidth: sidebarOpen ? "18rem" : "5rem" }}>
          {/* Clean Header - Same height as topbar, NO extra button */}
          <div className="p-4 border-bottom d-flex align-items-center" style={{ height: "73px" }}>
            <h3 className={`mb-0 text-success fw-bold ${!sidebarOpen && "d-none"}`}>
              Erick Forex
            </h3>
          </div>

          <nav className="mt-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`d-flex align-items-center px-4 py-3 text-decoration-none transition-all ${
                    active 
                      ? "bg-success text-white" 
                      : "text-primary-hover"
                  }`}
                  style={{ 
                    color: active ? "white" : "inherit",
                    opacity: active ? 1 : 0.85
                  }}>
                  <Icon size={22} />
                  <span className={`ms-4 fw-medium ${!sidebarOpen && "d-none"}`}>
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-grow-1 d-flex flex-column">
          {/* Topbar - Only ONE clean hamburger */}
          <header className="bg-white shadow-sm border-bottom px-4 d-flex align-items-center" style={{ height: "73px" }}>
            <div className="d-flex justify-content-between align-items-center w-100">
              <button
                onClick={toggleSidebar}
                className="btn btn-outline-secondary toggle-menu"
                style={{ width: "56px", height: "56px" }}>
                <Menu size={28} strokeWidth={2.5} />
              </button>

              <div className="d-flex align-items-center gap-3">
                <button className="btn btn-outline-secondary position-relative">
                  <Bell size={22} />
                  <span className="badge bg-danger rounded-pill position-absolute top-0 start-100 translate-middle">
                    3
                  </span>
                </button>

                <button 
                  onClick={toggleTheme} 
                  className="btn btn-outline-secondary theme-toggle-btn">
                  {theme === "light" ? (
                    <Moon size={22} />
                  ) : (
                    <Sun size={22} className="text-warning" />
                  )}
                </button>

                <div className="dropdown">
                  <button
                    className="btn btn-outline-success d-flex align-items-center gap-2 dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                  >
                    <User size={22} />
                    <span>{user.name}</span>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end shadow">
                    <li><Link className="dropdown-item" to="/profile">My Profile</Link></li>
                    <li><Link className="dropdown-item" to="/settings">Settings</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button onClick={logout} className="dropdown-item text-danger">
                        <LogOut size={18} className="me-2" /> Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-grow-1 p-4 bg-light">
            <Outlet />
          </main>

          {/* Footer */}
          <footer className="bg-white border-top py-4 mt-auto">
            <div className="text-center">
              <p className="mb-0 text-muted">
                 © {new Date().getFullYear()} Erick Forex (Bureau De Change). All rights reserved.
                <br />
                <small className="text-success">Powered by Grandson Technology • Version 1.0</small>
              </p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}