import "./spinner.scss";

export const Spinner = (): JSX.Element => {
	return (
		<div className='dot-spinner'>
			<div className='dot-spinner__dot'></div>
			<div className='dot-spinner__dot'></div>
			<div className='dot-spinner__dot'></div>
			<div className='dot-spinner__dot'></div>
			<div className='dot-spinner__dot'></div>
			<div className='dot-spinner__dot'></div>
			<div className='dot-spinner__dot'></div>
			<div className='dot-spinner__dot'></div>
		</div>
	);
};
