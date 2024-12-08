import { articles } from "../data";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const article = articles.find(
    (article) => article.id === parseInt(params.id)
  );
  return Response.json(article);
}
