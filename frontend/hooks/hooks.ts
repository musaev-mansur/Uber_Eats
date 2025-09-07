import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/store/store";
import type { ThunkDispatch } from "@reduxjs/toolkit";

export const useAppDispatch = () => useDispatch<ThunkDispatch<RootState, unknown, any>>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
