// todo
import React, { useState, useEffect } from "react";
import { DatePicker, Space } from "antd";
import openNotification from "./notification";
import { ListGroup, ListGroupItem } from "reactstrap";
import { MdClose } from "react-icons/md";
import useSound from "use-sound";
import sound from "./ns.mp3";
//
import moment from "moment";
import "moment/min/locales";
moment.locale("hy-am");
//

// todo
function ListMaker({ customTimesArr, onDelete }) {
	return (
		<>
			<div className="my-4" style={{ textAlign: "center" }}>
				<h6>Ձեր ընտրած ժամանակները։</h6>
			</div>

			<ListGroup>
				{customTimesArr.map((item) => (
					<ListItem key={item} el={item} onDelete={onDelete} />
				))}
			</ListGroup>
		</>
	);
}

// todo
function ListItem({ el, onDelete }) {
	return (
		<ListGroupItem>
			<b>{moment(el).format("LLL")}</b>

			<MdClose
				size={18}
				style={{ cursor: "pointer", float: "right" }}
				onClick={() => onDelete(el)}
			/>
		</ListGroupItem>
	);
}

// todo
export default function Remainder() {
	//
	const [customTimesArr, setcustomTimesArr] = useState([]);
	const [play] = useSound(sound);

	//
	useEffect(() => {
		if (customTimesArr.length > 0) {
			let id = setInterval(() => {
				// let arr = JSON.parse(localStorage.getItem("r_time"));
				// let num = `Հիշեցում ${12 - arr.length}`;

				if (+Date.now() > +customTimesArr[0]) {
					let arr = [...customTimesArr];
					arr.shift();
					openNotification("title", "body", 0);
					setcustomTimesArr(arr);
					play();
					//localStorage.setItem("r_time", JSON.stringify(arr));
				}
			}, 1000);

			return () => clearInterval(id);
		}
	}, [customTimesArr, play]);

	//
	function onChange(value) {
		setcustomTimesArr([...customTimesArr, +value?._d].sort());
	}

	//
	function onDelete(item) {
		setcustomTimesArr(customTimesArr.filter((el) => el !== item));
	}

	//
	return (
		<>
			<Space direction="vertical">
				<DatePicker showTime onChange={onChange} />
			</Space>

			<ListMaker customTimesArr={customTimesArr} onDelete={onDelete} />
		</>
	);
}
