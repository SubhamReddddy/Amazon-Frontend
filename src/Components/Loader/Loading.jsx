import React from "react";
import "./Loader.css";
const Loading = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900/80 z-50">
      <div className="loading">
        <div className="loading-wide">
          <div className="l1 color"></div>
          <div className="l2 color"></div>
          <div className="e1 color animation-effect-light"></div>
          <div className="e2 color animation-effect-light-d"></div>
          <div className="e3 animation-effect-rot">X</div>
          <div className="e4 color animation-effect-light"></div>
          <div className="e5 color animation-effect-light-d"></div>
          <div className="e6 animation-effect-scale">*</div>
          <div className="e7 color"></div>
          <div className="e8 color"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
