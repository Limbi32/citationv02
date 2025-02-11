"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleinscrit = () => {
    router.push("/Inscription");
  };

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

  return (
    <div>
      <div className="flex flex-col  items-center gap-8 text-2xls w-full">
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
      </div>
    </div>
  );
}
