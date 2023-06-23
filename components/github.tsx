export default function LoginParent() {
  return (
    <>
      <nav className="bg-white p-6">
        <div className="container mx-auto flex items-center justify-between">
          <a href="#" className="text-xl font-bold text-gray-800">
            GitHub
          </a>
          <div className="flex items-center">
            <a href="#" className="text-gray-800 mr-6">
              Sign up
            </a>
            <a href="#" className="bg-blue-500 text-white px-6 py-2 rounded">
              Sign in
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
