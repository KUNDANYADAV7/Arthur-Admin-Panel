const Home = () => {
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
    </div>
  );
};

export default Home;
