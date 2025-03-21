import { useControllableValue } from "ahooks";
import React, { FC, forwardRef, useImperativeHandle, useState } from "react";

export interface CalendarProps {
	defaultDate?: Date;
	onChange?: (date: Date) => void;
}
export interface CalendarRef {
	getDate: () => Date;
	setDate: (date: Date) => void;
}
//Date对象的构造函数可以接收多个参数，分别是:
// year: 年份，范围从 1900 到 2100
// month: 月份，范围从 0 到 11，0 表示一月，11 表示十二月
// date: 日期，范围从 1 到 31

//而且有个小技巧，当你 date 传 0 的时候，取到的是上个月的最后一天
//-1 就是上个月的倒数第二天，-2 就是倒数第三天这样。

//除了日期外，也能通过 getFullYear、getMonth 拿到年份和月份：

//还可以通过 getDay 拿到星期几。

// 比如今天（2023-7-19）是星期三：返回 3
const CalendarComponent: React.ForwardRefRenderFunction<
	CalendarRef,
	CalendarProps
> = (props, ref) => {
	// 使用 useControllableValue 实现受控和非受控
	const [date, setDate] = useControllableValue<Date>(props, {
		defaultValue: props.defaultDate || new Date(),
	});

	// 暴露方法给父组件
	useImperativeHandle(ref, () => ({
		getDate: () => date,
		setDate: (newDate: Date) => setDate(newDate),
	}));

	const handlePrevMonth = (event: React.MouseEvent<HTMLButtonElement>) => {
		const prevMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1);
		setDate(prevMonth);
	};

	const handleNextMonth = (event: React.MouseEvent<HTMLButtonElement>) => {
		const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
		setDate(nextMonth);
	};

	const monthNames = [
		"一月",
		"二月",
		"三月",
		"四月",
		"五月",
		"六月",
		"七月",
		"八月",
		"九月",
		"十月",
		"十一月",
		"十二月",
	];

	const DateObj = {
		year: date.getFullYear(),
		month: monthNames[date.getMonth()],
		day: date.getDate(),
	};

	const daysOfMonth = (year: number, month: number) => {
		const date = new Date(year, month + 1, 0);
		return date.getDate();
	};

	const firstDayOfMonth = (year: number, month: number) => {
		const date = new Date(year, month, 1);
		return date.getDay();
	};

	const renderDates = () => {
		const days = [];
		const totalDays = daysOfMonth(DateObj.year, date.getMonth());
		const firstDay = firstDayOfMonth(DateObj.year, date.getMonth());

		for (let i = 0; i < firstDay; i++) {
			days.push(
				<div
					key={`empty-${i}`}
					className="p-1 text-center"
				/>
			);
		}

		for (let i = 1; i <= totalDays; i++) {
			const clickHandler = () => {
				const curDate = new Date(date.getFullYear(), date.getMonth(), i);
				setDate(curDate);
			};

			const isSelectedDate =
				i ===
				new Date(date.getFullYear(), date.getMonth(), date.getDate()).getDate();

			if (isSelectedDate) {
				days.push(
					<div
						key={i}
						onClick={clickHandler}
						className="p-1 text-center bg-blue-500 text-white cursor-pointer rounded-md transition-colors">
						{i}
					</div>
				);
				continue;
			}

			days.push(
				<div
					key={i}
					onClick={clickHandler}
					className="p-1 text-center hover:bg-gray-100 cursor-pointer rounded-md transition-colors">
					{i}
				</div>
			);
		}
		return days;
	};

	return (
		<div className="border-box p-4 bg-white shadow-md rounded-lg max-w-[350px] mx-auto">
			<div className="flex justify-between items-center mb-4">
				<button
					className="px-3 py-1 rounded hover:bg-gray-100"
					onClick={handlePrevMonth}>
					&lt;
				</button>
				<div className="text-lg font-semibold">
					{DateObj.year} 年 {DateObj.month}
				</div>
				<button
					className="px-3 py-1 rounded hover:bg-gray-100"
					onClick={handleNextMonth}>
					&gt;
				</button>
			</div>

			<div className="grid grid-cols-7 gap-[2px]">
				{["日", "一", "二", "三", "四", "五", "六"].map((day) => (
					<div
						key={day}
						className="p-1 text-center font-medium text-gray-600">
						{day}
					</div>
				))}

				{renderDates()}
			</div>
		</div>
	);
};

// 使用 forwardRef 包裹渲染函数，创建一个正确的 React 组件,才可以使用 ref
const InternalCalendar = forwardRef<CalendarRef, CalendarProps>(
	CalendarComponent
);
//但是React 19 版本开始，forwardRef 的类型参数已经不需要传入了，直接使用 forwardRef 即可。
// 这是一个小的优化，避免了不必要的类型参数传递
//新的方式更简单了，直接 props.ref 就可以拿到 ref 了

export default InternalCalendar;
