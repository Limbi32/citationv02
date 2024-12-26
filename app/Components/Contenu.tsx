"use client";
import Link from "next/link";
import useFetch from "../Hooks/useFetch";
import Loader from "./loader";

// Définir un type pour les données que vous attendez de l'API
interface Post {
  id: number;
  title: string;
  auteur: string;
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
function onDelete(id:number){
  fetch(apiUrl+'/blog/'+id, {
    method: 'DELETE',
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(() => {
      // Optionally, you can refresh the data or update the state to remove the deleted item from the UI
      window.location.reload();
    })
    .catch(error => {
      console.error('There was a problem with the delete request:', error);
    });
}

export default function Contenu() {
  // Utilisation du hook useFetch pour récupérer des données
  const { data, error, loading } = useFetch<Post[]>( apiUrl + "/blog");
  console.log(data);

  if (loading)
    return (
      <div className="bg-slate-300 text-center m-5 font-bold text-2xl">
        <Loader />
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
         <div className="rounded-2xl flex justify-between gap-5 
         bg-slate-200 shadow-lg  p-8 text-center text-zinc-800
          hover:bg-slate-300">
          <div className="flex  flex-col justify-between w-4/5">
          <Link className="text-center"
            href={"" + apiUrl + "/Create/" + article.id}
            key={article.id}
           
          >
           <div> <p> {article.title} </p>
          
           </div>
           
          </Link>
          <p className="text-right pr-3 text-zinc-800 font-bold">
              {article.auteur}
            </p>
          </div>
           <button className="bg-slate-400 p-6 rounded-lg" onClick={() =>onDelete(article.id)}  >X</button>
         </div>
        ))}
    </div>
  );
}
