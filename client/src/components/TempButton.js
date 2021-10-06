import { useEffect, useState } from "react";
import { useStorageContext } from "../my-hooks/StorageContext";

// todo
export default function StrButtons() {
	//
	const [is, setIs] = useState();
	const [storage, setStorage] = useState();
	const [st, toggle] = useStorageContext();

	//
	const getLocalData = () => {
		fetch("example.txt", {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		})
			.then(function (response) {
				return response.json();
			})
			.then(function (myJson) {
				setStorage(myJson);
			});
	};

	//
	useEffect(() => {
		if (localStorage.getItem("cardsArr")) {
			setIs(false);
		} else {
			setIs(true);
		}

		getLocalData();
	}, []);

	function clickHandler() {
		if (is) {
			localStorage.setItem("cardsArr", JSON.stringify(storage));
		} else {
			// localStorage.removeItem("cardsArr");
			localStorage.setItem("cardsArr", JSON.stringify([]));
		}
		setIs((pr) => !pr);
		toggle();
	}

	return (
		<button
			type="button"
			className="btn btn-primary btn-block"
			onClick={clickHandler}
		>
			{!is
				? "Հեռացնել ուսուցողական տվյալները։"
				: "Տեղադրել ուսուցողական տվյալները։"}
		</button>
	);
}
