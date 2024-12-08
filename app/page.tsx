import Image from "next/image";
import Link from "next/link";
import { articles } from "./blog/data";

// const getData = async () => {
//   const res = await fetch("http://localhost:3000/blog");
//   const data = res.json();
//   return data;
// };
export default async function Home() {
  const Articles = articles;
  console.log(Articles);

  return (
    <div className="w-full bg-slate-300 h-2/3 ">
      <div className="flex  flex-col justify-between gap-2 p-6">
        {Articles.map(
          (article: { id: number; title: string; auteur: string }) => (
            <Link
              href={"/Create/" + article.id}
              key={article.id}
              className="rounded-lg flex flex-col  bg-slate-200 shadow-lg  p-8 text-center hover:bg-slate-300"
            >
              <p>" {article.title} " </p>
              <p className="text-right pr-3 text-zinc-800">{article.auteur}</p>
            </Link>
          )
        )}
      </div>
    </div>
  );
}
