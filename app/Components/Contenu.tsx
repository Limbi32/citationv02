"use client";
import Link from "next/link";
import useFetch from "../Hooks/useFetch";

// Définir un type pour les données que vous attendez de l'API
interface Post {
  id: number;
  title: string;
  auteur: string;
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export default function Contenu() {
  // Utilisation du hook useFetch pour récupérer des données
  const { data, error, loading } = useFetch<Post[]>( apiUrl + "/blog");
  console.log(data);

  if (loading)
    return (
      <div className="bg-slate-300 text-center m-5 font-bold text-2xl">
        loading...
      </div>
    );
  if (error)
    return (
      <div className="bg-red-300 text-center p-8   font-bold text-2xl">
        {" "}
        {error}{" "}
      </div>
    );

  return (
    <div className="flex  flex-col justify-between gap-2 p-6">
      {data !== null &&
        data.map((article: { id: number; title: string; auteur: string }) => (
          <Link
            href={"" + apiUrl + "/Create/" + article.id}
            key={article.id}
            className="rounded-2xl flex flex-col gap-2 
             bg-slate-200 shadow-lg  p-8 text-center text-zinc-800
              hover:bg-slate-300"
          >
            <p> {article.title} </p>
            <p className="text-right pr-3 text-zinc-800 font-bold">
              {article.auteur}
            </p>
          </Link>
        ))}
    </div>
  );
}
