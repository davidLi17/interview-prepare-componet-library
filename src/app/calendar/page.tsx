"use client";

import React, { useEffect, useRef } from "react";
// 确保这里的路径与实际文件名大小写一致
import InternalCalendar, { CalendarRef } from "./Calendar";

function Test() {
	const calendarRef = useRef<CalendarRef>(null);
	useEffect(() => {
		console.log(
			"Test/page.tsx calendarRef:: line:7",
			calendarRef.current?.getDate().toLocaleDateString()
		);
		setTimeout(() => {
			calendarRef.current?.setDate(new Date(2025, 10, 1));
			console.log(
				"Test/page.tsx calendarRef:: line:9",
				calendarRef.current?.getDate().toLocaleDateString()
			);
		}, 2000);
	}, []);
	return (
		<div>
			<InternalCalendar
				ref={calendarRef}
				onChange={(date) => {
					console.log("Calendar/page.tsx date:: line:11", date);
				}}
			/>
		</div>
	);
}
export default Test;
