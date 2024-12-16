import { AppDispatch } from '../store'; // Adjust the path to your store file
import { updateTimer, setTimerRunning } from '../store/slices/userSlice'; // Adjust the path to your slice file

let countdownInterval: NodeJS.Timeout | null = null;

export const startCountdown = (startValue: number) => (dispatch: AppDispatch) => {
    if (countdownInterval !== null) {
        clearInterval(countdownInterval);
        countdownInterval = null;
    }

    dispatch(setTimerRunning(true));
    dispatch(updateTimer(startValue));

    let currentTime = startValue;

    countdownInterval = setInterval(() => {
        if (currentTime > 0) {
            currentTime -= 1;
            dispatch(updateTimer(currentTime));
        } else {
            if (countdownInterval !== null) {
                clearInterval(countdownInterval);
                countdownInterval = null;
            }
            dispatch(setTimerRunning(false));
        }
    }, 1000);
};