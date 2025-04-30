import { Corpscont } from "./Components/Corpscont";

// const apiUrl = process.env.NEXT_PUBLIC_API_URL;
// console.log(apiUrl);

export default async function Home() {
  return (
    <div className="in-h-screen bg-gradient-to-b from-gray-200 via-gray-300 to-gray-400 flex flex-col ">
      <Corpscont />
    </div>
  );
}
