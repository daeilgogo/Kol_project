'use client'
import React, { useState } from "react";

const Faq = () => {
  // Liste des FAQ
  const faqs = [
    {
      question: "What types of vehicles do you export?",
      answer:
        "We export a variety of high-quality, pre-owned vehicles including sedans, SUVs, trucks, and vans from South Korea to international markets.",
    },
    {
      question: "Which countries do you ship to?",
      answer:
        "We ship primarily to African countries, but we also cater to other international markets. Please contact us for specific inquiries.",
    },
    {
      question: "How long does shipping take?",
      answer:
        "Shipping times vary depending on the destination. Typically, deliveries take 4-8 weeks after the order is confirmed.",
    },
    {
      question: "Are the cars inspected before export?",
      answer:
        "Yes, all vehicles undergo a rigorous inspection process to ensure quality and performance before being shipped.",
    },
    {
      question: "How can I place an order?",
      answer:
        "You can place an order by contacting us via our website, email, or phone. We will guide you through the entire process.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept wire transfers, bank deposits, and other secure payment methods. Contact us for detailed payment options.",
    },
  ];

  // Gestion de l'état d'ouverture des questions
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Titre de la page */}
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
          Frequently Asked Questions
        </h1>
        <p className="text-lg text-center mb-8">
          Here are some common questions about our services and processes.
        </p>

        {/* Liste des FAQ */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left p-4 focus:outline-none flex justify-between items-center"
              >
                <span className="text-lg font-medium">{faq.question}</span>
                <span className="text-blue-600 text-xl">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>
              {openIndex === index && (
                <div className="p-4 border-t border-gray-200">
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;
