import { useEffect, useRef, useState } from "react";

// 导出一个名为 useIntersectionObserver 的自定义 Hook
// 该 Hook 接受两个参数：
// callback: 当目标元素进入视口时触发的回调函数
// options: IntersectionObserver 的配置选项（可选）
export function useIntersectionObserver<T extends HTMLElement>(
	callback: (entry: IntersectionObserverEntry) => void, // 回调函数，参数为 IntersectionObserverEntry 对象
	options?: IntersectionObserverInit // IntersectionObserver 的初始化配置选项
) {
	// 使用 useRef 创建一个引用，用于存储目标 HTML 元素
	const targetRef = useRef<T | null>(null);

	// 使用 useEffect Hook 来处理副作用
	useEffect(() => {
		// 获取当前引用指向的 HTML 元素
		const target = targetRef.current;
		// 如果目标元素不存在，直接返回
		if (!target) return;

		// 创建一个 IntersectionObserver 实例
		// 该实例会在目标元素与视口相交时触发回调
		const observer = new IntersectionObserver(([entry]) => {
			// 如果目标元素正在与视口相交
			if (entry.isIntersecting) {
				// 调用传入的回调函数，并传递 IntersectionObserverEntry 对象
				callback(entry);
			}
		}, options); // 传入配置选项

		// 开始观察目标元素
		observer.observe(target);

		// 返回一个清理函数，当组件卸载或依赖项变化时调用
		return () => {
			// 如果目标元素存在，停止观察该元素
			if (target) observer.unobserve(target);
		};
	}, [callback, options]); // 依赖项数组，包含回调函数和配置选项

	// 返回目标元素的引用，供外部使用
	return targetRef;
}
