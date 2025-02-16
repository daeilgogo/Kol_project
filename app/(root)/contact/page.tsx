'use client'

import React, { useState, useRef } from "react";
import emailjs from '@emailjs/browser';

const ContactPage: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    // Construire les variables dynamiques pour EmailJS
    const templateParams = {
      user_name: formData.name,
      user_email: formData.email,  // L'email de l'expéditeur
      message: formData.message,
    };

    if (form.current) {
      // Envoi de l'email avec les données du formulaire
      emailjs.send('service_6mh64zj', 'template_f491es5', templateParams, 'MdRCTNILK8JZB2iah')
        .then((result) => {
          console.log(result.text);
          alert('Message Sent!');
          window.location.reload(); // Recharge la page après l'envoi de l'email
        }, (error) => {
          console.log(error.text);
        });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        {/* Header */}
        <h1 className="text-4xl font-semibold text-center text-indigo-600 mb-6">
          Contact Us
        </h1>

        {/* Introduction Section */}
        <p className="text-xl text-center mb-8 font-medium text-gray-600">
         {` Have any questions or need assistance? We're here to help!`}
        </p>

        {/* Contact Form */}
        <div className="bg-white p-8 rounded-lg shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 bottom-0 z-[-1] bg-repeat bg-center opacity-10"
            style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/white-diamond.png")' }}></div>
          <h2 className="text-3xl font-semibold text-center mb-6 text-indigo-700">
            Send Us a Message
          </h2>
          <form ref={form} onSubmit={sendEmail} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-lg font-medium text-gray-700">
                Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full p-4 border-2 border-indigo-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-lg font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full p-4 border-2 border-indigo-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-lg font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                rows={6}
                className="w-full p-4 border-2 border-indigo-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 max-h-[500px]"
              ></textarea>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-indigo-700 transition"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
