// src/pages/StaffManagement.jsx
import React, { useState } from 'react';
import { Plus } from "lucide-react"; 

const StaffManagement = () => {
  const [staff, setStaff] = useState([
    { id: 1, name: 'Aisha Mohammed', email: 'aisha@bureau.com', role: 'Teller', permissions: ['Add Transaction', 'View Transactions'], status: 'Active', joined: 'Jan 2024' },
    { id: 2, name: 'John Eze', email: 'john@bureau.com', role: 'Manager', permissions: ['All Access'], status: 'Active', joined: 'Mar 2024' },
    { id: 3, name: 'Mary Okonkwo', email: 'mary@bureau.com', role: 'Teller', permissions: ['Add Transaction'], status: 'Disabled', joined: 'Jun 2024' },
    { id: 4, name: 'Samuel Ade', email: 'samuel@bureau.com', role: 'Admin', permissions: ['All Access'], status: 'Active', joined: 'Jan 2023' },
  ]);

  const allPermissions = [
    'Add Transaction', 'Edit Rates', 'View Transactions', 'View Reports',
    'Manage Customers', 'Manage Staff', 'Export Data', 'System Settings'
  ];

  const predefinedRoles = {
    Admin: ['All Access'],
    Manager: ['Add Transaction', 'Edit Rates', 'View Transactions', 'View Reports', 'Manage Customers'],
    Teller: ['Add Transaction', 'View Transactions'],
    Accountant: ['View Reports', 'Export Data']
  };

  const [searchName, setSearchName] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const [searchRole, setSearchRole] = useState('All');
  const [searchStatus, setSearchStatus] = useState('All');

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentStaff, setCurrentStaff] = useState(null);

  const [formData, setFormData] = useState({
    name: '', email: '', role: 'Teller', customPermissions: [], status: 'Active'
  });

  // Filter staff
  const filteredStaff = staff.filter(s => {
    const matchesName = s.name.toLowerCase().includes(searchName.toLowerCase());
    const matchesEmail = s.email.toLowerCase().includes(searchEmail.toLowerCase());
    const matchesRole = searchRole === 'All' || s.role === searchRole;
    const matchesStatus = searchStatus === 'All' || s.status === searchStatus;
    return matchesName && matchesEmail && matchesRole && matchesStatus;
  });

  const openAddModal = () => {
    setFormData({ name: '', email: '', role: 'Teller', customPermissions: [], status: 'Active' });
    setShowAddModal(true);
  };

  const openEditModal = (member) => {
    setCurrentStaff(member);
    setFormData({
      name: member.name,
      email: member.email,
      role: member.role,
      customPermissions: member.permissions[0] === 'All Access' ? [] : member.permissions,
      status: member.status
    });
    setShowEditModal(true);
  };

  const handleRoleChange = (role) => {
    if (role === 'Admin') {
      setFormData(prev => ({ ...prev, role, customPermissions: [] }));
    } else {
      setFormData(prev => ({ ...prev, role, customPermissions: predefinedRoles[role] || [] }));
    }
  };

  const handlePermissionToggle = (perm) => {
    setFormData(prev => ({
      ...prev,
      customPermissions: prev.customPermissions.includes(perm)
        ? prev.customPermissions.filter(p => p !== perm)
        : [...prev.customPermissions, perm]
    }));
  };

  const handleSave = () => {
    const permissions = formData.role === 'Admin' ? ['All Access'] : formData.customPermissions;
    const updatedStaff = {
      ...currentStaff,
      name: formData.name,
      email: formData.email,
      role: formData.role,
      permissions,
      status: formData.status
    };

    setStaff(prev => prev.map(s => s.id === currentStaff.id ? updatedStaff : s));
    setShowEditModal(false);
  };

  const handleAdd = () => {
    const permissions = formData.role === 'Admin' ? ['All Access'] : formData.customPermissions;
    const newStaff = {
      id: Math.max(...staff.map(s => s.id)) + 1,
      name: formData.name,
      email: formData.email,
      role: formData.role,
      permissions,
      status: 'Active',
      joined: new Date().toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })
    };
    setStaff(prev => [...prev, newStaff]);
    setShowAddModal(false);
  };

  const toggleStatus = (id) => {
    setStaff(prev => prev.map(s =>
      s.id === id ? { ...s, status: s.status === 'Active' ? 'Disabled' : 'Active' } : s
    ));
  };

  return (
    <div className="staffmngmnt-div">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1 fw-bold">Staff Management</h2>
          <p className="text-muted">Manage users, roles & permissions</p>
        </div>
        <button className="btn btn-success btn-lg px-4 fw-bold shadow-sm" onClick={openAddModal}>
          <Plus size={18} className="me-2" /> Add Staff
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3 align-items-end">
            <div className="col-md-3">
              <label className="form-label small fw-medium">Search by Name</label>
              <input type="text" className="form-control" value={searchName} onChange={(e) => setSearchName(e.target.value)} />
            </div>
            <div className="col-md-3">
              <label className="form-label small fw-medium">Search by Email</label>
              <input type="text" className="form-control" value={searchEmail} onChange={(e) => setSearchEmail(e.target.value)} />
            </div>
            <div className="col-md-2">
              <label className="form-label small fw-medium">Role</label>
              <select className="form-select" value={searchRole} onChange={(e) => setSearchRole(e.target.value)}>
                <option value="All">All Roles</option>
                <option>Admin</option>
                <option>Manager</option>
                <option>Teller</option>
                <option>Accountant</option>
              </select>
            </div>
            <div className="col-md-2">
              <label className="form-label small fw-medium">Status</label>
              <select className="form-select" value={searchStatus} onChange={(e) => setSearchStatus(e.target.value)}>
                <option value="All">All</option>
                <option>Active</option>
                <option>Disabled</option>
              </select>
            </div>
            <div className="col-md-2">
              <button className="btn btn-success w-100 h-100" style={{ height: '48px' }}>Search</button>
            </div>
          </div>
        </div>
      </div>

      {/* Staff Table */}
      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="bg-light small text-muted">
                <tr>
                  <th className="ps-4">Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Permissions</th>
                  <th>Status</th>
                  <th>Joined</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStaff.map(s => (
                  <tr key={s.id}>
                    <td className="ps-4 fw-bold">{s.name}</td>
                    <td>{s.email}</td>
                    <td><span className="badge bg-primary">{s.role}</span></td>
                    <td className="small">
                      {s.permissions[0] === 'All Access' ? 'All Access' : s.permissions.join(', ')}
                    </td>
                    <td>
                      <span className={`badge ${s.status === 'Active' ? 'bg-success' : 'bg-danger'}`}>
                        {s.status}
                      </span>
                    </td>
                    <td className="small text-muted">{s.joined}</td>
                    <td>
                      <button className="btn btn-sm btn-outline-primary me-2" onClick={() => openEditModal(s)}>
                        Edit
                      </button>
                      <button
                        className={`btn btn-sm ${s.status === 'Active' ? 'btn-outline-danger' : 'btn-outline-success'}`}
                        onClick={() => toggleStatus(s.id)}
                      >
                        {s.status === 'Active' ? 'Disable' : 'Enable'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {(showAddModal || showEditModal) && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content border-0 shadow-lg">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">{showAddModal ? 'Add New Staff' : 'Edit Staff'}</h5>
                <button type="button" className="btn-close" onClick={() => { setShowAddModal(false); setShowEditModal(false); }}></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Full Name</label>
                    <input type="text" className="form-control" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Role</label>
                  <select className="form-select" value={formData.role} onChange={(e) => handleRoleChange(e.target.value)}>
                    <option>Admin</option>
                    <option>Manager</option>
                    <option>Teller</option>
                    <option>Accountant</option>
                  </select>
                </div>
                {formData.role !== 'Admin' && (
                  <div className="mb-3">
                    <label className="form-label">Permissions</label>
                    <div className="row">
                      {allPermissions.map(perm => (
                        <div className="col-md-6" key={perm}>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={formData.customPermissions.includes(perm)}
                              onChange={() => handlePermissionToggle(perm)}
                            />
                            <label className="form-check-label small">{perm}</label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => { setShowAddModal(false); setShowEditModal(false); }}>
                  Cancel
                </button>
                <button className="btn btn-success px-4" onClick={showAddModal ? handleAdd : handleSave}>
                  {showAddModal ? 'Create User' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffManagement;