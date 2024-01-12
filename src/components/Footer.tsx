import LogoImage from "../assets/images/screenshot.png";
import { Link } from "react-router-dom";

function Footer(props: any) {
  function footerLinkAction(): void {
    window.open(
      "https://www.linkedin.com/in/gunjan-sharma-a74332251/",
      "_blank"
    );
  }

  function openLink(): void {
    window.open("https://en.wikipedia.org/wiki/Web_colors", "_blank");
  }

  function heading(heading: string, url: string): JSX.Element {
    return (
      <Link to={url}>
        <h5
          style={{ fontSize: "13px" }}
          className="text-white text-centre ml-5"
        >
          {heading}
        </h5>
      </Link>
    );
  }

  return (
    <footer className="w-full">
      <div className="h-340px w-full mt-24 flex flex-col items-center justify-between bg-black">
        <div className="w-full m-5 flex items-center justify-center">
          <img alt="" src={LogoImage} className="w-7 h-7" />
          <h1 className="text-center ml-4 text-white text-xl font-bold">
            Siteshot™ Screenshot
          </h1>
        </div>

        <div className="w-100%">
          <div className="p-5 container grid grid-cols-3 md:grid-cols-4 gap-2 w-full">
            {heading("Seo Parser", "https://seo-scrapers.web.app")}
            {heading("Link Scrapper", "https://links-scrapper.web.app")}
            {heading("Images Scrapper", "https://images-scrapper.web.app")}
            {heading("Media Scrapper", "https://medias-scrapper.web.app")}

            {heading("Script Scrapper", "https://javascript-scrapper.web.app")}
            {heading("Semantic Parser", "https://semantic-scrapper.web.app")}
            {heading("Keyword Lookup", "https://keywords-lookup.web.app")}

            {heading("Site Scrapper", "https://website-scrappers.web.app")}

            {heading("Siteshot", "https://site-screenshot.web.app")}

            {heading("Ultimate Picker", "https://ultimate-picker.web.app")}
            {heading("Whois Lookup", "https://whois-lookups.web.app")}
            {heading("Geolocation Data", "https://geolocationq.web.app")}
          </div>
        </div>

        <br />
        <div className="border p-2 border-dashed border-gray-400">
          <Link to="https://www.geekforce.in" target="_blank">
            <h4 className="text-white text-xs">
              A Product From GeekForce Technologies
            </h4>
          </Link>
          <Link
            target="_blank"
            to="https://www.linkedin.com/in/gunjan-sharma-a74332251/"
          >
            <h4 className="text-white text-xs mt-1">
              Owned & Envisoned By Gunjan Sharma
            </h4>
          </Link>
        </div>
        <br />

        <div className="m-4">
          <h5 className="text-center text-white font-sans text-xs font-bold">
            @Copyright 2024-2030
          </h5>
          <Link to={"https://www.linkedin.com/in/gunjan-sharma-a74332251/"}>
            <h5 className="text-center m-1 text-white font-sans text-xs font-bold">
              Designed & Developed By Gunjan Sharma
            </h5>
          </Link>
          <h5 className="xs:mb-5 text-center text-white font-sans text-xs font-bold">
            Made With ❤ In India
          </h5>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
