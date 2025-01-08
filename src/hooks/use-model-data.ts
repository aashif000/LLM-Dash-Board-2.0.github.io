import { useQuery } from "@tanstack/react-query";
import { ModelData } from "@/types/data";

const fetchData = async (url: string): Promise<ModelData[]> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  // Ensure the response is an array
  return Array.isArray(data) ? data : [];
};

export const useModelData = () => {
  const togetherQuery = useQuery({
    queryKey: ['together'],
    queryFn: () => fetchData('https://cdn.jsdelivr.net/gh/aashif000/LLM-Data@main/togetherAI/all.json'),
  });

  const fireworksLLMQuery = useQuery({
    queryKey: ['fireworksLLM'],
    queryFn: () => fetchData('https://cdn.jsdelivr.net/gh/aashif000/LLM-Data@main/fireworks/LLM.json'),
  });

  const fireworksImageQuery = useQuery({
    queryKey: ['fireworksImage'],
    queryFn: () => fetchData('https://cdn.jsdelivr.net/gh/aashif000/LLM-Data@main/fireworks/image.json'),
  });

  const isLoading = togetherQuery.isLoading || fireworksLLMQuery.isLoading || fireworksImageQuery.isLoading;
  const isError = togetherQuery.isError || fireworksLLMQuery.isError || fireworksImageQuery.isError;
  
  // Ensure each data source is an array before spreading
  const data = [
    ...(Array.isArray(togetherQuery.data) ? togetherQuery.data : []),
    ...(Array.isArray(fireworksLLMQuery.data) ? fireworksLLMQuery.data : []),
    ...(Array.isArray(fireworksImageQuery.data) ? fireworksImageQuery.data : []),
  ];

  return { data, isLoading, isError };
};