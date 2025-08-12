import { useState } from "react";
import emailjs from "emailjs-com";

export default function ContactForm({ onClose }) {
  const [showThankYou, setShowThankYou] = useState(false);
  const [showInvalidEmail, setShowInvalidEmail] = useState(false);
  const [checkingEmail, setCheckingEmail] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    message: "",
  });

  async function verifyEmailExists(email) {
    const res = await fetch(
      `https://emailvalidation.abstractapi.com/v1/?api_key=906c36552d45415a9fc4b6af455ce62c&email=${encodeURIComponent(email)}`
    );
    const data = await res.json();
    return data.deliverability === "DELIVERABLE";
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    setFormValues({ name, email, message });

    if (!name || !email || !message) {
      return;
    }

    setCheckingEmail(true);

    const exists = await verifyEmailExists(email);
    if (!exists) {
      setShowInvalidEmail(true);
      setCheckingEmail(false);
      return;
    }

    setShowThankYou(true);

    emailjs
      .sendForm('service_0wysh5j', 'template_h9sydqm', form, 'zuhuIQYigjI5aytn4')
      .then(() => {
        emailjs.send(
          'service_0wysh5j',
          'template_mfq1l17',
          {
            email: email,
            name: name,
          },
          'zuhuIQYigjI5aytn4'
        ).then(() => {
          onClose();
        });
      });
  }

  if (showThankYou) {
    return (
      <div className="p-10 flex flex-col items-center justify-center text-center animate-fade-in">
        <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mb-6 animate-bounce shadow-xl">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div className="text-2xl font-bold mb-3 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Thanks for your message!
        </div>
        <div className="text-gray-600 text-base">You'll be redirected shortly.</div>
      </div>
    );
  }

  if (showInvalidEmail) {
    return (
      <div className="p-10 flex flex-col items-center justify-center text-center animate-fade-in">
        <div className="w-20 h-20 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center mb-6 shadow-xl">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <div className="text-2xl font-bold mb-3 bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
          Invalid Email Address
        </div>
        <div className="text-gray-600 text-base mb-6">
          That email address does not exist. Please re-enter your email.
        </div>
        <button
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300"
          onClick={() => setShowInvalidEmail(false)}
        >
          Return to Form
        </button>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
          Send a Message
        </h3>
        <p className="text-gray-600 text-lg">I'd love to hear from you!</p>
      </div>
      
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="relative">
            <input
              name="name"
              placeholder="Your Name"
              required
              className="w-full border-2 border-gray-300 p-4 rounded-xl focus:border-purple-500 focus:outline-none transition-all duration-300 bg-white focus:bg-white text-gray-900 placeholder-gray-400 text-lg shadow-sm"
              value={formValues.name}
              onChange={e => setFormValues({ ...formValues, name: e.target.value })}
            />
          </div>
          
          <div className="relative">
            <input
              name="email"
              type="email"
              placeholder="Your Email"
              required
              className="w-full border-2 border-gray-300 p-4 rounded-xl focus:border-purple-500 focus:outline-none transition-all duration-300 bg-white focus:bg-white text-gray-900 placeholder-gray-400 text-lg shadow-sm"
              value={formValues.email}
              onChange={e => setFormValues({ ...formValues, email: e.target.value })}
            />
          </div>
          
          <div className="relative">
            <textarea
              name="message"
              placeholder="Your Message"
              required
              rows={5}
              className="w-full border-2 border-gray-300 p-4 rounded-xl focus:border-purple-500 focus:outline-none transition-all duration-300 bg-white focus:bg-white resize-none text-gray-900 placeholder-gray-400 text-lg shadow-sm"
              value={formValues.message}
              onChange={e => setFormValues({ ...formValues, message: e.target.value })}
            />
          </div>
        </div>
        
        {/* Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={checkingEmail}
            className={`flex-1 py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform ${
              checkingEmail
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
            }`}
          >
            {checkingEmail ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Checking...
              </span>
            ) : (
              "Send Message"
            )}
          </button>
          
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-4 px-6 rounded-xl font-semibold text-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transform hover:scale-105 active:scale-95 transition-all duration-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
