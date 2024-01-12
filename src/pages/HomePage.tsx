import {
  Backdrop,
  Button,
  Checkbox,
  CircularProgress,
  Divider,
  Pagination,
  TextField,
} from "@mui/material";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import DownloadImage from "../assets/images/download.png";
import React, {
  ChangeEventHandler,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import ReactPlayer from "react-player";
import axios from "axios";
import { Image, Root } from "../extras/types";
import SingleComponent from "../components/SingleComponent";
import ImageComponent from "../components/ImageComponent";
import { v4 as uuidv4 } from "uuid";

import FeatureIntro from "../components/FeatureIntro";
import { ColorContext } from "../extras/ColorContext";

const API_BASE_URL = `https://appnor-backend.onrender.com/extras/v1/api/parsing/site-screenshot?siteUrl=`;

function HomePage(props: any) {
  const colorContex = useContext(ColorContext);
  const [videoUrl, setVideoUrl] = useState("");
  const [inVideoUrl, setInVideoUrl] = useState("");
  const [audioResponse, setAudioResponse] = useState<any>();
  const [playVideo, setPlayVideo] = useState(false);
  const [isTermsAggred, setIsTermsAggred] = useState(false);
  const [isDownloadSuccess, setIsDownloadSuccess] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [imageSrc, setImageSrc] = useState<any>(null);
  const scrollRef = useRef<any>(null);

  const [displayedItems, setDisplayedItems] = useState<Image[]>();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    scrollToDiv();
    return () => {};
  }, [colorContex.point]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  function closeBackdrop() {
    setTimeout(() => {
      handleClose();
    }, 3000);
  }

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): any {
    setVideoUrl(event.target.value);
    if (videoUrl !== "" || videoUrl.includes("youtu")) {
      //setPlayVideo(true);
    } else {
      setPlayVideo(false);
    }
  }

  function handleCheckboxChange(checked: boolean) {
    setIsTermsAggred(checked);
    //setPlayVideo(checked);
  }

  function getUrlFileName(url: string, ext: string) {
    return (
      url
        .replace("https://", "")
        .replace("www", "")
        .replace("com", "")
        .replaceAll(".", "") + `-screenshot-${uuidv4()}.${ext}`
    );
  }

  async function triggerDownload(data: any): Promise<any> {
    try {
      const blob = new Blob([data], { type: "image/png" });
      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = getUrlFileName(inVideoUrl, "png");
      link.click();

      console.log("blob : " + blob.arrayBuffer.name);
      console.log(`state : ${audioResponse}`);
      console.log("du : " + downloadUrl);
      console.log("compressedUrl: " + downloadUrl);
    } catch (error) {
      console.log(`somwthing went wrong in buffer conversion : ${error}`);
    }
  }

  function requestServerImageOperation() {
    if (!isTermsAggred) {
      alert("Please Agree with our Terms & Condition before procedding..");
      return;
    }
    if (videoUrl === "" || !videoUrl.startsWith("https://www")) {
      alert("A Valid Website URL [https://www] is Required!!");
      return;
    }

    handleOpen();
    axios
      .post(
        API_BASE_URL + videoUrl + `&isFullPage=${isFullScreen}`,
        {},
        {
          responseType: "arraybuffer",
          headers: {
            "Content-Type": "image/jpeg",
          },
        }
      )
      .then(async (response) => {
        if (response.status === 500) {
          alert("Something went wong while capturing screenshot..");
          return;
        }
        const blob = new Blob([response.data], { type: "image/png" });
        const downloadUrl = URL.createObjectURL(blob);
        setImageSrc(downloadUrl);
        setAudioResponse(response);
        setIsDownloadSuccess(true);
        setInVideoUrl(videoUrl);
        setVideoUrl("");
        closeBackdrop();
        console.log(`File compression successful : ${response.data}`);
      })
      .catch((error) => {
        handleClose();
        alert(`Error occured while compressing images on server : ${error}`);
        console.log(
          `Error occured while compressing images on server : ${error}`
        );
      });
  }

  function handleVideoPlay(): any {
    if (videoUrl === "" || !videoUrl.startsWith("https://")) {
      alert("A Valid Website URL is Required!!");
      return;
    }
    window.open(videoUrl, "_blank");
  }

  function scrollToDiv() {
    if (colorContex.point !== 0) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
      colorContex.setPoint(0);
    }
  }

  const backdrop = (
    <React.Fragment>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <div className="flex flex-col items-center">
          <CircularProgress color="inherit" />
          <h1 className="font-extrabold m-2 text-white text-xl">
            Communicating with server...
          </h1>
        </div>
      </Backdrop>
    </React.Fragment>
  );

  return (
    <div
      ref={scrollRef}
      className="md:m-10 sm:m-5 flex flex-col items-center justify-center"
    >
      {backdrop}
      <FeatureIntro
        heading="Enjoy crystal-clear screenshots without compromise"
        desc="Introducing the screenshot tool that lets you capture any website with ease, from full-page scrolls to precise viewport snapshots – all as crisp, high-quality PNGs! No sign-ups, no subscriptions, no hassle. Just enter the URL and click Snap! Full-page or viewport capture – Choose the perfect scope for your needs."
      />
      <div className="flex flex-col items-center border border-gray-400 shadow-lg p-4">
        <TextField
          fullWidth
          value={videoUrl}
          onChange={handleChange}
          id="url-input"
          label="Enter Website Link To Capture"
          variant="outlined"
        />

        <div className="flex items-center justify-center mt-4">
          <Checkbox onChange={(e) => setIsFullScreen(e.target.checked)} />
          <h3 className="text-sm text-center font-bold">
            {isFullScreen
              ? "Capture full-screen screenshot"
              : "Capture viewport(vh) visible only screenshot"}
          </h3>
        </div>

        <Button
          onClick={requestServerImageOperation}
          sx={{ marginTop: "20px", marginBottom: "10px", width: "200px" }}
          variant="contained"
        >
          Take Screenshot
        </Button>
        <Button
          onClick={handleVideoPlay}
          sx={{ width: "200px", marginTop: "10px", marginBottom: "15px" }}
          variant="outlined"
        >
          Visit Website
        </Button>
        <h3 className="text-xs text-center w-80 m-2">
          A direct list of result will get triggered if file has only one format
          else a list of downloadable file will get presented.
        </h3>
        <div className="flex items-center justify-center">
          <Checkbox onChange={(e) => handleCheckboxChange(e.target.checked)} />
          <h3 className="text-xs text-center">
            By capturing screenshot of 3rd party websites you agree to our terms
            & conditions for fair usages policy
          </h3>
        </div>
        <Divider color="black" />
      </div>

      <br />
      <br />
      {isDownloadSuccess && (
        <div className="border-2 text-center border-blue-500 shadow-sm p-4 mb-8">
          <div className="flex flex-col items-center md:flex-row font-mono mb-5 justify-center">
            <h3 className="font-bold text-xl">
              Screenshot Capturing Successful
            </h3>
            <img
              className="m-2"
              width="30px"
              height="30px"
              alt="download"
              src={DownloadImage}
            />
            <img
              className="animate-ping"
              width="30px"
              height="30px"
              alt="download"
              src={DownloadImage}
            />
          </div>
        </div>
      )}

      {isDownloadSuccess && (
        <img alt="screenshot-file" className="mt-5 mb-8" src={imageSrc} />
      )}

      {isDownloadSuccess && (
        <Button
          sx={{ fontWeight: "bold" }}
          variant="outlined"
          onClick={async () => await triggerDownload(audioResponse.data)}
        >
          Download Screenshot PNG File
        </Button>
      )}
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default HomePage;
