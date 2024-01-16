import {
  Backdrop,
  Button,
  Checkbox,
  CircularProgress,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Tab,
  Tabs,
  TextField,
  Tooltip,
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
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { v4 as uuidv4 } from "uuid";

import FeatureIntro from "../components/FeatureIntro";
import { ColorContext } from "../extras/ColorContext";

//const API_BASE_URL = `https://appnor-backend.onrender.com/extras/v1/api/parsing/site-screenshot?siteUrl=`;
const API_BASE_URL = `http://192.168.1.88:9999/extras/v1/api/parsing/site-screenshot?siteUrl=`;
const API_BASE_URL_PDF = `http://192.168.1.88:9999/extras/v1/api/parsing/site-screenshot-pdf?siteUrl=`;

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

  const [tabValue, setTabValue] = useState(0);
  const [pdfSrc, setPdfSrc] = useState<any>(null);
  const [pdfPagesNumber, setPdfPagesNumber] = useState("1-3");
  const [isHeaderFooter, setIsHeaderFooter] = useState(true);
  const [isPrintBackground, setIsPrintBackground] = useState(true);
  const [preferCSSPageSize, setPreferCSSPageSize] = useState(false);
  const [omitBackground, setOmitBackground] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    console.log(`Tab Value : ${newValue}`);
  };

  const handlePdfPageNumberChange = (event: SelectChangeEvent) => {
    setPdfPagesNumber(event.target.value);
    console.log("selected page range : " + event.target.value);
  };

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
  }

  function handlePdfOptionChange(checked: boolean, id: number) {
    console.log(`isChecked : ${checked} | option target : ${id}`);
    switch (id) {
      case 1:
        setIsHeaderFooter(checked);
        break;

      case 2:
        setIsPrintBackground(checked);
        break;

      case 3:
        setPreferCSSPageSize(checked);
        break;

      case 4:
        setOmitBackground(checked);
        break;

      case 5:
        setIsLandscape(checked);
        break;

      default:
        break;
    }
  }

  function getUrlFileName(url: string, ext: string) {
    return (
      url
        .replace("https://", "")
        .replace("www", "")
        .replace("com", "")
        .replaceAll(".", "") + `-screenshot(siteshot.in)-${uuidv4()}.${ext}`
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

  async function triggerDownloadPdf(data: any): Promise<any> {
    try {
      const blob = new Blob([data], { type: "application/pdf" });
      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = getUrlFileName(inVideoUrl, "pdf");
      link.click();

      console.log("blob : " + blob.arrayBuffer.name);
      console.log(`state : ${audioResponse}`);
      console.log("du : " + downloadUrl);
      console.log("compressedUrl: " + downloadUrl);
    } catch (error) {
      console.log(`somwthing went wrong in buffer conversion(pdf) : ${error}`);
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

  function requestServerPdfOperation() {
    if (!isTermsAggred) {
      alert("Please Agree with our Terms & Condition before procedding..");
      return;
    }
    if (videoUrl === "" || !videoUrl.startsWith("https://www")) {
      alert("A Valid Website URL [https://www] is Required!!");
      return;
    }

    handleOpen();
    const requestParams = `&displayHeaderFooter=${isHeaderFooter}&pageRanges=${pdfPagesNumber}&printBackground=${isPrintBackground}&preferCSSPageSize=${preferCSSPageSize}&omitBackground=${omitBackground}&landscape=${isLandscape}`;
    axios
      .post(
        API_BASE_URL_PDF + videoUrl + requestParams,
        {},
        {
          responseType: "arraybuffer",
          headers: {
            "Content-Type": "application/pdf",
          },
        }
      )
      .then(async (response) => {
        if (response.status === 500) {
          alert("Something went wong while capturing pdf screenshot..");
          return;
        }
        const blob = new Blob([response.data], { type: "application/pdf" });
        const downloadUrl = URL.createObjectURL(blob);
        setPdfSrc(downloadUrl);
        setAudioResponse(response);
        setIsDownloadSuccess(true);
        setInVideoUrl(videoUrl);
        setVideoUrl("");
        closeBackdrop();
        console.log(`Pdf Screen Capturing successful : ${response.data}`);
      })
      .catch((error) => {
        handleClose();
        alert(
          `Error occured while capturing pdf screenshot on server : ${error}`
        );
        console.log(
          `Error occured while capturing pdf screenshot on server : ${error}`
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

  async function switchDownloadTrigger() {
    switch (tabValue) {
      case 0:
        await triggerDownload(audioResponse.data);
        break;

      case 1:
        await triggerDownloadPdf(audioResponse.data);
        break;
    }
  }

  function PdfOptions(
    option: string,
    tooltip: string,
    checkBoxChange: (checked: boolean, id: number) => any,
    id: number
  ): JSX.Element {
    return (
      <div className="flex items-center justify-between text-start mt-1">
        <Checkbox
          size="small"
          onChange={(e) => checkBoxChange(e.target.checked, id)}
        />
        <h2 className="text-xs">{option}</h2>
        <Tooltip title={tooltip}>
          <IconButton>
            <InfoOutlinedIcon sx={{ color: "blue" }} fontSize="small" />
          </IconButton>
        </Tooltip>
      </div>
    );
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

  const pdfOptionsSelect = (
    <React.Fragment>
      <FormControl sx={{ m: 1, minWidth: 120, width: "150px" }} size="small">
        <InputLabel id="demo-select-small-label">Pages Count</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={pdfPagesNumber}
          label="Pdf Pages Count"
          onChange={handlePdfPageNumberChange}
        >
          <MenuItem value={"1-3"}>0-3 Pages</MenuItem>
          <MenuItem value={"1-5"}>0-5 Pages</MenuItem>
          <MenuItem value={"1-7"}>0-7 Pages</MenuItem>
          <MenuItem value={"1-10"}>0-10 Pages</MenuItem>
        </Select>
      </FormControl>
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

      <Tabs
        value={tabValue}
        sx={{ marginBottom: "15px" }}
        onChange={handleTabChange}
        aria-label="disabled tabs example"
      >
        <Tab
          sx={{ color: "blue", fontWeight: "bold", fontFamily: "monospace" }}
          label="Image Screenshot"
        />
        <Tab
          sx={{ color: "blue", fontWeight: "bold", fontFamily: "monospace" }}
          label="Pdf Screenshot"
        />
      </Tabs>

      {tabValue === 0 ? (
        <div className="flex flex-col items-center border border-gray-400 shadow-lg p-4">
          <TextField
            fullWidth
            value={videoUrl}
            onChange={handleChange}
            id="url-input"
            label="Enter Website Link To Capture (IMAGE)"
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
            A direct list of result will get triggered if file has only one
            format else a list of downloadable file will get presented.
          </h3>
          <div className="flex items-center justify-center">
            <Checkbox
              value={isTermsAggred}
              onChange={(e) => handleCheckboxChange(e.target.checked)}
            />
            <h3 className="text-xs text-center">
              By capturing screenshot of 3rd party websites you agree to our
              terms & conditions for fair usages policy
            </h3>
          </div>
          <Divider color="black" />
        </div>
      ) : (
        <div className="flex flex-col items-center border border-gray-400 shadow-lg p-4">
          <TextField
            fullWidth
            value={videoUrl}
            onChange={handleChange}
            id="url-input"
            label="Enter Website Link To Capture (PDF)"
            variant="outlined"
          />

          <div className="border shadow-lg border-gray-400 border-dashed mb-5 mt-5 p-5">
            <h2 className="text-xs font-bold text-center">
              Pdf Output Customisation
            </h2>
            {PdfOptions(
              "Display Header Footer",
              "Whether to show the header and footer (@defaultValue false)",
              handlePdfOptionChange,
              1
            )}

            {PdfOptions(
              "Print Background",
              "Set to true to print background graphics.",
              handlePdfOptionChange,
              2
            )}

            {PdfOptions(
              "Prefer CSS Page Size",
              "Give any CSS @page size declared in the page priority over what isdeclared in the `width` or `height` or `format` option. @defaultValue `false`, which will scale the content to fit the paper size.",
              handlePdfOptionChange,
              3
            )}

            {PdfOptions(
              "Omit Background",
              "Hides default white background and allows generating pdfs with transparency @defaultValue `false`",
              handlePdfOptionChange,
              4
            )}

            {PdfOptions(
              "Print In Landscape",
              "Whether to print in landscape orientation. @defaultValue = false",
              handlePdfOptionChange,
              5
            )}

            <div className="flex items-center mt-2">
              {pdfOptionsSelect}{" "}
              <Tooltip title="Number of pages in output screenshot pdf file (max is 10 & default is 5)">
                <InfoOutlinedIcon fontSize="small" sx={{ color: "blue" }} />
              </Tooltip>
            </div>
          </div>

          <Button
            onClick={requestServerPdfOperation}
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
            A direct list of result will get triggered if file has only one
            format else a list of downloadable file will get presented.
          </h3>
          <div className="flex items-center justify-center">
            <Checkbox
              value={isTermsAggred}
              onChange={(e) => handleCheckboxChange(e.target.checked)}
            />
            <h3 className="text-xs text-center">
              By capturing screenshot of 3rd party websites you agree to our
              terms & conditions for fair usages policy
            </h3>
          </div>
          <Divider color="black" />
        </div>
      )}

      <br />
      <br />
      {isDownloadSuccess && (
        <div className="border-2 text-center border-blue-500 shadow-sm p-4 mb-8">
          <div className="flex flex-col items-center md:flex-row font-mono mb-5 justify-center">
            <h3 className="font-bold text-xl">
              {tabValue === 0 ? "Screenshot(Image)" : "Screenshot(PDF)"}{" "}
              Capturing Successful
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

      {isDownloadSuccess && tabValue === 0 && (
        <img alt="screenshot-file" className="mt-5 mb-8" src={imageSrc} />
      )}

      {isDownloadSuccess && tabValue === 1 && (
        <iframe
          className="mt-5 mb-8"
          title="Captured PDF Screenshot"
          src={pdfSrc}
        />
      )}

      {isDownloadSuccess && (
        <Button
          sx={{ fontWeight: "bold" }}
          variant="outlined"
          onClick={async () => await switchDownloadTrigger()}
        >
          {tabValue === 0
            ? "Download PNG Screenshot File"
            : "Download PDF Screenshot File"}
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
