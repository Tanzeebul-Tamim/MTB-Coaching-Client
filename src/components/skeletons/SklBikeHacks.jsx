const SklBikeHacks = () => {
    return (
        <div className="mx-5">
            <div className="animate-pulse lg:w-[300px] rounded-xl p-2 bg-base-100">
                <div className="flex items-center justify-center">
                    <img
                        className="w-full max-h-[17.5vh] lg:max-h-[9vw] rounded-lg object-cover"
                        src="/assets/youtube_loader.gif"
                    />
                </div>
                <div className="flex flex-col gap-1 mt-3 description text-white ">
                    <div className="rounded-lg h-3 bg-gray-500 w-4/5"></div>
                    <div className="rounded-lg h-3 bg-gray-500 w-1/3"></div>
                </div>
            </div>
        </div>
    );
};

export default SklBikeHacks;
