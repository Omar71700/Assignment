import React, { useState } from 'react';
import './BookingForm.css';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    people: 1,
    date: '',
    time: '',
    requests: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.fullName) formErrors.fullName = 'Full Name is required';
    if (!formData.email) {
      formErrors.email = 'Email Address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = 'Email address is invalid';
    }
    if (!formData.phone) formErrors.phone = 'Phone Number is required';
    if (!formData.date) formErrors.date = 'Date is required';
    if (!formData.time) formErrors.time = 'Time is required';
    if (formData.people < 1) formErrors.people = 'Number of people must be at least 1';

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form Data Submitted:', formData);
      // Here you would typically send data to a server
      setIsSubmitted(true);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        people: 1,
        date: '',
        time: '',
        requests: ''
      });
      setErrors({});
      // Hide success message after some time
      setTimeout(() => setIsSubmitted(false), 5000);
    }
  };

  return (
    <div className="booking-form-container">
      <h2>Book a Table</h2>
      {isSubmitted && <p className="success-message">Your table has been booked successfully!</p>}
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            aria-required="true"
            aria-describedby={errors.fullName ? "fullNameError" : undefined}
          />
          {errors.fullName && <p id="fullNameError" className="error-message">{errors.fullName}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            aria-required="true"
            aria-describedby={errors.email ? "emailError" : undefined}
          />
          {errors.email && <p id="emailError" className="error-message">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            aria-required="true"
            aria-describedby={errors.phone ? "phoneError" : undefined}
          />
          {errors.phone && <p id="phoneError" className="error-message">{errors.phone}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="people">Number of People</label>
          <input
            type="number"
            id="people"
            name="people"
            value={formData.people}
            onChange={handleChange}
            min="1"
            aria-required="true"
            aria-describedby={errors.people ? "peopleError" : undefined}
          />
          {errors.people && <p id="peopleError" className="error-message">{errors.people}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            aria-required="true"
            aria-describedby={errors.date ? "dateError" : undefined}
          />
          {errors.date && <p id="dateError" className="error-message">{errors.date}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="time">Time</label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            aria-required="true"
            aria-describedby={errors.time ? "timeError" : undefined}
          />
          {errors.time && <p id="timeError" className="error-message">{errors.time}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="requests">Special Requests</label>
          <textarea
            id="requests"
            name="requests"
            value={formData.requests}
            onChange={handleChange}
            rows="3"
          />
        </div>

        <button type="submit" className="submit-button">Book Table</button>
      </form>
    </div>
  );
};

export default BookingForm;
