import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import SendFunds from "./pages/SendFunds";
import Rates from "./pages/Rates";
import Wallets from "./pages/Wallets";
import Transactions from "./pages/Transactions";
import Reports from "./pages/Reports";
import Customers from "./pages/Customers";
import Staff from "./pages/Staff";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import { ThemeProvider } from "./context/ThemeContext";
import { Navigate } from "react-router-dom";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
            {/* 1. Public route - Login */}
            <Route path="/login" element={<Login />} />

            <Route element={<ProtectedRoute />}>
              <Route element={<Layout />}>
                {/* This makes Dashboard the default page after login */}
                <Route path="/" element={<Dashboard />} />
                
                <Route path="/orders" element={<Orders />} />
                <Route path="/send-funds" element={<SendFunds />} />
                <Route path="/rates" element={<Rates />} />
                <Route path="/wallets" element={<Wallets />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/staff" element={<Staff />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
              </Route>
            </Route>

            {/* Optional: Redirect any unknown route to login or dashboard */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;