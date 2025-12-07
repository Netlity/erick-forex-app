// src/pages/Dashboard.jsx - FULL CODE (SMART OPENING BALANCE CARD Reverted)

import { Link } from "react-router-dom";
import { useState } from "react";
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Clock, 
  DollarSign, 
  ShoppingCart, 
  Send, 
  Wallet 
} from "lucide-react";

// Stats Data
const stats = [
  {
    title: "Today's Orders",
    value: "68",
    change: "+12%",
    trend: "up",
    icon: ShoppingCart,
    color: "text-primary"
  },
  {
    title: "Funds Sent (TZS)",
    value: "47,820,000",
    change: "+8.3%",
    trend: "up",
    icon: Send,
    color: "text-success"
  },
  {
    title: "Pending Orders",
    value: "5",
    change: "2 urgent",
    trend: "down",
    icon: Clock,
    color: "text-warning"
  },
  {
    title: "Today's Profit (TZS)",
    value: "3,940,000",
    change: "+18.7%",
    trend: "up",
    icon: DollarSign,
    color: "text-success"
  }
];

// Material Card Component
const StatCard = ({ stat }) => {
  const Icon = stat.icon;
  const isUp = stat.trend === "up";
  
  return (
    // Responsive grid: 1 card per row on mobile, 2 on tablet, 4 on large screens
    <div className="col-12 col-sm-6 col-lg-3"> 
      <div
        className="card h-100 border-0 shadow-sm rounded-3 overflow-hidden bg-body"
        style={{
          transition: "all 0.3s ease",
          cursor: "pointer"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-4px)";
          e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.15)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.05)";
        }}
      >
        <div className="card-body p-4">
          <div className="d-flex align-items-start justify-content-between mb-3">
            <div className={`p-3 rounded-3 bg-opacity-10 ${stat.color} bg-success`}> 
              <Icon size={28} className={stat.color} />
            </div>
            <span className={`small fw-bold d-flex align-items-center gap-1 ${
              isUp ? "text-success" : "text-danger"
            }`}>
              {isUp ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
              {stat.change}
            </span>
          </div>
          
          <h6 className="text-muted mb-1">{stat.title}</h6>
          <h3 className="mb-0 fw-bold">{stat.value}</h3>
        </div>

        {/* Subtle gradient accent bar */}
        <div
          className="h-2 w-100"
          style={{
            background: "linear-gradient(90deg, var(--bs-success) 0%, transparent 70%)",
            opacity: 0.2
          }}
        />
      </div>
    </div>
  );
};

