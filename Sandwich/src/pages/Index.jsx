import { useEffect, useState } from "react";

// Simulated API call (replace with actual API later)
const fetchRecentUpdates = async () => {
  return [
    { id: 1, title: "Paneer Tikka Sandwich", createdAt: "2025-04-11" },
    { id: 2, title: "Veg Cheese Grill", createdAt: "2025-04-10" },
  ];
};

const Home = () => {
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    const getUpdates = async () => {
      const data = await fetchRecentUpdates();
      setUpdates(data);
    };
    getUpdates();
  }, []);

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Dashboard
        </h1>
        <p className="text-gray-500 mt-2">
          Welcome to the Arthur Sandwich House Admin Panel
        </p>
      </div>

      <div className="bg-white border rounded-lg shadow p-4">
        <h2 className="text-xl font-semibold mb-2">Welcome</h2>
        <p className="text-gray-500">
          Use the sidebar to navigate to different sections of the admin panel.
        </p>
      </div>

      <div className="bg-white border rounded-lg shadow p-4">
        <h2 className="text-xl font-semibold mb-4">Recent Updates</h2>
        <div className="space-y-3">
          {updates.length > 0 ? (
            updates.map((update) => (
              <div key={update.id} className="border p-3 rounded-md">
                <h3 className="font-semibold text-gray-900">{update.title}</h3>
                <p className="text-sm text-gray-500">
                  Added on {update.createdAt}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No recent updates found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
