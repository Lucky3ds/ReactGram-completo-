//Redux
import {
    resetMessage
} from "../slices/photoSlice";

import { useDispatch } from "react-redux";

export const useResetMessage = () => {
    const dispatch= useDispatch()
    return () => {
        setTimeout(() => {
       dispatch(resetMessage())
        }, 2000)
    }


}