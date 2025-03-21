"use client";

import { useEffect, useState } from "react";

interface Data {
	message: string;
	timestamp: string;
}

export default function CacheDemo() {
	const [etag, setEtag] = useState<Data | null>(null);
	const [maxAge, setMaxAge] = useState<Data | null>(null);
	const [lastModified, setLastModified] = useState<Data | null>(null);
	const [isClient, setIsClient] = useState(false);
	useEffect(() => {
		setIsClient(true);
	}, []);

	// 检查响应状态是否为304的通用函数
	const isNotModified = (status: number) => /^304$/.test(status.toString());

	const fetchETag = async () => {
		try {
			console.log("开始请求 ETag 数据"); // 添加请求开始日志
			const response = await fetch("/api/data");
			console.log("ETag 响应状态:", response.status); // 添加状态码日志

			if (isNotModified(response.status)) {
				console.log("使用ETag缓存的数据");
				return;
			}
			const data = await response.json();
			console.log("ETag 响应数据:", data); // 添加响应数据日志
			setEtag(data);
		} catch (error) {
			console.error("ETag请求错误:", error);
		}
	};

	const fetchMaxAge = async () => {
		try {
			const response = await fetch("/api/cache-control");
			const data = await response.json();
			setMaxAge(data);
		} catch (error) {
			console.error("Max-Age请求错误:", error);
		}
	};

	const fetchLastModified = async () => {
		try {
			const response = await fetch("/api/last-modified");
			console.group("Last-Modified 请求详情"); // 使用分组让日志更清晰
			console.log("状态码:", response.status);
			console.log("响应头:", response.headers);
			console.groupEnd();

			if (isNotModified(response.status)) {
				console.log("使用Last-Modified缓存的数据");
				return;
			}
			// ... 其余代码
		} catch (error) {
			console.error("Last-Modified请求错误:", error);
		}
	};
	// 如果不是客户端，返回加载状态或空内容
	if (!isClient) {
		return <div className="p-8">Loading...</div>;
	}
	return (
		<div className="p-8">
			<h1 className="text-2xl font-bold mb-6">HTTP缓存演示</h1>

			<div className="space-y-8">
				<section className="border p-4 rounded">
					<h2 className="text-xl font-semibold mb-4">ETag缓存</h2>
					<button
						onClick={fetchETag}
						className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
						获取ETag数据
					</button>
					{etag && (
						<div className="mt-4">
							<p>消息: {etag.message}</p>
							<p>时间戳: {etag.timestamp}</p>
						</div>
					)}
				</section>

				<section className="border p-4 rounded">
					<h2 className="text-xl font-semibold mb-4">Max-Age缓存</h2>
					<button
						onClick={fetchMaxAge}
						className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
						获取Max-Age数据
					</button>
					{maxAge && (
						<div className="mt-4">
							<p>消息: {maxAge.message}</p>
							<p>时间戳: {maxAge.timestamp}</p>
						</div>
					)}
				</section>

				<section className="border p-4 rounded">
					<h2 className="text-xl font-semibold mb-4">Last-Modified缓存</h2>
					<button
						onClick={fetchLastModified}
						className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
						获取Last-Modified数据
					</button>
					{lastModified && (
						<div className="mt-4">
							<p>消息: {lastModified.message}</p>
							<p>时间戳: {lastModified.timestamp}</p>
						</div>
					)}
				</section>
			</div>
		</div>
	);
}
