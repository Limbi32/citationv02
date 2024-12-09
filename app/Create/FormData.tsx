"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Ajouter() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [auteur, setAuteur] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Préparer les données à envoyer
    const articleData = {
      id: 1,
      title,
      auteur,
    };
    await fetch("/blog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(articleData),
    });
    router.push("/");
  };
  return (
    <div className="bg-slate-200 h-4/5 flex justify-center mt-4 pt-3">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col  justify-between gap-3  w-3/4"
      >
        <div className="flex flex-col gap-2  justify-center  w-full h-10 m-4">
          <label htmlFor="titre">Citation</label>
          <input
            type="text"
            name="titre"
            id="titre"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="m-4 w-4/5 flex justify-center"
          />
        </div>

        <div className="flex flex-col gap-2  justify-center w-full h-10 m-4">
          <label htmlFor="auteur">Auteur</label>
          <input
            type="text"
            name="auteur"
            id="auteur"
            value={auteur}
            onChange={(e) => setAuteur(e.target.value)}
            className="m-4 w-4/5"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="btn m-4 bg-slate-700 p-3 rounded-2xl text-slate-50  hover:bg-slate-600"
          >
            Ajouter une citation
          </button>
        </div>
      </form>
    </div>
  );
}
