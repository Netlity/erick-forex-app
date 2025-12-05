import React, { useState } from 'react';
import { Plus } from "lucide-react";

const Transactions = () => {
  const [showModal, setShowModal] = useState(false);
  const [txType, setTxType] = useState('sell'); // 'buy' or 'sell'
  const [usdAmount, setUsdAmount] = useState('');
  const [rate, setRate] = useState(txType === 'sell' ? 1678.50 : 1652.75);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

  // Current live rates (sync with your RateManagement page)
  const currentBuyRate = 1652.75;
  const currentSellRate = 1678.50;

  // Dummy transaction history
  const transactions = [
    { id: 1008, date: '05 Dec 2025, 14:32', type: 'Sell', usd: 500, rate: 1678.50, ngn: 839250, profit: 19250, customer: 'Juma Msangi', phone: '08012345678', teller: 'Erick' },
    { id: 1007, date: '05 Dec 2025, 13:10', type: 'Buy', usd: 1200, rate: 1652.75, ngn: 1983300, profit: 0, customer: 'Fatima Yusuf', phone: '09087654321', teller: 'John' },
    { id: 1006, date: '05 Dec 2025, 11:45', type: 'Sell', usd: 800, rate: 1678.50, ngn: 1342800, profit: 30800, customer: 'Jovin Okafor', phone: '08123456789', teller: 'Erick' },
    { id: 1005, date: '04 Dec 2025, 16:20', type: 'Buy', usd: 3000, rate: 1652.75, ngn: 4958250, profit: 0, customer: 'Ngozi Kitwe', phone: '07098765432', teller: 'Tickson' },
    { id: 1004, date: '04 Dec 2025, 10:05', type: 'Sell', usd: 1500, rate: 1675.00, ngn: 2512500, profit: 33750, customer: 'Tunde Mika', phone: '08111222333', teller: 'Tickson' },
  ];

  // Auto-set rate when type changes
  const handleTypeChange = (type) => {
    setTxType(type);
    setRate(type === 'sell' ? currentSellRate : currentBuyRate);
  };

  // Calculate NGN & Profit
  const ngnAmount = usdAmount ? usdAmount * rate : 0;
  const profit = txType === 'sell' && usdAmount ? usdAmount * (rate - currentBuyRate) : 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would save to backend / state
    alert(`Transaction recorded!\n${txType.toUpperCase()} $${usdAmount} at ₦${rate}\nCustomer: ${customerName || 'Walk-in'}`);
    setShowModal(false);
    // Reset form
    setUsdAmount('');
    setCustomerName('');
    setCustomerPhone('');
  };

  return (
    <>
      <div className="transactions-div">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="mb-1 fw-bold">All Transactions</h2>
            <p className="text-muted">View and record customer transactions</p>
          </div>
          <button
            className="btn btn-success btn-lg px-4 fw-bold shadow-sm"
            onClick={() => setShowModal(true)}
          >
            <Plus size={18} className="me-2" /> Add Transaction
          </button>
        </div>

        {/* Transactions Table */}
        <div className="card border-0 shadow-sm">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover mb-0 align-middle">
                <thead className="bg-light small text-muted">
                  <tr>
                    <th className="ps-4">ID</th>
                    <th>Date & Time</th>
                    <th>Type</th>
                    <th>Customer</th>
                    <th>Phone</th>
                    <th>USD Amount</th>
                    <th>Rate</th>
                    <th>TZS Amount</th>
                    <th>TZS Profit</th>
                    <th>Teller</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map(tx => (
                    <tr key={tx.id}>
                      <td className="ps-4 fw-bold">#{tx.id}</td>
                      <td className="small text-muted">{tx.date}</td>
                      <td>
                        <span className={`badge px-3 py-2 ${tx.type === 'Sell' ? 'bg-danger' : 'bg-success'}`}>
                          {tx.type}
                        </span>
                      </td>
                      <td className="fw-medium">{tx.customer}</td>
                      <td>{tx.phone}</td>
                      <td className="fw-bold">${tx.usd.toLocaleString()}</td>
                      <td>{tx.rate.toFixed(2)}</td>
                      <td className="fw-bold">{tx.ngn.toLocaleString()}</td>
                      <td className={tx.profit > 0 ? 'text-success fw-bold' : 'text-muted'}>
                        {tx.profit > 0 ? `${tx.profit.toLocaleString()}` : '—'}
                      </td>
                      <td>{tx.teller}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Add Transaction Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg">
              <div className="modal-header border-0">
                <h5 className="modal-title fw-bold">New Transaction</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  {/* Buy / Sell Toggle */}
                  <div className="btn-group w-100 mb-4" role="group">
                    <button
                      type="button"
                      className={`btn btn-lg ${txType === 'buy' ? 'btn-success' : 'btn-outline-secondary'}`}
                      onClick={() => handleTypeChange('buy')}
                    >
                      Buy USD (We Buy)
                    </button>
                    <button
                      type="button"
                      className={`btn btn-lg ${txType === 'sell' ? 'btn-danger' : 'btn-outline-secondary'}`}
                      onClick={() => handleTypeChange('sell')}
                    >
                      Sell USD (We Sell)
                    </button>
                  </div>

                  {/* USD Amount */}
                  <div className="mb-3">
                    <label className="form-label fw-bold">USD Amount</label>
                    <input
                      type="number"
                      className="form-control form-control-lg text-center"
                      placeholder="e.g. 1000"
                      value={usdAmount}
                      onChange={(e) => setUsdAmount(e.target.value)}
                      required
                    />
                  </div>

                  {/* Rate (Auto-filled) */}
                  <div className="mb-3">
                    <label className="form-label fw-bold">Rate (Live)</label>
                    <input
                      type="number"
                      step="0.01"
                      className="form-control form-control-lg text-center fw-bold"
                      value={rate}
                      readOnly
                      style={{ backgroundColor: 'var(--bg-secondary)' }}
                    />
                  </div>

                  {/* TZS Equivalent */}
                  <div className="alert alert-info text-center py-3 mb-3">
                    <strong>Customer {txType === 'sell' ? 'Pays' : 'Receives'}:</strong><br />
                    <h3 className="mb-0 fw-bold">TZS {ngnAmount.toLocaleString()}</h3>
                  </div>

                  {txType === 'sell' && profit > 0 && (
                    <div className="alert alert-success text-center py-3 mb-3">
                      <strong>Your Profit:</strong><br />
                      <h4 className="mb-0 fw-bold text-success">TZS {profit.toLocaleString()}</h4>
                    </div>
                  )}

                  {/* Customer Info (Optional) */}
                  <hr />
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Customer Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Phone</label>
                      <input
                        type="text"
                        className="form-control"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="modal-footer border-0">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className={`btn btn-lg px-5 ${txType === 'sell' ? 'btn-danger' : 'btn-success'}`}>
                    Record {txType === 'sell' ? 'Sale' : 'Purchase'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Transactions;