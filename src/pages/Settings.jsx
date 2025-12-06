// src/pages/SystemSettings.jsx
import React, { useState } from 'react';
import { Plus } from "lucide-react";

const SystemSettings = () => {
  const [statusRules, setStatusRules] = useState([
    { id: 1, name: 'VIP', minUSD: 40000, minTxns: 30, color: 'success', active: true },
    { id: 2, name: 'Regular', minUSD: 10000, minTxns: 10, color: 'primary', active: true },
    { id: 3, name: 'New', minUSD: 0, minTxns: 0, color: 'secondary', active: true },
    { id: 4, name: 'Premium', minUSD: 100000, minTxns: 80, color: 'warning', active: false },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newStatus, setNewStatus] = useState({
    name: '',
    minUSD: 0,
    minTxns: 0,
    color: 'success',
    active: true
  });

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const colors = ['success', 'primary', 'warning', 'danger', 'info', 'dark'];

  const handleAdd = () => {
    if (!newStatus.name.trim()) return;

    const newRule = {
      id: Math.max(...statusRules.map(r => r.id)) + 1,
      ...newStatus
    };
    setStatusRules(prev => [...prev, newRule]);
    setShowAddModal(false);
    setNewStatus({ name: '', minUSD: 0, minTxns: 0, color: 'success', active: true });
  };

  const handleEdit = (rule) => {
    setEditingId(rule.id);
    setEditForm({ ...rule });
  };

  const handleSave = () => {
    setStatusRules(prev => prev.map(r => r.id === editingId ? editForm : r));
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleToggleActive = (id) => {
    setStatusRules(prev => prev.map(r => 
      r.id === id ? { ...r, active: !r.active } : r
    ));
  };

  return (
    <div className="settings-div">
      <div className="mb-4">
        <h2 className="mb-1 fw-bold">System Settings</h2>
        <p className="text-muted">Configure global rules and preferences</p>
      </div>

      {/* Customer Status Rules */}
      <div className="card border-0 shadow-sm mb-5">
        <div className="card-header bg-transparent border-bottom py-3 d-flex justify-content-between align-items-center">
          <div>
            <h5 className="mb-0 fw-semibold d-flex align-items-center">
              Customer Status Rules
              <span className="badge bg-success ms-3">Auto Classification</span>
            </h5>
            <p className="text-muted small mt-1 mb-0">
              Define tiers — customers are auto-tagged by volume & frequency
            </p>
          </div>
          <button
            className="btn btn-success px-4 fw-bold shadow-sm"
            onClick={() => setShowAddModal(true)}
          >
            <Plus size={18} className="me-2" /> Add New Status
          </button>
        </div>

        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0 align-middle">
              <thead className="bg-light small text-muted">
                <tr>
                  <th className="ps-4">Status Name</th>
                  <th className="text-center">Min. Total USD</th>
                  <th className="text-center">Min. Transactions</th>
                  <th className="text-center">Badge Color</th>
                  <th className="text-center">Active</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {statusRules.map(rule => (
                  <tr key={rule.id} className={!rule.active ? 'text-muted opacity-75' : ''}>
                    <td className="ps-4">
                      {editingId === rule.id ? (
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          value={editForm.name}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        />
                      ) : (
                        <span className="fw-bold">{rule.name}</span>
                      )}
                    </td>
                    <td className="text-center">
                      {editingId === rule.id ? (
                        <input
                          type="number"
                          className="form-control form-control-sm text-center"
                          style={{ width: '110px' }}
                          value={editForm.minUSD}
                          onChange={(e) => setEditForm({ ...editForm, minUSD: Number(e.target.value) })}
                        />
                      ) : (
                        <span className="fw-bold">${rule.minUSD.toLocaleString()}</span>
                      )}
                    </td>
                    <td className="text-center">
                      {editingId === rule.id ? (
                        <input
                          type="number"
                          className="form-control form-control-sm text-center"
                          style={{ width: '90px' }}
                          value={editForm.minTxns}
                          onChange={(e) => setEditForm({ ...editForm, minTxns: Number(e.target.value) })}
                        />
                      ) : (
                        rule.minTxns
                      )}
                    </td>
                    <td className="text-center">
                      {editingId === rule.id ? (
                        <select
                          className="form-select form-select-sm"
                          value={editForm.color}
                          onChange={(e) => setEditForm({ ...editForm, color: e.target.value })}
                        >
                          {colors.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      ) : (
                        <span className={`badge bg-${rule.color} px-3 py-2`}>
                          {rule.color}
                        </span>
                      )}
                    </td>
                    <td className="text-center">
                      <div className="form-check form-switch d-inline-block">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={rule.active}
                          onChange={() => handleToggleActive(rule.id)}
                        />
                      </div>
                    </td>
                    <td className="text-center">
                      {editingId === rule.id ? (
                        <>
                          <button className="btn btn-sm btn-success me-2" onClick={handleSave}>Save</button>
                          <button className="btn btn-sm btn-secondary" onClick={handleCancel}>Cancel</button>
                        </>
                      ) : (
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => handleEdit(rule)}
                        >
                          Edit
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card-footer bg-transparent border-top text-muted small">
          <strong>Note:</strong> Customers are assigned the <u>highest active tier</u> they qualify for.
        </div>
      </div>

      {/* Add New Status Modal */}
      {showAddModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg">
              <div className="modal-header border-0">
                <h5 className="modal-title fw-bold">Add New Customer Status</h5>
                <button type="button" className="btn-close" onClick={() => setShowAddModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label fw-medium">Status Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Platinum"
                    value={newStatus.name}
                    onChange={(e) => setNewStatus({ ...newStatus, name: e.target.value })}
                  />
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-medium">Minimum Total USD</label>
                    <input
                      type="number"
                      className="form-control"
                      value={newStatus.minUSD}
                      onChange={(e) => setNewStatus({ ...newStatus, minUSD: Number(e.target.value) || 0 })}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-medium">Minimum Transactions</label>
                    <input
                      type="number"
                      className="form-control"
                      value={newStatus.minTxns}
                      onChange={(e) => setNewStatus({ ...newStatus, minTxns: Number(e.target.value) || 0 })}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label fw-medium">Badge Color</label>
                  <select
                    className="form-select"
                    value={newStatus.color}
                    onChange={(e) => setNewStatus({ ...newStatus, color: e.target.value })}
                  >
                    {colors.map(c => (
                      <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                    ))}
                  </select>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="activeNew"
                    checked={newStatus.active}
                    onChange={(e) => setNewStatus({ ...newStatus, active: e.target.checked })}
                  />
                  <label className="form-check-label" htmlFor="activeNew">
                    Active (immediately apply to customers)
                  </label>
                </div>
              </div>
              <div className="modal-footer border-0">
                <button className="btn btn-secondary" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-success px-4" onClick={handleAdd}>
                  Create Status
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Future Sections (you can expand later) */}
      <div className="row g-4">
        <div className="col-md-6">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h5 className="fw-semibold">Currency & Rates</h5>
              <p className="text-muted small">Base currency: Tanzanian Shillings (TZS)</p>
              <p className="text-muted small">Primary trading pair: USD/TZS</p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h5 className="fw-semibold">Business Info</h5>
              <p className="text-muted small">Bureau Name: Chotuwahe De Change</p>
              <p className="text-muted small">License: *Applicable licencse</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;