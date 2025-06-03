import { useEffect } from "react"

const useTitle = (title, location) => {
    useEffect(() => {
        if (location) {
            document.title = 'MTB Coaching Network'
        }
        else {
            document.title = `MTB ${title}`
        }
    }, [title, location])
};

export default useTitle;