"use client";
import { useState } from "react";
// import { PrismaClient } from '@prisma/client';
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
    <div className="flex  flex-col  w-full  items-center h-screen bg-zinc-300">
      <div className="flex flex-col items-center gap-5">
        <h1 className="text-bold m-4">Inscription</h1>
        <form className="flex flex-col gap-7" onSubmit={handleSubmit}>
          <div className="flex justify-around gap-2">
            <label className="w-1/4">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-around  gap-2">
            <label className="w-1/4">Mot de passe:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            className="bg-zinc-600 p-2 text-zinc-100 font-bold rounded-lg hover:bg-zinc-700"
            type="submit"
          >
            S inscrire
          </button>
        </form>
      </div>
    </div>
  );
};

export default Inscription;
