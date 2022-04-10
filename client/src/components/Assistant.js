// todo
import { save } from "save-file";
import CardDrawer from "./CardDrawer";
import React, { useEffect, useRef } from "react";
import HotTags from "./HotTags";
import { useStorageContext } from "../my-hooks/StorageContext";

//?
async function lsSave(data) {
	try {
		await save(data, "ls.txt");
	} catch (err) {
		console.log(err);
	}
}

//?
async function setLs() {
	try {
		let response = await fetch("ls.txt");
		let result = await response.json();
		localStorage.setItem("cardsArr", JSON.stringify(result));
	} catch (err) {
		console.log(err);
	}
}

// todo
export default function Assistent() {
	//
	const [storage, toggle] = useStorageContext();
	const storageRef = useRef();
	storageRef.current = JSON.parse(localStorage.getItem("cardsArr"));

	//
	return (
		<>
			{/* <TempButton /> */}

			{/* 	<div>
				<button
					onClick={() => lsSave(localStorage.getItem("cardsArr"))}
				>
					export
				</button>
				<button onClick={() => setLs()}>import</button>
			</div> */}
			<div className="mb-4">
				<CardDrawer st={storageRef} />
			</div>

			{storageRef.current && <HotTags ls={storageRef.current} />}
		</>
	);
}
