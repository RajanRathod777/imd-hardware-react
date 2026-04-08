const UnderDevelopment = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="text-center bg-white shadow-lg rounded-2xl p-8 max-w-md w-full">
        <div className="text-5xl mb-4">🚧</div>

        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Website Under Development
        </h1>

        <p className="text-gray-600 text-sm mb-6">
          We're currently working on this website to bring you a better
          experience. Please check back soon.
        </p>

        <a
          href="/"
          className="inline-block px-5 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700 transition"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
};

export default UnderDevelopment;
