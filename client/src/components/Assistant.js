// todo
import Drawer from "./Drawer";
import { Divider } from "antd";
import { useStorageContext } from "../my-hooks/StorageContext";
import React, { useEffect, useRef } from "react";
import HotTags from "./HotTags";
import Mycards from "./Mycard";

// todo
export default function TabPane3() {
	// const [storage, toggle] = useStorageContext();
	const storageRef = useRef();

	storageRef.current = JSON.parse(localStorage.getItem("cardsArr"));

	// ls
	useEffect(
		() => {
			//
		},
		[
			/* storage */
		]
	);

	//
	return (
		<>
			<div className="mb-4">
				<Drawer st={storageRef} />
			</div>
			{/* <Divider>Հիմնական թեմաները։</Divider>
			<Tag color="green">html</Tag>
			<Tag color="magenta">css</Tag>
			<Tag color="cyan">javascript</Tag>
			<Tag color="volcano">mongodb</Tag>
			<Tag color="blue">express</Tag>
			<Tag color="orange">react</Tag>
			<Tag color="geekblue">node</Tag>*/}
			{/* {storageRef.current?.map((el) => (
				<Mycards
					key={el.time}
					title={el.title}
					href={el.href}
					img={el.img}
				/>
			))} */}
			{storageRef.current && <HotTags ls={storageRef.current} />}
		</>
	);
}
