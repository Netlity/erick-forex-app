import React, { useState, useEffect } from 'react';

const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date).replace(',', '');
};

const RateManagement = () => {
  const initialRate = { buy: 1652.75, sell: 1678.50 };
  const [usdRate, setUsdRate] = useState(initialRate);
  const [originalRate] = useState({ ...initialRate });
  const [history, setHistory] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    const fakeHistory = [
      { oldBuy: 1650.00, newBuy: 1652.75, oldSell: 1675.00, newSell: 1678.50, updatedBy: 'Admin', updatedAt: new Date(Date.now() - 3600000) },
      { oldBuy: 1648.50, newBuy: 1650.00, oldSell: 1673.00, newSell: 1675.00, updatedBy: 'Manager', updatedAt: new Date(Date.now() - 7200000) },
      { oldBuy: 1645.00, newBuy: 1648.50, oldSell: 1670.00, newSell: 1673.00, updatedBy: 'Admin', updatedAt: new Date(Date.now() - 18000000) },
      { oldBuy: 1640.25, newBuy: 1645.00, oldSell: 1668.00, newSell: 1670.00, updatedBy: 'Admin', updatedAt: new Date(Date.now() - 86400000) },
    ];
    setHistory(fakeHistory);
  }, []);

  const hasChanges = () => usdRate.buy !== originalRate.buy || usdRate.sell !== originalRate.sell;

  const handleSave = () => {
    if (!hasChanges()) {
      setToastMessage('No changes');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2500);
      return;
    }

    const log = {
      oldBuy: originalRate.buy,
      newBuy: usdRate.buy,
      oldSell: originalRate.sell,
      newSell: usdRate.sell,
      updatedBy: 'Admin',
      updatedAt: new Date()
    };

    setHistory(prev => [log, ...prev]);
    originalRate.buy = usdRate.buy;
    originalRate.sell = usdRate.sell;

    setToastMessage('Rates saved!');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <>
      {/* Toast */}
      {showToast && (
        <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 9999 }}>
          <div className="toast show align-items-center text-white bg-success border-0">
            <div className="d-flex">
              <div className="toast-body fw-bold">{toastMessage}</div>
              <button type="button" className="btn-close btn-close-white me-2 m-auto" onClick={() => setShowToast(false)} />
            </div>
          </div>
        </div>
      )}

      <div className="mb-4">
        <h2 className="mb-1 fw-bold">Exchange Rate Management</h2>
        <p className="text-muted">Get new live currency exchange rates and update them accordingly to be used to send funds</p>
      </div>

      {/* Rate Editor Card */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-header bg-transparent border-bottom py-3">
          <h5 className="mb-0 fw-bold">USD Live Rates</h5>
        </div>
        <div className="card-body p-4">
          <div className="d-flex align-items-end gap-3 flex-wrap">
            {/* Buy */}
            <div>
              <label className="form-label mb-1 text-muted small">Buy Rate</label>
              <input
                type="number"
                step="0.01"
                className="form-control form-control-lg text-center fw-bold"
                style={{ width: '160px' }}
                value={usdRate.buy}
                onChange={(e) => setUsdRate(prev => ({ ...prev, buy: parseFloat(e.target.value) || 0 }))}
              />
            </div>

            {/* Sell */}
            <div>
              <label className="form-label mb-1 text-muted small">Sell Rate</label>
              <input
                type="number"
                step="0.01"
                className="form-control form-control-lg text-center fw-bold text-danger"
                style={{ width: '160px' }}
                value={usdRate.sell}
                onChange={(e) => setUsdRate(prev => ({ ...prev, sell: parseFloat(e.target.value) || 0 }))}
              />
            </div>

            {/* Save Button – SAME SIZE as inputs */}
            <div className="mb-1">
              <button
                onClick={handleSave}
                className={`btn fw-bold h-100 px-4 ${
                  hasChanges()
                    ? 'btn-success shadow-sm'
                    : 'btn-outline-secondary'
                }`}
                style={{ 
                  width: '160px', 
                  height: '58px',   // exact height of form-control-lg
                  fontSize: '1.25rem' 
                }}
              >
                {hasChanges() ? 'Save' : 'Saved'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* History Table */}
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-transparent border-bottom py-3">
          <h5 className="mb-0 fw-semibold">Rate Change History</h5>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="bg-light small text-muted">
                <tr>
                  <th className="ps-4">Date & Time</th>
                  <th className="text-center">Old Buy</th>
                  <th className="text-center">New Buy</th>
                  <th className="text-center">Old Sell</th>
                  <th className="text-center">New Sell</th>
                  <th>Updated By</th>
                </tr>
              </thead>
              <tbody>
                {history.map((log, i) => (
                  <tr key={i}>
                    <td className="ps-4 small text-muted">{formatDate(log.updatedAt)}</td>
                    <td className="text-center text-muted">{log.oldBuy.toFixed(2)}</td>
                    <td className="text-center text-success fw-bold">{log.newBuy.toFixed(2)}</td>
                    <td className="text-center text-muted">{log.oldSell.toFixed(2)}</td>
                    <td className="text-center text-danger fw-bold">{log.newSell.toFixed(2)}</td>
                    <td className="text-muted small">{log.updatedBy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default RateManagement;