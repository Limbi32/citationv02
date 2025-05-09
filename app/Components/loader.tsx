// components/Loader.js
export default function Loader() {
  return (
    <div className="bg-gray-700 flex items-center justify-center h-screen space-x-2">
      <span className="w-4 h-4 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
      <span className="w-4 h-4 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
      <span className="w-4 h-4 bg-indigo-500 rounded-full animate-bounce"></span>
    </div>
  );
}
