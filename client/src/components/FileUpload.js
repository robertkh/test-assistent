// todo
import React, { useState } from "react";
import { useFileUpload } from "use-file-upload";
import { FaFolderOpen } from "react-icons/fa";
import ReactTooltip from "react-tooltip";
import _ from "lodash";

// todo
export default function FileUpload() {
	const [myFile, selectFile] = useFileUpload();
	const [isValid, setIsValid] = useState(false);
	console.log(myFile);
	console.log(myFile?.naturalWidth);

	return (
		<div className="my-4">
			<div
				className="row border-warning  py-3"
				style={{ borderTop: "3px solid" }}
			>
				<div className="col-2">
					{myFile && (
						<div>
							<img
								// src={myFile?.source || "Phold.png"}
								alt=""
								src={myFile?.source}
								height="30px"
								width="100px"
								data-tip
								data-for="custom-img"
							/>
							<ReactTooltip
								id="custom-img"
								type="warning"
								effect="solid"
								place="bottom"
							>
								{/* <span>Show happy face</span> */}
								<img
									// src={myFile?.source || "Phold.png"}
									alt=""
									src={myFile?.source}
									height="300"
								/>
							</ReactTooltip>{" "}
						</div>
					)}
				</div>

				<div className="col-7 mt-1 text">
					{myFile ? (
						<div>
							<span> Name: </span>
							<span className="text-primary">
								{" "}
								{myFile.name}{" "}
							</span>
							<span className="ml-2">Size: </span>
							<span className="text-primary">
								{Math.ceil(myFile.size / 1000)} KB
							</span>
						</div>
					) : (
						<span>Ընտրեք նկարը ( առավելագույն չափը: 300KB ) </span>
					)}
				</div>

				<div className="col-3">
					<button
						style={{ float: "right" }}
						className="btn btn-success btn-sm ml-1 "
						onClick={(e) => {
							selectFile(
								{ accept: "image/*" },
								({ source, name, size, file }) => {
									// file - is the raw File Object
									if (
										file.type !== "image/jpeg" &&
										file.type !== "image/jpg" &&
										file.type !== "image/png"
									) {
										setIsValid(false);

										return;
									}
									if (size > 300000) {
										setIsValid(false);
										return;
									}

									setIsValid(true);

									// Todo: Upload to cloud.
								}
							);
						}}
					>
						<FaFolderOpen className="mx-1" />
						{myFile ? "Փոխել" : "Ընտրել"}
					</button>
				</div>
			</div>

			<div className="pt-2">
				<button
					type="button"
					class="btn btn-block  btn-secondary"
					disabled={!isValid}
					style={{
						width: "100%",
					}}
					onClick={() => handleImageUpload(myFile.file, setIsValid)}
				>
					Վերբեռնել
				</button>
			</div>
		</div>
	);
}

// todo
function handleImageUpload(file, set) {
	const formData = new FormData();
	let newFileName = file.name.split(".");
	newFileName =
		_.capitalize(_.snakeCase(newFileName[0])) + "." + newFileName[1];

	formData.append("upImage", file, newFileName);

	fetch("/admin/upload", {
		method: "POST",
		// * Սա ոչ միայն ավելորդ ա, այլև բերում ա սխալի։
		// headers: {
		// 	"Content-Type": "multipart/form-data",
		// },
		body: formData,
	})
		.then((response) => response.json())
		.then((result) => {
			const str = <span> {result}</span>;

			set(false);
		})
		.catch((err) => console.error(err));
}
