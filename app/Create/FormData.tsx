"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import Header1 from "../Components/Header/Header";

export default function Ajouter() {
  const [user, setUser] = useState<{
    id: string;
    email: string;
    password: string;
    exp: number;
  } | null>(null);
  const [isTokenValid, setIsTokenValid] = useState<boolean | null>(null);
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [auteur, setAuteur] = useState("");
  const [themes, setThemes] = useState("");
  const [verifiTitle, setVerifiTitle] = useState("");
  // const token: string | null = localStorage.getItem("token");
  const [token, setToken] = useState<string | null>(null);
  const [decoded, setDecoded] = useState<{
    id: string;
    email: string;
    password: string;
    exp: number;
  } | null>(null);

  useEffect(() => {
    const token1: string | null = localStorage.getItem("token");
    setToken(token1);
    console.log(user);
    if (token) {
      setDecoded(
        jwt.decode(token) as unknown as {
          id: string;
          email: string;
          password: string;
          exp: number;
        }
      );
      try {
        if (!process.env.NEXT_PUBLIC_JWT_SECRET) {
          throw new Error("JWT_SECRET is not defined");
        }

        if (decoded) {
          setUser(decoded);
        }
        if (decoded) {
          // Vérifier si le token est expiré
          const isExpired = Date.now() / 1000 > decoded.exp;

          if (isExpired) {
            setIsTokenValid(false);

            router.push("/Login");
          } else {
            setIsTokenValid(true);

            // setUser(decoded) // Stocke les informations du token
          }
        } else {
          setIsTokenValid(false);
        }
      } catch (error) {
        // Vérifier si error est un objet et contient une propriété "message"
        if (error && typeof error === "object" && "message" in error) {
          // Si c'est une erreur avec un message, on affiche le message
          console.log("Invalid token:", (error as Error).message);
        } else {
          // Si ce n'est pas une erreur avec un message, on affiche l'erreur brute
          console.log("Unexpected error:", error);
        }

        router.push("/Login");
      }
    } else {
      router.push("/Login");
    }
  }, [decoded, isTokenValid, router, token, user]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    // Préparer les données à envoyer

    if (!title || !auteur || !themes) {
      console.log(verifiTitle);
      // alert("Veuillez remplir tous les champs.");
      setVerifiTitle("Veuillez remplir tous les champs.");
    } else {
      const hasTwoWords = (str: string) => {
        return str.trim().split(/\s+/).length >= 2;
      };

      // if (!hasTwoWords(title)) {
      //   alert("Le titre doit contenir au moins deux mots.");
      //   return;
      // }
      const isSentence = (str: string) => {
        return /^[A-Z].*[.!?]$/.test(str);
      };

      if (!isSentence(title) && !hasTwoWords(title)) {
        setVerifiTitle("Une citation doit etre une phrase");
        return;
      } else {
        const articleData = {
          title,
          auteur,
          user: decoded ? decoded.email : "",
          themes,
        };
        await fetch("" + apiUrl + "/blog", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(articleData),
        });
        router.push("/");
      }
    }
  };
  return (
    <div className="  ">
      <Header1 token={token} />

      <div className="max-w-2xl mx-auto mt-10 p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-center">
          Ajouter une Citation ✍️
        </h2>

        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Auteur"
            value={auteur}
            onChange={(e) => setAuteur(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-500 transition"
          />

          <textarea
            placeholder="Votre citation inspirante..."
            rows={4}
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white transition resize-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="text"
            placeholder="Theme"
            value={themes}
            onChange={(e) => setThemes(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white transition"
          />

          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 active:scale-95 transition-transform duration-300 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg"
          >
            Ajouter
          </button>
        </form>
      </div>
    </div>
  );
}
