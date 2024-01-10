import { Avatar, Button } from "@mui/material";
import Favicon from "react-favicon";

function SingleComponent(props: any) {
  function copyLink(): any {
    navigator.clipboard
      .writeText(props.href)
      .then(() => {
        alert(`URL [${props.href}] Copied to clipboard!`);
      })
      .catch((error) => {
        console.error("Failed to copy:", error);
      });
  }
  function openLink(): any {
    window.open(buildHrefs(props.href), "_blank");
  }

  function getAvatarPrefix(site: string) {
    if (site.length > 2) {
      return site.substring(0, 2);
    } else return site;
  }

  function buildHrefs(url: string) {
    if (url === undefined || url === "") {
      return url;
    }
    if (!url.startsWith("https://")) {
      return `${props.url}${props.href}`;
    } else return url;
  }

  return (
    <div>
      <div className=" border-2 m-4 border-yellow-600 w-80 shadow-md p-4">
        <div className="flex items-center justify-around">
          <Avatar sx={{ backgroundColor: "#E89A19" }}>
            {getAvatarPrefix(props.text)}
          </Avatar>
          <div className="ml-4 w-p overflow-hidden">
            <h3 className="text-sm line-clamp-2 font-bold">{props.text}</h3>
            <a
              onClick={openLink}
              className="text-blue-600 pointer-events-none text-xs line-clamp-1 overflow-hidden white-space-nowrap text-overflow-ellipsis"
              target="_blank"
              rel="noreferrer"
              href={props.href}
            >
              {buildHrefs(props.href)}
            </a>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <Button onClick={copyLink} variant="outlined">
            Copy Link
          </Button>
          <Button onClick={openLink} variant="contained">
            Open Link
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SingleComponent;
