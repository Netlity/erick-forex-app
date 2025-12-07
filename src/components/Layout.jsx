// src/components/Layout.jsx - FULL CODE (Theme Toggle Repositioned for Mobile)

import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { Menu, Home, ShoppingCart, Send, DollarSign, Wallet, History, BarChart3, Users, Settings, LogOut, User, Moon, Sun, Bell } from "lucide-react";
import { useState, useEffect } from "react";
import { useLogout } from "../utils/logout";

// --- Nav Component (REUSABLE FOR DESKTOP AND MOBILE) ---
const SidebarNav = ({ navItems, location, sidebarOpen, onLinkClick }) => (
  <nav className="mt-4">
    {navItems.map((item) => {
      const Icon = item.icon;
      const active = location.pathname === item.to;
      return (
        <Link
          key={item.to}
          to={item.to}
          onClick={onLinkClick} 
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
);
// --------------------------------------------------------

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
      if (window.innerWidth >= 992) setSidebarOpen(true);
      else setSidebarOpen(false); 
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  const closeOffcanvas = () => {
    if (window.innerWidth < 992) {
        const closeButton = document.querySelector('#mobileSidebar .btn-close');
        if (closeButton) {
            closeButton.click();
        }
    }
  };

  return (
    <div className={`d-flex flex-column bg-light`} style={{ minHeight: '100vh' }}> 
      
      <div className="d-flex flex-grow-1 w-100"> 

        {/* 1. DESKTOP SIDEBAR */}
        <div
          className={`d-none d-lg-flex flex-column border-end shadow-sm transition-all duration-300 bg-white`}
          style={{ minWidth: sidebarOpen ? "18rem" : "5rem", zIndex: 1020 }}> 
          
          <div className={`p-4 border-bottom d-flex align-items-center`} style={{ height: "73px" }}>
            <h3 className={`mb-0 text-success fw-bold ${!sidebarOpen && "d-none"}`}>
              Chotuwahe
            </h3>
          </div>
          <SidebarNav navItems={navItems} location={location} sidebarOpen={sidebarOpen} onLinkClick={null} />
        </div>


        {/* 2. MOBILE SIDEBAR (Offcanvas) */}
        <div 
          className={`offcanvas offcanvas-start d-lg-none`} 
          tabIndex="-1" 
          id="mobileSidebar" 
          aria-labelledby="mobileSidebarLabel">
            
          <div className={`offcanvas-header border-bottom bg-white`}>
              <h5 className="offcanvas-title text-success fw-bold" id="mobileSidebarLabel">Chotuwahe</h5>
              <button type="button" className={`btn-close`} data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          
          <div className="offcanvas-body p-0 bg-white d-flex flex-column"> {/* Add flex-column to manage content spacing */}
            
            <div className="flex-grow-1"> {/* Navigation takes up available space */}
                <SidebarNav navItems={navItems} location={location} sidebarOpen={true} onLinkClick={closeOffcanvas} /> 
            </div>

            {/* NEW MOBILE THEME TOGGLE SECTION */}
            <div className="mt-auto px-4 py-3"> {/* Use mt-auto to push to the bottom */}
                
                <hr className="my-3" /> {/* Horizontal rule above the toggle */}
                
                <div className="d-flex align-items-center justify-content-between">
                    <span className="fw-medium text-muted">Toggle Theme</span>
                    <button 
                        onClick={toggleTheme} 
                        className={`btn btn-outline-secondary theme-toggle-btn`}>
                        {theme === "light" ? (
                            <Moon size={22} />
                        ) : (
                            <Sun size={22} className="text-warning" />
                        )}
                    </button>
                </div>

            </div>
            {/* END NEW MOBILE THEME TOGGLE SECTION */}

          </div>
        </div>

        {/* 3. MAIN CONTENT AREA - Takes full width */}
        <div className="flex-grow-1 d-flex flex-column w-100"> 
          
          {/* Topbar */}
          <header className={`navbar navbar-expand-lg shadow-sm border-bottom bg-white`}>
            <div className="container-fluid px-4">
              
              {/* Menu Triggers (mobile/desktop) */}
              <button
                className="btn btn-outline-secondary d-lg-none" 
                data-bs-toggle="offcanvas"
                data-bs-target="#mobileSidebar"
                aria-controls="mobileSidebar"
                style={{ width: "48px", height: "48px" }}> 
                <Menu size={24} strokeWidth={2.5} />
              </button>
              
              <button
                onClick={toggleSidebar}
                className="btn btn-outline-secondary me-3 d-none d-lg-block" 
                style={{ width: "48px", height: "48px" }}> 
                <Menu size={24} strokeWidth={2.5} />
              </button>

              {/* The rest of the content - Pushed to the right */}
              <div className="ms-auto d-flex align-items-center gap-3"> 
                <button className={`btn btn-outline-secondary position-relative`}>
                  <Bell size={22} />
                  <span className="badge bg-danger rounded-pill position-absolute top-0 start-100 translate-middle">
                    3
                  </span>
                </button>

                {/* THEME TOGGLE BUTTON - HIDDEN ON MOBILE/TABLET (d-none d-lg-block) */}
                <button 
                  onClick={toggleTheme} 
                  className={`btn btn-outline-secondary theme-toggle-btn d-none d-lg-block`}> 
                  {theme === "light" ? (
                    <Moon size={22} />
                  ) : (
                    <Sun size={22} className="text-warning" />
                  )}
                </button>

                <div className="dropdown">
                  <button
                    className={`btn btn-outline-success d-flex align-items-center gap-2 dropdown-toggle`}
                    type="button"
                    data-bs-toggle="dropdown"
                  >
                    <User size={22} />
                    <span>{user.name}</span>
                  </button>
                  <ul className={`dropdown-menu dropdown-menu-end shadow`}>
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
          <main className={`flex-grow-1 p-4 bg-light`}>
            <Outlet />
          </main>

          {/* Footer */}
          <footer className={`border-top py-4 mt-auto bg-white`}>
            <div className="text-center">
              <p className="mb-0 text-muted">
                 © {new Date().getFullYear()} Chotuwahe De Change. All rights reserved.
                <br />
                <small className="text-success">Powered by Grandson Technologies • Version 1.0</small>
              </p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}