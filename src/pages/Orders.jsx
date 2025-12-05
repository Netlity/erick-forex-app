// src/pages/Orders.jsx
import { Link } from "react-router-dom";
import { useState } from "react";
import { Eye, Send, FileText} from "lucide-react";
import DetailModal from "../components/DetailModal";

const orders = [
  { id: "ORD-1201", date: "2025-12-02 14:23", customer: "Ahmad Bello", phone: "08012345678", type: "Sell", usd: 2500, rate: 2500, tzs: 4050000, status: "Pending" },
  { id: "ORD-1200", date: "2025-12-02 13:55", customer: "Chioma Eze", phone: "08198765432", type: "Buy", usd: 800, rate: 2490, tzs: 1320000, status: "Processing" },
  { id: "ORD-1199", date: "2025-12-02 12:10", customer: "Ibrahim Yusuf", phone: "07055554444", type: "Sell", usd: 5000, rate: 2600, tzs: 8100000, status: "Completed" },
  { id: "ORD-1198", date: "2025-12-02 11:30", customer: "Fatima Yusuf", phone: "09033445566", type: "Sell", usd: 1800, rate: 2598, tzs: 2916000, status: "Pending" },
];

export default function Orders() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalType, setModalType] = useState("view"); // "view" or "receipt"

  const openModal = (order, type = "view") => {
    setSelectedOrder(order);
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setModalType("view");
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1 fw-bold">All Orders</h2>
          <p className="text-muted">A list of recent orders received</p>
        </div>
        <select className="form-select w-auto">
          <option>All Status</option>
          <option>Pending</option>
          <option>Processing</option>
          <option>Completed</option>
        </select>
      </div>

      {/* Clean Full-Width Table - NO CARD */}
      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light small text-muted">
              <tr>
                <th className="ps-4">Order ID</th>
                <th>Date & Time</th>
                <th>Customer</th>
                <th>Type</th>
                <th>USD Amount</th>
                <th>Rate</th>
                <th>TZS Equivalent</th>
                <th>Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o, index) => (
                <tr key={o.id} className={index !== orders.length - 1 ? "border-bottom" : ""}>
                  <td className="ps-4 fw-bold">{o.id}</td>
                  <td><small className="text-muted">{o.date}</small></td>
                  <td>
                    <div>{o.customer}</div>
                    <small className="text-muted">{o.phone}</small>
                  </td>
                  <td>
                    <span className={`badge ${o.type === "Sell" ? "bg-success" : "bg-primary"}`}>
                      {o.type} USD
                    </span>
                  </td>
                  <td className="fw-bold">${o.usd.toLocaleString()}</td>
                  <td>{o.rate.toLocaleString()}</td>
                  <td className="fw-bold text-success">{o.tzs.toLocaleString()}</td>
                  <td>
                    <span className={`badge ${o.status === "Completed" ? "bg-success" : o.status === "Pending" ? "bg-warning text-dark" : "bg-info"}`}>
                      {o.status}
                    </span>
                  </td>

                  <td>
                    <div className="btn-group" role="group">
                      {/* Always show: View Details */}
                      <button
                        className="btn btn-sm btn-outline-primary action-btn"
                        title="View Details"
                        onClick={() => openModal(o, "view")}
                      >
                        <Eye size={16} />
                      </button>

                      {/* Show only if Pending */}
                      {o.status === "Pending" && (
                        <Link
                          to="/send-funds"
                          state={{ order: o }}  // optional: pass order data
                          className="btn btn-sm btn-outline-success action-btn"
                          title="Send Funds"
                        >
                          <Send size={16} />
                        </Link>
                      )}

                      {/* Show only if Completed */}
                      {o.status === "Completed" && (
                        <button
                          className="btn btn-sm btn-outline-success action-btn"
                          title="View Receipt"
                          onClick={() => openModal(o, "receipt")}
                          >
                          <FileText size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
      </div>

      {/* MODAL */}
      <DetailModal
        show={!!selectedOrder}
        onClose={closeModal}
        title={modalType}
        data={selectedOrder}
        type="order"
      />
    </>
  );
}