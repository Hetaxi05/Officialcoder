import React, { useState } from "react";
import "./FAQ.css"; // Importing CSS

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    { question: "Which payment methods are accepted by Official Coders?", answer: "We accept credit cards, PayPal, and other online payment method.We accept credit cards, PayPal, and other online payment methods." },
    { question: "Does Official Coders  offer a refund?", answer: "Yes, we offer a 7-day money-back guarantee." },
    { question: "Can I access all courses if I purchase a subscription to Official Coders?", answer: "Yes, you get unlimited access to all courses." },
    { question: "What Certifications will I be eligible for after enrolling in Official Coders?", answer: "You will receive certificates upon course completion." },
    { question: "How do I reach out to Official Coders support?", answer: "You can contact us via email or live chat support." }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h2 className="faq-title">Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div className="faq-item" key={index}>
            <div 
              className={`faq-question ${openIndex === index ? "active" : ""}`} 
              onClick={() => toggleFAQ(index)}
            >
              {index + 1}. {faq.question}
              <span className="faq-icon">{openIndex === index ? "×" : "+"}</span>
            </div>
            <div className={`faq-answer ${openIndex === index ? "open" : ""}`}>
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
