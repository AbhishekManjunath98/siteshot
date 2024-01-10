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
      <br />
      <br />
    </div>
  );
}

export default FeatureIntro;
