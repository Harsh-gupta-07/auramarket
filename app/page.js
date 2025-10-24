import BestOfAuramarket from "@/components/BestOfAuramarket";
import Footer from "@/components/Footer";
import Header from "@/components/HeaderComp";
import Hero from "@/components/Hero";
import Trending from "@/components/Trending";

export default function Home() {
  return (<>
    <Hero/>
    <BestOfAuramarket />
    <Trending />
    <Footer /> 
    </>
  );
}

