// todo
import React, { useState, useRef, useEffect } from "react";
import { Button, Drawer } from "antd";
import { useStorageContext } from "../my-hooks/StorageContext";

// todo
function CardDrawer(props) {
	const [state, setState] = useState(false);
	const formRef = useRef();
	const [, /* storage */ toggle] = useStorageContext();

	//
	useEffect(() => {
		const ls = localStorage.getItem("cardsArr");

		if (ls) {
			props.st.current = JSON.parse(ls);
		} else {
			props.st.current = [];
			localStorage.setItem("cardsArr", JSON.stringify([]));
		}
		toggle();
	}, []);

	//
	function showDrawer() {
		setState(true);
	}

	//
	function onClose() {
		setState(false);
	}

	//
	function reset() {
		formRef.current.elements[0].value = "";
		formRef.current.elements[1].value = "";
		formRef.current.elements[2].value = "";
	}

	//
	function submitHandler(e) {
		e.preventDefault();

		props.st.current.push({
			title: formRef.current.elements[0].value,
			href: formRef.current.elements[1].value,
			img: formRef.current.elements[2].value,
			time: Date.now(),
		});

		localStorage.setItem("cardsArr", JSON.stringify(props.st.current));

		reset();
		toggle();
	}

	//
	return (
		<div className="mb-4">
			<Button
				type="primary"
				onClick={showDrawer}
				block
				className="mt-3 rounded"
			>
				Ստեղծել նոր փոստ
			</Button>

			<Drawer
				title="Ավելացնել նոր թեմա"
				width={720}
				onClose={onClose}
				visible={state}
				bodyStyle={{ paddingBottom: 80 }}
			>
				<form ref={formRef} onSubmit={submitHandler}>
					<div className="form-group my-3">
						<label htmlFor="title" className="text-primary">
							Վերնագիր:
						</label>
						<input
							type="text"
							className="form-control"
							placeholder="Վերնագրով փնտրում ենք նյութը․․․"
							name="title"
						/>
					</div>
					<div className="form-group my-3">
						<label htmlFor="href" className="text-primary">
							Հղում:
						</label>
						<input
							type="text"
							className="form-control"
							placeholder="Այստեղ նյութի ինտերնետային հասցեն․․․"
							name="href"
						/>
					</div>
					{/* <div className="form-group my3">
						<label htmlFor="snippet" className="text-primary">
							Նկարագրություն:
						</label>
						<textarea
							className="form-control"
							rows="5"
							id="snippet"
						></textarea>
					</div> */}
					<div className="form-group my-3">
						<label htmlFor="img" className="text-primary">
							Ֆայլի անունը:
						</label>
						<input
							type="text"
							className="form-control"
							placeholder="Այստեղ նյութի ինտերնետային հասցեն․․․"
							name="img"
						/>
					</div>

					<button
						type="submit"
						onClick={onClose}
						className="btn btn-primary btn-block btn-sm mt-3"
					>
						Հաստատել
					</button>
				</form>
			</Drawer>
		</div>
	);
}

// todo
export default CardDrawer;
