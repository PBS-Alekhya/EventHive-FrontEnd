import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import './EventRequests.css'; 

const EventRequests = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [registrations, setRegistrations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${user.token}` },
        };
        const { data } = await axios.get(`https://event-hive-backend-pbs-alekhyas-projects.vercel.app/api/registrations/event/${id}`, config);
        setRegistrations(data);
      } catch (error) {
        alert("Failed to load requests");
      }
    };
    if (user) fetchRegistrations();
  }, [id, user]);

  const handleAction = async (regId, status) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };
      await axios.patch(`https://event-hive-backend-pbs-alekhyas-projects.vercel.app/api/registrations/${regId}`, { status }, config);
      
      setRegistrations(registrations.map(reg => 
        reg._id === regId ? { ...reg, status } : reg
      ));
    } catch (error) {
      alert("Action failed");
    }
  };

  return (
    <div className="requests-container">
      <div className="requests-card">
        
        
        <div className="req-header">
          <h2 className="req-title">Manage Registrations</h2>
          <button onClick={() => navigate("/dashboard")} className="btn-back">
            ← Back to Dashboard
          </button>
        </div>
        
        {/* Table or Empty State */}
        {registrations.length === 0 ? (
          <div className="empty-state">
            <h3>No registrations yet 📭</h3>
            <p>Share your public link to get attendees!</p>
          </div>
        ) : (
          <table className="req-table">
            <thead>
              <tr>
                <th>Attendee Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((reg) => (
                <tr key={reg._id}>
                  <td style={{fontWeight: '500'}}>{reg.userName}</td>
                  <td style={{color: '#ccc'}}>{reg.userEmail}</td>
                  <td>
                    <span className={`status-badge status-${reg.status.toLowerCase()}`}>
                      {reg.status}
                    </span>
                  </td>
                  <td>
                    {reg.status === "Pending" ? (
                      <div className="action-buttons">
                        <button 
                          onClick={() => handleAction(reg._id, "Approved")}
                          className="btn-action btn-approve"
                        >
                          ✓ Approve
                        </button>
                        <button 
                          onClick={() => handleAction(reg._id, "Rejected")}
                          className="btn-action btn-reject"
                        >
                          ✕ Reject
                        </button>
                      </div>
                    ) : (
                      <span style={{color: '#64748b', fontSize: '0.9rem'}}>Completed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default EventRequests;