import React from 'react';

const Loading = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="flex space-x-3">
        <div className="w-8 h-8 bg-gray-400 rounded-full animate-bounce"></div>
        <div className="w-8 h-8 bg-gray-400 rounded-full animate-bounce"></div>
        <div className="w-8 h-8 bg-gray-400 rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};

export default Loading;
