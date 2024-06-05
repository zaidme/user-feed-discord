import React from 'react';
import Demo from '@/components/ui/demo/demo';
import { Toaster } from "@/components/ui/toaster"
//import { locales } from '@/i18n';
//import { unstable_setRequestLocale } from 'next-intl/server';

/*export function generateStaticParams() {
	return locales.map((locale) => ({ locale }));
}*/

const DemoPage = async ({ params }: { params: { locale: string } }) => {
	const { locale } = params;

	//unstable_setRequestLocale(locale);

	return (
		<div className='flex-1 flex flex-col w-full px-8 justify-center gap-2'>
			<Demo />
		</div>
	);
};

export default DemoPage;
