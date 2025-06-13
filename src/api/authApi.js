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
export const saveUserViaSocial = async (user) => {
    const providerData =
        user.providerData && user.providerData[0] ? user.providerData[0] : {};
    let currentUser = {
        name: user.displayName || providerData.displayName,
        image: user.photoURL || providerData.photoURL,
        email: user.email || providerData.email,
    };

    getUserData(currentUser.email).then((userDetails) => {
        if (userDetails.role == "Instructor") {
            currentUser = {
                ...userDetails,
                role: "Instructor",
            };
        } else if (userDetails.role == "Student" || !userDetails.role) {
            currentUser = {
                ...userDetails,
                role: "Student",
            };
        }
        // Always preserve any new/updated fields from the input user object
        currentUser = { ...currentUser, ...user };

        fetch(`${import.meta.env.VITE_API_URL}/users/${currentUser.email}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(currentUser),
        })
            .then((res) => res.json())
            .then((data) => console.log(data))
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
    const providerData =
        user.providerData && user.providerData[0] ? user.providerData[0] : {};
    let currentUser = {
        name: user.displayName || providerData.displayName,
        image: user.photoURL || providerData.photoURL,
        email: user.email || providerData.email,
        role: "Instructor",
    };

    getUserData(currentUser.email).then((userDetails) => {
        if (userDetails.role == "Instructor") {
            currentUser = {
                ...userDetails,
                role: "Instructor",
            };
        } else if (userDetails.role == "Student" || !userDetails.role) {
            currentUser = {
                ...userDetails,
                role: "Student",
            };
        }
        // Always preserve any new/updated fields from the input user object
        currentUser = { ...currentUser, ...user };

        fetch(`${import.meta.env.VITE_API_URL}/users/${currentUser.email}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(currentUser),
        })
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch((err) => console.error(err));
    });
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
    const providerData =
        user.providerData && user.providerData[0] ? user.providerData[0] : {};
    let currentUser = {
        name: user.displayName || providerData.displayName,
        image: user.photoURL || providerData.photoURL,
        email: user.email || providerData.email,
        role: "Student",
    };

    getUserData(currentUser.email).then((userDetails) => {
        if (userDetails.role == "Instructor") {
            currentUser = {
                ...userDetails,
                role: "Instructor",
            };
        } else if (userDetails.role == "Student" || !userDetails.role) {
            currentUser = {
                ...userDetails,
                role: "Student",
            };
        }
        // Always preserve any new/updated fields from the input user object
        currentUser = { ...currentUser, ...user };

        fetch(`${import.meta.env.VITE_API_URL}/users/${currentUser.email}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(currentUser),
        })
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch((err) => console.error(err));
    });
};

// get user profile
export const getUserData = async (email) => {
    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/${email}`
    );
    const data = await response.json();
    return data;
};
