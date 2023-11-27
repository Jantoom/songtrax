import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Footer from "./Footer";

/**
 * Creates a template, which minimises a lot of duplicated React components.
 * 
 * @param {Object} params - An object containing parameters.
 * @param {string} title - Title of the page.
 * @param {React.ReactNode} children - Contents of the page.
 * @returns {React.ReactNode} Template.
 */
export default function Template({ title, children }) {
  return (
    <>
      <Header />
        <main>
          <h2 className="title">{title}</h2>
          {children}
        </main>
      <Footer />
    </>
  );
}

Template.propTypes = {
  title: PropTypes.string.isRequired,
};
