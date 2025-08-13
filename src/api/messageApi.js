// send a message
export const sendMessage = (message) => {
    fetch(`${import.meta.env.VITE_API_URL}/messages`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(message),
    })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.error(err));
};

// get messages
export const getMessages = async (userId) => {
    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/messages/${userId}`
    );
    const data = await response.json();
    return data;
};
