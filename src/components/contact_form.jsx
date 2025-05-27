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

    setCheckingEmail(true); // Button turns white while checking

    // Check if email exists
    const exists = await verifyEmailExists(email);
    if (!exists) {
      setShowInvalidEmail(true);
      setCheckingEmail(false); // Button returns to black
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
      <div className="p-8 flex flex-col items-center justify-center text-center">
        <div className="text-lg font-semibold mb-2">Thanks for your message!</div>
        <div className="text-gray-500 text-sm">You’ll be redirected shortly.</div>
      </div>
    );
  }

  if (showInvalidEmail) {
    return (
      <div className="p-8 flex flex-col items-center justify-center text-center">
        <div className="text-lg font-semibold mb-2 text-red-600">Invalid Email Address</div>
        <div className="text-gray-500 text-sm mb-4">
          That email address does not exist. Please re-enter your email.
        </div>
        <button
          className="bg-black text-white px-4 py-2 rounded"
          onClick={() => setShowInvalidEmail(false)}
        >
          Return to Form
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-4">
      <input
        name="name"
        placeholder="Your Name"
        required
        className="border p-2 rounded"
        value={formValues.name}
        onChange={e => setFormValues({ ...formValues, name: e.target.value })}
      />
      <input
        name="email"
        type="email"
        placeholder="Your Email"
        required
        className="border p-2 rounded"
        value={formValues.email}
        onChange={e => setFormValues({ ...formValues, email: e.target.value })}
      />
      <textarea
        name="message"
        placeholder="Message"
        required
        className="border p-2 rounded"
        value={formValues.message}
        onChange={e => setFormValues({ ...formValues, message: e.target.value })}
      />
      <button
        type="submit"
        disabled={checkingEmail}
        className={`border border-black shadow-none
          hover:bg-white hover:text-black hover:border-black
          active:bg-black active:text-white active:border-black
          focus:bg-black focus:text-white focus:border-black
          focus:ring-0 focus:outline-none transition-colors
          ${checkingEmail
            ? "bg-white text-black"
            : "bg-black text-white hover:bg-white hover:text-black active:bg-black active:text-white"
          }`}
      >
        {checkingEmail ? "Checking..." : "Send"}
      </button>
      <button
        type="button"
        onClick={onClose}
        className="bg-white text-black border border-black shadow-none
          hover:bg-white hover:text-black hover:border-black
          active:bg-black active:text-white active:border-black
          focus:bg-black focus:text-white focus:border-black
          focus:ring-0 focus:outline-none transition-colors"
      >
        Cancel
      </button>
    </form>
  );
}