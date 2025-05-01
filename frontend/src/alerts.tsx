import { toast } from "react-toastify";
import { Slide, Zoom, Flip, Bounce } from "react-toastify";

const timer = 8000;

export function msgError(text: string) {
  toast.error(text, {
    position: "top-right",
    autoClose: timer,
    transition: Flip,
  });
}

export function msgSuccess(text: string) {
  toast.success(text, {
    position: "top-right",
    autoClose: timer,
    transition: Flip,
  });
}

export function msgInfo(text: string) {
  toast.info(text, {
    position: "top-right",
    autoClose: timer,
    transition: Flip,
  });
}

export function msgDark(text: string) {
  toast.dark("Hey 👋!", {
    position: "top-right",
    autoClose: timer,
    transition: Flip,
  });
}
export function msgWarn(text: string) {
  toast.warn(text, {
    position: "top-right",
    autoClose: timer,
    transition: Flip,
  });
}
export function msgLoading(text: string) {
  toast.loading(text, {
    position: "top-right",
    autoClose: timer,
    transition: Flip
  });
}

// para usar
// importar => import { ToastContainer } from 'react-toastify';
// usar no codigo => <ToastContainer /> ou <ToastContainer stacked/>
