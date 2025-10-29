// src/App.tsx
import React from "react";
import { Link } from "react-router-dom";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-2xl p-10 max-w-lg w-full text-center space-y-6">
        {/* Logo or title */}
        <div>
          <h1 className="text-3xl font-bold text-blue-700 mb-2">Task Manager</h1>
          <p className="text-gray-600">
            Organize your tasks, stay productive, and never miss a deadline.
          </p>
        </div>

        {/* Decorative line */}
        <div className="flex items-center justify-center gap-2">
          <div className="h-[1px] w-12 bg-gray-300" />
          <span className="text-gray-400 text-sm">Get Started</span>
          <div className="h-[1px] w-12 bg-gray-300" />
        </div>

        {/* Navigation buttons */}
        <nav className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/login"
            className="px-6 py-3 w-full sm:w-auto rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all shadow"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-6 py-3 w-full sm:w-auto rounded-xl bg-gray-100 text-gray-800 font-medium hover:bg-gray-200 transition-all border"
          >
            Register
          </Link>

          <Link
            to="/tasks"
            className="px-6 py-3 w-full sm:w-auto rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 transition-all shadow"
          >
            View Tasks
          </Link>
        </nav>

       
      </div>
    </div>
  );
}
