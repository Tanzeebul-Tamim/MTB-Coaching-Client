// /* eslint-disable no-unused-vars */
import { Component } from "react";
import ReactHtmlParser from "react-html-parser";

let captcha_value = "";
let captcha_number = "";

let LoadCanvasTemplateNoReload_HTML =
    '<div><canvas id="canv"></canvas><div><a id="reload_href"  style="cursor: pointer; color: blue"></a></div></div>';

export const loadCaptchaEngine = (
    numberOfCharacters,
    backgroundColor = "white",
    fontColor = "black"
) => {
    let captchaValue = "";
    captcha_number = numberOfCharacters;
    
    const upperCaseCharSet = "ABDEFGHIJKLMNPQRTUY";
    const lowerCaseCharSet = "abdefghijkmnpqrtuy";
    const numberCharSet = "0123456789";
    const specialCharSet = "!@#$%&()+=[]{}:?";
    const charSet =
        upperCaseCharSet + lowerCaseCharSet + numberCharSet + specialCharSet;

    const length = parseInt(numberOfCharacters);

    let maxSpecialChars = 3;
    let specialCharCount = 0;

    for (let i = 0, n = charSet.length; i < length; ++i) {
        let char = charSet.charAt(Math.floor(Math.random() * n));
        if (specialCharSet.includes(char)) {
            if (specialCharCount >= maxSpecialChars) {
                // If limit reached, pick a non-special character
                let nonSpecialCharset = charSet
                    .split("")
                    .filter((c) => !specialCharSet.includes(c))
                    .join("");
                char = nonSpecialCharset.charAt(
                    Math.floor(Math.random() * nonSpecialCharset.length)
                );
            } else {
                specialCharCount++;
            }
        }
        captchaValue += char;
    }

    captcha_value = captchaValue;

    let canvas = document.getElementById("canv"),
        ctx = canvas.getContext("2d");

    // Calculate max font size for canvas height
    const maxFontSize = 30;
    const minFontSize = 18;
    // Adjust canvas width and height to fit all chars and effects
    ctx.canvas.width = parseInt(length) * (maxFontSize - 13); // more space per char
    ctx.canvas.height = maxFontSize + 5; // shorter height

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.textBaseline = "middle";
    ctx.font = `italic 20px Arial`;
    ctx.fillStyle = fontColor;

    // Draw each character with random font size, rotation, and improved spacing
    let baseX = 14; // starting x position
    let spacing = 12; // closer spacing between chars
    let currX = baseX;

    for (let i = 0; i < parseInt(length); i++) {
        let fontSize =
            Math.floor(Math.random() * (maxFontSize - minFontSize + 1)) +
            minFontSize;
        ctx.font = `bold ${fontSize}px 'Fira Mono', 'Consolas', 'Menlo', 'monospace'`;
        let angle = (Math.random() - 0.5) * 1.2;
        let yOffset = Math.floor(Math.random() * 12) - 5;
        ctx.save();
        ctx.translate(currX, ctx.canvas.height / 2 + yOffset);
        ctx.rotate(angle);
        ctx.fillText(captchaValue[i], 0, 0);
        ctx.restore();
        currX += spacing;
    }

    // Add random lines and dots as noise
    for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.strokeStyle = fontColor;
        ctx.globalAlpha = 0.25;
        ctx.lineWidth = Math.random() * 2 + 1;
        ctx.stroke();
        ctx.globalAlpha = 1.0;
    }

    for (let i = 0; i < 10; i++) {
        ctx.beginPath();
        let dotX = Math.random() * canvas.width;
        let dotY = Math.random() * canvas.height;
        ctx.arc(dotX, dotY, Math.random() * 2 + 1, 0, 2 * Math.PI);
        ctx.fillStyle = fontColor;
        ctx.globalAlpha = 0.3;
        ctx.fill();
        ctx.globalAlpha = 1.0;
    }

    document.getElementById("reload_href").onclick = function () {
        loadCaptchaEngine(captcha_number, backgroundColor, fontColor);
    };
};

export const validateCaptcha = (userValue, setSuccess, setError) => {
    if (userValue.length === captcha_number) {
        if (userValue === captcha_value) {
            setSuccess("Captcha Matched");
            setError("");
            return true;
        } else {
            setError("Invalid Captcha");
            setSuccess("");
            return false;
        }
    } else {
        setSuccess("");
        setError("");
        return false;
    }
};

export class LoadCanvasTemplateNoReload extends Component {
    render() {
        return ReactHtmlParser(LoadCanvasTemplateNoReload_HTML);
    }
}
