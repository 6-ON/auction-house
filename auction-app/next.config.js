/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				hostname: 'localhost',
			},
			{
				hostname: 'loremflickr.com',
			},
            {
                hostname: 'picsum.photos',
            }
		],
	},
	reactStrictMode: false,
}

module.exports = nextConfig
