import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { StorageContextProvider } from "./my-hooks/StorageContext";

ReactDOM.render(
	<React.StrictMode>
		<StorageContextProvider>
			<App className="w-50" />
		</StorageContextProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
