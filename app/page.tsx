import { Corpscont } from "./Components/Corpscont";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
console.log(apiUrl);

// const getData = async () => {
//   const res = await fetch(apiUrl + "/blog");
//   const data = await res.json();
//   return data;
// };

export default async function Home() {
  return (
    <div className="w-full bg-slate-300 h-2/3 ">
      <Corpscont />
    </div>
  );
}
