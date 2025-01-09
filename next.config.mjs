/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ["res.cloudinary.com"],
	},
	redirects() {
		return [
			{
				source: "/",
				destination: "/login",
				permanent: true,
			},
		];
	},
};

export default nextConfig;
