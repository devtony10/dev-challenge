import { Metadata } from "next"
import { siteConfig } from '@lib/config';

import Guide from "@modules/home/guide";
import Infographic from "@modules/home/infographic";
import Hero from "@modules/home/hero";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  robots: { index: true, follow: true },
  icons: {
    icon: '/favicon/favicon.ico',
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Infographic />
      <Guide />
    </>
  );
}
