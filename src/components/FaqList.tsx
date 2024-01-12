import FaqComponent from "./FaqComponent";

function FaqList(props: any) {
  return (
    <div className="p-4 mt-20 lg:mx-20">
      <h1>FAQ (How it works)</h1>
      <div
        className="mt-3 mb-3"
        style={{ borderBottomWidth: "1px", borderBottomColor: "lightgray" }}
      />
      <FaqComponent
        faq="What types of websites can I capture?"
        answer="Our tool handles a wide range of websites, including static pages, dynamic sites, e-commerce platforms, and social media pages. However, due to technical limitations, some elements like Flash content or frames might not render perfectly."
      />
      <FaqComponent
        faq="Can I choose the resolution of the screenshot?"
        answer="Currently, we offer high-quality PNG exports at a fixed resolution. However, we're working on adding adjustable resolution options in future updates."
      />
      <FaqComponent
        faq="What do you mean by viewport capture?"
        answer="This option captures only the portion of the website visible on your screen, like what you see without scrolling. It's ideal for mobile-specific or focused screenshots."
      />
      <FaqComponent
        faq="Is there a limit on how many screenshots I can take?"
        answer="We don't impose any strict limits on free usage. However, excessive usage might require contacting our support team for verification."
      />
      <FaqComponent
        faq=" Do you store my screenshots or website data?"
        answer="No, we only process the URLs you provide and delete the associated data shortly after generating the screenshot. Your privacy is our priority."
      />
      <FaqComponent
        faq="Does your tool require any downloads or plugins?"
        answer="Our tool is entirely web-based. Simply visit our website, enter the URL, choose your options, and click Snap to get your screenshot. No downloads or installations needed!"
      />
    </div>
  );
}

export default FaqList;
