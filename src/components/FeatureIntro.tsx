interface FeatureIntroProps {
  heading: string;
  desc: string;
}

function FeatureIntro(params: FeatureIntroProps) {
  return (
    <div className="md:m-20 m-10 lg:m-6">
      <h1 className="font-bold text-2xl mb-5 lg:text-center lg:text-4xl">
        {params.heading}
      </h1>
      <br />
      <h4 className="text-gray-600 lg:mt-10">{params.desc}</h4>
      <h4 className="text-gray-800 font-bold mt-5 lg:mt-10">
        Ready to capture the web like a pro? Start snapping today and experience
        the magic of effortless website screenshots! ✨
      </h4>
      <br />
      <br />
    </div>
  );
}

export default FeatureIntro;
