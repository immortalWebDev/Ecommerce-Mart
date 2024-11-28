import React, { useState, useEffect } from "react";
import { Navbar, Footer } from "../components/componentsExpo";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { updateUserProfile } from "../utils/firebaseHelper";

const Profile = () => {
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [name, setName] = useState("");
  const [profilePic, setProfilePic] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const FIREBASE_DB_URL = process.env.REACT_APP_FIREBASE_RTDB;

  const email = useSelector((state) => state.auth.userEmail);
  const token = useSelector((state) => state.auth.token);

  //   console.log(email)
  const sanitizeEmail = (email) => email.replace(/[.@]/g, "_");

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!name) {
      setError("All fields are required.");
      return;
    }

    setIsLoading(true);
    const idToken = token;
    const sanitizedEmail = sanitizeEmail(email);

    try {
      await axios.put(
        `${FIREBASE_DB_URL}/users/${sanitizedEmail}.json?auth=${idToken}`,
        {
          displayName: name,
          email,
          photoUrl: profilePic,
        }
      );
      setSuccess(true);

      // Update localStorage with new profile details
      localStorage.setItem(
        "userProfile",
        JSON.stringify({
          displayName: name,
          email,
          photoUrl: profilePic,
        })
      );

      //   console.log(name)
      updateUserProfile(name, idToken);
    } catch (err) {
      setError("Failed to update profile.");
      console.error(err.response?.data || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoadingProfile(true);
      const idToken = token;
      if (!idToken) {
        setError("You need to login again.");
        return;
      }

      const sanitizedEmail = sanitizeEmail(email);

      // Check for cached user data in localStorage
      const cachedData = localStorage.getItem("userProfile");
      if (cachedData) {
        const { displayName, photoUrl } = JSON.parse(cachedData);
        setName(displayName || "");
        setProfilePic(photoUrl || "");
      }

      try {
        const response = await axios.get(
          `${FIREBASE_DB_URL}/users/${sanitizedEmail}.json?auth=${idToken}`
        );
        const userData = response.data;

        if (userData) {
          setName(userData.displayName || "");
          setProfilePic(userData.photoUrl || "");

          // Save data to localStorage for future use
        } else {
          setError("Profile is not updated.");
        }
      } catch (err) {
        setError("Failed to fetch user profile.");
        console.error(err.response?.data || err.message);
      }
    };
    fetchUserProfile();
  }, [email, token, FIREBASE_DB_URL]);

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div
          className="card mx-auto p-4 shadow-lg"
          style={{ maxWidth: "500px" }}
        >
          <form onSubmit={handleUpdateProfile}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="form-control"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={email}
                readOnly
                disabled
              />
            </div>

            <div className="text-center">
              <button type="submit" className="btn">
                Update
              </button>
              <button
                type="button"
                className="btn"
                onClick={() => navigate("/")}
              >
                Home
              </button>

              <div className="m-2"></div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
