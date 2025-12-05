import React from 'react';

const Reports = () => {
  // Summary data (Today / This Week / This Month)
  const summary = {
    today: { buyAmount: 1245000, sellAmount: 985000, profit: 42850 },
    week: { buyAmount: 8750000, sellAmount: 6920000, profit: 312400 },
    month: { buyAmount: 34200000, sellAmount: 26850000, profit: 1285000 },
  };

  // Deep analytics data
  const monthlyData = [
    { month: 'Jan 2025', buyUSD: 285000, sellUSD: 242000, profit: 985000 },
    { month: 'Feb 2025', buyUSD: 310000, sellUSD: 268000, profit: 1125000 },
    { month: 'Mar 2025', buyUSD: 298000, sellUSD: 255000, profit: 1083000 },
    { month: 'Apr 2025', buyUSD: 342000, sellUSD: 295000, profit: 1285000 },
    { month: 'May 2025', buyUSD: 365000, sellUSD: 318000, profit: 1420000 },
    { month: 'Jun 2025', buyUSD: 380000, sellUSD: 335000, profit: 1580000 },
    { month: 'Jul 2025', buyUSD: 358000, sellUSD: 310000, profit: 1382000 },
    { month: 'Aug 2025', buyUSD: 410000, sellUSD: 368000, profit: 1825000 },
    { month: 'Sep 2025', buyUSD: 395000, sellUSD: 352000, profit: 1698000 },
    { month: 'Oct 2025', buyUSD: 428000, sellUSD: 385000, profit: 1950000 },
    { month: 'Nov 2025', buyUSD: 445000, sellUSD: 402000, profit: 2120000 },
    { month: 'Dec 2025', buyUSD: 480000, sellUSD: 438000, profit: 2385000 },
  ];

  const tellerPerformance = [
    { name: 'Aisha', transactions: 842, profit: 9854000 },
    { name: 'John', transactions: 721, profit: 8720000 },
    { name: 'Mary', transactions: 689, profit: 7980000 },
    { name: 'Samuel', transactions: 512, profit: 6230000 },
    { name: 'Grace', transactions: 398, profit: 4850000 },
  ];

  const dailyProfit = [28500, 42100, 38750, 51200, 48900, 35500, 42850]; // Last 7 days

  const bestMonth = monthlyData.reduce((a, b) => a.profit > b.profit ? a : b);
  const worstMonth = monthlyData.reduce((a, b) => a.profit < b.profit ? a : b);
  const totalProfit = monthlyData.reduce((sum, m) => sum + m.profit, 0);
  const totalVolume = monthlyData.reduce((sum, m) => sum + m.buyUSD + m.sellUSD, 0);
  const avgProfitPer1000 = Math.round(totalProfit / (totalVolume / 1000));

  return (
    <div className="report-div">
      
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1 fw-bold">Business Reports & Analytics</h2>
          <p className="text-muted">Deep insights to grow your bureau</p>
        </div>
        <button className="btn btn-success px-4 py-2 fw-bold">
          Export Full Report
        </button>
      </div>

      {/* TOP SUMMARY CARDS – Beautiful & Clean */}
      <div className="row g-4 mb-5">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <h6 className="text-muted small fw-bold text-uppercase">Today</h6>
              <div className="mt-3">
                <p className="mb-1 text-muted small">Bought USD</p>
                <h3 className="fw-bold text-success">${summary.today.buyAmount.toLocaleString()}</h3>
              </div>
              <div className="mt-3">
                <p className="mb-1 text-muted small">Sold USD</p>
                <h3 className="fw-bold text-danger">${summary.today.sellAmount.toLocaleString()}</h3>
              </div>
              <hr />
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-muted small">Profit Today (TZS)</span>
                <h4 className="fw-bold text-success">{summary.today.profit.toLocaleString()}</h4>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <h6 className="text-muted small fw-bold text-uppercase">This Week</h6>
              <div className="mt-3">
                <p className="mb-1 text-muted small">Total Volume</p>
                <h3 className="fw-bold">${(summary.week.buyAmount + summary.week.sellAmount).toLocaleString()}</h3>
              </div>
              <hr />
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-muted small">Weekly Profit (TZS)</span>
                <h4 className="fw-bold text-success">{summary.week.profit.toLocaleString()}</h4>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <h6 className="text-muted small fw-bold text-uppercase">This Month</h6>
              <div className="mt-3">
                <p className="mb-1 text-muted small">Total Volume</p>
                <h3 className="fw-bold">${(summary.month.buyAmount + summary.month.sellAmount).toLocaleString()}</h3>
              </div>
              <hr />
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-muted small">Monthly Profit (TZS)</span>
                <h4 className="fw-bold text-success">{summary.month.profit.toLocaleString()}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profit Trend (Simple Bar Chart) */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-header bg-transparent border-bottom py-3">
          <h5 className="mb-0 fw-semibold">Daily Profit - Last 7 Days</h5>
        </div>
        <div className="card-body">
          <div className="d-flex align-items-end justify-content-between h-100" style={{ height: '200px' }}>
            {dailyProfit.map((profit, i) => (
              <div key={i} className="text-center flex-fill">
                <div
                  className="bg-success rounded-top mx-auto"
                  style={{
                    height: `${(profit / 55000) * 100}%`,
                    width: '50px',
                    minHeight: '20px',
                    transition: 'all 0.4s ease'
                  }}
                ></div>
                <small className="text-muted d-block mt-2">Day {i + 1}</small>
                <small className="fw-bold">{profit.toLocaleString()}</small>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key Metrics Row */}
      <div className="row g-4 mb-5">
        <div className="col-md-3">
          <div className="card border-0 shadow-sm text-center p-4">
            <h5 className="text-muted small">Total Profit YTD (TZS)</h5>
            <h2 className="fw-bold text-success">{totalProfit.toLocaleString()}</h2>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm text-center p-4">
            <h5 className="text-muted small">Best Month</h5>
            <h4 className="fw-bold text-success">{bestMonth.month}</h4>
            <p className="mb-0 text-success">TZS {bestMonth.profit.toLocaleString()}</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm text-center p-4">
            <h5 className="text-muted small">Top Teller</h5>
            <h4 className="fw-bold text-success">{tellerPerformance[0].name}</h4>
            <p className="mb-0 text-success">TZS {tellerPerformance[0].profit.toLocaleString()}</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm text-center p-4">
            <h5 className="text-muted small">Avg Profit per $1000 (TZS)</h5>
            <h2 className="fw-bold text-success">{avgProfitPer1000.toLocaleString()}</h2>
          </div>
        </div>
      </div>

      {/* Monthly Comparison Table */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-header bg-transparent border-bottom py-3">
          <h5 className="mb-0 fw-semibold">Monthly Performance Comparison - Last 12 months</h5>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="bg-light small text-muted">
                <tr>
                  <th className="ps-4">Month</th>
                  <th className="text-center">Buy (USD)</th>
                  <th className="text-center">Sell (USD)</th>
                  <th className="text-center">Total Volume</th>
                  <th className="text-center">Profit (TZS)</th>
                  <th className="text-center">Performance</th>
                </tr>
              </thead>
              <tbody>
                {monthlyData.map((m, i) => {
                  const isBest = m.profit === bestMonth.profit;
                  const isWorst = m.profit === worstMonth.profit;
                  return (
                    <tr key={i} className={isBest ? 'table-success' : isWorst ? 'table-warning' : ''}>
                      <td className="ps-4 fw-bold">{m.month}</td>
                      <td className="text-center">${m.buyUSD.toLocaleString()}</td>
                      <td className="text-center">${m.sellUSD.toLocaleString()}</td>
                      <td className="text-center fw-bold">${(m.buyUSD + m.sellUSD).toLocaleString()}</td>
                      <td className="text-center text-success fw-bold">{m.profit.toLocaleString()}</td>
                      <td className="text-center">
                        {isBest && <span className="badge bg-success">Best Month</span>}
                        {isWorst && <span className="badge bg-warning text-dark">Lowest</span>}
                        {!isBest && !isWorst && '—'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Teller Leaderboard */}
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-transparent border-bottom py-3">
          <h5 className="mb-0 fw-semibold">Top Performing Tellers (by Profit Generated)</h5>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="bg-light small text-muted">
                <tr>
                  <th className="ps-4">Rank</th>
                  <th>Teller Name</th>
                  <th className="text-center">Transactions</th>
                  <th className="text-center">Profit Generated (TZS)</th>
                  <th className="text-center">Avg Profit/Deal (TZS)</th>
                </tr>
              </thead>
              <tbody>
                {tellerPerformance.map((t, i) => (
                  <tr key={i} className={i === 0 ? 'table-success' : ''}>
                    <td className="ps-4 fw-bold">
                      {i === 0 ? '1st' : i === 1 ? '2nd' : i === 2 ? '3rd' : `${i + 1}th`}
                    </td>
                    <td className="fw-bold">{t.name}</td>
                    <td className="text-center">{t.transactions}</td>
                    <td className="text-center text-success fw-bold">{t.profit.toLocaleString()}</td>
                    <td className="text-center">{Math.round(t.profit / t.transactions).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>


    </div>
  );
};

export default Reports;