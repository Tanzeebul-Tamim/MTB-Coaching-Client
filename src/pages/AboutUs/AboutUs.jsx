import useTitle from "../../Helmet/useTitle";

const AboutUs = () => {
  useTitle("| About Us");

  return (
    <div
      className="pt-40 pb-24 lg:px-10 relative"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.700), rgba(0, 0, 0, 0.450)), url('../../../public/about_us_banner.avif')",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h1 className="z-[10] title text-3xl mb-5 text-center uppercase">About Us</h1>
      <div className="text-xl flex flex-col gap-4 text-center description">
        <p className="z-[10]">
          Welcome to PMBIA (Professioanl Mountain Biking Instructors
          Association)! We are a passionate group of riders dedicated to
          promoting and sharing the exhilarating world of mountain biking. Our
          journey began in 2005 when a group of like-minded individuals came
          together with the vision of providing quality services and instruction
          to riders of all levels.
        </p>
        <p className="z-[10]">
          At the core of our mission is a commitment to excellence. We strive to
          deliver exceptional experiences and inspire riders to improve their
          skills, push their limits, and discover the joy of mountain biking.
          With a team of highly skilled and experienced instructors, we ensure
          that every rider receives personalized attention and guidance tailored
          to their abilities and goals.
        </p>
        <p className="z-[10]">
          We believe in the power of community and the importance of sharing our
          love for mountain biking. Through our programs, events, and organized
          rides, we create opportunities for riders to connect, learn from each
          other, and forge lifelong friendships. We are firm believers that the
          camaraderie and support within the mountain biking community are
          invaluable and contribute to the growth and enjoyment of the sport.
        </p>
        <p className="z-[10]">
          Safety is paramount in everything we do. We prioritize providing a
          safe and secure environment for riders to learn and progress. Our
          instructors are certified and knowledgeable, equipped with the
          expertise to teach proper techniques, bike maintenance, and trail
          etiquette. We also advocate for responsible trail use and stewardship
          to preserve and protect the natural beauty of our riding areas.
        </p>
        <p className="z-[10]">
          Whether you are a beginner seeking to embark on your first mountain
          biking adventure or an experienced rider looking to refine your
          skills, we welcome you to join our community. Together, let&apos;s
          explore the trails, embrace the challenges, and experience the thrill
          of mountain biking. Get ready to discover the freedom, adrenaline, and
          sense of accomplishment that await you on two wheels.`
        </p>
      </div>
      <div className="absolute lg:bottom-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-base-300"></div>
    </div>
  );
};

export default AboutUs;
