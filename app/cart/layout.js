import Header from "@/components/HeaderComp";
import SmallFooter from "@/components/SmallFooter";

export default function CartLayout({ children }) {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <SmallFooter />
    </div>
  )
}
