const passwordStrengthChecker = (e, setSuccess, setError) => {
    const { value: password } = e.target;

    let valid = false;
    let strength;
    let color;

    const setStatusAndColor = (success, error, status, colorClass) => {
        if (password) {
            setSuccess(success ? success : "");
            setError(error ? error : "");
            strength = status;
            color = "text-" + colorClass;
        } else {
            setError("");
            setSuccess("");
            strength = "";
            color = "";
        }
    };

    if (password.length < 6) {
        valid = false;
        setStatusAndColor(
            "",
            "Password must be at least 6 characters long!",
            "Too Weak",
            "red-600"
        );
    } else {
        if (/^\d+$/.test(password)) {
            valid = false;
            setStatusAndColor(
                "",
                "Password must contain at least one letter",
                "Weak",
                "orange-500"
            );
        } else if (!/(?=.*[A-Z])/.test(password)) {
            valid = false;
            setStatusAndColor(
                "",
                "Password must contain at least one uppercase letter",
                "Weak",
                "orange-500"
            );
        } else if (!/(?=.*\d)/.test(password)) {
            valid = false;
            setStatusAndColor(
                "",
                "Password must contain at least one digit",
                "Weak",
                "orange-500"
            );
        } else if (
            !/(?=.*[!@#$%^&*()_\-+={}[\]\\|:;"'<>,.?/~])/.test(password)
        ) {
            valid = false;
            setStatusAndColor(
                "",
                "Password must contain at least one special character",
                "Weak",
                "orange-500"
            );
        } else {
            valid = true;
            if (password.length >= 15) {
                setStatusAndColor("", "", "Very Strong", "green-500");
            } else if (password.length >= 8) {
                setStatusAndColor("", "", "Strong", "lime-500");
            } else {
                setStatusAndColor("", "", "Fair", "lime-300");
            }
        }
    }

    return { strength, color, valid };
};

export default passwordStrengthChecker;
