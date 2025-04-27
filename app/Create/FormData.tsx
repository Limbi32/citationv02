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
  }, [decoded, isTokenValid, router, token]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    // Préparer les données à envoyer

    if (!title || !auteur || !themes) {
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
    <div className="bg-zinc-200  ">
      <Header1 token={token} />

      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-zinc-300 shadow-lg m-5 rounded-lg justify-between gap-3 p-10 w-4/5 pr-12"
      >
        <div className="flex flex-col gap-2  justify-center  w-full h-30 m-4">
          <label htmlFor="titre">Citation</label>

          <div>
            <textarea
              name="titre"
              id="titre"
              placeholder="Ecrivez votre citation"
              required={false}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              cols={10}
              rows={5}
              className="w-full"
            ></textarea>
          </div>
        </div>

        <div className="flex flex-col gap-2  justify-center w-full h-10 m-4 ">
          <label htmlFor="auteur">Auteur</label>
          <input
            type="text"
            name="auteur"
            id="auteur"
            placeholder="Ex: Albert Enstein"
            required={false}
            value={auteur}
            onChange={(e) => setAuteur(e.target.value)}
            className="m-4  w-full"
          />
        </div>

        <div className="flex flex-col gap-2  justify-center w-full h-10 m-4 ">
          <label htmlFor="theme">Theme</label>
          <input
            type="text"
            name="theme"
            id="theme"
            placeholder="Ex: Amour"
            required={false}
            value={themes}
            onChange={(e) => setThemes(e.target.value)}
            className="m-4  w-full"
          />
        </div>
        <div className="text-center my-5 text-red-500">{verifiTitle}</div>

        <div className="flex justify-center w-full">
          <button
            type="submit"
            className="btn m-4 w-full flex justify-center bg-slate-700 p-3 rounded-2xl text-zinc-50 shadow-xl  hover:bg-slate-600"
          >
            Ajouter une citation
          </button>
        </div>
      </form>
    </div>
  );
}