export default function Dashboard() {
  const [openingBalanceSet, setOpeningBalanceSet] = useState(true); 
  const [showBalanceModal, setShowBalanceModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  const todayBalance = "92,500,000";
  const lastSet = "Today, 04 Dec 2025 at 08:15 AM by Aisha";

  const history = [
    { date: "2025-12-04", amount: "92,500,000", by: "Aisha Ibrahim", time: "08:15 AM" },
    { date: "2025-12-03", amount: "88,200,000", by: "Aisha Ibrahim", time: "08:30 AM" },
    { date: "2025-12-02", amount: "90,750,000", by: "John Doe", time: "07:55 AM" },
  ];

  return (
    <>
      {/* Welcome Section */}
      <div className="mb-4">
        <h2 className="mb-2 fw-bold">Welcome back, Erick</h2>
        <p className="text-muted">Here's what's happening today at Chotuwahe De Change</p>
      </div>

      {/* Stats Cards */}
      <div className="row g-4 mb-5 pb-4 border-bottom">
        {stats.map((stat, index) => (
          <StatCard key={index} stat={stat} />
        ))}
      </div>

      {/* SMART OPENING BALANCE CARD - REVERTED */}
      <div className="row g-4 mb-5">
        <div className="col-12">
          <div className="card shadow-sm rounded-3 border bg-body">
            <div className="card-body">
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-4">
                <div className="flex-grow-1">
                  <h5 className="mb-2 d-flex align-items-center gap-2">
                    Opening Balance
                    {openingBalanceSet ? (
                      <span className="badge bg-info">Set Today</span>
                    ) : (
                      <span className="badge bg-danger">Not Set</span>
                    )}
                  </h5>
                  {openingBalanceSet ? (
                    <>
                      <p className="mb-1 fw-bold fs-4 text-success">{todayBalance}</p>
                      <p className="text-muted small mb-0">{lastSet}</p>
                    </>
                  ) : (
                    <p className="text-danger mb-0">Opening balance has not been set for today!</p>
                  )}
                </div>
                {/* REVERTED: Original gap-2 flex container */}
                <div className="d-flex gap-2">
                  <button className="btn btn-outline-success" onClick={() => setShowHistoryModal(true)}>
                    View History
                  </button>
                  <button className="btn btn-success" onClick={() => setShowBalanceModal(true)}>
                    {openingBalanceSet ? "Update Balance" : "Set Balance"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions & Rate */}
      <div className="row g-4 mb-5">
        {/* Quick Actions Card */}
        <div className="col-lg-8"> 
          <div 
            className="card border-0 shadow-sm rounded-3 h-100 bg-body"
          >
            <div className="card-body p-4 p-md-5 text-center d-flex flex-column justify-content-center">
              <h4 className="mb-4">Ready to process payments?</h4>
              
              {/* BUTTON ALIGNMENT: Centered on all screens, stack on mobile, horizontal on small screen up */}
              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center"> 
                {/* Button Sizing: Default size (mobile/tablet), btn-lg on large desktop (lg+) */}
                <Link 
                  to="/send-funds" 
                  className="btn btn-success px-4 px-md-5 btn-lg-lg"> 
                  <Send size={18} className="me-2" />
                  Send Funds Now
                </Link>
                <Link 
                  to="/orders" 
                  className="btn btn-outline-success px-4 px-md-5 btn-lg-lg">
                  <ShoppingCart size={18} className="me-2" />
                  View Pending Orders (5)
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Current Rate Card */}
        <div className="col-lg-4">
          <div 
            className="card border-0 shadow-sm rounded-3 h-100 d-flex flex-column justify-content-center bg-body"
          >
            <div className="card-body text-center p-4">
              <h5 className="mb-3">Current Buy Rate</h5>
              
              {/* RATE TEXT FIX: fs-3 (smaller) for mobile AND tablet, hidden on large desktop */}
              <div className="fs-3 fw-bold text-success my-3 d-lg-none">
                TZS 2,620
              </div>
              
              {/* display-5 (large) only for large desktop screens (lg+) */}
               <div className="fs-3 fw-bold text-success my-3 d-none d-lg-block">
                TZS 2,620
              </div>
              
              <small className="text-muted d-block mb-3">per $1 USD</small>
              <Link to="/rates" className="btn btn-outline-success w-100">
                Update Rate
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* --- Modals --- */}
      
      {/* Set Balance Modal */}
      {showBalanceModal && (
        <>
          <div className="modal-backdrop fade show"></div> {/* Standard Backdrop */}
          <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5>Set Opening Balance</h5>
                  <button type="button" className="btn-close" onClick={() => setShowBalanceModal(false)}></button>
                </div>
                <div className="modal-body">
                  <label className="form-label">Total Opening Balance (TZS)</label>
                  <input type="number" className="form-control form-control-lg text-end" defaultValue="92500000" />
                  <small className="text-muted">This will be recorded as today's starting balance</small>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowBalanceModal(false)}>Cancel</button>
                  <button type="button" className="btn btn-success" onClick={() => { setOpeningBalanceSet(true); setShowBalanceModal(false); }}>
                    Confirm & Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* History Modal */}
      {showHistoryModal && (
        <>
          <div className="modal-backdrop fade show"></div> {/* Standard Backdrop */}
          <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5>Opening Balance History</h5>
                  <button type="button" className="btn-close" onClick={() => setShowHistoryModal(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="table-responsive">
                    <table className="table table-hover align-middle">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Amount (TZS)</th>
                          <th>Set By</th>
                          <th>Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {history.map((h, i) => (
                          <tr key={i}>
                            <td>{h.date}</td>
                            <td className="fw-bold">{parseInt(h.amount.replace(/[^0-9]/g,"")).toLocaleString()}</td>
                            <td>{h.by}</td>
                            <td>{h.time}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}