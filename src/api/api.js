// instructors api's------------------------------------
// get all instructors
export const getAllInstructors = async (count, search) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/instructors?count=${count}&search=${search}`);
    const data = await response.json();
    return data;
}

// get top instructors & get instructors with total students
export const getTopInstructors = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/instructors/top`);
    const data = await response.json();
    return data;
}

// get total instructors
export const getTotalInstructors = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/instructors/total`);
    const data = await response.json();
    return data;
}


// classes api's--------------------------------------
// get all classes
export const getAllClasses = async (count, search) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/classes?count=${count}&search=${search}`);
    const data = await response.json();
    return data;
}

// get top classes
export const getTopClasses = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/classes/top`);
    const data = await response.json();
    return data;
}

// get total classes
export const getTotalClasses = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/classes/total`);
    const data = await response.json();
    return data;
}