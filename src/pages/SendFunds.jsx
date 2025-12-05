// src/pages/SendFunds.jsx  ← FINAL BEAUTIFUL VERSION
import { useLocation, Link } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Send, Copy, CheckCircle, UserPlus, Wallet } from "lucide-react";

const wallets = [
  { id: 1, name: "MPESA-1", bank: "Vodacom", accNo: "0123456789", balance: 50000000 },
  { id: 2, name: "MPESA-2", bank: "Vodacom", accNo: "9876543210", balance: 15000 },
];

export default function SendFunds() {
  const { state } = useLocation();
  const order = state?.order || null;

  const [activeTab, setActiveTab] = useState(order ? "order" : "walkin");
  const [selectedWallet, setSelectedWallet] = useState(wallets[0]);
  const [copied, setCopied] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [walkin, setWalkin] = useState({ name: "", phone: "", usd: "" });

  const rate = 1620;
  const amount = order ? order.tzs : (walkin.usd * rate || 0);

  const handleSend = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 4000);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Header */}
      <div className="d-flex align-items-center gap-3 mb-4">
        <Link to="/orders" className="btn btn-outline-secondary">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h2 className="mb-1 fw-bold">Send Funds</h2>
          <p className="text-muted">Send funds for a specific order or manually (walk-in) send to customer</p>
        </div>
      </div>

      {/* MODERN TABS — BOLDER & CLEANER */}
      <ul className="nav nav-tabs mb-4 border-bottom border-1" style={{ borderColor: "var(--border)" }}>
        <li className="nav-item">
          <button
            className={`nav-link px-4 py-3 fs-5 ${activeTab === "order" ? "active fw-bold text-success border-bottom border-2 border-success" : "text-muted"}`}
            onClick={() => setActiveTab("order")}
            disabled={!order}
          >
            From Order {order && `• ${order.id}`}
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link px-4 py-3 fs-5 ${activeTab === "walkin" ? "active fw-bold text-success border-bottom border-2 border-success" : "text-muted"}`}
            onClick={() => setActiveTab("walkin")}
          >
            <UserPlus size={20} className="me-2" /> Walk-in Customer
          </button>
        </li>
      </ul>

      {/* ORDER MODE */}
      {activeTab === "order" && order && (
        <div className="row g-5">
          {/* Left: Summary */}
          <div className="col-lg-5">
            <div className="card shadow-sm rounded-3 border-0 h-100" style={{ border: "1px solid var(--border)" }}>
              <div className="card-header bg-success text-white">
                <h5 className="mb-0">Order Summary • {order.id}</h5>
              </div>
              <div className="card-body">
                <div className="form-group"><label>Customer</label><p className="fw-bold fs-5">{order.customer}</p></div>
                <div className="form-group"><label>Phone</label><p className="fw-bold">{order.phone}</p></div>
                <hr />
                <div className="form-group"><label>USD Amount</label><p className="fw-bold fs-5 text-primary">${order.usd.toLocaleString()}</p></div>
                <div className="form-group"><label>Rate Applied</label><p className="fw-bold">{order.rate.toLocaleString()}</p></div>
              </div>
            </div>
          </div>

          {/* Right: Payment Form — NOW WITH PROPER SPACING */}
          <div className="col-lg-7">
            <div className="card shadow-sm rounded-3" style={{ border: "1px solid var(--border)" }}>
              <div className="card-body">   {/* ← Extra padding */}
                <div className="form-group mb-4">
                  <label className="form-label fw-semibold">Send From Wallet</label>
                  <select
                    className="form-select form-select-lg"
                    value={selectedWallet.id}
                    onChange={(e) => setSelectedWallet(wallets.find(w => w.id == e.target.value))}
                  >
                    {wallets.map(w => (
                      <option key={w.id} value={w.id}>
                        {w.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label fw-semibold">Account Name</label>
                  <div className="input-group">
                    <input className="form-control" value={order.customer} readOnly />
                    <button className="btn btn-outline-secondary" onClick={() => copyToClipboard(order.customer)}>
                      {copied ? <CheckCircle className="text-success" /> : <Copy />}
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label fw-semibold">Account Number</label>
                  <div className="input-group">
                    <input className="form-control" value="0123456789" readOnly />
                    <button className="btn btn-outline-secondary" onClick={() => copyToClipboard("0123456789")}>
                      {copied ? <CheckCircle className="text-success" /> : <Copy />}
                    </button>
                  </div>
                </div>

                <div className="form-group mt-4">
                  <label className="form-label fw-semibold">Amount to Send</label>
                  <div className="alert alert-info text-center py-3 mb-3">
                    <h2 className="mb-0 fw-bold">TZS {amount.toLocaleString()}</h2>
                  </div>
                </div>

                <div className="d-flex gap-3 mt-4">
                  <Link to="/orders" className="btn btn-outline-secondary flex-fill">
                    Cancel
                  </Link>
                  <button onClick={handleSend} className="btn btn-success btn-lg flex-fill d-flex align-items-center justify-content-center gap-2">
                    <Send size={20} /> Confirm & Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* WALK-IN MODE — SAME GREEN AMOUNT BOX STYLE */}
      {activeTab === "walkin" && (
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow-sm rounded-3" style={{ border: "1px solid var(--border)" }}>
              <div className="card-body">
                <h4 className="text-center mb-5 mt-4">Walk-in Customer Payment</h4>

                <div className="row g-4">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label fw-semibold">Customer Name</label>
                      <input className="form-control form-control-lg" placeholder="Enter name" onChange={e => setWalkin({...walkin, name: e.target.value})} />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label fw-semibold">Phone Number</label>
                      <input className="form-control form-control-lg" placeholder="e.g 0754000000" onChange={e => setWalkin({...walkin, phone: e.target.value})} />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label fw-semibold">USD Amount</label>
                      <input type="number" className="form-control form-control-lg" placeholder="e.g 2500" onChange={e => setWalkin({...walkin, usd: e.target.value})} />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label fw-semibold">Send From Wallet</label>
                      <select className="form-select form-select-lg">
                        {wallets.map(w => <option key={w.id}>{w.name}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                {/* SAME GREEN AMOUNT BOX AS ORDER TAB */}
                <div className="alert alert-info text-center py-3 mb-3">
                  <small className="d-block fw-semibold mb-2">Amount to Pay Customer</small>
                  <h2 className="mb-0 fw-bold">TZS {(walkin.usd * rate || 0).toLocaleString()}</h2>
                </div>

                

                <div className="d-flex gap-3 mt-4 mb-4">
                  <Link to="/orders" className="btn btn-outline-secondary flex-fill">
                    Cancel
                  </Link>
                  <button onClick={handleSend} className="btn btn-success btn-lg flex-fill d-flex align-items-center justify-content-center gap-2">
                    <Send size={20} /> Send Funds Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUCCESS ANIMATION */}
      {showSuccess && (
        <div className="position-fixed top-50 start-50 translate-middle text-center" style={{ zIndex: 9999 }}>
          <div className="bg-white rounded-4 shadow-lg p-5 animate__animated animate__bounceIn">
            <CheckCircle size={80} className="text-success mb-3" />
            <h3>Payment Sent!</h3>
            <p className="text-muted">TZS {amount.toLocaleString()} transferred successfully</p>
          </div>
        </div>
      )}
    </>
  );
}