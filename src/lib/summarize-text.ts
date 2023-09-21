import axios from "axios";

interface SummaryResponse {
  msg: string;
  summary: string;
  sentence_count: number;
  sentences: string[];
}

export const summarizeText = async (text: string) : Promise<SummaryResponse | null> => {
  const options = {
    method: "POST",
    url: "https://text-analysis12.p.rapidapi.com/summarize-text/api/v1.1",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
      "X-RapidAPI-Host": "text-analysis12.p.rapidapi.com",
    },
    data: {
      language: "english",
      summary_percent: 10,
      text: text,
    },
  };

  try {
    const { data }: { data: SummaryResponse } = await axios.request(options);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
