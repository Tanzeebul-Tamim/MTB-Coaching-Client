import { useEffect, useState } from "react";
import useTitle from "../../Helmet/useTitle";
import SectionTitle from "../../reusable/SectionTitle";
import InstructorsBanner from "./InstructorsBanner/InstructorsBanner";
import InstructorsTable from "./InstructorsTable/InstructorsTable";
import { getAllInstructors } from "../../api/api";
import { ScaleLoader } from "react-spinners";
import { BsSearch } from "react-icons/bs";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useRef } from "react";
import { getUserData } from "../../api/authApi";

const titleDescription =
  "Get to know our team of experienced and passionate mountain bike instructors. Our instructors are dedicated to sharing their expertise and guiding riders of all levels on exhilarating mountain biking adventures. Join us and learn from the best in the field as we navigate the thrilling world of mountain biking together.";

const Instructors = () => {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(5);
  const [search, setSearch] = useState("");
  const searchRef = useRef(null);
  const tableRef = useRef(null);
  useTitle("| Instructors");

  useEffect(() => {
    setLoading(true);
    getAllInstructors(visibleCount, search)
      .then((data) => {
        setInstructors(data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, [visibleCount, search]);

  useEffect(() => {
    if (instructors.length > 5) {
      scrollToBottom();
    }
  }, [instructors]);

  const handleSearch = () => {
    setSearch(searchRef.current.value);
  };

  getUserData();
  const handleLoadMore = () => {
    if (visibleCount % 5 == 0) {
      setVisibleCount((prevCount) => prevCount + 5);
    } else {
      setVisibleCount((prevCount) => prevCount + (visibleCount % 5));
    }
  };

  const scrollToBottom = () => {
    if (tableRef.current) {
      tableRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  if (loading) {
    return (
      <div>
        <InstructorsBanner />
        <div className="lg:px-10 pb-24 pt-16">
          <SectionTitle
            title1="Meet Our"
            title2="Expert Instructors"
            description={titleDescription}
          />
          <div className="relative flex justify-center mb-2">
            <input
              onChange={handleSearch}
              ref={searchRef}
              type="text"
              placeholder="Search by Instructor's Name"
              className="py-3 px-5 outline-none bg-base-200 description placeholder-white rounded-full w-1/3"
            />
            <button>
              <BsSearch
                style={{
                  color: "white",
                  position: "absolute",
                  top: "30%",
                  right: "35%",
                  fontSize: "20px",
                }}
              ></BsSearch>
            </button>
          </div>
          <div className="pt-10 flex justify-center pb-24">
            <ScaleLoader
              height={85}
              width={10}
              radius={8}
              margin={8}
              color="rgb(202 138 4)"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-24">
      <InstructorsBanner />
      <div className="lg:px-10 pt-16">
        <SectionTitle
          title1="Meet Our"
          title2="Expert Instructors"
          description={titleDescription}
        />
        <div className="relative flex justify-center mb-2">
          <input
            onChange={handleSearch}
            ref={searchRef}
            type="text"
            placeholder="Search by Instructor's Name"
            className="py-3 px-5 outline-none bg-base-200 description placeholder-white rounded-full w-1/3"
          />
          <button>
            <BsSearch
              style={{
                color: "white",
                position: "absolute",
                top: "30%",
                right: "35%",
                fontSize: "20px",
              }}
            ></BsSearch>
          </button>
        </div>
        <InstructorsTable tableRef={tableRef} instructors={instructors} />
        {instructors.length >= visibleCount && (
          <div className="flex justify-center">
            <button
              onClick={handleLoadMore}
              className="mt-10 btn btn-md text-lg rounded-full hover:bg-stone-700 bg-stone-800"
            >
              <BiDotsVerticalRounded />
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Instructors;
