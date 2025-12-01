import React, { useState } from "react";
import { updateProfile } from "../utills/user";



export default function UserDetails({ user }) {
  const [formData, setFormData] = useState(user);
  const [editing, setEditing] = useState(false);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (event) => {
    setFormData((prev) => ({ ...prev, [field]: event.target.value }));
    setStatus("");
  };

  const handleSave = async () => {

    setLoading(true);
    const res = await updateProfile(formData);
    setLoading(false);
    if (res.success) {
      setEditing(false);
      setStatus("Profile updated successfully.");
    } else {
      setLoading(false);
      // setEditing(true);
      setStatus(res.message || "Failed to update profile.");
    }
  };

  const handleCancel = () => {
    setFormData(user);
    setEditing(false);
    setStatus("");
  };

  return (
    <section className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-6 lg:p-10 space-y-8">
        <header className="space-y-2">
          <p className="text-xs font-semibold tracking-[0.3em] text-gray-400 uppercase">
            Account
          </p>
          <h2 className="text-2xl lg:text-3xl font-black text-gray-900">
            Your personal details
          </h2>
          <p className="text-sm text-gray-500 max-w-xl">
            Keep your information up to date so we can tailor recommendations,
            notify you about orders, and keep your account secure.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <DetailCard
            label="Full name"
            value={formData.name}
            editing={editing}
            onChange={handleChange("name")}
          />
          <DetailCard
            label="Email address"
            value={formData.email}
            editing={editing}
            onChange={handleChange("email")}
            type="email"
            helper="We send purchase receipts and important updates here."
          />
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          {!editing ? (
            <button
              className="btn btn-neutral rounded-full px-6"
              onClick={() => setEditing(true)}
            >
              Edit details
            </button>
          ) : (
            <>
              <button
                className="btn btn-neutral rounded-full px-6"
                onClick={handleSave}
                disabled={loading}
              >
                {loading ? <span className="loading loading-dots loading-lg"></span> : "Save changes"}
              </button>
              <button
                className="btn btn-ghost rounded-full px-6"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </>
          )}

          <p className="text-xs text-gray-500">
            {editing
              ? "You’re editing locally. Save when you’re happy."
              : status || "Need something else? Contact support anytime."}
          </p>
        </div>
      </div>
    </section>
  );
}

function DetailCard({ label, value, helper, editing, onChange, type = "text" }) {
  return (
    <div className="p-5 rounded-2xl border border-gray-100 bg-gray-50/40 hover:border-gray-200 transition-colors">
      <p className="text-xs font-semibold tracking-[0.2em] text-gray-400 uppercase">
        {label}
      </p>
      {editing ? (
        <input
          type={type}
          value={value}
          onChange={onChange}
          className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
        />
      ) : (
        <p className="text-lg font-semibold text-gray-900 mt-1 break-words">
          {value}
        </p>
      )}
      {helper && <p className="text-xs text-gray-500 mt-3">{helper}</p>}
    </div>
  );
}
