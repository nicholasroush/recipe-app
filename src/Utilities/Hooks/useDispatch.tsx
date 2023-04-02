import { useDispatch } from "react-redux";
import { AppDispatch } from "../Store/Store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
