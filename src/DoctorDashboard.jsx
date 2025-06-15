import { useEffect, useState } from "react";
import {
  AlertTriangle,
  Activity,
  Clock,
  Shield,
  Bell,
} from "lucide-react";
import "./DoctorDashboard.css"; // ✅ Make sure this CSS file is created and imported

const DoctorDashboard = () => {
  const [cases, setCases] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [stats, setStats] = useState({
    totalCases: 0,
    todayCases: 0,
    criticalLevel: "low",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://healbot-client.onrender.com/api/chat/summary");
        const data = await res.json();

        const enrichedCases = data.criticalCases.map((c) => ({
          ...c,
          severity: "critical",
        }));

        setCases(enrichedCases);
        setStats({
          totalCases: enrichedCases.length,
          todayCases: enrichedCases.filter(
            (c) => new Date(c.date).toDateString() === new Date().toDateString()
          ).length,
          criticalLevel: "high",
        });

        if (enrichedCases.length > 0) {
          setShowAlert(true);
          setTimeout(() => setShowAlert(false), 4000);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "critical":
        return "#dc2626";
      case "high":
        return "#ea580c";
      case "medium":
        return "#d97706";
      default:
        return "#2563eb";
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case "critical":
        return <AlertTriangle size={18} />;
      case "high":
        return <Activity size={18} />;
      case "medium":
        return <Clock size={18} />;
      default:
        return <Shield size={18} />;
    }
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-heading">Doctor Dashboard</h2>

      {showAlert && (
        <div className="alert-banner">
          <Bell className="alert-icon" /> New critical case detected!
        </div>
      )}

      <div className="stats-container">
        <div className="stat-card">
          <h4>Total Critical Cases</h4>
          <p>{stats.totalCases}</p>
        </div>
        <div className="stat-card">
          <h4>Cases Today</h4>
          <p>{stats.todayCases}</p>
        </div>
        <div className="stat-card">
          <h4>Alert Level</h4>
          <p style={{ color: "red" }}>{stats.criticalLevel}</p>
        </div>
      </div>

      <table className="cases-table">
        <thead>
          <tr>
            <th>Symptom</th>
            <th>Note</th>
            <th>Remedy</th>
            <th>Precaution</th>
            <th>Date</th>
            <th>Severity</th>
          </tr>
        </thead>
        <tbody>
          {cases.map((c, idx) => (
            <tr key={idx}>
              <td>{c.symptom}</td>
              <td>{c.note}</td>
              <td>{c.remedy}</td>
              <td>{c.precaution}</td>
              <td>
                {new Date(c.date).toLocaleString("en-IN", {
                  hour: "2-digit",
                  minute: "2-digit",
                  day: "numeric",
                  month: "short",
                })}
              </td>
              <td style={{ color: getSeverityColor(c.severity), fontWeight: "bold" }}>
                <span className="severity-cell">
                  {getSeverityIcon(c.severity)} {c.severity}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorDashboard;
