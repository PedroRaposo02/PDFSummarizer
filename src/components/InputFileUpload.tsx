import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { ChangeEvent } from "react";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function InputFileUpload({
  setFile,
}: {
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>;
}) {
  return (
    <Button
      component="label"
      variant="contained"
      startIcon={<CloudUploadIcon />}
    >
      Upload file
      <VisuallyHiddenInput type="file" accept='.pdf' onChange={(e: ChangeEvent<HTMLInputElement>) => {
        if (e?.target?.files) {
          setFile(e.target.files[0]);
        }
      }}/>
    </Button>
  );
}
