import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 
import axios from "axios";
import './EventPage.css';

const EventPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [ticket, setTicket] = useState(null); 
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPageData = async () => {
      try {
        const eventRes = await axios.get(`https://event-hive-backend-pbs-alekhyas-projects.vercel.app/api/events/${id}`);
        setEvent(eventRes.data);

        
        const storedRegId = localStorage.getItem(`registration_${id}`);
        if (storedRegId) {
          const ticketRes = await axios.get(`https://event-hive-backend-pbs-alekhyas-projects.vercel.app/api/registrations/${storedRegId}`);
          setTicket(ticketRes.data);
        }
      } catch (err) {
        if (err.response && err.response.status === 404) {
             localStorage.removeItem(`registration_${id}`);
        }
        if (!event) setError("Event not found");
      } finally {
        setLoading(false);
      }
    };
    loadPageData();
  }, [id]);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("https://event-hive-backend-pbs-alekhyas-projects.vercel.app/api/registrations", {
        eventId: id,
        userName: name,
        userEmail: email,
      });
      
     
      localStorage.setItem(`registration_${id}`, data._id);
      setTicket(data); 
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

 
  const handleReset = () => {
    localStorage.removeItem(`registration_${id}`);
    setTicket(null);
    setName("");
    setEmail("");
  };

  if (loading) return <div className="public-container"><h2 className="loading-text">Loading Event...</h2></div>;
  if (error) return <div className="public-container"><h2 style={{color:'#ff4d4d'}}>{error}</h2></div>;

  return (
    <div className="public-container">
      <div className="event-card-public">
        
        {/* EVENT HEADER */}
        <div className="event-header">
          <h1 className="public-title">{event.title}</h1>
          <p className="public-desc">{event.description}</p>
        </div>

        <div className="info-grid">
          <div className="info-item">
            <span className="info-icon">📅</span> 
            {new Date(event.date).toLocaleDateString()}
          </div>
          <div className="info-item">
            <span className="info-icon">📍</span> 
            {event.venue}
          </div>
          <div className="info-item">
            <span className="info-icon">🎟️</span> 
            {event.ticketLimit} Spots
          </div>
        </div>

        
        <div className="register-section">
          {ticket ? (
            <div className="ticket-container">
              {ticket.status === "Approved" ? (
                <>
                  <h2 style={{color: '#4ade80'}}>Registration Successful!</h2>
                  <div className="ticket-visual">
                    <div className="ticket-header">
                      <h3>EVENT TICKET</h3>
                    </div>
                    <p><strong>Attendee:</strong> {ticket.userName}</p>
                    <div className="ticket-id">Ticket ID: {ticket.ticketId}</div>
                    <div className="ticket-status status-approved">
                      ● Approved
                    </div>
                  </div>
                </>
              ) : (
                <div className="pending-box">
                  <h3>⏳ Approval Pending</h3>
                  <p style={{margin: '10px 0', fontSize: '0.9rem'}}>
                    Your request has been sent to the organizer. 
                    Please wait for them to approve your seat.
                  </p>
                  <div className="ticket-status status-pending">
                    ● Status: Pending
                  </div>
                  <small style={{display:'block', marginTop:'10px', color:'white'}}>
                    Refresh this page later to check status.
                  </small>
                </div>
              )}
              
              {/* ---  Register Another Person --- */}
              <button 
                onClick={handleReset}
                style={{
                  marginTop: '20px',
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.3)',
                  color: '#cbd5e1',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}
              >
                ← Register Another Person
              </button>

            </div>
          ) : (
            <>
              <h3 className="reg-title">Reserve your spot</h3>
              <form onSubmit={handleRegister}>
                <input
                  type="text"
                  className="public-input"
                  placeholder="Your Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <input
                  type="email"
                  className="public-input"
                  placeholder="Your Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="btn-get-ticket">
                  Get Ticket
                </button>
              </form>
            </>
          )}
        </div>

      </div>
    </div>
  );
};

export default EventPage;