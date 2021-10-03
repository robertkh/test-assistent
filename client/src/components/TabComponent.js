// todo
import { Tabs } from "antd";
import {
	ReadOutlined,
	CalendarOutlined,
	QuestionOutlined,
} from "@ant-design/icons";
import Words from "./Words";
import Remainder from "./Remainder";
import TabPane3 from "./TabPane3";

//?
const { TabPane } = Tabs;

// todo
export default function TabComponent() {
	//
	return (
		<Tabs defaultActiveKey="1" size="large">
			<TabPane
				tab={
					<span>
						<ReadOutlined />
						Բառեր
					</span>
				}
				key="1"
				className="mt-4"
			>
				<div>
					<h6>
						Ըստ Պիմսլեռի ինտերվալների մեթոդի հիշեցւմները կկատարվեն՝
					</h6>
					<ol>
						<li>
							<b>5 վարկյան հետո։</b>
						</li>
						<li>
							<b>25 վարկյան հետո։</b>
						</li>
						<li>
							<b>2 րոպե հետո։ </b>
						</li>
						<li>
							<b> 10 րոպե հետո։</b>
						</li>
						<li>
							<b> 1 ժամ հետո։</b>
						</li>
						<li>
							<b> 5 ժամ հետո։</b>
						</li>
						<li>
							<b> 1 օր հետո։</b>
						</li>
						<li>
							<b> 5 օր հետո։</b>
						</li>
						<li>
							<b> 25 օր հետո։</b>
						</li>
						<li>
							<b> 4 ամիս հետո։</b>
						</li>
						<li>
							<b> 2 տարի հետո։</b>
						</li>
					</ol>
				</div>
				<Words />
			</TabPane>
			<TabPane
				tab={
					<span>
						<CalendarOutlined />
						ժամանակացույց
					</span>
				}
				key="2"
			>
				<p style={{ textIndent: "30px" }} className="mb-4">
					Այստեղ ինքներս ենք կազմում ժամանակացույցը, համաձայն որի պիտի
					ստանանք ծանուցում(ներ)։
				</p>

				<Remainder />
			</TabPane>
			<TabPane
				tab={
					<span>
						<QuestionOutlined />
						Պարզվում է, որ․․․
					</span>
				}
				key="3"
			>
				<TabPane3 />
			</TabPane>
		</Tabs>
	);
}
