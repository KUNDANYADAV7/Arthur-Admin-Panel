import React from "react";

const OfflineScreen = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 text-center">
      <div>
        <h1 className="text-3xl font-semibold mb-4 text-red-500">You are offline</h1>
        <p className="text-gray-600">Please check your internet connection.</p>
      </div>
    </div>
  );
};

export default OfflineScreen;
