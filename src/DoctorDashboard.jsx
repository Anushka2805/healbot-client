import { useEffect, useState } from "react";
import { AlertTriangle, Activity, Clock, Shield, FileText, Stethoscope, Bell, TrendingUp, Users, Calendar } from "lucide-react";

const DoctorDashboard = () => {
  const [cases, setCases] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [stats, setStats] = useState({
    totalCases: 0,
    todayCases: 0,
    criticalLevel: 'low'
  });

  // Mock data for demonstration
  useEffect(() => {
    const mockCases = [
      {
        symptom: "severe chest pain",
        note: "Patient experiencing acute chest discomfort with shortness of breath",
        remedy: "Immediate cardiac evaluation, ECG monitoring",
        precaution: "Keep patient calm, monitor vitals continuously",
        date: new Date().toISOString(),
        severity: "critical"
      },
      {
        symptom: "high fever",
        note: "Temperature 104°F with chills and body aches",
        remedy: "Antipyretics, fluid replacement therapy",
        precaution: "Monitor temperature every 2 hours, watch for seizures",
        date: new Date(Date.now() - 3600000).toISOString(),
        severity: "high"
      },
      {
        symptom: "severe headache",
        note: "Migraine-like symptoms with photophobia",
        remedy: "Pain management, dark environment",
        precaution: "Monitor for neurological changes",
        date: new Date(Date.now() - 7200000).toISOString(),
        severity: "medium"
      }
    ];
    
    setCases(mockCases);
    setStats({
      totalCases: mockCases.length,
      todayCases: mockCases.filter(c => new Date(c.date).toDateString() === new Date().toDateString()).length,
      criticalLevel: mockCases.some(c => c.severity === 'critical') ? 'high' : 'medium'
    });
    
    // Simulate new case alert
    setTimeout(() => {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 4000);
    }, 2000);
  }, []);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return '#dc2626';
      case 'high': return '#ea580c';
      case 'medium': return '#d97706';
      default: return '#2563eb';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'critical': return <AlertTriangle size={20} />;
      case 'high': return <Activity size={20} />;
      case 'medium': return <Clock size={20} />;
      default: return <Shield size={20} />;
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    },
    header: {
      marginBottom: '30px'
    },
    headerTop: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '25px',
      flexWrap: 'wrap'
    },
    headerLeft: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    iconContainer: {
      padding: '12px',
      background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
      borderRadius: '12px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      background: 'linear-gradient(135deg, #1e293b, #334155)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      margin: '0'
    },
    subtitle: {
      color: '#64748b',
      fontSize: '1rem',
      margin: '5px 0 0 0'
    },
    bellContainer: {
      position: 'relative',
      color: '#64748b'
    },
    alertDot: {
      position: 'absolute',
      top: '-2px',
      right: '-2px',
      width: '12px',
      height: '12px',
      backgroundColor: '#dc2626',
      borderRadius: '50%',
      animation: 'pulse 2s infinite'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '20px',
      marginBottom: '30px'
    },
    statCard: {
      background: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(148, 163, 184, 0.3)',
      borderRadius: '16px',
      padding: '20px',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
    },
    statCardHover: {
      background: 'rgba(255, 255, 255, 0.95)',
      transform: 'translateY(-2px)'
    },
    statCardContent: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    statLabel: {
      color: '#64748b',
      fontSize: '0.9rem',
      fontWeight: '500',
      margin: '0 0 5px 0'
    },
    statValue: {
      color: '#1e293b',
      fontSize: '2rem',
      fontWeight: 'bold',
      margin: '0'
    },
    statIcon: {
      padding: '12px',
      borderRadius: '12px',
      background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)'
    },
    alertBanner: {
      marginBottom: '25px',
      background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.3), rgba(234, 88, 12, 0.3))',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(220, 38, 38, 0.4)',
      borderRadius: '16px',
      padding: '20px',
      animation: 'slideInFromTop 0.5s ease-out'
    },
    alertContent: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px'
    },
    alertIcon: {
      padding: '12px',
      backgroundColor: '#dc2626',
      borderRadius: '12px',
      animation: 'pulse 2s infinite'
    },
    alertTitle: {
      fontSize: '1.2rem',
      fontWeight: 'bold',
      color: '#1e293b',
      margin: '0 0 5px 0'
    },
    alertText: {
      color: '#fca5a5',
      margin: '0'
    },
    sectionTitle: {
      fontSize: '1.8rem',
      fontWeight: 'bold',
      color: '#1e293b',
      marginBottom: '30px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },
    casesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
      gap: '25px'
    },
    caseCard: {
      position: 'relative',
      background: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(148, 163, 184, 0.3)',
      borderRadius: '16px',
      padding: '25px',
      transition: 'all 0.5s ease',
      cursor: 'pointer',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
    },
    caseCardHover: {
      background: 'rgba(255, 255, 255, 0.95)',
      transform: 'scale(1.02) rotate(0.5deg)'
    },
    floatingIcon: {
      position: 'absolute',
      top: '-12px',
      right: '-12px',
      padding: '12px',
      borderRadius: '12px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
      transition: 'transform 0.3s ease'
    },
    caseNumber: {
      position: 'absolute',
      top: '15px',
      left: '15px',
      width: '32px',
      height: '32px',
      background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontWeight: 'bold',
      fontSize: '0.9rem'
    },
    caseContent: {
      paddingTop: '25px'
    },
    symptomTitle: {
      fontSize: '1.3rem',
      fontWeight: 'bold',
      color: '#1e293b',
      textTransform: 'capitalize',
      marginBottom: '15px',
      paddingRight: '50px'
    },
    severityBadge: {
      display: 'inline-block',
      padding: '6px 12px',
      borderRadius: '20px',
      fontSize: '0.75rem',
      fontWeight: 'bold',
      marginBottom: '15px'
    },
    noteSection: {
      background: 'rgba(148, 163, 184, 0.1)',
      borderRadius: '8px',
      padding: '12px',
      marginBottom: '15px'
    },
    noteText: {
      color: '#475569',
      fontSize: '0.9rem',
      lineHeight: '1.5',
      margin: '0'
    },
    infoSection: {
      marginBottom: '15px'
    },
    infoHeader: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '8px'
    },
    infoLabel: {
      fontSize: '0.7rem',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      marginBottom: '5px'
    },
    infoText: {
      fontSize: '0.9rem',
      color: '#475569',
      lineHeight: '1.4',
      margin: '0'
    },
    timestampSection: {
      paddingTop: '15px',
      borderTop: '1px solid rgba(148, 163, 184, 0.2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      fontSize: '0.75rem',
      color: '#64748b'
    },
    timestampLeft: {
      display: 'flex',
      alignItems: 'center',
      gap: '5px'
    },
    timestampRight: {
      display: 'flex',
      alignItems: 'center',
      gap: '5px'
    },
    statusDot: {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      animation: 'pulse 2s infinite'
    },
    footer: {
      marginTop: '50px',
      textAlign: 'center'
    },
    footerText: {
      color: '#6b7280',
      fontSize: '0.875rem'
    },
    noCases: {
      background: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(148, 163, 184, 0.3)',
      borderRadius: '16px',
      padding: '50px',
      textAlign: 'center',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
    },
    noCasesIcon: {
      padding: '15px',
      background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
      borderRadius: '50%',
      width: '80px',
      height: '80px',
      margin: '0 auto 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    noCasesTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#1e293b',
      margin: '0 0 10px 0'
    },
    noCasesText: {
      color: '#64748b',
      margin: '0'
    }
  };

  // CSS Animations
  const cssAnimations = `
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    @keyframes slideInFromTop {
      from { transform: translateY(-20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
  `;

  return (
    <>
      <style>{cssAnimations}</style>
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.headerTop}>
            <div style={styles.headerLeft}>
              <div style={styles.iconContainer}>
                <Stethoscope size={32} color="white" />
              </div>
              <div>
                <h1 style={styles.title}>Medical Command Center</h1>
                <p style={styles.subtitle}>Real-time critical case monitoring</p>
              </div>
            </div>
            <div style={styles.bellContainer}>
              <Bell size={24} />
              {stats.criticalLevel === 'high' && (
                <div style={styles.alertDot}></div>
              )}
            </div>
          </div>

          {/* Stats Cards */}
          <div style={styles.statsGrid}>
            <div style={styles.statCard}>
              <div style={styles.statCardContent}>
                <div>
                  <p style={styles.statLabel}>Total Cases</p>
                  <p style={styles.statValue}>{stats.totalCases}</p>
                </div>
                <div style={{...styles.statIcon, background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)'}}>
                  <Users size={24} color="white" />
                </div>
              </div>
            </div>

            <div style={styles.statCard}>
              <div style={styles.statCardContent}>
                <div>
                  <p style={styles.statLabel}>Today's Cases</p>
                  <p style={styles.statValue}>{stats.todayCases}</p>
                </div>
                <div style={{...styles.statIcon, background: 'linear-gradient(135deg, #6366f1, #4f46e5)'}}>
                  <Calendar size={24} color="white" />
                </div>
              </div>
            </div>

            <div style={styles.statCard}>
              <div style={styles.statCardContent}>
                <div>
                  <p style={styles.statLabel}>Alert Level</p>
                  <p style={{...styles.statValue, textTransform: 'capitalize'}}>{stats.criticalLevel}</p>
                </div>
                <div style={{
                  ...styles.statIcon, 
                  background: stats.criticalLevel === 'high' 
                    ? 'linear-gradient(135deg, #dc2626, #b91c1c)' 
                    : 'linear-gradient(135deg, #ea580c, #c2410c)'
                }}>
                  <TrendingUp size={24} color="white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Alert Banner */}
        {showAlert && (
          <div style={styles.alertBanner}>
            <div style={styles.alertContent}>
              <div style={styles.alertIcon}>
                <AlertTriangle size={24} color="white" />
              </div>
              <div>
                <h3 style={styles.alertTitle}>🚨 Critical Alert</h3>
                <p style={styles.alertText}>New high-priority case requires immediate attention</p>
              </div>
            </div>
          </div>
        )}

        {/* Cases Display */}
        {cases.length === 0 ? (
          <div style={styles.noCases}>
            <div style={styles.noCasesIcon}>
              <Shield size={40} color="white" />
            </div>
            <h3 style={styles.noCasesTitle}>All Clear</h3>
            <p style={styles.noCasesText}>No critical cases detected at this time</p>
          </div>
        ) : (
          <div>
            <h2 style={styles.sectionTitle}>
              <AlertTriangle size={28} color="#dc2626" />
              <span>Critical Cases Requiring Attention</span>
            </h2>
            
            <div style={styles.casesGrid}>
              {cases.map((case_, idx) => (
                <div
                  key={idx}
                  style={{
                    ...styles.caseCard,
                    borderLeft: `6px solid ${getSeverityColor(case_.severity)}`
                  }}
                >
                  {/* Floating Icon */}
                  <div style={{
                    ...styles.floatingIcon,
                    background: `linear-gradient(135deg, ${getSeverityColor(case_.severity)}, ${getSeverityColor(case_.severity)}dd)`,
                    color: 'white'
                  }}>
                    {getSeverityIcon(case_.severity)}
                  </div>

                  {/* Case Number */}
                  <div style={styles.caseNumber}>
                    {idx + 1}
                  </div>

                  {/* Content */}
                  <div style={styles.caseContent}>
                    <h3 style={styles.symptomTitle}>
                      {case_.symptom}
                    </h3>

                    {/* Severity Badge */}
                    <div style={{
                      ...styles.severityBadge,
                      backgroundColor: case_.severity === 'critical' ? 'rgba(220, 38, 38, 0.3)' :
                                     case_.severity === 'high' ? 'rgba(234, 88, 12, 0.3)' :
                                     'rgba(217, 119, 6, 0.3)',
                      color: case_.severity === 'critical' ? '#fca5a5' :
                             case_.severity === 'high' ? '#fed7aa' : '#fde68a',
                      border: `1px solid ${case_.severity === 'critical' ? 'rgba(220, 38, 38, 0.4)' :
                                         case_.severity === 'high' ? 'rgba(234, 88, 12, 0.4)' :
                                         'rgba(217, 119, 6, 0.4)'}`
                    }}>
                      {case_.severity?.toUpperCase()} PRIORITY
                    </div>

                    {/* Note */}
                    <div style={styles.noteSection}>
                      <p style={styles.noteText}>{case_.note}</p>
                    </div>

                    {/* Treatment */}
                    <div style={styles.infoSection}>
                      <div style={styles.infoHeader}>
                        <FileText size={16} color="#8A784E" style={{marginTop: '2px', flexShrink: 0}} />
                        <div>
                          <p style={{...styles.infoLabel, color: '#8A784E'}}>Treatment</p>
                          <p style={styles.infoText}>{case_.remedy}</p>
                        </div>
                      </div>
                    </div>

                    {/* Precautions */}
                    <div style={styles.infoSection}>
                      <div style={styles.infoHeader}>
                        <Shield size={16} color="#ea580c" style={{marginTop: '2px', flexShrink: 0}} />
                        <div>
                          <p style={{...styles.infoLabel, color: '#ea580c'}}>Precautions</p>
                          <p style={styles.infoText}>{case_.precaution}</p>
                        </div>
                      </div>
                    </div>

                    {/* Timestamp */}
                    <div style={styles.timestampSection}>
                      <div style={styles.timestampLeft}>
                        <Clock size={12} />
                        <span>{new Date(case_.date).toLocaleString()}</span>
                      </div>
                      <div style={styles.timestampRight}>
                        <div style={{
                          ...styles.statusDot,
                          backgroundColor: getSeverityColor(case_.severity)
                        }} />
                        <span>Active</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={styles.footer}>
          <p style={styles.footerText}>
            Auto-refreshing every 10 seconds • Last updated: {new Date().toLocaleTimeString()}
          </p>
        </div>
      </div>
    </>
  );
};

export default DoctorDashboard;