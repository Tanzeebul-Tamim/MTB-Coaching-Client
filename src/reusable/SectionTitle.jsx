const SectionTitle = ({title1, title2, description, textAlign}) => {
  return (
    <div className={`mb-9 ${textAlign && 'transform scale-x-[-1]'}`}>
      <div className={`title flex gap-3 lg:gap-6 ${textAlign && 'flex-row-reverse justify-end'} lg:text-5xl text-xl  uppercase lg:border-l-[12px] border-l-[5px] lg:pl-4 pl-2 border-yellow-600`}>
        <span className={`${textAlign ? 'text-yellow-600' : 'text-white'} lg:tracking-widest`}>
            <p className={`${textAlign && 'transform scale-x-[-1] text-end'}`}>{title1}</p>
        </span>
        {" "}
        <span className={`${textAlign ? 'text-white' : 'text-yellow-600'}  lg:tracking-widest`}>
            <p className={`${textAlign && 'transform scale-x-[-1] text-end'}`}>{title2}</p>
        </span>
      </div>
      <p className={`${textAlign && 'transform scale-x-[-1] text-end'} mt-5 text-white text-sm lg:text-xl lg:w-1/2 description`}>
        {description}
      </p>
    </div>
  );
};

export default SectionTitle;
