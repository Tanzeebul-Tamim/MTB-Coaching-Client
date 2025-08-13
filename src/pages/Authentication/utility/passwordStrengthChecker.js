const passwordStrengthChecker = (e, setSuccess, setError) => {
    const { value: password } = e.target;

    let valid = false;
    let strength;

    const setStatusAndColor = (success, error, status) => {
        if (password) {
            setSuccess(success ? success : "");
            setError(error ? error : "");
            strength = status;
        } else {
            setError("");
            setSuccess("");
            strength = "";
        }
    };

    if (password.length < 6) {
        valid = false;
        setStatusAndColor(
            "",
            "Requires at least 6 characters",
            "Too Weak"
        );
    } else {
        if (/^\d+$/.test(password)) {
            valid = false;
            setStatusAndColor(
                "",
                "Requires at least one letter",
                "Weak"
            );
        } else if (!/(?=.*[A-Z])/.test(password)) {
            valid = false;
            setStatusAndColor(
                "",
                "Requires at least one uppercase letter",
                "Weak"
            );
        } else if (!/(?=.*\d)/.test(password)) {
            valid = false;
            setStatusAndColor(
                "",
                "Requires at least one digit",
                "Weak"
            );
        } else if (
            !/(?=.*[!@#$%^&*()_\-+={}[\]\\|:;"'<>,.?/~])/.test(password)
        ) {
            valid = false;
            setStatusAndColor(
                "",
                "Requires at least one special character",
                "Weak"
            );
        } else {
            valid = true;
            if (password.length >= 15) {
                setStatusAndColor("", "", "Very Strong");
            } else if (password.length >= 8) {
                setStatusAndColor("", "", "Strong");
            } else {
                setStatusAndColor("", "", "Fair");
            }
        }
    }

    return { strength, valid };
};

export default passwordStrengthChecker;
