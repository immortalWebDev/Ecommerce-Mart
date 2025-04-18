import React, { useState } from "react";
import { Footer, Navbar } from "../components/componentsExpo";

const ContactPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    try {
      setIsLoading(true);

      // Create FormData and make the request
      const response = await fetch(form.action, {
        method: form.method,
        body: new FormData(form),
      });

      if (response.ok) {
        window.location.href = form._next.value;
      } else {
        const errorMessage = `Something went wrong. Status: ${response.status}`;
        console.error(errorMessage);
        alert("Something went wrong. Please try again!");
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      alert(
        "Error submitting the form. Please check your connection and try again!"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container my-2 py-2">
        <h1 className="text-center fw-bold text-success mb-4">Get in Touch</h1>
        <p className="text-center text-muted">
          We'd love to hear from you! Fill out the form below and we'll get back
          to you as soon as possible.
        </p>
        <hr className="mb-5" />

        <div className="row my-4">
          <div className="col-md-6 col-lg-5 mx-auto">
            <div className="card shadow p-4">
              <form
                action={`${import.meta.env.VITE_FORM_SUBMIT_URL}`}
                method="POST"
                onSubmit={handleSubmit}
              >
                <input
                  type="hidden"
                  name="_subject"
                  value="New Contact Form Submission!"
                />
                <input type="hidden" name="_captcha" value="false" />
                <input
                  type="hidden"
                  name="_next"
                  value="https://great-mart-piyush.vercel.app/thank-you"
                />

                <div className="form-group my-3">
                  <label htmlFor="Name" className="fw-semibold">
                    Your Name
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-pill"
                    id="Name"
                    name="name"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div className="form-group my-3">
                  <label htmlFor="Email" className="fw-semibold">
                    Your Email
                  </label>
                  <input
                    type="email"
                    className="form-control rounded-pill"
                    id="Email"
                    name="email"
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <div className="form-group my-3">
                  <label htmlFor="Message" className="fw-semibold">
                    Your Message
                  </label>
                  <textarea
                    rows={5}
                    className="form-control rounded"
                    id="Message"
                    name="message"
                    placeholder="Write your message here..."
                    required
                  ></textarea>
                </div>
                <div className="text-center">
                  <button
                    className="btn btn-primary px-5 py-2 rounded-pill shadow-sm"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;
