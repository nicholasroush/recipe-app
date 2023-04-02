interface IProps {
	children: React.ReactNode;
	onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
	bgColor: string;
}

export const Button = ({ children, onClick, bgColor }: IProps): JSX.Element => {
	return (
		<div
			style={{
				width: "fit-content",
				color: "#fff",
				backgroundColor: bgColor,
				borderRadius: ".2rem",
				padding: ".75rem 1rem",
				fontWeight: "600",
				cursor: "pointer",
			}}
			onClick={onClick}
		>
			{children}
		</div>
	);
};
