import { NextResponse } from "next/server";
import { articles } from "./data";

export async function GET() {
  return NextResponse.json(articles);
}
export async function POST(request: Request) {
  const article = await request.json();
  const newArticle = {
    id: articles.length + 1,
    title: article.title,
    auteur: article.auteur,
  };
  articles.push(newArticle);
  return new Response(JSON.stringify(newArticle), {
    headers: {
      "Content-Type": "application/json",
    },
    status: 201,
  });
}
