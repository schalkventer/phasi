import React from "react";
import { createGlobalStyle } from "styled-components";
import { Tool } from "./Tool";
import { Routes, Route, BrowserRouter } from "react-router-dom";

const Global = createGlobalStyle`
    * { box-sizing: border-box }

    body {
        margin: 0;
        font-family:  Roboto, Helvetica, Arial, sans-serif;
        font-size: 1.25rem;
        line-height: 22px;
        letter-spacing: 0;

        strong {
          letter-spacing: -0.4px;
        }
    }

    
`;

export const App = () => {
  return (
    <>
      <Global />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Tool />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
