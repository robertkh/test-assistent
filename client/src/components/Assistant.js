// todo
import CardDrawer from "./CardDrawer";
import React, { useEffect, useRef } from "react";
import HotTags from "./HotTags";
import { useStorageContext } from "../my-hooks/StorageContext";
import TempButton from "./TempButton";

// todo
export default function Assistent() {
	//
	const [storage, toggle] = useStorageContext();
	const storageRef = useRef();
	storageRef.current = JSON.parse(localStorage.getItem("cardsArr"));

	//
	return (
		<>
			<TempButton />
			<div className="mb-4">
				<CardDrawer st={storageRef} />
			</div>

			{storageRef.current && <HotTags ls={storageRef.current} />}
		</>
	);
}
