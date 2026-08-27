const SELLER_EMAIL = "replace-with-your-email@example.com";

const form = document.querySelector("#offer-form");
const status = document.querySelector("#form-status");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const name = data.get("name");
  const email = data.get("email");
  const offer = data.get("offer") || "No amount specified";
  const message = data.get("message") || "No message included";

  if (SELLER_EMAIL.includes("replace-with")) {
    status.textContent = "Set SELLER_EMAIL in script.js before publishing this form.";
    return;
  }

  const subject = encodeURIComponent(`MacBook Pro enquiry from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nOffer: ${offer}\n\nMessage:\n${message}`);
  window.location.href = `mailto:${SELLER_EMAIL}?subject=${subject}&body=${body}`;
  status.textContent = "Opening your email client…";
});
