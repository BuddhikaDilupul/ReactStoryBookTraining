import { useDispatch } from "react-redux";
import { clearAlert, setAlert } from "./app/features/AlertStatus";
import { AppDispatch } from "./app/store";

export function useAlert() {
    const dispatch: AppDispatch = useDispatch();

    const handleSetAlert = (text: string, variant: string) => {
        dispatch(setAlert({ text, variant }));
    };
    const handleSetServerErrorAlert = () => {
        const text = "An error occurred while saving data. Please try again.";
        const variant = "warning"
        dispatch(setAlert({ text, variant }));
    };

    const handleClearAlert = () => {
        dispatch(clearAlert());
    };

    return { handleSetAlert, handleClearAlert, handleSetServerErrorAlert };
}
