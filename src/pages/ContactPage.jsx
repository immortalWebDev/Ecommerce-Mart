import React from "react";
import { Footer, Navbar } from "../components/componentsExpo";

const ContactPage = () => {
  return (
    <>
      <Navbar />
      <div className="container my-2 py-2">
        <h1 className="text-center text-primary mb-4">contact here</h1>

        <div className="row my-4">
          <form>
            <div className="form-group">
              <label htmlFor="Name" className="">
                Name
              </label>
              <input type="text" className="form-control" />
            </div>
            <div className="form-group my-3">
              <label htmlFor="Email" className="">
                email
              </label>
              <input type="email" className="form-control " />
            </div>
            <div className="form-group my-3">
              <label htmlFor="Message" className="">
                text
              </label>
              <textarea rows={5} className="form-control"></textarea>
            </div>
            <div className="text-center">
              <button className="btn btn-primary px-5 py-2 " type="submit">
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ContactPage;
