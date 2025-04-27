import { Corpscont } from "./Components/Corpscont";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
// console.log(apiUrl);

export default async function Home() {
  return (
    <div className="w-full bg-slate-300 h-2/3 ">
      <Corpscont />
    </div>
  );
}
