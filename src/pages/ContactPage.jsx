import React from "react";
import { Footer, Navbar } from "../components/componentsExpo";

const ContactPage = () => {
  return (
    <>
      <Navbar />
      <div className="container my-2 py-2">
        <h1 className="text-center fw-bold mb-4">Get in Touch</h1>
        <p className="text-center text-muted">
          We'd love to hear from you! Fill out the form below and we'll get back
          to you as soon as possible.
        </p>
        <hr className="mb-5" />

        <div className="row my-4">
          <div className="col-md-6 col-lg-5 mx-auto">
            <div className="card shadow p-4">
              <form>
                <div className="form-group my-3">
                  <label htmlFor="Name" className="fw-semibold">
                    Your Name
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-pill"
                    id="Name"
                    placeholder="John Doe"
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
                    placeholder="you@example.com"
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
                    placeholder="Write your message here..."
                  ></textarea>
                </div>
                <div className="text-center">
                  <button
                    className="btn btn-primary px-5 py-2 rounded-pill shadow-sm"
                    type="submit"
                  >
                    Send Message
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
