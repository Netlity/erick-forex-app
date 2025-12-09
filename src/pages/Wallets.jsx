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
      {/* 1. Header and Add Button - Corrected Stacking */}
      {/* Use flex-column on mobile and revert to horizontal alignment on tablet (sm) and up */}
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-4">
        <div className="flex-grow-1"> {/* Allow text to take available space */}
          <h2 className="mb-1 fw-bold">Manage Wallets</h2>
          <p className="text-muted mb-2 mb-sm-0">Manage wallets that will be used to transfer funds from</p>
        </div>
        
        {/* BUTTON: Removed w-100 to keep original size and used flex-shrink-0 to prevent shrinking */}
        <button
            className="btn btn-success btn-lg px-4 fw-bold shadow-sm flex-shrink-0" 
            onClick={() => setShowModal(true)}
          >
            <Plus size={18} className="me-2" /> Add Wallet
          </button>
      </div>

      {/* 2. Wallet Card Grid - Responsive Column Counts */}
      <div className="row g-4 mb-5">
        {wallets.map(w => (
          <div key={w.id} className="col-12 col-sm-6 col-md-4">
            <div className="card shadow-sm rounded-3 border-0 h-100">
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <Wallet size={28} className="text-success me-3" />
                  <h5 className="mb-0 text-truncate">{w.name}</h5>
                </div>
                <p className="mb-1"><strong>Balance:</strong> {w.currency} {w.balance.toLocaleString()}</p>
                <p className="text-muted small mb-0">Last Updated: {w.lastUpdated}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Detailed History Table - Horizontal Scroll */}
      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
            <thead className="bg-light small text-muted text-nowrap">
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
                  <td className="ps-4 fw-bold text-nowrap">{w.name}</td>
                  <td className="text-nowrap">{w.currency}</td>
                  <td className="text-nowrap">{w.balance.toLocaleString()}</td>
                  <td className="text-nowrap">{w.bank}</td>
                  <td className="text-nowrap">{w.accNo}</td>
                  <td className="text-nowrap">
                    <div className="d-flex gap-1"> 
                      <button className="btn btn-sm btn-outline-primary" title="View Wallet" onClick={() => setSelectedWallet(w)}><Eye size={16} /> View</button>
                      <button className="btn btn-sm btn-outline-success" title="Edit Wallet" onClick={() => setEditWallet({ ...w })}><Edit2 size={16} /> Edit</button>
                      <button className="btn btn-sm btn-outline-danger" title="Remove Wallet" onClick={() => setEditWallet({ ...w })}><Trash2 size={16} /> Remove</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      </div>

      {/* MODALS (Structural improvements for responsiveness inside modals) */}
      
      {/* Modal */}
      <DetailModal
        show={!!selectedWallet}
        onClose={() => setSelectedWallet(null)}
        title="view"
        data={selectedWallet}
        type="wallet"
      />

      {/* EDIT MODAL */}
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
                <div className="row g-3">
                  <div className="col-12 form-group">
                    <label>Wallet Name</label>
                    <input className="form-control" defaultValue={editWallet?.name} placeholder="e.g. MPESA" />
                  </div>
                  <div className="col-12 form-group">
                    <label>Currency</label>
                    <select className="form-select" defaultValue={editWallet?.currency || "TZS"}>
                      <option>TZS</option>
                      <option>USD</option>
                    </select>
                  </div>
                  <div className="col-12 form-group">
                    <label>Bank</label>
                    <input className="form-control" defaultValue={editWallet?.bank} placeholder="e.g. GTBank or Cash Vault" />
                  </div>
                  <div className="col-12 form-group">
                    <label>Account Number (Optional)</label>
                    <input className="form-control" defaultValue={editWallet?.accNo} placeholder="Leave blank for cash" />
                  </div>
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
              <div className="row g-3">
                <div className="col-12 mb-3"><input className="form-control" placeholder="Wallet Name (e.g., M-Pesa, Halopesa)" /></div>
                <div className="col-12 mb-3"><select className="form-select"><option>TZS</option></select></div>
                <div className="col-12 mb-3"><input className="form-control" type="number" placeholder="Initial Balance" /></div>
                <div className="col-12 mb-3"><input className="form-control" placeholder="Bank" /></div>
                <div className="col-12 mb-3"><input className="form-control" placeholder="Account Number (optional)" /></div>
              </div>
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