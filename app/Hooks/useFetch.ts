import { useState, useEffect } from "react";

// Définition du type générique pour les données récupérées
type UseFetchResponse<T> = {
  data: T | null;
  error: string | null;
  loading: boolean;
};

function useFetch<T>(url: string): UseFetchResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Reset states on URL change
    setData(null);
    setError(null);
    setLoading(true);

    // Fonction pour récupérer les données
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Erreur inconnue");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]); // L'effet se déclenche à chaque changement de l'URL

  return { data, error, loading };
}

export default useFetch;
