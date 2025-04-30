"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Header1 from "../Header/Header";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Envoyer la requête à l'API
    const response = await fetch("/apiconnexion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Enregistrer le token dans localStorage ou cookies
      localStorage.setItem("token", data.token);
      console.log(data);

      router.push("/"); // Rediriger vers une page protégée
    } else {
      console.log(error);
      setError(data.message || "Une erreur est survenue");
      console.log("une erreur est survenue lors de connexion");
    }
  };

  useEffect(() => {
    const token1: string | null = localStorage.getItem("token");
    setToken(token1);
  }, []);
  return (
    <div>
      <Header1 token={token} />

      {/* <div className="flex flex-col  items-center gap-8 text-2xls w-full">
        <h1 className="bg-zinc-200 text-2xl text-zinc-600">
          Connexion/Inscription
        </h1>

        <div className="flex flex-col gap-10 bg-slate-200 rounded-lg p-8 w- shadow-xl">
          <div className="flex flex-col gap-3 ">
            <form
              className="w-full flex flex-col gap-8"
              onSubmit={handleSubmit}
              method="POST"
            >
              <div className="flex  justify-around w-full">
                <label className="w-1/3" htmlFor="login">
                  Login
                </label>
                <input
                  className="w-2/3"
                  type="text"
                  name="login"
                  id="login"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex  justify-around w-full">
                <label className="w-1/3" htmlFor="mdp">
                  Password{" "}
                </label>
                <input
                  className="w-2/3"
                  type="password"
                  name="mdp"
                  id="mdp"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="bg-zinc-500 p-2 rounded-md text-zinc-100 focus:ring-2 focus:outline-none hover:bg-slate-600 ri text-sm active:bg-slate-500/80"
              >
                Connexion
              </button>
            </form>

            <button
              className="bg-zinc-100 p-2 rounded-md ring-2 hover:bg-zinc-200  hover:text-sm"
              onClick={handleinscrit}
            >
              Inscription
            </button>
          </div>
        </div>
      </div> */}

      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 space-y-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
            Connexion 🔐
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
              Se connecter
            </button>
          </form>

          <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
            Pas encore de compte ?
            <a
              href="/Inscription"
              className="text-indigo-600 hover:underline ml-1"
            >
              Créer un compte
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
