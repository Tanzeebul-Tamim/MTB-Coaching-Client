import { useCallback } from "react";
import useSound from "use-sound";

// Import sounds
import success from "/assets/sounds/success.wav";
import captcha from "/assets/sounds/captcha-matched.wav";
import message from "/assets/sounds/message-sent.wav";
import alert from "/assets/sounds/alert.mp3";
import warning from "/assets/sounds/warning.wav";

export default function useSoundEffects() {
    // Initialize sound players
    const [playSuccess] = useSound(success, { volume: 0.5 });
    const [playCaptcha] = useSound(captcha, { volume: 0.3 });
    const [playMessage] = useSound(message, { volume: 0.5 });
    const [playAlert] = useSound(alert, { volume: 0.5 });
    const [playWarning] = useSound(warning, { volume: 0.7 });

    // Expose a function to play any sound
    const play = useCallback(
        (type) => {
            switch (type) {
                case "success":
                    playSuccess();
                    break;
                case "captcha":
                    playCaptcha();
                    break;
                case "message":
                    playMessage();
                    break;
                case "alert":
                    playAlert();
                    break;
                case "warning":
                    playWarning();
                    break;
                default:
                    console.warn(`Sound type "${type}" not found`);
            }
        },
        [playSuccess, playCaptcha, playMessage, playAlert, playWarning]
    );

    return { play };
}
