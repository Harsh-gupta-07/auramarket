import BestOfAuramarket from "@/components/BestOfAuramarket";
import Footer from "@/components/MainFooter";
import Header from "@/components/HeaderComp";
import Hero from "@/components/Hero";
import Trending from "@/components/Trending";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <BestOfAuramarket />
        {/* <Trending /> */}
      </main>
      <Footer />
    </div>
  );
}
