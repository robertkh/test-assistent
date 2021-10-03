// todo
import { notification } from "antd";

// todo
export default function openNotification(m, d) {
	const args = {
		message: m,
		description: d,
		duration: 0,
	};
	notification.open(args);
}
