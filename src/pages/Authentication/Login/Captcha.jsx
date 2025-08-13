const Captcha = (
    captchaLength,
    captchaChars,
    handleCaptchaChange,
    captchaRef,
    idx
) => {
    return (
        <input
            key={idx}
            type="text"
            inputMode="text"
            maxLength={1}
            required
            value={captchaChars[idx]}
            className="lg:w-12 w-11 h-10 text-center input input-bordered bg-stone-300 dark:bg-stone-800 border-0 focus:outline-secondary"
            onChange={(e) => {
                if (e.target.value && idx < captchaLength - 1) {
                    const next = document.getElementById(
                        `captcha-char-${idx + 1}`
                    );
                    if (next) next.focus();
                }
                handleCaptchaChange(idx, e.target.value);
            }}
            onKeyDown={(e) => {
                // Backspace: move to previous field if empty
                if (e.key === "Backspace" && !e.target.value && idx > 0) {
                    const prev = document.getElementById(
                        `captcha-char-${idx - 1}`
                    );
                    if (prev) prev.focus();
                }
                // ArrowRight: move to next field
                if (
                    (e.key === "ArrowRight" || e.key === "Right") &&
                    idx < captchaLength - 1
                ) {
                    const next = document.getElementById(
                        `captcha-char-${idx + 1}`
                    );
                    if (next) next.focus();
                }
                // ArrowLeft: move to previous field
                if ((e.key === "ArrowLeft" || e.key === "Left") && idx > 0) {
                    const prev = document.getElementById(
                        `captcha-char-${idx - 1}`
                    );
                    if (prev) prev.focus();
                }
            }}
            id={`captcha-char-${idx}`}
            ref={idx === 0 ? captchaRef : undefined}
            name={`captcha-${idx}`}
            autoComplete="off"
        />
    );
};

export default Captcha;
