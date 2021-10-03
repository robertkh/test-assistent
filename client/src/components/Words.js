// todo
import React, { useState, useEffect } from "react";
import { useRef } from "react/cjs/react.development";
import openNotification from "./notification";
import useSound from "use-sound";
import sound from "./ns.mp3";

// todo
export default function Words() {
	const [val, setV] = useState("");
	const lsRef = useRef({ words: [] });
	const [play] = useSound(sound);

	useEffect(() => {
		if (localStorage.getItem("keywords")) {
			lsRef.current.words = JSON.parse(localStorage.getItem("keywords"));
		} else {
			localStorage.setItem("keywords", JSON.stringify([]));
		}
	}, []);

	//
	useEffect(() => {
		if (lsRef.current.words.length === 0) {
			openNotification("datark a", "robert", 0);
		}
		// console.log(lsRef.current.words);

		let id = setInterval(() => {
			lsRef.current.words.forEach((el, index) => {
				//
				if (+Date.now() > +el.t[0]) {
					play();
					openNotification(
						`${el.w.split("-")[0]} - (#${12 - el.t.length})`,
						// moment(arr[0]).format("LLL"),
						`${el.w.split("-")[1]}`,
						0
					);

					el.t.shift();
				}
			});
			localStorage.setItem(
				"keywords",
				JSON.stringify(lsRef.current.words)
			);
		}, 5000);

		return () => clearInterval(id);
	}, [play]);

	//
	function handleChange(e) {
		setV(e.target.value);
	}

	//
	function handleSubmit(e) {
		let arr = new Array(7);
		let now = Date.now();
		arr[0] = now + 5 * 1000;
		arr[1] = now + 25 * 1000;
		arr[2] = now + 120 * 1000;
		arr[3] = now + 600 * 1000;
		arr[4] = now + 3600 * 1000;
		arr[5] = now + 5 * 3600 * 1000;
		arr[6] = now + 24 * 3600 * 1000;
		arr[7] = now + 5 * 24 * 3600 * 1000;
		arr[8] = now + 25 * 24 * 3600 * 1000;
		arr[9] = now + 60 * 24 * 3600 * 1000;
		arr[10] = now + 365 * 24 * 3600 * 1000;

		lsRef.current.words.push({ w: val, t: arr });
		localStorage.setItem("keywords", JSON.stringify(lsRef.current.words));

		setV("");
		e.preventDefault();
	}

	//
	return (
		<>
			<form onSubmit={handleSubmit}>
				<label>
					Բառը:
					<input type="text" value={val} onChange={handleChange} />
				</label>
				<input type="submit" value="Ավելացնել" />
			</form>
		</>
	);
}
