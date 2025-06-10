const SklMyProfile = () => {
    return (
        <div className="flex mt-[35%] lg:mt-0 flex-col md:flex-row mb-10 px-2 md:px-5 gap-6 md:gap-10 items-center justify-center w-full">
            <img
                className="z-[10] w-32 h-32 md:w-[200px] md:h-[200px] border-zinc-400 border-[3px] lg:border-[4px] shadow-2xl rounded-full object-cover animate-pulse"
                src="/user_avatar.png"
                alt=""
            />
            <div className="bg-base-100 animate-pulse bg-opacity-70 w-full p-3 md:p-4 rounded-2xl">
                <div className="description gap-2 md:gap-3 text-base md:text-xl flex justify-center flex-col text-left mb-4">
                    <p className="z-[10] flex items-center">
                        <strong>Name :</strong>
                        <div className="ml-1 bg-gray-200 w-1/4 h-3 rounded animate-pulse"></div>
                    </p>
                    <p className="z-[10] flex items-center">
                        <strong>Email :</strong>
                        <div className="ml-1 bg-gray-200 w-1/3 h-3 rounded animate-pulse"></div>
                    </p>
                    <p className="z-[10] flex items-center">
                        <strong>Gender :</strong>
                        <div className="ml-1 bg-gray-200 w-1/12 h-3 rounded animate-pulse"></div>
                    </p>
                    <p className="z-[10] flex items-center">
                        <strong>Address :</strong>
                        <div className="ml-1 bg-gray-200 w-1/2 h-3 rounded animate-pulse"></div>
                    </p>
                    <p className="z-[10] flex items-center">
                        <strong>Contact no :</strong>
                        <div className="ml-1 bg-gray-200 w-1/3 h-3 rounded animate-pulse"></div>
                    </p>
                    <p className="z-[10] flex items-center">
                        <strong>Account Type :</strong>
                        <div className="ml-1 bg-gray-200 w-1/5 h-3 rounded animate-pulse"></div>
                    </p>
                    <p className="z-[10] mt-3 flex flex-col sm:flex-row gap-2 w-full">
                        <button
                            disabled
                            className="animate-bounce disabled:bg-stone-800 btn btn-sm rounded-xl bg-stone-700 w-full sm:w-auto"
                        >
                            Update Profile Info
                        </button>
                        <button
                            disabled
                            className="animate-bounce disabled:bg-stone-800 btn btn-sm rounded-xl bg-stone-700 w-full sm:w-auto"
                        >
                            Change Password
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SklMyProfile;
