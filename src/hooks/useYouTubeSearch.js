import { useEffect, useState } from "react";

const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const BASE_URL = "https://www.googleapis.com/youtube/v3/search";

const useYoutubeSearch = (query, maxResults = 8) => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                if (query) {
                    const res = await fetch(
                        `${BASE_URL}?part=snippet&q=${encodeURIComponent(
                            query
                        )}&type=video&maxResults=${maxResults}&key=${YOUTUBE_API_KEY}`
                    );
                    const data = await res.json();
                    setVideos(data.items || []);
                } else {
                    setVideos([]);
                }
            } catch (err) {
                console.error("Failed to fetch YouTube videos:", err);
            } finally {
                setTimeout(() => setLoading(false), 2000);
            }
        };

        fetchVideos();
    }, [query, maxResults]);

    return { videos, loading };
};

export default useYoutubeSearch;
