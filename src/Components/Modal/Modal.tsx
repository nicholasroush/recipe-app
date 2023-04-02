import { Dispatch, SetStateAction } from "react";
import { IModal } from "../../Utilities/Interfaces/ModalInterface";
import close from "../../Assets/close.svg";
import "./modal.scss";

interface IProps {
	open: boolean;
	setOpenModal: Dispatch<SetStateAction<boolean>>;
	modalData: IModal | null;
}

export const Modal = ({
	open,
	setOpenModal,
	modalData,
}: IProps): JSX.Element => {
	let ingredientKey = modalData!.ingredients!.length + 1;
	let healthLabelKey = modalData!.healthLabels!.length + 1;
	const serving = modalData!.yield;
	return (
		<div className='modalOpen'>
			<div className='modal-mask' onClick={() => setOpenModal(!open)}></div>
			<div className='box'>
				<div className='close'>
					<button onClick={() => setOpenModal(!open)}>
						<img src={close} alt='X' />
					</button>
				</div>
				<div className='content'>
					<h2>{modalData?.label}</h2>
					<div className='health-lables'>
						{modalData?.healthLabels?.map((val) => {
							return <p key={healthLabelKey++}>{val}</p>;
						})}
					</div>
					<div className='nutrients-container'>
						<h3>Nutrients Per Serving</h3>
						<div className='nutrients'>
							<div className='fat'>
								<p>Total {modalData!.totalNutrients!.FAT.label}</p>
								<p>
									{(
										Math.floor(modalData!.totalNutrients!.FAT.quantity) /
										serving
									).toFixed(2)}
									{modalData!.totalNutrients!.FAT.unit}
								</p>
							</div>
							<div className='satFat'>
								<p>{modalData!.totalNutrients!.FASAT.label} Fat</p>
								<p>
									{(
										Math.floor(modalData!.totalNutrients!.FASAT.quantity) /
										serving
									).toFixed(2)}
									{modalData!.totalNutrients!.FASAT.unit}
								</p>
							</div>
							<div className='sugar'>
								<p>{modalData!.totalNutrients!.SUGAR.label}</p>
								<p>
									{(
										Math.floor(modalData!.totalNutrients!.SUGAR.quantity) /
										serving
									).toFixed(2)}
									{modalData!.totalNutrients!.SUGAR.unit}
								</p>
							</div>
							<div className='salt'>
								<p>{modalData!.totalNutrients!.NA.label}</p>
								<p>
									{(
										Math.floor(modalData!.totalNutrients!.NA.quantity) / serving
									).toFixed(2)}
									{modalData!.totalNutrients!.NA.unit}
								</p>
							</div>
							<div className='protein'>
								<p>{modalData!.totalNutrients!.PROCNT.label}</p>
								<p>
									{(
										Math.floor(modalData!.totalNutrients!.PROCNT.quantity) /
										serving
									).toFixed(2)}
									{modalData!.totalNutrients!.PROCNT.unit}
								</p>
							</div>
							<div className='carbs'>
								<p>{modalData!.totalNutrients!.CHOCDF.label}</p>
								<p>
									{(
										Math.floor(modalData!.totalNutrients!.CHOCDF.quantity) /
										serving
									).toFixed(2)}
									{modalData!.totalNutrients!.CHOCDF.unit}
								</p>
							</div>
							<div className='fiber'>
								<p>{modalData!.totalNutrients!.FIBTG.label}</p>
								<p>
									{(
										Math.floor(modalData!.totalNutrients!.FIBTG.quantity) /
										serving
									).toFixed(2)}
									{modalData!.totalNutrients!.FIBTG.unit}
								</p>
							</div>
						</div>
					</div>
					<div className='ingredients-container'>
						{modalData?.ingredients?.map((val) => {
							return (
								<ul key={ingredientKey++} className='ingredients'>
									<li>{val.text}</li>
								</ul>
							);
						})}
					</div>
					<div className='cooking-instructions'>
						<a href={modalData?.url} target='blank' rel='noreferrer'>
							Cooking Instructions
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};
