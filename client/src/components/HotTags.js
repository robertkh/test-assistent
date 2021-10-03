// todo
import { Divider, Tag } from "antd";
import { useState } from "react";
import Mycards from "./Mycard";
import { RightCircleTwoTone, DownCircleTwoTone } from "@ant-design/icons";

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
		// ka ? checkedArr lsArr[i]-um
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
	// console.log(blogMakerArr);

	const tagsSet = new Set(tagsSetMakerArr);

	for (let j = 0; j < checkedArr.length; j++) {
		tagsSet.delete(checkedArr[j]);
	}
	return Array.from(tagsSet);
}

// todo
export default function HotTags(props) {
	const [state, setState] = useState({ selected: [] });
	const [ishoriz, setDown] = useState(true);

	//
	const lsArr = props.ls;
	const blogMakerArr = [];
	let newSetArr = [];

	//
	newSetArr = makeSet(state.selected, lsArr, blogMakerArr);

	//
	function handleChange(tag, checked) {
		const { selected } = state;
		// console.log(selected);

		const selectedArr = checked
			? [...selected, tag]
			: selected.filter((t) => t !== tag);

		setState({ selected: selectedArr });
	}

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
						// The indexOf() method searches an array for a specified item
						//  and returns its position.
						// indexOf() returns -1 if the item is not found.

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

			<div className="border border-danger rounded p-3">
				<Divider className="text-info">{`Փոստերի քանակը հավասար է ${blogMakerArr.length}`}</Divider>

				{ishoriz ? (
					<RightCircleTwoTone
						style={{
							position: "relative",
							top: "-44px",
							fontSize: "30px",
							cursor: "pointer",
						}}
						onClick={() => setDown((pr) => !pr)}
					/>
				) : (
					<DownCircleTwoTone
						style={{
							position: "relative",
							top: "-44px",
							fontSize: "30px",
							cursor: "pointer",
						}}
						onClick={() => setDown((pr) => !pr)}
					/>
				)}
				{!ishoriz &&
					blogMakerArr.map((el) => (
						<Mycards
							key={el.time}
							title={el.title}
							href={el.href}
							img={el.img}
							id={el.time}
						/>
					))}
			</div>
		</>
	);
}
