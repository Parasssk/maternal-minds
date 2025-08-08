import React from "react";

const AnimatedBlob = ({ 
  className = "", 
  color = "bg-primary/10" 
}) => {
  return (
    <div className={`absolute -z-10 animate-blob filter blur-3xl opacity-70 ${className}`}>
      <div className={`w-72 h-72 ${color} rounded-full`}></div>
    </div>
  );
};

export default AnimatedBlob;