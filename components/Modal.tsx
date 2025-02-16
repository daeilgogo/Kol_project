import React, { useState, useRef } from "react";
import emailjs from '@emailjs/browser';

interface ModalProps {
  car: {
    title: string;
    price: string;
    description: string;
    features: {
      color: string;
      fuel: string;
      horsepower: string;
      mileage: string;
      transmission: string;
    };
  };
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ car, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(
    `Dear,
  
  I hope this message finds you well. I am writing to express my interest in the ${car.title} that you have listed. After reviewing the details, I would like to learn more about this vehicle.
  
  Here are some of the key details about the car that caught my attention:
  - **Name**: ${car.title}
  - **Price**: ${car.price}
  - **Color**: ${car.features.color}
  - **Fuel Type**: ${car.features.fuel}
  - **Horsepower**: ${car.features.horsepower}
  - **Mileage**: ${car.features.mileage}
  - **Transmission**: ${car.features.transmission}
  
  Could you kindly provide further information about the car's condition, service history, and any additional features or packages available? I am looking forward to hearing back from you.
  
  Thank you for your time and consideration.
  
  Best regards,
  ${name}`
  );

  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form fields
    if (!name || !email || !message) {
      alert("Please fill in all fields.");
      return;
    }

    const templateParams = {
      user_name: name,
      user_email: email,
      message: message,
    };

    if (form.current) {
      emailjs.send('service_6mh64zj', 'template_f491es5', templateParams, 'MdRCTNILK8JZB2iah')
        .then((result) => {
          console.log(result.text);
          alert('Message Sent!');
          onClose(); // Close the modal after sending the email
          setName("");
          setEmail("");
          setMessage("");
        })
        .catch((error) => {
          console.error("Error sending email:", error);
          alert('There was an error sending the message.');
        });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] md:w-[50%] relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl"
        >
          ✖
        </button>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{car.title}</h2>
        <p className="text-2xl text-gray-700 mb-4 p-2 border rounded"
               style={{   
                resize:'vertical',        
                overflowY: 'auto',         
                height: `100px`,
                maxHeight:'200px',            
              }}>{car.description}</p>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <p className="font-semibold">Color: <span className="text-gray-700">{car.features.color}</span></p>
          <p className="font-semibold">Fuel: <span className="text-gray-700">{car.features.fuel}</span></p>
          <p className="font-semibold">Horsepower: <span className="text-gray-700">{car.features.horsepower}</span></p>
          <p className="font-semibold">Mileage: <span className="text-gray-700">{car.features.mileage}</span></p>
          <p className="font-semibold">Transmission: <span className="text-gray-700">{car.features.transmission}</span></p>
        </div>

        <p className="text-2xl font-semibold text-green-600 mt-4">{car.price} Franc Cfa</p>

        {/* Form */}
        <form ref={form} onSubmit={sendEmail}>
          {/* Name Input */}
          <div className="mt-4">
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full border p-2 rounded-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email Input */}
          <div className="mt-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border p-2 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Message Input */}
          {/* <div className="mt-4">
            <textarea
              placeholder="Enter your message"
              className="w-full border p-2 rounded-md"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
            />
          </div> */}

          <button
            type="submit"
            className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
