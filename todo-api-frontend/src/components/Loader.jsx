/* eslint-disable no-unused-vars */
// import React from 'react'

import { useState } from "react";

const Loader = ({ message }) => {
  const [loading, setLoading] = useState(true);
  return (
    <>
      <div className="spinner-container">
        <div className="spinner"></div>
        <p>{message}</p>
      </div>
    </>
  );
};

export default Loader;
