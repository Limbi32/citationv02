"use client";
import Link from "next/link";
import useFetch from "../Hooks/useFetch";
import Loader from "./loader";
import { MdDelete } from "react-icons/md";
import jwt from "jsonwebtoken";
import { useRouter } from "next/navigation";
import Tooltip from "./Tooltips/Tooltips";
import { useEffect, useState } from "react";
import Modal from "./Modals/Moadals";
import { Like } from "./like";
import { Copy } from "./Copy";
import { Share } from "./Share";
import { Update } from "./Update";
// Add this line to import the Header1 component

// Définir un type pour les données que vous attendez de l'API
interface Post {
  id: number;
  title: string;
  auteur: string;
  user: string;
  createdAt: string;
  updatedAt: string;
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";

export default function Contenu({ token }: { token: string | null }) {
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
  const [islike, setIslike] = useState(false);
  const [user, setUser] = useState<{
    id: string;
    email: string;
    password: string;
    exp: number;
  } | null>(null);
  const router = useRouter();
  const [ismodals, setModals] = useState(false);
  const [iscopy, setIscopy] = useState(false);

  // Utilisation du hook useFetch pour récupérer des données
  const { data, error, loading } = useFetch<Post[]>(apiUrl + "/blog");

  useEffect(() => {
    if (decoded) {
      // Vérifier si le token est

      const isExpired = Date.now() / 1000 > decoded.exp;
      if (isExpired) {
        setModals(true);
      } else {
        setUser(decoded);
        const fetchData = async () => {
          if (user && data) {
            const response = await fetch("/querylikes", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ param1: user.email, param2: user.id }),
            });
            const data: { isLiked: boolean } = await response.json();
            setIslike(data.isLiked);
          } else {
            setModals(true);
          }
        };
        fetchData();
      }
    }
  }, [user, ismodals, decoded, data]);

  // Fonction qui copie le texte dans le presse-papier
  const copierDansPressePapier = async (valeur: string) => {
    try {
      if (user) {
        await navigator.clipboard.writeText(valeur);
        alert("Texte copié dans le presse-papier!");
        setIscopy(true);

        setTimeout(() => {
          setIscopy(false);
        }, 2000);
      } else {
        setModals(true);
      }
    } catch (err) {
      alert("Échec de la copie!");
      console.error("Erreur de copie dans le presse-papier: ", err);
    }
  };

  //Fonction pour mettre à jours une citation

  const onUpdate = (id: number) => {
    if (!user) {
      console.log("Token is expired");
      setModals(true);
    } else {
      router.push("/Upadate/" + id);
      console.log("update");
    }
  };

  //Fonction pour supprimer une citation

  function onDelete(id: number) {
    if (!user) {
      console.log("Token is expired");
      setModals(true);
    } else {
      fetch(apiUrl + "/blog/" + id, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then(() => {
          // Optionally, you can refresh the data or update the state to remove the deleted item from the UI
          window.location.reload();
        })
        .catch((error) => {
          console.error("There was a problem with the delete request:", error);
        });

      // setUser(decoded) // Stocke les informations du token
    }
  }

  const Handlelike = async (id: string) => {
    if (user) {
      const response = await fetch("/likes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ param1: user.email, param2: id }),
      });

      const data = await response.json();

      setIslike(data.isLiked);
    } else {
      console.error("User is null");
      setModals(true);
    }
  };

  //Si les données  ne sont pas prets affiche le loader
  if (loading)
    return (
      <div className="bg-gray-300 text-center m-5 font-bold text-2xl">
        <Loader />
      </div>
    );

  //s'il y a une erreur
  if (error)
    return (
      <main className=" bg-gray-800 h-screen flex-1 flex flex-col items-center justify-center p-6">
        {/* Message d'erreur si besoin */}
        <div className="flex flex-col items-center gap-4">
          <div className="bg-red-500 text-white font-medium py-2 px-6 rounded-lg shadow-md">
            Erreur de chargement de données
          </div>

          <button
            onClick={() => location.reload()} // ou ta propre fonction de retry
            className="bg-indigo-600 hover:bg-indigo-700 active:scale-95 transition-all duration-300 text-white font-semibold py-2 px-5 rounded-xl shadow-md hover:shadow-lg"
          >
            Réessayer
          </button>
        </div>
      </main>
    );

  return (
    <main className="flex-1 flex flex-col items-center justify-center p-6">
      <Modal Open={ismodals} onClose={() => setModals(false)}>
        <div className="bg-zinc-200 p-10 rounded-xl gap-4 text-center text-zinc-500 flex flex-col justify-between items-center  w-full">
          <p>
            Vous devez connecter pour beneficier de toutes les fonctionnalités
          </p>
          <button
            className="bg-zinc-300 shadow-zinc-300 py-2 rounded-xl w-full"
            onClick={() => setModals(false)}
          >
            Fermer
          </button>
        </div>
      </Modal>

      {data &&
        data.map(
          (article: {
            id: number;
            title: string;
            auteur: string;
            user: string;
            createdAt: string;
            updatedAt: string;
          }) => (
            <div
              key={article.id}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto "
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 hover:shadow-lg transition-transform hover:scale-105">
                <Link
                  className="text-center"
                  href={"" + apiUrl + "/Create/" + article.id}
                >
                  <div className="flex justify-center items-center">
                    {" "}
                    <p className="text-xl italic font-light text-center">
                      {" "}
                      {article.title}{" "}
                    </p>
                  </div>
                </Link>
                <p className=" text-right font-semibold mt-4">
                  {article.auteur}
                </p>
              </div>
              <div className="flex flex-col-reverse sm:flex sm:justify-between gap-3  ">
                <div className="flex gap-2">
                  <Like
                    HandleLike={() => Handlelike(article.id.toString())}
                    islike={islike}
                    setIslike={setIslike}
                    user={user}
                  />

                  <Copy
                    copierDansPressePapier={() =>
                      copierDansPressePapier(article.title)
                    }
                    iscopy={iscopy}
                    setIscopy={setIscopy}
                  />

                  <Share
                    text={article.title}
                    apiurl={apiUrl}
                    user={user}
                    setModals={setModals}
                  />
                  <Update onUpdate={() => onUpdate(article.id)} />

                  <Tooltip text="Supprimer">
                    <button
                      className=" rounded-lg p-2 focus:ring-2"
                      disabled={false}
                      onClick={() => onDelete(article.id)}
                    >
                      <MdDelete style={{ fontSize: "15px" }} />
                    </button>
                  </Tooltip>
                </div>
                <div className="text-sm sm:text-md flex gap-4 justify-end">
                  <div>
                    <p> Crée par {article.user}</p>
                  </div>
                  <div>
                    Le {new Date(article.createdAt).toLocaleDateString()} à{" "}
                    {new Date(article.createdAt).toLocaleTimeString()}
                  </div>
                  <div>
                    Mise a jour le{" "}
                    {new Date(article.updatedAt).toLocaleDateString()} à{" "}
                    {new Date(article.updatedAt).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </div>
          )
        )}
    </main>
  );
}
