import "../home.scss";
import { Card } from "../../../Components/Card/Card";
import { useFetch } from "../../../Utilities/Hooks/useFetch";
import { useState } from "react";

const appId = process.env.REACT_APP_ID;
const appKey = process.env.REACT_APP_KEY;

export const Lunch = (): JSX.Element => {
	const [url, setUrl] = useState<string | undefined>(
		`https://api.edamam.com/api/recipes/v2?type=public&app_id=${appId}&app_key=${appKey}&mealType=Lunch`
	);

	const { loading, error, data } = useFetch(url);

	return (
		<div>
			<div className='home-content'>
				<Card loading={loading} error={error} data={data} setUrl={setUrl} />
			</div>
		</div>
	);
};
