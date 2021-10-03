// todo
import { useState } from "react";

// todo
export default function useStorage() {
	const [storage, setState] = useState(false);

	//
	function toggleStorage() {
		setState(!storage);
	}

	//
	return [storage, toggleStorage];
}
