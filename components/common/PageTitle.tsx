interface PageTitleProps {
	title: string;
	subtitle: string;
}

const PageTitle = ({ title, subtitle }: PageTitleProps) => {
	return (
		<div className="flex flex-col gap-1">
			<h2 className="font-semibold tracking-wide text-sky-600">{title}</h2>
			<p className="text-neutral-600 font-medium text-sm sm:text-base">{subtitle}</p>
		</div>
	);
};

export default PageTitle;
