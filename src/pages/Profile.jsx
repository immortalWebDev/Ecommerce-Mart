import React, { useState, useEffect } from "react";
import { Navbar, Footer } from "../components/componentsExpo";
import { useSelector ,useDispatch} from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getToken, updateUserProfile } from "../utils/firebaseHelper";
import { ClipLoader } from "react-spinners";

const Profile = () => {

  const [loadingProfile, setLoadingProfile] = useState(true);
  const [name, setName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const FIREBASE_DB_URL = import.meta.env.VITE_FIREBASE_RTDB;
  const FIREBASE_API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;
  const FIREBASE_VERIFY_EMAIL = import.meta.env.VITE_FB_VERIFY_EMAIL;
  const FB_USER_LOOKUP = import.meta.env.VITE_USER_LOOKUP

  const email = useSelector((state) => state.auth.userEmail);
  const token = useSelector((state) => state.auth.token);
 
//   console.log(email)
  const sanitizeEmail = (email) => email.replace(/[.@]/g, "_");

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!name || !address || !phone || !pinCode) {
      setError("All fields are required.");
      return;
    }

    setIsLoading(true);
    const idToken = await getToken();
    const sanitizedEmail = sanitizeEmail(email);

    try {
      await axios.put(
        `${FIREBASE_DB_URL}/users/${sanitizedEmail}.json?auth=${idToken}`,
        {
          displayName: name,
          email,
          photoUrl: profilePic,
          address,
          phone,
          pinCode,
        }
      );
      setSuccess(true);

      // Update LS with new profile details
      localStorage.setItem(
        "userProfile",
        JSON.stringify({
          displayName: name,
          email,
          photoUrl: profilePic,
          address,
          phone,
          pinCode,
        })
      );

      localStorage.setItem("userName",name) //update to reflect in LS

      const getTokenCall = await getToken();
    
      // console.log('Updated name:',name)
      // const localToken = localStorage.getItem('token')
      // console.log('stateToken == LStoken == getToken(): ',token ===  localToken && localToken === getTokenCall)
      
      updateUserProfile(name, idToken);
    } catch (err) {
      setError("Failed to update profile.");
      console.error(err.response?.data || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfilePicUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePic(reader.result);
    };
    reader.readAsDataURL(file);
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

      // Check for cached data in localStorage
    const cachedData = localStorage.getItem("userProfile");
    const cacheTimestamp = localStorage.getItem("userProfileTimestamp");

      // Check for cached..stored user data in localStorage (reduce load time)
      
      if (cachedData && cacheTimestamp && Date.now() - cacheTimestamp < 3600000) {
        console.log("used cached data")
        const { displayName, photoUrl, address, phone, pinCode } =
          JSON.parse(cachedData);
        setName(displayName || "");
        setProfilePic(photoUrl || "");
        setAddress(address || "");
        setPhone(phone || "");
        setPinCode(pinCode || "");
        setLoadingProfile(false); // Stop loading since we used cached data
        return; // Skip the API call
      }

      try {
        const response = await axios.get(
          `${FIREBASE_DB_URL}/users/${sanitizedEmail}.json?auth=${idToken}`
        );
        const userData = response.data;

        if (userData) {
          setName(userData.displayName || "");
          setProfilePic(userData.photoUrl || "");
          setAddress(userData.address || "");
          setPhone(userData.phone || "");
          setPinCode(userData.pinCode || "");

          // Save data to localStorage for future use
          localStorage.setItem("userProfile", JSON.stringify(userData));
          localStorage.setItem("userProfileTimestamp", Date.now());

        } else {
          setError("Profile is not updated.");
        }
      } catch (err) {
        setError("Failed to fetch user profile.");
        console.error(err.response?.data || err.message);
      } finally {
        setLoadingProfile(false);
      }
    };
    fetchUserProfile();
  }, [email, token, FIREBASE_DB_URL]);


  //Email verification
  const handleVerifyEmail = async () => {
    try {
      const idToken = token;
      const response = await axios.post(
        `${FIREBASE_VERIFY_EMAIL}${FIREBASE_API_KEY}`,
        {
          requestType: "VERIFY_EMAIL",
          idToken: idToken,
        }
      );

      setVerificationSent(true);
      // console.log("Verification link sent successfully:", response.data);
    } catch (error) {
      console.error("Error sending verification link:", error);
      setVerificationSent(false);
    }
  };


  useEffect(() => {
    const checkEmailVerification = async () => {
      try {
        const idToken = token;
        const response = await axios.post(
          `${FB_USER_LOOKUP}${FIREBASE_API_KEY}`,
          {
            idToken,
          }
        );

        //  console.log('Check email verification here',response.data.users[0])
        const isVerified = response.data.users[0]?.emailVerified;
        setEmailVerified(isVerified);
      } catch (error) {
        console.error("Error checking email verification:", error);
      }
    };

    if (token) {
      checkEmailVerification();
    }
  }, [token,FIREBASE_API_KEY,dispatch,FB_USER_LOOKUP]);

  
  if (loadingProfile) {
    return (
      <>
        <Navbar />
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }} 
        >
          <ClipLoader color="blue" size={60} />
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div
          className="card mx-auto p-4 shadow-lg border border-primary rounded-3"
          style={{ maxWidth: "500px" }}
        >
          <div className="text-center">
            <h2 className="text-primary">Your Profile</h2>
            <div className="my-3">
              <img
                src={profilePic || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='170' height='170' viewBox='0 0 170 170'%3E%3Crect width='170' height='170' fill='%23ddd'/%3E%3Ctext x='50%' y='50%' fill='%23999' font-size='20' text-anchor='middle' dominant-baseline='middle'%3EImage%20Placeholder%3C/text%3E%3C/svg%3E"}
                alt="Profile"
                style={{
                  width: "170px",
                  height: "170px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            </div>
            <input
              type="file"
              id="profilePic"
              className="form-control mb-3"
              accept="image/*"
              onChange={handleProfilePicUpload}
            />
          </div>

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
               {emailVerified ? (
                  <span className="text-success m-2">Verified</span>
                ) : (
                  <button
                    type="button"
                    className="btn btn-warning m-2"
                    onClick={handleVerifyEmail}
                    disabled={verificationSent}
                  >
                    {verificationSent ? "Verification Sent" : "Verify Email"}
                  </button>
                )}
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Phone Number
              </label>
              <input
                type="text"
                id="phone"
                placeholder="Your Phone number"
                className="form-control"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <textarea
                id="address"
                className="form-control"
                rows="2"
                placeholder="Your Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="pinCode" className="form-label">
                Pin Code
              </label>
              <input
                type="text"
                id="pinCode"
                placeholder="Your PIN"
                className="form-control"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "Update Profile"}
              </button>
              <button
                type="button"
                className="btn btn-secondary ms-3"
                onClick={() => navigate("/")}
              >
                Home
              </button>

              <div className="m-2">
                {" "}
                {error && <div className="alert alert-danger">{error}</div>}
                {success && (
                  <div className="alert alert-success">
                    Profile updated successfully!
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
