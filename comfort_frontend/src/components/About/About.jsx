import React from "react";
import "../About/About.css";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="about">
      <div className="title">
        <h3>
          <span>
            <Link to="/">Home</Link>
          </span>{" "}
          <span> / About</span>
        </h3>
      </div>
      <div className="main-section">
        <div className="picture">
          <img
            src="https://tse1.mm.bing.net/th?id=OIP.ov0P-tFNP0ee7e7QjhnRTQHaFj&pid=Api&P=0"
            alt="picture"
          />
        </div>
        <div className="text">
          <div className="text-title">
            <h1>Our Story</h1>
          </div>
          <div className="text-content">
            <p>
              {" "}
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat
              accusantium sapiente tempora sed dolore esse deserunt eaque
              excepturi, delectus error accusamus vel eligendi, omnis beatae.
              Quisquam, dicta. Eos quod quisquam esse recusandae vitae neque
              dolore, obcaecati incidunt sequi blanditiis est exercitationem
              molestiae delectus saepe odio eligendi modi porro eaque in libero
              minus unde sapiente consectetur architecto. Ullam rerum, nemo iste
              ex, eaque perspiciatis nisi, eum totam velit saepe sed quos
              similique amet. Ex, voluptate accusamus nesciunt totam vitae esse
              iste.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
