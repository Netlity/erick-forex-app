// src/pages/Customers.jsx
import React, { useState } from 'react';

const Customers = () => {
  const [searchName, setSearchName] = useState('');
  const [searchPhone, setSearchPhone] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Dummy data with clear status logic
  const customers = [
    { id: 1, name: 'Chinedu Okeke', phone: '08012345678', totalUSD: 48500, transactions: 48, profitGenerated: 1825000, lastVisit: '05 Dec 2025', status: 'VIP' },
    { id: 2, name: 'Fatima Yusuf', phone: '09087654321', totalUSD: 42800, transactions: 41, profitGenerated: 1580000, lastVisit: '05 Dec 2025', status: 'VIP' },
    { id: 3, name: 'Emeka Okafor', phone: '08123456789', totalUSD: 35200, transactions: 35, profitGenerated: 1280000, lastVisit: '04 Dec 2025', status: 'Regular' },
    { id: 4, name: 'Aisha Mohammed', phone: '07098765432', totalUSD: 29800, transactions: 29, profitGenerated: 985000, lastVisit: '03 Dec 2025', status: 'Regular' },
    { id: 5, name: 'Tunde Adebayo', phone: '08111222333', totalUSD: 25100, transactions: 22, profitGenerated: 812000, lastVisit: '02 Dec 2025', status: 'New' },
    { id: 6, name: 'Ngozi Iweala', phone: '07055554444', totalUSD: 18200, transactions: 18, profitGenerated: 620000, lastVisit: '01 Dec 2025', status: 'Regular' },
    { id: 7, name: 'Ibrahim Ali', phone: '08199998888', totalUSD: 15000, transactions: 12, profitGenerated: 485000, lastVisit: '28 Nov 2025', status: 'New' },
  ];

  // Filter logic
  const filteredCustomers = customers.filter(customer => {
    const matchesName = customer.name.toLowerCase().includes(searchName.toLowerCase());
    const matchesPhone = customer.phone.includes(searchPhone);
    const matchesStatus = statusFilter === 'All' || customer.status === statusFilter;
    return matchesName && matchesPhone && matchesStatus;
  });

  const handleSearch = () => {
    // Trigger re-filter (already reactive, but keeps button useful)
  };

  return (
    <div className="customers-div">
      {/* Header */}
      <div className="mb-4">
        <h2 className="mb-1 fw-bold">Customers</h2>
        <p className="text-muted">Top customers ranked by transaction volume & profit contribution</p>
      </div>

      {/* Stats Cards */}
      <div className="row g-4 mb-5">
        <div className="col-md-3"><div className="card border-0 shadow-sm text-center p-4"><h5 className="text-muted small">Total Customers</h5><h2 className="fw-bold">127</h2></div></div>
        <div className="col-md-3"><div className="card border-0 shadow-sm text-center p-4"><h5 className="text-muted small">VIP Customers</h5><h2 className="fw-bold text-success">18</h2></div></div>
        <div className="col-md-3"><div className="card border-0 shadow-sm text-center p-4"><h5 className="text-muted small">Total Volume (USD)</h5><h2 className="fw-bold">$1,248,500</h2></div></div>
        <div className="col-md-3"><div className="card border-0 shadow-sm text-center p-4"><h5 className="text-muted small">Profit from Customers (TZS)</h5><h2 className="fw-bold text-success">48.2M</h2></div></div>
      </div>

      {/* Filter Bar */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3 align-items-end">
            <div className="col-md-3">
              <label className="form-label small fw-medium">Search by Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Chinedu"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label small fw-medium">Search by Phone</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. 080"
                value={searchPhone}
                onChange={(e) => setSearchPhone(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label small fw-medium">Customer Status</label>
              <select
                className="form-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Customers</option>
                <option value="VIP">VIP</option>
                <option value="Regular">Regular</option>
                <option value="New">New</option>
              </select>
            </div>
            <div className="col-md-3">
              <button
                onClick={handleSearch}
                className="btn btn-success w-100 h-100"
                style={{ height: '48px' }}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="bg-light small text-muted">
                <tr>
                  <th className="ps-4">Customer Name</th>
                  <th>Phone</th>
                  <th className="text-center">Transactions</th>
                  <th className="text-center">Total USD</th>
                  <th className="text-center">Profit Generated</th>
                  <th>Last Visit</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-5 text-muted">
                      No customers found matching your filters.
                    </td>
                  </tr>
                ) : (
                  filteredCustomers.map(c => (
                    <tr key={c.id}>
                      <td className="ps-4 fw-bold">{c.name}</td>
                      <td>{c.phone}</td>
                      <td className="text-center">{c.transactions}</td>
                      <td className="text-center fw-bold">${c.totalUSD.toLocaleString()}</td>
                      <td className="text-center text-success fw-bold">₦{c.profitGenerated.toLocaleString()}</td>
                      <td className="small text-muted">{c.lastVisit}</td>
                      <td>
                        <span className={`badge ${
                          c.status === 'VIP' ? 'bg-success' :
                          c.status === 'Regular' ? 'bg-primary' : 'bg-secondary'
                        }`}>
                          {c.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customers;