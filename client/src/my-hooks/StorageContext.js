// todo
import React, { useContext } from "react";
import useStorage from "./useStorage";
const StorageContext = React.createContext();

// todo - 1
export function useStorageContext() {
	return useContext(StorageContext);
}

// todo - 2
export function StorageContextProvider({ children }) {
	//
	const [storage, toggleForSt] = useStorage();

	//
	return (
		<StorageContext.Provider value={[storage, toggleForSt]}>
			{children}
		</StorageContext.Provider>
	);
}
