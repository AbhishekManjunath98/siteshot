import { Avatar, Button } from "@mui/material";
import { Image } from "../extras/types";

const defUrl =
  "https://images.ctfassets.net/fzn2n1nzq965/6EjrZrfFoR5aH0W7RymFhg/e47a1e3198e68ee600a3a3cff380716a/slack-circle-logo.svg";

function ImageComponent(props: Image) {
  const condition =
    props.alt === undefined || props.alt === "" ? "No Alt" : props.alt;
  function copyLink(): any {
    navigator.clipboard
      .writeText(props.src)
      .then(() => {
        alert(`URL [${props.src}] Copied to clipboard!`);
      })
      .catch((error) => {
        console.error("Failed to copy:", error);
      });
  }
  function openLink(): any {
    window.open(props.src, "_blank");
  }

  function getAvatarPrefix(site: string) {
    if (site.length > 2) {
      return site.substring(0, 2);
    } else return site;
  }

  return (
    <div className="shadow-lg xs:w-screen sm:w-full mt-4 mb-4 flex p-2 sm:p-4 items-center justify-between border border-gray-400">
      <Avatar
        sx={{ width: "100px", height: "100px" }}
        className="border border-blue-600 shadow-xl"
        src={props.src}
      >
        {getAvatarPrefix(condition)}
      </Avatar>

      <div className="flex flex-col justify-around mr-5 mb-2 ml-2">
        <h3 className="font-bold">
          {props.alt === "" ? "No Alt Text" : props.alt}
        </h3>
        <Button
          onClick={openLink}
          sx={{ marginTop: "12px", width: "200px", marginBottom: "12px" }}
          variant="outlined"
        >
          Download Image
        </Button>
        <Button onClick={copyLink} variant="contained">
          Copy Image URL
        </Button>
      </div>
    </div>
  );
}

export default ImageComponent;
