
import { useState } from "react";
import axios from "axios";

const ContactForm = () => {
  // const [users, setUsers] = useState([]);
  // const [messages, setMessages] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [errors, setErrors] = useState({});

  // function FetchUsers() {
  //   axios.get("http://localhost:5000/api/users")
  //     .then(res => {
  //       setUsers(res.data.users);
  //     })
  //     .catch(err => console.error(err));
  // }

  // function FetchMessages() {
  //   axios.get("http://localhost:5000/api/messages")
  //     .then(res => {
  //       setMessages(res.data.messages);
  //     })
  //     .catch(err => console.error(err));
  // }

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const Validate = () => {
    const newErrors = {};
    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.name.trim()) newErrors.name = "Name is required";

    if (!form.email.trim()) {
      newErrors.email = "Email ID is required";
    } else if (!EMAIL_REGEX.test(form.email)) {
      newErrors.email = "Invalid email";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (form.phone.length !== 10) {
      newErrors.phone = "Invalid phone number";
    }

    if (!form.message.trim()) newErrors.message = "Message is required";

    // Only keys with actual error messages are now in the object
    return newErrors;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = Validate();
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post("http://localhost:5000/api/send-message", form);
        console.log(response.data);
        setForm({
          name: "",
          email: "",
          phone: "",
          message: ""
        });
        setErrors({});
      } catch (err) {
        if (err.response && err.response.status === 409) {
          alert("Wait! You've alredy sent this message");
        } else {
          console.log("Something went wrong with the server:\n" + err);
        }
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <div className="input-field">
        <label htmlFor="name">Name</label>
        <input type="text" name="name" value={form.name} onChange={handleFormChange} />
        {errors.name && <span>{errors.name}</span>}
      </div>
      <div className="input-field">
        <label htmlFor="email">Email</label>
        <input type="email" name="email" value={form.email} onChange={handleFormChange} />
        {errors.email && <span>{errors.email}</span>}
      </div>
      <div className="input-field">
        <label htmlFor="phone">Phone</label>
        <input type="tel" name="phone" value={form.phone} onChange={handleFormChange} />
        {errors.phone && <span>{errors.phone}</span>}
      </div>
      <div className="input-field">
        <label htmlFor="message">Message</label>
        <textarea name="message" value={form.message} onChange={handleFormChange} />
        {errors.message && <span>{errors.message}</span>}
      </div>
      <div className="submit-button">
        <button type="submit">Submit</button>
      </div>
    </form>
  )
}

export default ContactForm;