import React, { useRef } from "react";
import PropTypes from "prop-types";

import Answers from "./Answers.js";

//Props va a recibir las preguntas de la base de datos

const Questions = (props) => {
  console.log("PROS", props);
  return (
    <ul>
      {props.items.map((item) => (
        <li key={item.name}>{item.name}</li>
      ))}
    </ul>
  );
};

Questions.propTypes = {
  stores: PropTypes.array.isRequired,
};

export default Questions;
