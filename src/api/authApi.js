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
export const saveUserViaSocial = (user, toast) => {
    const providerData =
        user.providerData && user.providerData[0] ? user.providerData[0] : {};
    let currentUser = {
        name: user.displayName || providerData.displayName,
        image: user.photoURL || providerData.photoURL,
        email: user.email || providerData.email,
    };

    getUserData(currentUser.email).then((userDetails) => {
        const { name } = currentUser;
        const firstName = name?.split(" ")[0];
        const properCasedName =
            firstName.charAt(0).toUpperCase() +
            firstName.slice(1).toLowerCase();

        toast(userDetails, properCasedName);

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
export const saveInstructorViaSocial = async (user, toast) => {
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
    const firstName = name?.split(" ")[0];
    const properCasedName =
        firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();

    toast(properCasedName);

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
export const saveStudentViaSocial = async (user, toast) => {
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

    const { name } = currentUser;
    const firstName = name?.split(" ")[0];
    const properCasedName =
        firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();

    toast(properCasedName);

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
