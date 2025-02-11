"use client";

import { useRouter } from "next/navigation";
import useFetch from "../Hooks/useFetch";
import { useEffect, useState } from "react";

// Définir un type pour les données que vous attendez de l'API
type Post = {
  id: string;
  title: string;
  auteur: string;
  themes: string;
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function FormUpdate({ id }: { id: string }) {
  const router = useRouter();
  const { data, error, loading } = useFetch<Post>("" + apiUrl + "/blog/" + id);

  const [title, setTitle] = useState("");
  const [auteur, setAuteur] = useState("");
  const [themes, setThemes] = useState("");
  const [verifiTitle, setVerifiTitle] = useState("");

  // Mettez à jour l'input avec la donnée récupérée de l'API si elle est disponible
  useEffect(() => {
    if (data) {
      setTitle(data.title); // suppose que l'API renvoie une valeur sous la clé `value`
      setAuteur(data.auteur);
      setThemes(data.themes);
    }
  }, [data]);

  // if (loading) {
  //   return (
  //     <div className="bg-slate-300 text-center p-8 font-bold text-2xl">
  //       <Loader />
  //     </div>
  //   );
  // }
  if (error) {
    return <div>{error}</div>;
  }
  console.log(loading);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Préparer les données à envoyer
    //verifier si les champs ne sont pas vides

    if (!title || !auteur || !themes) {
      setVerifiTitle("Veuillez remplir tous les champs.");
    } else {
      const hasTwoWords = (str: string) => {
        return str.trim().split(/\s+/).length >= 2;
      };

      //verifier que le texte entrée n'est pas du n'importe quoi

      if (!hasTwoWords(title)) {
        setVerifiTitle("Une citation doit etre une phrase");
        return;
      }
      const isSentence = (str: string) => {
        return /^[A-Z].*[.!?]$/.test(str);
      };

      //Verifier c'est une phrase valide

      if (!isSentence(title) && !hasTwoWords(title)) {
        alert(
          "Le titre doit être une phrase commençant par une majuscule et se terminant par un point, un point d'exclamation ou un point d'interrogation."
        );
        return;
      } else {
        //modifier les données

        const articleData = {
          id,
          title,
          auteur,
          themes,
        };
        await fetch("" + apiUrl + "/blog/" + id, {
          method: "PATCH",
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
    <div className="bg-zinc-200 h-4/5 w-full -m-8 flex justify-center items-center pt-3 ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-zinc-300 shadow-lg m-5 rounded-lg justify-between gap-3  w-4/5 pr-12"
      >
        <div className=" flex flex-col  w-full">
          <label htmlFor="title">Citation</label>
          <textarea
            name="title"
            id="title"
            placeholder="Ecrivez votre citation"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></textarea>
        </div>
        <div className="flex flex-col  w-full">
          <label htmlFor="auteur">Auteur</label>
          <input
            type="text"
            name="auteur"
            id="auteur"
            placeholder="Ex: Albert Enstein"
            value={auteur}
            onChange={(e) => setAuteur(e.target.value)}
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

        <button
          className="bg-zinc-400 w-full rounded-xl py-2 shadow-lg  hover:ring-1"
          type="submit"
        >
          Modifier
        </button>
      </form>
    </div>
  );
}
