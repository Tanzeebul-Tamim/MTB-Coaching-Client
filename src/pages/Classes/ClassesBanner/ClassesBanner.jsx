const ClassesBanner = () => {
  return (
    <div className="relative">
      <img src="/courses_banner.png" alt="" />
      <div className="z-[10] right-10 text-center absolute bottom-0">
        <h1 className="text-yellow-500 title lg:text-6xl uppercase font-bold">
          Exciting
        </h1>
        <h1 className="text-white lg:text-4xl uppercase tracking-[7px] mt-1">
          MTB Courses
        </h1>
        <h1 className="text-yellow-500 title lg:text-6xl font-bold uppercase">
          And
        </h1>
        <h1 className="text-white lg:text-4xl uppercase tracking-[px] mt-1">
          Workshops
        </h1>
        <h1 className="text-white description mt-2 lg:text-lg uppercase tracking-[5px]">
          Since 2006
        </h1>
      </div>
      <div className="absolute lg:bottom-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-base-300"></div>
    </div>
  );
};

export default ClassesBanner;
