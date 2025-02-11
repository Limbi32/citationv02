"use client";

import { useEffect, useState } from "react";
import useFetch from "../Hooks/useFetch";
import Loader from "./loader";
import jwt from "jsonwebtoken";

// Définir un type pour les données que vous attendez de l'API
type Post = {
  id: string;
  title: string;
  auteur: string;
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export function Contenu1({ id }: { id: string }) {
  const { data, error, loading } = useFetch<Post>("" + apiUrl + "/blog/" + id);
  const token = localStorage.getItem("token");
  const decoded: {
    id: string;
    email: string;
    password: string;
    exp: number;
  } | null = token
    ? (jwt.decode(token) as {
        id: string;
        email: string;
        password: string;
        exp: number;
      })
    : null;
  const [user, setUser] = useState<{
    id: string;
    email: string;
    password: string;
    exp: number;
  } | null>(null);

  useEffect(() => {
    if (token) {
      try {
        if (!process.env.NEXT_PUBLIC_JWT_SECRET) {
          throw new Error("JWT_SECRET is not defined");
        }

        //Vérifier si le token est valide en vérifiant son expiration

        if (decoded) {
          // Vérifier si le token est
          console.log("decode " + decoded);
          const isExpired = Date.now() / 1000 > decoded.exp;
          if (isExpired) {
            console.log("Token is expired");
            alert("Token is expired");
          } else {
            console.log("decode 2 " + decoded);
            setUser(decoded);
            console.log("user " + user);
          }
        } else {
          console.log("Invalid token");
          alert("Invalid token");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [user, decoded, token]);
  if (loading) {
    return (
      <div className="bg-slate-300 text-center p-8 font-bold text-2xl">
        <Loader />
      </div>
    );
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="bg-slate-300 p-8 text-center rounded-3xl">
      <div className="">{data && data.title}</div>
      <div className="text-right font-bold">{data && data.auteur}</div>
    </div>
  );
}
