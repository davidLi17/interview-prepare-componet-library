import { useEffect, useRef, useState, ImgHTMLAttributes } from "react";

// 定义 hook 的返回类型
interface UseLazyImageReturn {
	imgRef: React.RefObject<HTMLImageElement | null>;
	isInView: boolean;
}

function useLazyImage(): UseLazyImageReturn {
	// 为 ref 添加具体的 DOM 元素类型
	const imgRef = useRef<HTMLImageElement>(null);
	const observerRef = useRef<IntersectionObserver | null>(null);

	const [isInView, setIsInView] = useState<boolean>(false);

	useEffect(() => {
		if (isInView) return;

		observerRef.current = new IntersectionObserver(
			(entries: IntersectionObserverEntry[]) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && !isInView) {
						setIsInView(true);
						observerRef.current?.unobserve(entry.target);
					}
				});
			},
			{
				rootMargin: "200px",
			}
		);

		if (imgRef.current) {
			observerRef.current.observe(imgRef.current);
		}

		return () => {
			observerRef.current?.disconnect();
		};
	}, [isInView]);

	return { imgRef, isInView };
}

interface LazyImageProps extends ImgHTMLAttributes<HTMLImageElement> {
	src: string;
	alt: string;
	className?: string;
	placeholderSrc?: string;
	width?: number | string;
	height?: number | string;
}

function LazyImage({
	src,
	alt,
	className,
	placeholderSrc,
	width = "100%",
	height = "200px",
	...props
}: LazyImageProps): React.ReactElement {
	const { imgRef, isInView } = useLazyImage();
	const [isLoaded, setIsLoaded] = useState(false);

	return (
		<div
			className="lazy-image-container"
			style={{ position: "relative" }}>
			{!isLoaded && (
				<div
					className="skeleton-loading"
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						width: width,
						height: height,
						backgroundColor: "#f0f0f0",
						borderRadius: "4px",
					}}
				/>
			)}
			<img
				ref={imgRef}
				src={isInView ? src : placeholderSrc}
				alt={alt}
				className={`
            ${className || ""} 
            ${!isInView ? "lazy" : ""}
            ${isLoaded ? "loaded" : ""}
          `}
				onLoad={() => setIsLoaded(true)}
				style={{
					opacity: isLoaded ? 1 : 0,
					transition: "opacity 0.3s ease-in-out",
					width: width,
					height: height,
				}}
				{...props}
			/>
		</div>
	);
}

export { LazyImage, useLazyImage };
