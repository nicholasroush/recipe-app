interface INutrients {
	label: string;
	quantity: number;
	unit: string;
}

export interface IModal {
	label?: string;
	image?: string;
	ingredients?: [
		{
			text: string;
		}
	];
	healthLabels?: string[];
	totalNutrients?: {
		FAT: INutrients;
		FASAT: INutrients;
		SUGAR: INutrients;
		NA: INutrients;
		PROCNT: INutrients;
		CHOCDF: INutrients;
		FIBTG: INutrients;
	};
	totalDaily?: {
		FAT: INutrients;
		FASAT: INutrients;
		SUGAR: INutrients;
		NA: INutrients;
		PROCNT: INutrients;
		CHOCDF: INutrients;
		FIBTG: INutrients;
	};
	yield: number;
	url: string;
}
