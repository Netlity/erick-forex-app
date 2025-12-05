// src/components/DetailModal.jsx
import { X, Printer} from "lucide-react";

export default function DetailModal({ show, onClose, title, data, type = "order" }) {
  if (!show || !data) return null;

  const fields = type === "wallet"
    ? [
        { label: "Wallet Name", value: data.name },
        { label: "Currency", value: data.currency },
        { label: "Current Balance", value: data.currency === "TZS" ? `${data.balance.toLocaleString()}` : `$${data.balance.toLocaleString()}` },
        { label: "Bank", value: data.bank },
        { label: "Account Number", value: data.accNo },
        { label: "Last Updated", value: data.lastUpdated },
      ]
    : [
        { label: "Order ID", value: data.id },
        { label: "Date & Time", value: data.date },
        { label: "Customer Name", value: data.customer },
        { label: "Phone Number", value: data.phone },
        { label: "Transaction Type", value: data.type },
        { label: "USD Amount", value: `$${data.usd.toLocaleString()}` },
        { label: "Rate Applied", value: `${data.rate.toLocaleString()}` },
        { label: "TZS Equivalent", value: `${data.tzs.toLocaleString()}` },
        { label: "Status", value: data.status, badge: true },
        { label: "Proof of Payment", value: "View Image", image: true },
      ];

  return (
    <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,0.6)" }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          {/* DYNAMIC HEADER — RESPECTS THEME */}
          <div className="modal-header" style={{
            backgroundColor: "var(--bg-secondary)",
            color: "var(--text-primary)",
            borderBottom: "1px solid var(--border)"
          }}>
            <h5 className="modal-title">
              {title === "receipt" ? "Payment Receipt" : type === "wallet" ? "Wallet Details" : "Order Details"} — {data.id || data.name}
            </h5>
            {/* X BUTTON NOW ADAPTS TO THEME */}
            <button
              className="btn-close"
              onClick={onClose}
              style={{
                filter: document.documentElement.getAttribute("data-theme") === "dark" ? "invert(1)" : "none"
              }}
            ></button>
          </div>

          <div className="modal-body">
            <div className="row g-4">
              {fields.map((field, i) => (
                <div key={i} className="col-md-6">
                  <label className="form-label text-muted small">{field.label}</label>
                  {field.image ? (
                    <div className="text-center mt-2">
                      <img
                        src="https://via.placeholder.com/600x400.png?text=Proof+of+Payment+Receipt"
                        alt="Proof"
                        className="img-fluid rounded shadow-sm"
                        style={{ maxHeight: "320px" }}
                      />
                    </div>
                  ) : field.badge ? (
                    <div>
                      <span className={`badge fs-6 ${
                        field.value === "Completed" ? "bg-success" :
                        field.value === "Pending" ? "bg-warning text-dark" : "bg-info"
                      }`}>
                        {field.value}
                      </span>
                    </div>
                  ) : (
                    <input
                      type="text"
                      className="form-control"
                      readOnly
                      value={field.value}
                      style={{ backgroundColor: "var(--bg-card)", color: "var(--text-primary)" }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="modal-footer" style={{ borderTop: "1px solid var(--border)" }}>
            {title === "receipt" && (
              <button className="btn btn-success me-auto">
                <Printer size={18} className="me-2" /> Print Receipt
              </button>
            )}
            <button className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}