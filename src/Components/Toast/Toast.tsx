import "./toast.scss";
import check from "../../Assets/check-solid.svg";

interface IProps {
	toast: boolean;
}

export const Toast = ({ toast }: IProps) => {
	return (
		<div className={toast ? "toast-container" : "no-toast"}>
			<div className='toast-icon'>
				<img src={check} alt='check mark' />
			</div>
			<div className='toast-text'>
				<h2>Recipe Added!</h2>
			</div>
		</div>
	);
};
