import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import './CreateEvent.css'; 

const CreateEvent = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    venue: "",
    ticketLimit: "",
    approvalMode: "Auto", 
  });

  const { title, description, date, venue, ticketLimit, approvalMode } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };
      await axios.post("https://event-hive-backend-pbs-alekhyas-projects.vercel.app/api/events", formData, config);
      alert("Event Created Successfully!");
      navigate("/dashboard");
    } catch (error) {
      alert("Error creating event: " + (error.response?.data?.message || "Unknown Error"));
    }
  };

  return (
    <div className="create-container">
      <div className="create-card">
        
        <div className="form-header">
          <h2 className="form-title">Create New Event</h2>
          <p className="form-subtitle">Fill in the details to launch your event.</p>
        </div>
      
        <form onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label>Event Title</label>
            <input 
              type="text" 
              name="title" 
              className="form-input"
              placeholder="e.g. Annual Tech Conference"
              value={title} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea 
              name="description" 
              className="form-textarea"
              placeholder="What is this event about?"
              value={description} 
              onChange={handleChange} 
              required 
            />
          </div>

          {/* Row for Date and Venue */}
          <div className="form-row">
            <div className="form-group">
              <label>Date</label>
              <input 
                type="date" 
                name="date" 
                className="form-input"
                value={date} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="form-group">
              <label>Venue</label>
              <input 
                type="text" 
                name="venue" 
                className="form-input"
                placeholder="e.g. Main Auditorium"
                value={venue} 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>

          {/* Row for Tickets and Approval */}
          <div className="form-row">
            <div className="form-group">
              <label>Total Tickets</label>
              <input 
                type="number" 
                name="ticketLimit" 
                className="form-input"
                placeholder="e.g. 100"
                value={ticketLimit} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="form-group">
              <label>Approval Mode</label>
              <select 
                name="approvalMode" 
                className="form-select"
                value={approvalMode} 
                onChange={handleChange}
              >
                <option value="Auto">Auto-Approve</option>
                <option value="Manual">Manual Approval</option>
              </select>
            </div>
          </div>

          <div className="button-group">
            <button type="button" onClick={() => navigate("/dashboard")} className="btn-cancel">
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              Publish Event
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CreateEvent;