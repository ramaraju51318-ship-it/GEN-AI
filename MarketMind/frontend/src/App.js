import { useState } from "react";
import "./App.css";

function App() {

  const [page, setPage] = useState("assistant");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const generate = async () => {
    if (!input) return;

    const res = await fetch("http://127.0.0.1:8000/generate", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ text: input })
    });

    const data = await res.json();
    setOutput(data.result);
  };

  /* ---------------- CHART COMPONENT ---------------- */

  const BarChart = () => (
    <div className="chart">
      <div className="bar" style={{height:"60%"}}></div>
      <div className="bar" style={{height:"80%"}}></div>
      <div className="bar" style={{height:"40%"}}></div>
      <div className="bar" style={{height:"90%"}}></div>
      <div className="bar" style={{height:"70%"}}></div>
    </div>
  );

  const LineChart = () => (
    <div className="line-chart">
      <div className="line"></div>
    </div>
  );

  /* ---------------- PAGE SWITCH ---------------- */

  const renderPage = () => {

    if (page === "assistant") {
      return (
        <div className="card big">
          <h2>AI Sales Assistant</h2>

          <textarea
            placeholder="Ask AI to generate campaign, pitch, or insights..."
            value={input}
            onChange={(e)=>setInput(e.target.value)}
          />

          <button onClick={generate}>Generate AI Insight</button>

          {output && <div className="output">{output}</div>}
        </div>
      );
    }

    if (page === "campaigns") {
      return (
        <>
          <div className="card">
            <h2>Campaign Performance</h2>
            <BarChart/>
            <p>Best performing channel: Instagram Reels</p>
          </div>

          <div className="card">
            <h2>Engagement Trend</h2>
            <LineChart/>
          </div>
        </>
      );
    }

    if (page === "leads") {
      return (
        <>
          <div className="card">
            <h2>Lead Quality Distribution</h2>
            <BarChart/>
          </div>

          <div className="card">
            <h2>Top Leads</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Score</th>
                  <th>Intent</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>TechNova</td><td>92</td><td>High</td></tr>
                <tr><td>UrbanKart</td><td>81</td><td>Medium</td></tr>
                <tr><td>NextWave</td><td>76</td><td>Medium</td></tr>
              </tbody>
            </table>
          </div>
        </>
      );
    }

    if (page === "forecast") {
      return (
        <>
          <div className="card">
            <h2>Revenue Projection</h2>
            <LineChart/>
            <h1 style={{color:"#22d3ee"}}>$410,000</h1>
          </div>

          <div className="card">
            <h2>AI Recommendation</h2>
            <ul>
              <li>Increase influencer campaigns</li>
              <li>Retarget returning visitors</li>
              <li>Expand Tier-2 markets</li>
            </ul>
          </div>
        </>
      );
    }
  };

  return (
    <div className="layout">

      {/* SIDEBAR */}
      <div className="sidebar">
        <h2>🧠 MarketMind</h2>

        <div className={`menu-item ${page==="assistant"?"active":""}`}
             onClick={()=>setPage("assistant")}>
          AI Assistant
        </div>

        <div className={`menu-item ${page==="campaigns"?"active":""}`}
             onClick={()=>setPage("campaigns")}>
          Campaign Analytics
        </div>

        <div className={`menu-item ${page==="leads"?"active":""}`}
             onClick={()=>setPage("leads")}>
          Lead Insights
        </div>

        <div className={`menu-item ${page==="forecast"?"active":""}`}
             onClick={()=>setPage("forecast")}>
          Sales Forecast
        </div>
      </div>

      {/* MAIN */}
      <div className="main">
        <h1>Sales Intelligence Dashboard</h1>
        <div className="grid">
          {renderPage()}
        </div>
      </div>

    </div>
  );
}

export default App;