import emailjs from "@emailjs/browser";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_z6i41fi";
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export async function sendWelcomeEmail({ name, email }) {
  if (!TEMPLATE_ID || !PUBLIC_KEY) {
    // Email sending is optional; skip silently if not configured.
    return { skipped: true };
  }

  const templateParams = {
    to_name: name,
    to_email: email,
  };

  try {
    await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, {
      publicKey: PUBLIC_KEY,
    });
  } catch (err) {
    const status = err?.status;
    const text = err?.text;
    const message = err?.message;
    const details = [status ? `status ${status}` : null, text || message || "EmailJS send failed"]
      .filter(Boolean)
      .join(" - ");
    throw new Error(details);
  }

  return { skipped: false };
}

