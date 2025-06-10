import ImageWithLoader from "../../../reusable/ImageWithLoader";
import InstructorsTableHead from "./InstructorsTableHead";
import { Link } from "react-router-dom";

const InstructorsTable = ({ instructors, tableRef, isSmallDevice }) => {
    const maxLength = isSmallDevice ? 25 : 50;

    return (
        <>
            {instructors.length == 0 ? (
                <div className="lg:text-5xl text-2xl text-center flex justify-center py-28">
                    <h1>No results found for your search</h1>
                </div>
            ) : (
                <div ref={tableRef} className="overflow-x-auto">
                    <table className="table text-center description text-white lg:whitespace-normal whitespace-nowrap">
                        {/* head */}
                        <InstructorsTableHead />
                        <tbody className="lg:text-xl text-xs">
                            {instructors.map((instructor, index) => {
                                return (
                                    <tr key={instructor._id}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <div className="avatar">
                                                <div className="mask lg:mask-squircle mask-circle lg:w-24 lg:h-24">
                                                    <ImageWithLoader
                                                        src={instructor.image}
                                                        alt="Avatar Tailwind CSS Component"
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div>
                                                <div className="font-bold">
                                                    {instructor.name}
                                                </div>
                                            </div>
                                            <span className="badge badge-ghost badge-md text-white">
                                                {instructor.email}
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
                                                </div>
                                            </div>
                                        </td>
                                        <td>{instructor?.classes?.length}</td>
                                        <td>
                                            <Link
                                                to={`/instructors/${instructor._id}`}
                                                className="btn text-white btn-sm lg:rounded-lg rounded-full hover:bg-stone-700 bg-stone-800"
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
