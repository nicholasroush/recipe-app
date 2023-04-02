export interface IFetchProps {
	hits: [recipe?: any];
	_links: {
		next: {
			title: string;
			href: string;
		};
	};
}
