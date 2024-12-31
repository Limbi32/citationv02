"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Ajouter() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [auteur, setAuteur] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    // Préparer les données à envoyer
    
    if (!title || !auteur) {

      alert("Veuillez remplir tous les champs.");
     
    }else{
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
    alert("Le titre doit être une phrase commençant par une majuscule et se terminant par un point, un point d'exclamation ou un point d'interrogation.");
    return;
  }else{
      const articleData = {
        id: 1,
        title,
        auteur,
      };
      await fetch("" + apiUrl+"/blog", {
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
    <div className="bg-slate-200 h-4/5 w-1/2 flex justify-center items-center pt-3 ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col  justify-between gap-3  w-full pr-12"
      >
        <div className="flex flex-col gap-2  justify-center  w-full h-30 m-4">
          <label htmlFor="titre">Citation</label>
          <input
            type="text"
            name="titre"
            id="titre"
            required={true}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="m-4 w-full flex justify-center h-full"
          />
        </div>

        <div className="flex flex-col gap-2  justify-center w-full h-10 m-4">
          <label htmlFor="auteur">Auteur</label>
          <input
            type="text"
            name="auteur"
            id="auteur"
            required={true}
            value={auteur}
            onChange={(e) => setAuteur(e.target.value)}
            className="m-4  w-full"
          />
        </div>

        <div className="flex justify-center w-full">
          <button
            type="submit"
            className="btn m-4 w-full bg-slate-700 p-3 rounded-2xl text-slate-50 shadow-xl  hover:bg-slate-600"
          >
            Ajouter une citation
          </button>
        </div>
      </form>
    </div>
  );
}
