import { Geist_Mono,Montserrat } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const zalandoSans = localFont({
  src: [
    {
      path: "../public/fonts/ZalandoSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/ZalandoSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/ZalandoSans-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/ZalandoSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-zalando-sans",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
})

export const metadata = {
  title: "AuraMarket",
  description: "E-commerce",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${zalandoSans.variable} ${geistMono.variable} ${montserrat.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
