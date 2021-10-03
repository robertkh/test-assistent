// todo
import { Divider, Tag } from "antd";
import { EditOutlined, FolderAddTwoTone } from "@ant-design/icons";
import { useState, useRef } from "react";
import { useStorageContext } from "../my-hooks/StorageContext";

//?
function magic(str) {
	let arr = str?.trim().replace(/ {2,}/, " ").split(" ");
	return arr?.map((el) => (
		<Tag key={el} color="cyan">
			#{el}
		</Tag>
	));
}

//?

// todo
export default function Mycards(props) {
	//
	const [editmode, setState] = useState(false);
	const formRef = useRef();
	const lsRef = useRef({ val: null, index: undefined });

	const [, /* storage */ toggle] = useStorageContext();

	//
	const { id } = props;

	//
	function submitHandler(e) {
		e.preventDefault();

		lsRef.current.val[lsRef.current.index].title =
			formRef.current.title.value.trim().replace(/ {2,}/, " ");
		lsRef.current.val[lsRef.current.index].href =
			formRef.current.href.value;
		lsRef.current.val[lsRef.current.index].img = formRef.current.img.value;

		localStorage.setItem("cardsArr", JSON.stringify(lsRef.current.val));

		// toggle();
		setState(false);
	}

	//
	function clickHandler(ind) {
		//
		lsRef.current.val = JSON.parse(localStorage.getItem("cardsArr"));

		lsRef.current.index = lsRef.current.val.findIndex(
			(el) => el.time === ind
		);

		console.log(lsRef.current.val, " ", lsRef.current.index);
		setState(true);
	}

	//
	return (
		<>
			{editmode ? (
				<form
					ref={formRef}
					onSubmit={submitHandler}
					className="border border-dark rounded p-2"
				>
					<div className="form-group my-3">
						<label htmlFor="title" className="text-primary">
							Վերնագիր:
						</label>
						<input
							type="text"
							className="form-control"
							defaultValue={
								lsRef.current.val[lsRef.current.index].title
							}
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
							defaultValue={
								lsRef.current.val[lsRef.current.index].href
							}
							name="href"
						/>
					</div>

					<div className="form-group my-3">
						<label htmlFor="img" className="text-primary">
							Ֆայլի անունը:
						</label>
						<input
							type="text"
							className="form-control"
							defaultValue={
								lsRef.current.val[lsRef.current.index].img
							}
							name="img"
						/>
					</div>
					<button
						type="submit"
						className="btn btn-primary btn-block btn-sm mt-3"
					>
						Պահպանել
					</button>
				</form>
			) : (
				<div className="border border-ligth rounded p-3 my-2">
					<p>
						{magic(props.title)}

						<EditOutlined
							style={{
								fontSize: "22px",
								color: "#08c",
								float: "right",
								cursor: "pointer",
							}}
							onClick={() => clickHandler(id)}
						/>
					</p>

					<p>
						<a href={props.href}>{props.href}</a>
					</p>

					<img
						src={`images/${props.img}`}
						className="w-100"
						alt="code"
					/>
				</div>
			)}
		</>
	);
}
