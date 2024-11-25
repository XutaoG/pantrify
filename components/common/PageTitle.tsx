interface PageTitleProps {
	title: string;
	subtitle: string;
}

const PageTitle = ({ title, subtitle }: PageTitleProps) => {
	return (
		<div className="flex flex-col gap-2">
			<h2 className="font-semibold tracking-wide text-sky-600">{title}</h2>
			<p className="text-neutral-600 font-medium">{subtitle}</p>
		</div>
	);
};

export default PageTitle;
