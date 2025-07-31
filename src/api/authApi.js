import { Flip, toast } from "react-toastify";

// toast config
const config = {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    transition: Flip,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
};

// save a user to database
export const saveUser = (user) => {
    const currentUser = {
        ...user,
    };

    fetch(`${import.meta.env.VITE_API_URL}/users/${user?.email}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(currentUser),
    })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.error(err));
};

// save a user to database via social login
export const saveUserViaSocial = (user) => {
    const providerData =
        user.providerData && user.providerData[0] ? user.providerData[0] : {};
    let currentUser = {
        name: user.displayName || providerData.displayName,
        image: user.photoURL || providerData.photoURL,
        email: user.email || providerData.email,
    };

    getUserData(currentUser.email).then((userDetails) => {
        let { name } = userDetails;
        name = name?.split(" ")[0];
        const message = `Welcome ${name}! You're logged-in as ${
            userDetails?.role === "Instructor" ? "an instructor" : "a student"
        }`;
        toast.success(message, config);

        currentUser = {
            ...currentUser,
            ...userDetails,
            ...user,
            role: userDetails?.role === "Instructor" ? "Instructor" : "Student",
        };

        fetch(`${import.meta.env.VITE_API_URL}/users/${currentUser.email}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(currentUser),
        })
            .then((res) => res.json())
            .then((data) => console.log("Response:", data))
            .catch((err) => console.error(err));
    });
};

// save an instructor to database
export const saveInstructor = (user) => {
    const currentUser = {
        ...user,
        role: "Instructor",
    };

    fetch(`${import.meta.env.VITE_API_URL}/users/${user?.email}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(currentUser),
    })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.error(err));
};

// save an instructor to database via social login
export const saveInstructorViaSocial = async (user) => {
    const providerData = user.providerData?.[0] || {};
    let currentUser = {
        name: user.displayName || providerData.displayName,
        image: user.photoURL || providerData.photoURL,
        email: user.email || providerData.email,
    };

    const userDetails = await getUserData(currentUser.email);

    if (userDetails) {
        const err = new Error(
            "You already have an account. Please log in instead."
        );
        throw err;
    }

    let { name } = currentUser;
    name = name?.split(" ")[0];
    const message = `Welcome ${name}! You're logged-in as an instructor`;
    toast.success(message, config);

    currentUser = {
        ...currentUser,
        ...userDetails,
        ...user,
        role: "Instructor",
    };

    try {
        const res = await fetch(
            `${import.meta.env.VITE_API_URL}/users/${currentUser.email}`,
            {
                method: "PUT",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(currentUser),
            }
        );
        const data = await res.json();
        console.log(data);
    } catch (err) {
        console.error(err);
    }
};

// save an student to database
export const saveStudent = (user) => {
    const currentUser = {
        ...user,
        role: "Student",
    };

    fetch(`${import.meta.env.VITE_API_URL}/users/${user?.email}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(currentUser),
    })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.error(err));
};

// save an student to database via social login
export const saveStudentViaSocial = async (user) => {
    const providerData = user.providerData?.[0] || {};
    let currentUser = {
        name: user.displayName || providerData.displayName,
        image: user.photoURL || providerData.photoURL,
        email: user.email || providerData.email,
    };

    const userDetails = await getUserData(currentUser.email);

    if (userDetails) {
        const err = new Error(
            "You already have an account. Please log in instead."
        );
        throw err;
    }

    let { name } = currentUser;
    name = name?.split(" ")[0];
    const message = `Welcome ${name}! You're logged-in as a student`;
    toast.success(message, config);

    currentUser = {
        ...currentUser,
        ...userDetails,
        ...user,
        role: "Student",
    };

    try {
        const res = await fetch(
            `${import.meta.env.VITE_API_URL}/users/${currentUser.email}`,
            {
                method: "PUT",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(currentUser),
            }
        );
        const data = await res.json();
        console.log(data);
    } catch (err) {
        console.error(err);
    }
};

// get user profile
export const getUserData = async (email) => {
    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/${email}`
    );

    if (!response.ok) {
        throw new Error(`Failed to fetch user. Status: ${response.status}`);
    }

    return await response.json();
};
