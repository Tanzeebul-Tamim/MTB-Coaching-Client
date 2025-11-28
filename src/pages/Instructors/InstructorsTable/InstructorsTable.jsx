import ImageWithLoader from "../../../components/ui/ImageWithLoader";
import InstructorsTableHead from "./InstructorsTableHead";
import { Link } from "react-router-dom";

const InstructorsTable = ({
    instructors,
    tableRef,
    isSmallDevice,
    isLoggedIn,
    play,
}) => {
    const maxLength = isSmallDevice ? 25 : 50;

    return (
        <>
            {instructors?.length == 0 ? (
                <div className="lg:text-5xl text-2xl text-center flex justify-center py-28">
                    <h1>No results found for your search</h1>
                </div>
            ) : (
                <div ref={tableRef} className="overflow-x-auto table-wrapper">
                    <table className="table text-center description text-base-content lg:whitespace-normal whitespace-nowrap">
                        {/* head */}
                        <InstructorsTableHead />
                        <tbody className="lg:text-xl text-xs">
                            {instructors.map((instructor, index) => {
                                return (
                                    <tr key={instructor._id}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <Link
                                                to={`/instructors/${instructor._id}`}
                                            >
                                                <div className="avatar">
                                                    <div className="mask lg:mask-squircle mask-circle lg:w-24 lg:h-24">
                                                        <ImageWithLoader
                                                            src={
                                                                instructor.image
                                                            }
                                                            alt="Avatar Tailwind CSS Component"
                                                        />
                                                    </div>
                                                </div>
                                            </Link>
                                        </td>
                                        <td>
                                            <Link
                                                to={`/instructors/${instructor._id}`}
                                            >
                                                <div>
                                                    <div className="font-bold">
                                                        {instructor.name}
                                                    </div>
                                                </div>
                                            </Link>
                                            <span className="badge badge-ghost badge-md">
                                                <a
                                                    href={`mailto:${instructor.email}`}
                                                >
                                                    {instructor.email}
                                                </a>
                                            </span>
                                        </td>
                                        <td>
                                            <div>
                                                <div className="quote">
                                                    {instructor?.quote?.length >
                                                    maxLength
                                                        ? instructor.quote.slice(
                                                              0,
                                                              maxLength
                                                          ) + "..."
                                                        : instructor?.quote ||
                                                          ""}
                                                    {!instructor?.quote && "_"}
                                                </div>
                                            </div>
                                        </td>
                                        <td>{instructor?.classes?.length}</td>
                                        <td>
                                            <Link
                                                to={`/instructors/${instructor._id}`}
                                            >
                                                <button
                                                    onClick={() => {
                                                        if (!isLoggedIn) {
                                                            setTimeout(() => {
                                                                play("warning");
                                                            }, 500);
                                                            return;
                                                        }
                                                    }}
                                                    className="btn btn-sm lg:rounded-lg rounded-full hover:bg-base-300 bg-base-200 border-0 text-base-content hover:text-stone-300 dark:hover:text-stone-950 duration-300"
                                                >
                                                    {isSmallDevice ? (
                                                        <span className="text-[12px]">
                                                            View
                                                        </span>
                                                    ) : (
                                                        <>
                                                            See{" "}
                                                            {
                                                                instructor.name.split(
                                                                    " "
                                                                )[0]
                                                            }
                                                            &apos;s Courses
                                                        </>
                                                    )}
                                                </button>
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
};

export default InstructorsTable;
