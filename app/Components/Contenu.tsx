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
  const { data, error, loading } = useFetch<Post[]>("" + apiUrl);
  console.log(data);

  if (loading) return <div> loading</div>;
  if (error) return <div> {error} </div>;

  return (
    <div className="flex  flex-col justify-between gap-2 p-6">
      {data !== null &&
        data.map((article: { id: number; title: string; auteur: string }) => (
          <Link
            href={"http://localhost:3000/Create/" + article.id}
            key={article.id}
            className="rounded-lg flex flex-col gap-2  bg-slate-200 shadow-lg  p-8 text-center hover:bg-slate-300"
          >
            <p> {article.title} </p>
            <p className="text-right pr-3 text-zinc-800">{article.auteur}</p>
          </Link>
        ))}
    </div>
  );
}
