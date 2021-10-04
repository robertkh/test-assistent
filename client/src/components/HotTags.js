// todo
import { Divider, Tag } from "antd";
import { useState, useEffect } from "react";
import { Collapse } from "reactstrap";
import Mycards from "./Mycard";
import { RightCircleTwoTone, DownCircleTwoTone } from "@ant-design/icons";
import { useStorageContext } from "../my-hooks/StorageContext";

//?
const { CheckableTag } = Tag;

//?
const tagsData = [
	"html",
	"css",
	"javascript",
	"mongodb",
	"express",
	"react",
	"node",
	"git",
	"npm",
	"heroku",
	"linux",
];

//?
function makeSet(checkedArr, lsArr, blogMakerArr) {
	let tagsSetMakerArr = [];

	for (let i = 0; i < lsArr.length; i++) {
		//
		let is = true;
		for (let j = 0; j < checkedArr.length; j++) {
			if (lsArr[i].title.indexOf(checkedArr[j]) === -1) {
				is = false;
				break;
			}
		}

		// ete ayo apa  setMakerArr = SetMakerArr.concat(lsArr[i].tags)
		if (is) {
			tagsSetMakerArr = tagsSetMakerArr.concat(
				lsArr[i].title.trim().replace(/ {2,}/, " ").split(" ")
			);
			blogMakerArr.push(lsArr[i]);
		}
	}

	const tagsSet = new Set(tagsSetMakerArr);

	for (let j = 0; j < checkedArr.length; j++) {
		tagsSet.delete(checkedArr[j]);
	}
	return Array.from(tagsSet);
}

// todo
export default function HotTags(props) {
	const [state, setState] = useState({ selected: [] });
	const [isOpen, setIsOpen] = useState(false);
	const [storage, toggle] = useStorageContext();

	//
	const lsArr = props.ls;
	const blogMakerArr = [];
	let newSetArr = [];

	console.log("hottags effect");

	//
	newSetArr = makeSet(state.selected, lsArr, blogMakerArr);

	//
	function handleChange(tag, checked) {
		const { selected } = state;

		const selectedArr = checked
			? [...selected, tag]
			: selected.filter((t) => t !== tag);

		setState({ selected: selectedArr });
	}

	//
	const toggle2 = () => setIsOpen(!isOpen);

	//
	const { selected } = state;

	return (
		<>
			<div className="border border-danger rounded my-2 p-2">
				<Divider className="text-success">
					{selected.length ? "Ընտրված տեգեր" : "Հիմնական թեմաներ"}
				</Divider>

				{(selected.length === 0 ? tagsData : selected).map((tag) => (
					<CheckableTag
						key={tag}
						checked={selected.indexOf(tag) > -1}
						onChange={(checked) => {
							handleChange(tag, checked);
						}}
					>
						{tag}
					</CheckableTag>
				))}
			</div>

			<div className="border border-danger rounded  mb-5 p-2">
				<Divider className="text-success">
					{newSetArr.length
						? "Կապակցված տեգեր"
						: "Կապակցված տեգեր չկան"}
				</Divider>

				{newSetArr.sort().map((tag) => (
					<CheckableTag
						key={tag}
						checked={selected.indexOf(tag) > -1}
						onChange={(checked) => {
							handleChange(tag, checked);
						}}
					>
						{tag}
					</CheckableTag>
				))}
			</div>

			<div>
				<Divider className="text-info">{`Փոստերի քանակը հավասար է ${blogMakerArr.length}`}</Divider>

				{!isOpen ? (
					<RightCircleTwoTone
						style={{
							position: "relative",
							top: "-44px",
							fontSize: "30px",
							cursor: "pointer",
						}}
						onClick={toggle2}
					/>
				) : (
					<DownCircleTwoTone
						style={{
							position: "relative",
							top: "-44px",
							fontSize: "30px",
							cursor: "pointer",
						}}
						onClick={toggle2}
					/>
				)}
				<Collapse isOpen={isOpen}>
					{blogMakerArr.map((el) => (
						<Mycards
							key={el.time}
							title={el.title}
							href={el.href}
							img={el.img}
							id={el.time}
						/>
					))}
				</Collapse>
			</div>
		</>
	);
}
