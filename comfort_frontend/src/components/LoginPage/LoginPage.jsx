import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAdminContext } from "../../context/AdminProvider";
import { useAuthContext } from "../../context/AuthProvider";

import "./LoginPage.css";

export default function LoginPage() {
  const { setUserAuth } = useAuthContext();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({});

  const signIn = async (credentials) => {
    const response = await fetch("http://localhost:8005/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
      credentials: "include",
    });
    const { user } = await response.json();

    setUserAuth({ ...user, isLoggedIn: true });

    if (response.status === 200) {
      if (user.cartState.length !== 0) {
        navigate("/cart", { replace: true });
        return true;
      } else {
        navigate("/products", { replace: true });
        return true;
      }
    } else {
      return false;
    }
  };

  const loginUser = async (event) => {
    event.preventDefault();
    await signIn(credentials);
  };

  return (
    <div className="loginPage">
      <form onSubmit={loginUser}>
        <legend
          style={{
            textAlign: "center",
            fontSize: "30px",
            marginBottom: "20px",
          }}
        >
          Sign In
        </legend>
        <label htmlFor="">
          User name:{" "}
          <input
            type="text"
            name="username"
            onChange={(event) =>
              setCredentials({
                ...credentials,
                [event.target.name]: event.target.value,
              })
            }
          />
        </label>
        <label htmlFor="">
          Password:{" "}
          <input
            type="password"
            name="password"
            onChange={(event) =>
              setCredentials({
                ...credentials,
                [event.target.name]: event.target.value,
              })
            }
          />
        </label>

        <button type="submit" className="submit-button">
          Login
        </button>
        <Link to="/signup">
          <p style={{ fontSize: "14px", fontWeight: "700" }}>
            Dont have a user? Sign Up here!
          </p>{" "}
        </Link>
      </form>
    </div>
  );
}
