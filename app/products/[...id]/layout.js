import Header from "@/components/HeaderComp";
import SmallFooter from "@/components/SmallFooter";

export default function ProductLayout({ children }) {
  return (
    <div className="bg-white min-h-screen">
        <Header />
      {children}
      <SmallFooter />
    </div>
  );
}
