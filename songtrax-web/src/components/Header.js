import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ReactComponent as BackArrow } from "./BackArrow.svg";
import { TONE_OBJECT_ACTIONS, useToneObjectDispatch } from "../contexts/ToneObjectContext";

/**
 * Creates a header, which belongs at the top of every page.
 *
 * @returns {React.ReactNode} Header.
 */
export default function Header() {
  const location = useLocation();
  const toneObjectDispatch = useToneObjectDispatch();

  /**
   * Stops the current preview.
   */
  const handleIconClick = () => {
    toneObjectDispatch({ type: TONE_OBJECT_ACTIONS.stop_preview });
  };

  return (
    <header className="page-header">
      <div className="header-logo">
        <h2>
          <NavLink
            to="/"
            className="header-icon-link"
            style={{ display: "flex", alignItems: "left", gap: "10px" }}
            onClick={handleIconClick}
          >
            {location.pathname !== "/" ? <BackArrow fill="aqua" /> : null}
            SongTrax
          </NavLink>
        </h2>
      </div>
      <div className="header-app-description">
        <span>Create & Share Samples, Listen in Mobile App!</span>
      </div>
    </header>
  );
}
