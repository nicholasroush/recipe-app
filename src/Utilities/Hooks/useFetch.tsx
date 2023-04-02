import axios from "axios";
import { useEffect, useState } from "react";
import { IFetchProps } from "../Interfaces/FetchInterface";

export const useFetch = (url: string | undefined) => {
	const [data, setData] = useState<IFetchProps[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const getData = () => {
			axios({ method: "Get", url })
				.then((res) => {
					setError("");
					setData((prev) => [...prev, res.data]);
				})
				.catch((err) => {
					setError(err.message);
				})
				.finally(() => {
					setLoading(false);
				});
		};

		getData();
	}, [url]);

	return { data, loading, error };
};
