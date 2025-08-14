// /* eslint-disable no-unused-vars */
import { Component } from "react";
import parse from "html-react-parser";

let captcha_value = "";
let captcha_length = "";

let LoadCanvasTemplateNoReload_HTML =
    '<div><canvas id="canv"></canvas><div><a style="cursor: pointer; color: blue"></a></div></div>';

// Generate the captcha value
export const generateCaptchaText = (length) => {
    let captchaValue = "";
    captcha_length = parseInt(length);

    const upperCaseCharSet = "ABDEFGHIJKLMNPQRTUY";
    const lowerCaseCharSet = "abdefghijkmnpqrtuy";
    const numberCharSet = "0123456789";
    const specialCharSet = "!@#$%&={}?";
    const charSet =
        upperCaseCharSet + lowerCaseCharSet + numberCharSet + specialCharSet;

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

    return captchaValue;
};

// Precompute layout data
export const generateCaptchaDrawingData = (captchaValue) => {
    let drawingData = [];
    let lineData = [];
    let dotData = [];

    // Maximum and minimum font size
    const maxFontSize = 30;
    const minFontSize = 18;
    const spacing = 12; // space between characters
    let currX = 14; // starting x position

    // calculate height and width
    const height = maxFontSize + 5;
    const width = captcha_length * (maxFontSize - 13);

    // calculate font size, angle, y-offset and starting position for each characters
    for (let i = 0; i < captcha_length; i++) {
        const fontSize =
            Math.floor(Math.random() * (maxFontSize - minFontSize + 1)) +
            minFontSize;
        const angle = (Math.random() - 0.5) * 1.2;
        const yOffset = Math.floor(Math.random() * 12) - 5;

        drawingData.push({
            char: captchaValue[i],
            x: currX,
            fontSize,
            angle,
            yOffset,
        });

        currX += spacing;
    }

    // calculate data for random lines
    for (let i = 0; i < 4; i++) {
        const moveTo = { x: Math.random() * width, y: Math.random() * height };
        const lineTo = { x: Math.random() * width, y: Math.random() * height };
        const lineWidth = Math.random() * 2 + 1;

        lineData.push({ moveTo, lineTo, lineWidth });
    }

    // calculate data for random dots
    for (let i = 0; i < 10; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const radius = Math.random() * 2 + 1;

        dotData.push({ x, y, radius });
    }

    const captchaData = { drawingData, lineData, dotData };

    // Adjust canvas width and height to fit all chars and effects
    return { captchaData, height, width };
};

// Use consistent data for drawing
export const drawCaptchaWithData = (canvas, data, bgColor, fontColor) => {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const { captchaData, width, height } = data;
    const { drawingData, lineData, dotData } = captchaData;

    ctx.canvas.width = width;
    ctx.canvas.height = height;

    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);

    ctx.textBaseline = "middle";
    ctx.fillStyle = fontColor;

    // Draw each character with the precalculated random font size, rotation, and improved spacing
    drawingData.forEach(({ char, x, fontSize, angle, yOffset }) => {
        ctx.save();
        ctx.translate(x, height / 2 + yOffset);
        ctx.rotate(angle);
        ctx.font = `bold ${fontSize}px 'Fira Mono', 'Consolas', 'Menlo', 'monospace'`;
        ctx.fillText(char, 0, 0);
        ctx.restore();
    });

    // Add random lines as noise
    lineData.forEach(({ moveTo, lineTo, lineWidth }) => {
        ctx.beginPath();
        ctx.moveTo(moveTo.x, moveTo.y);
        ctx.lineTo(lineTo.x, lineTo.y);
        ctx.strokeStyle = fontColor;
        ctx.globalAlpha = 0.25;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
        ctx.globalAlpha = 1.0;
    });

    // Add random dots as noise
    dotData.forEach(({ x, y, radius }) => {
        ctx.beginPath();
        // parameters: width (x), height (y), radius, start angle, end angle (360deg here)
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fillStyle = fontColor;
        ctx.globalAlpha = 0.3;
        ctx.fill();
        ctx.globalAlpha = 1.0;
    });
};

// Validating user input
export const validateCaptcha = (userValue, setSuccess, setError) => {
    if (userValue) {
        if (userValue.length === captcha_length) {
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
    } else {
        return false;
    }
};

export class LoadCanvasTemplateNoReload extends Component {
    render() {
        return parse(LoadCanvasTemplateNoReload_HTML);
    }
}
