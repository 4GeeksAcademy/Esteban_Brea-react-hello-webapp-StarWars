import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareGithub } from "@fortawesome/free-brands-svg-icons";

export const Footer = () => (
  <footer className="footer mt-5 py-4 text-center">
    <p style={{ margin: "0", fontSize: "1.1rem" }}>
      Created by{" "}
      <a href="https://github.com/estebanbrea" target="_blank" rel="noopener noreferrer">
      <FontAwesomeIcon icon={faSquareGithub} style={{ fontSize: "1.5rem", color: "red"}} />
      </a>
    </p>
  </footer>
);
