// todo
import { BackTop, Tag } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useState, useRef, useEffect } from "react";
import { useStorageContext } from "../my-hooks/StorageContext"; //
//
import moment from "moment";
import "moment/min/locales";
moment.locale("hy-am");
//

//?
function magic(str) {
	let arr = str?.trim().replace(/ {2,}/, " ").split(" ");
	return arr?.map((el) => (
		<Tag key={el} color="cyan">
			#{el}
		</Tag>
	));
}

// todo
export default function Mycards(props) {
	//
	const [editmode, setState] = useState(false);
	const formRef = useRef();
	const lsRef = useRef({ val: null, index: undefined });

	const [, /* storage */ toggle] = useStorageContext();

	//
	const { id } = props;

	console.log("mycard effect");

	//
	function submitHandler(e) {
		e.preventDefault();

		lsRef.current.val[lsRef.current.index].title =
			formRef.current.title.value.trim().replace(/ {2,}/, " ");
		lsRef.current.val[lsRef.current.index].href =
			formRef.current.href.value;
		lsRef.current.val[lsRef.current.index].img = formRef.current.img.value;

		localStorage.setItem("cardsArr", JSON.stringify(lsRef.current.val));

		toggle();
		setState(false);
	}

	//
	function clickHandler(ind) {
		//
		lsRef.current.val = JSON.parse(localStorage.getItem("cardsArr"));

		lsRef.current.index = lsRef.current.val.findIndex(
			(el) => el.time === ind
		);

		setState(true);
	}

	//
	function delHandler(id) {
		let answer = window.confirm("Իրո՞ք ցանկանում եք փոստը հեռացնել։");
		if (!answer) {
			return;
		}
		lsRef.current.val = JSON.parse(localStorage.getItem("cardsArr"));
		lsRef.current.index = lsRef.current.val.findIndex(
			(el) => el.time === id
		);
		lsRef.current.val.splice(lsRef.current.index, 1);
		localStorage.setItem("cardsArr", JSON.stringify(lsRef.current.val));

		toggle();
	}

	//
	return (
		<>
			<BackTop duration={50} />

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
						{magic(props.title)}{" "}
						<Tag color="magenta">
							{moment(props.id).format("L")}
						</Tag>
						<DeleteOutlined
							style={{
								fontSize: "21px",
								color: "#08c",
								float: "right",
								cursor: "pointer",
								marginLeft: "20px",
							}}
							onClick={() => delHandler(id)}
						/>
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
						<a href={props.href} target="_blank">
							{props.href}
						</a>
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
