import { toast } from "react-toastify";
import { commonToastConfig } from "./toastConfig";

export const showToastSuccess = (message: string) => {
    toast.success(message, {
        ...commonToastConfig,
        style: { ...commonToastConfig.style, color: 'var(--green)', fontWeight: 700 }
    })
}

export const showToastError = (message: string) => {
    toast.error(message, {
        ...commonToastConfig,
        style: { ...commonToastConfig.style, fontSize: '1.6rem', color: 'var(--red)', fontWeight: 700 }
    })
}

export const showToastInfo = (message: string) => {
    toast.info(message, {
        ...commonToastConfig,
        style: { ...commonToastConfig.style, fontSize: '1.6rem', color: 'var(--blue)', fontWeight: 700 }
    })
}