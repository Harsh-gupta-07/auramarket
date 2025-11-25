import Image from "next/image";

export default function CartPage() {
  return (
    <div className="w-full pt-25 px-6 py-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* LEFT — CART ITEMS */}
        <div className="lg:col-span-2 space-y-10">

          {/* ITEM */}
          {[1,2,3].map((item, i) => (
            <div key={i} className="flex flex-col md:flex-row gap-6 pb-6 border-b">
              
              {/* IMAGE */}
              <div className="w-40 h-40 bg-base-200 rounded-xl overflow-hidden">
                <img 
                  src="https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/205b5d7f-c036-43b0-90ef-7c98d593ee0f/air-force-1-mid-07-mens-shoes-LVZ4qt.png"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* ITEM DETAILS */}
              <div className="flex-1">
                
                <p className="text-sm text-orange-500 font-semibold">
                  Estimated arrival 24 Sep 2025
                </p>

                <h2 className="text-xl font-semibold mt-1">Nike Air Force 1 Mid '07</h2>
                <p className="text-sm text-gray-500">Men's Shoes</p>

                {/* Size & Quantity */}
                <div className="mt-3 flex items-center gap-10">

                  {/* QUANTITY */}
                  <div>
                    <p className="text-sm font-medium">Quantity</p>
                    <div className="flex items-center gap-2 mt-1">
                      <button className="btn btn-xs btn-outline rounded-full">−</button>
                      <span className="text-lg">2</span>
                      <button className="btn btn-xs btn-outline rounded-full">+</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* PRICE + DELETE */}
              <div className="flex flex-col justify-between items-end">
                <p className="text-lg font-semibold">$98.30</p>
                <button
                  className="btn btn-ghost hover:bg-white btn-sm btn-circle hover:scale-110 transition-all duration-200"
                >
                  <Image src="/trash.svg" width={20} height={20} alt="delete" />
                </button>
              </div>

            </div>
          ))}

        </div>

        {/* RIGHT — SUMMARY */}
        <div className="border rounded-xl p-6 h-fit space-y-5 bg-white">
          <h2 className="text-xl font-semibold">Summary</h2>

          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span className="font-medium">$58.53</span>
          </div>

          <div className="flex justify-between text-sm">
            <span>Estimated Delivery &amp; Handling</span>
            <span className="font-medium">$2.00</span>
          </div>

          <div className="divider m-0"></div>

          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>$60.53</span>
          </div>

          <button className="btn btn-neutral w-full text-white mt-4 rounded-full">
            Proceed to Checkout
          </button>

        </div>

      </div>
    </div>
  );
}