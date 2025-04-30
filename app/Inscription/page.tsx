"use client";
import { useState } from "react";
// import { PrismaClient } from "@prisma/client";
import { useRouter } from "next/navigation";

// const prisma = new PrismaClient();

const Inscription = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const articleData = {
      email,
      password,
    };
    await fetch("" + apiUrl + "/apilogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(articleData),
    });
    router.push("/Login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
          Inscription 🔐
        </h2>

        <form
          className="flex flex-col space-y-4"
          onSubmit={handleSubmit}
          method="POST"
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white transition"
          />

          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white transition"
          />

          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 active:scale-95 transition-transform duration-300 text-white font-bold py-3 rounded-lg shadow-md hover:shadow-lg"
          >
            S inscrire
          </button>
        </form>
      </div>
    </div>
  );
};

export default Inscription;
