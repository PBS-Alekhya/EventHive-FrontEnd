import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import './Dashboard.css'; 

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  // Fetch Events on Load
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.get("https://event-hive-backend-pbs-alekhyas-projects.vercel.app/api/events", config);
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events", error);
      }
    };

    if (user) {
      fetchEvents();
    }
  }, [user]);

  return (
    <div className="dashboard-container">
      
      {/* 1. Navbar */}
      <header className="dash-header">
        <div className="dash-logo">EventHive</div>
        <div className="user-info">
          <span className="user-name">Hello, {user?.name}</span>
          <button 
            onClick={() => { logout(); navigate("/login"); }}
            className="btn-logout"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="dash-content">
        
        {/* 2. Action Bar */}
        <div className="action-bar">
          <h2 className="section-title">Your Events</h2>
          <Link to="/create-event">
            <button className="btn-create">
              + Create New Event
            </button>
          </Link>
        </div>

        {/* 3. Events Grid */}
        {events.length === 0 ? (
          <div className="no-events">
            <h3>No events found 😴</h3>
            <p>Click the button above to create your first event!</p>
          </div>
        ) : (
          <div className="events-grid">
            {events.map((event) => (
              <div key={event._id} className="event-card">
                
                <div className="card-header">
                  <h3 className="event-title">{event.title}</h3>
                  <span className={`badge ${event.approvalMode === 'Auto' ? 'badge-auto' : 'badge-manual'}`}>
                    {event.approvalMode}
                  </span>
                </div>

                <div className="event-details">
                  <p>📅 {new Date(event.date).toLocaleDateString()}</p>
                  <p>📍 {event.venue}</p>
                  <p>🎟️ {event.ticketLimit} Tickets</p>
                </div>
                
                <div className="card-actions">
                  <button 
                    onClick={() => navigate(`/event/${event._id}/requests`)}
                    className="btn-card btn-requests"
                  >
                    View Requests
                  </button>

                  <Link to={`/event/${event._id}`} target="_blank" style={{flex: 1}}>
                      <button className="btn-card btn-public">
                          Public Page ↗
                      </button>
                  </Link>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;