export default function AddressModal({ draft, onChange, onClose, onSubmit, loading }) {
  // console.log(draft)
  return (
    <div className="fixed inset-0 z-50 bg-black/70">
      <div className="flex h-full w-full flex-col bg-white">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-gray-400">
              {draft.id ? "Edit" : "New"} address
            </p>
            <h3 className="text-2xl font-black text-gray-900">
              {draft.id ? "Edit" : "Add"} a delivery destination
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="btn btn-neutral rounded-full px-6"
              onClick={onSubmit}
              disabled={loading}
            >
              {loading ? <span className="loading loading-spinner loading-xs"></span> : draft.id ? "Update Address" : "Add Address"}

            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-ghost rounded-full px-4"
            >
              Close
            </button>
          </div>

        </div>

        <form onSubmit={onSubmit} className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto px-6 py-8 lg:px-16">
            <p className="text-sm text-gray-500 mb-6">
              Fill in the essentials so our couriers know exactly where to go.
            </p>

            <div className="space-y-5 max-w-3xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field
                  label="Nickname"
                  placeholder="Home, Studio, Parents"
                  value={draft.label}
                  onChange={onChange("label")}
                />
                <Field
                  label="Recipient name"
                  placeholder="Full legal name"
                  value={draft.name}
                  onChange={onChange("name")}
                  required
                />
              </div>

              <Field
                label="Street address"
                placeholder="Street, number, apartment"
                value={draft.addressLine}
                onChange={onChange("addressLine")}
                required
              />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Field
                  label="City"
                  placeholder="City"
                  value={draft.city}
                  onChange={onChange("city")}
                />
                <Field
                  label="State"
                  placeholder="State"
                  value={draft.state}
                  onChange={onChange("state")}
                />
                <Field
                  label="ZIP Code"
                  placeholder="ZIP"
                  value={draft.pincode}
                  onChange={onChange("pincode")}
                  type="number"
                />
              </div>

              <Field
                label="Phone number"
                placeholder="+1 555 123 4567"
                value={draft.phone}
                onChange={onChange("phone")}
                type="number"
              />

              <Field
                label="Delivery instructions"
                placeholder="Gate code, concierge info, best entrance"
                value={draft.instructions}
                onChange={onChange("instructions")}
                as="textarea"
              />

              <label className="flex items-center gap-3 text-sm font-semibold text-gray-900">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm rounded-full checkbox-neutral"
                  checked={draft.isPrimary}
                  onChange={onChange("isPrimary")}
                />
                Make this my default address
              </label>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, as = "input", type = "text", className = "", ...rest }) {
  const Component = as;
  const baseClasses =
    "mt-2 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10";
  const combinedClasses = `${baseClasses} ${className}`.trim();

  return (
    <label className="text-sm font-semibold text-gray-900 block">
      {label}
      {as === "textarea" ? (
        <Component rows={3} className={combinedClasses} {...rest} />
      ) : (
        <Component type={type} className={combinedClasses} {...rest} />
      )}
    </label>
  );
}

