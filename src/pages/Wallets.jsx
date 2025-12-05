// src/pages/Wallets.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { Edit2, Trash2, Eye, Plus, Wallet } from "lucide-react";
import DetailModal from "../components/DetailModal";

const wallets = [
  { id: 1, name: "M-PESA 1", currency: "TZS", balance: 5000000, lastUpdated: "2025-12-04", bank: "Vodacom", accNo: "0123456789" },
  { id: 2, name: "M-PESA 2", currency: "TZS", balance: 1000000, lastUpdated: "2025-12-03", bank: "Yas", accNo: "9876543210" },
];

export default function Wallets() {
  const [showModal, setShowModal] = useState(false); // view 
  const [editWallet, setEditWallet] = useState(null); // edit
  const [selectedWallet, setSelectedWallet] = useState(null);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1 fw-bold">Manage Wallets</h2>
          <p className="text-muted">Manage wallets that will be used to transfer funds from</p>
        </div>
        <button
            className="btn btn-success btn-lg px-4 fw-bold shadow-sm"
            onClick={() => setShowModal(true)}
          >
            <Plus size={18} className="me-2" /> Add Wallet
          </button>
      </div>

      <div className="row g-4 mb-5">
        {wallets.map(w => (
          <div key={w.id} className="col-md-4">
            <div className="card shadow-sm rounded-3 border-0">
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <Wallet size={28} className="text-success me-3" />
                  <h5 className="mb-0">{w.name}</h5>
                </div>
                <p className="mb-1"><strong>Balance:</strong> {w.currency} {w.balance.toLocaleString()}</p>
                <p className="text-muted small mb-0">Last Updated: {w.lastUpdated}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
            <thead className="bg-light small text-muted">
              <tr>
                <th>Wallet Name</th>
                <th>Currency</th>
                <th>Balance</th>
                <th>Bank</th>
                <th>Account No</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {wallets.map(w => (
                <tr key={w.id}>
                  <td className="ps-4 fw-bold">{w.name}</td>
                  <td>{w.currency}</td>
                  <td>{w.balance.toLocaleString()}</td>
                  <td>{w.bank}</td>
                  <td>{w.accNo}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary me-2" title="View Wallet" onClick={() => setSelectedWallet(w)}><Eye size={16} /> View</button>
                    <button className="btn btn-sm btn-outline-success me-2" title="Edit Wallet" onClick={() => setEditWallet({ ...w })}><Edit2 size={16} /> Edit</button>
                    <button className="btn btn-sm btn-outline-danger" title="Remove Wallet" onClick={() => setEditWallet({ ...w })}><Trash2 size={16} /> Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      <DetailModal
        show={!!selectedWallet}
        onClose={() => setSelectedWallet(null)}
        title="view"
        data={selectedWallet}
        type="wallet"
      />

      {/* EDIT MODAL — FULLY WORKING */}
      {editWallet && (
        <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,0.6)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header" style={{ backgroundColor: "var(--bg-secondary)", color: "var(--text-primary)" }}>
                <h5 className="modal-title">Edit Wallet</h5>
                <button className="btn-close" onClick={() => setEditWallet(null)}
                  style={{ filter: document.documentElement.getAttribute("data-theme") === "dark" ? "invert(1)" : "none" }}
                ></button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Wallet Name</label>
                  <input className="form-control" defaultValue={editWallet?.name} placeholder="e.g. MPESA" />
                </div>
                <div className="form-group">
                  <label>Currency</label>
                  <select className="form-select" defaultValue={editWallet?.currency || "TZS"}>
                    <option>TZS</option>
                    <option>USD</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Bank</label>
                  <input className="form-control" defaultValue={editWallet?.bank} placeholder="e.g. GTBank or Cash Vault" />
                </div>
                <div className="form-group">
                  <label>Account Number (Optional)</label>
                  <input className="form-control" defaultValue={editWallet?.accNo} placeholder="Leave blank for cash" />
                </div>
                </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setEditWallet(null)}>
                  Cancel
                </button>
                <button className="btn btn-success">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Wallet Modal */}
      <div className={`modal fade ${showModal ? "show d-block" : ""}`} tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5>Add New Wallet</h5>
              <button className="btn-close" onClick={() => setShowModal(false)}></button>
            </div>
            <div className="modal-body">
              <div className="mb-3"><input className="form-control" placeholder="Wallet Name (e.g., M-Pesa, Halopesa)" /></div>
              <div className="mb-3"><select className="form-select"><option>TZS</option></select></div>
              <div className="mb-3"><input className="form-control" type="number" placeholder="Initial Balance" /></div>
              <div className="mb-3"><input className="form-control" placeholder="Bank" /></div>
              <div className="mb-3"><input className="form-control" placeholder="Account Number (optional)" /></div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-success">Save Wallet</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}