import { useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";

const Searchbar = ({
    items,
    searchableFields,
    isSmallDevice,
    setFilteredItems,
    paginatedItems,
    search,
    setSearch,
    placeholder,
}) => {
    const style = {
        position: "absolute",
        top: isSmallDevice ? "73.5%" : "30%",
        right: isSmallDevice ? "16%" : "35%",
        fontSize: isSmallDevice ? "15px" : "20px",
    };

    // Update filtered items when items or search changes
    useEffect(() => {
        if (search) {
            const lowerSearch = search.toLowerCase();
            setFilteredItems(
                items.filter((item) => {
                    return searchableFields.some(({ field, split }) => {
                        const fieldValue = item?.[field]?.toLowerCase();
                        if (!fieldValue) return false; // Skip if field is missing

                        if (split) {
                            const words = fieldValue.split(" ");
                            return words.some((word) =>
                                word.startsWith(lowerSearch)
                            );
                        } else {
                            return fieldValue.includes(lowerSearch);
                        }
                    });
                })
            );
        } else {
            setFilteredItems(paginatedItems);
        }
    }, [items, search, paginatedItems, setFilteredItems, searchableFields]);

    return (
        <div className="relative flex justify-center mb-2">
            <input
                onChange={(e) => {
                    setSearch(e.target.value);
                }}
                value={search}
                type="text"
                placeholder={placeholder}
                className="z-10 mt-[35%] mb-6 lg:mb-0 lg:mt-0 lg:py-3 lg:px-5 py-1 px-3 outline-none bg-base-200 description lg:placeholder:text-sm placeholder:text-xs placeholder-base-content rounded-full lg:w-1/3 w-3/4 bg-opacity-80"
            />
            <button onClick={search && (() => setSearch(""))}>
                {search ? (
                    <RxCross2
                        className="z-50 text-base-content"
                        style={style}
                    />
                ) : (
                    <BsSearch
                        className="z-50 text-base-content"
                        style={style}
                    ></BsSearch>
                )}
            </button>
        </div>
    );
};

export default Searchbar;
