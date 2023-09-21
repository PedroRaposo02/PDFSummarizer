import ConvertAPI from 'convertapi-js';
import axios from 'axios';


export const pdfToText = async (file: File) => {

  if (localStorage.getItem(file.name)) {
    return localStorage.getItem(file.name);
  }

  const convertApi = ConvertAPI.auth(import.meta.env.VITE_CONVERT_API_KEY);

  const params = convertApi.createParams();
  params.add("File", file);

  const result = await convertApi.convert("pdf", "txt", params);

  const fileUrl = result.files[0].Url;
  const { data } = await axios.get<string>(fileUrl);

  /!* Formatting string */

  // Remove whitespaces at the beginning and end of the string
  const trimmedData = data.trim();
  // Remove double or more whitespaces
  const singleSpace = trimmedData.replace(/\s+/g, " ");
  // Remove dots when there are more than one
  const noExtraDots = singleSpace.replace(/\.+/g, ".");

  localStorage.setItem(file.name, noExtraDots);

  return noExtraDots;
};
