import Header from "@/components/HeaderComp";
import SmallFooter from "@/components/SmallFooter";

export default function ProfileLayout({ children }) {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 w-full">{children}</main>
      <SmallFooter />
    </div>
  );
}
