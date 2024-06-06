import { StorageContext } from "@/context/StorageContext";
import { useContext } from "react";

export const useStorage = () => useContext(StorageContext)