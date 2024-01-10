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
        faq="What kind of websites can I analyze with your tool?"
        answer="Our tool can extract keywords from virtually any publicly accessible website, regardless of its content or structure."
      />
      <FaqComponent
        faq="How many keywords will your tool extract from a website?"
        answer="The number of extracted keywords depends on the website's length and content richness. You'll typically see a list of the most relevant and frequently used keywords."
      />
      <FaqComponent
        faq="How accurate is your keyword extraction process?"
        answer="We utilize advanced algorithms to accurately identify and prioritize keywords based on their relevance and prominence within the website's content."
      />
      <FaqComponent
        faq="Can I filter the extracted keywords in any way?"
        answer="Yes, you can filter keywords based on factors like word count, frequency, or specific phrases to refine your results and focus on the most relevant terms"
      />
      <FaqComponent
        faq="Can I export the extracted keywords for further analysis?"
        answer="Absolutely! You can easily export the keyword list in various formats, such as CSV or Excel, for integration into your preferred SEO tools or content strategies"
      />
      <FaqComponent
        faq="Does your tool have any limitations in terms of website size or complexity?"
        answer="We've designed our tool to handle even large and complex websites efficiently. However, if you encounter any issues, please don't hesitate to contact our support team."
      />
    </div>
  );
}

export default FaqList;
