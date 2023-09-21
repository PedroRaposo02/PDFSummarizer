import { useState } from "react";
import InputFileUpload from "./components/InputFileUpload";
import Button from "@mui/material/Button";
import { pdfToText } from "./lib/pdf-to-text";
import { summarizeText } from "./lib/summarize-text";
import { Loader2 } from "lucide-react";

function App() {
  const [file, setFile] = useState<File>();
  const [summarizedData, setSummarizedData] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    if (!file) return;
    const data = await pdfToText(file);

    if (!data) {
      alert("Error converting pdf to text");
      return;
    }

    console.log(data);
    

    const summarizedData = await summarizeText(data);
    if (!summarizedData) {
      alert("Error summarizing text");
      return;
    }
    console.log(summarizedData);
    setSummarizedData(summarizedData.summary);

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen h-full bg-zinc-700 px-10 pb-5 pt-10 text-white flex justify-top items-center flex-col gap-5">
      <InputFileUpload setFile={setFile} />
      <div className="flex">
        {file && (
          <div className="flex flex-col gap-2">
            {file.name}
            <Button variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        )}
      </div>
      {isLoading && (
        <Loader2
          className="animate-spin w-56 h-56 text-zinc-300"
        />
      )}
      {summarizedData && !isLoading && (
        <div className="flex flex-col gap-2">{summarizedData}</div>
      )}
    </div>
  );
}

export default App;
