import { useEffect } from "react"

const useTitle = (title, location) => {
    useEffect(() => {
        if (location) {
            document.title = 'Mountain Bike Club'
        }
        else {
            document.title = `MTB Club ${title}`
        }
    }, [title, location])
};

export default useTitle;