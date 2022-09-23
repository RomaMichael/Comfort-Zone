import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthProvider";

import { nanoid } from "nanoid";

import "./SignUp.css";

export default function SignUp() {
  const [createdUser, setCreatedUser] = useState({
    _id: nanoid(),
    messages: [],
  });

  const [isLoading, setIsLoading] = useState(false);

  const createUser = async (createdUser) => {
    const formData = new FormData();
    formData.append("_id", nanoid());
    formData.append("username", createdUser.username);
    formData.append("email", createdUser.email);
    formData.append("password", createdUser.password);
    formData.append("avatar", createdUser.avatar);
    formData.append("messages", createdUser.messages);

    const response = await fetch("http://localhost:8005/users/register", {
      method: "POST",

      body: formData,
    });

    setIsLoading(false);
  };

  const signUp = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      await createUser(createdUser);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="signUp">
      <form onSubmit={signUp}>
        <legend
          style={{
            textAlign: "center",
            fontSize: "30px",
            marginBottom: "20px",
          }}
        >
          Sign Up
        </legend>
        <label htmlFor="">
          user name:{" "}
          <input
            type="text"
            name="username"
            onChange={(event) =>
              setCreatedUser({
                ...createdUser,
                [event.target.name]: event.target.value,
              })
            }
          />
        </label>
        <label htmlFor="">
          email:{" "}
          <input
            type="email"
            name="email"
            onChange={(event) =>
              setCreatedUser({
                ...createdUser,
                [event.target.name]: event.target.value,
              })
            }
          />
        </label>
        <label htmlFor="">
          password:{" "}
          <input
            type="password"
            name="password"
            onChange={(event) =>
              setCreatedUser({
                ...createdUser,
                [event.target.name]: event.target.value,
              })
            }
          />
        </label>
        <label>
          <div
            className="upload-avatar"
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <p>Choose avatar:</p>
            <input
              type="file"
              onChange={(e) => {
                setCreatedUser({ ...createdUser, avatar: e.target.files[0] });
              }}
            />
          </div>
        </label>
        {isLoading ? (
          <p>Loading user</p>
        ) : (
          <button type="submit" className="submit-button">
            Create
          </button>
        )}
      </form>
    </div>
  );
}