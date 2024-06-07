import React, { useState } from "react";
import "./HoverIcon.css";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const HoverIcon = ({ hoverText }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="hover-icon-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <i className="fas fa-info-circle hover-icon"></i>
      <InfoOutlinedIcon fontSize="small" />
      {isHovered && <div className="hover-text">{hoverText}</div>}
    </div>
  );
};

export default HoverIcon;
