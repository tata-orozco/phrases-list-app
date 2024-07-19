import { Bounce, ToastOptions } from "react-toastify";

export const commonToastConfig: ToastOptions = {
        position: "top-left",
        autoClose: 999,
        hideProgressBar: true,
        closeOnClick: true,
        closeButton: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        style: {
            width: '300px',
            fontSize: '1.4rem',
            borderRadius: '.5rem',
            top: '8rem'
        }
}