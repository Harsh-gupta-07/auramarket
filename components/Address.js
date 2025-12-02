"use client";
import React, { useMemo, useState } from "react";
import AddressModal from "./AddressModal";
import { changeDefaultAddress, addAddress, removeAddress, editAddress } from "../utills/user";


export default function Address({ addresses }) {
  // console.log(addresses)
  const [items, setItems] = useState(addresses);
  const [status, setStatus] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const initialDraft = {
    label: "",
    name: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
    instructions: "",
    isPrimary: false,
  };
  const [draft, setDraft] = useState(initialDraft);

  const handleSetPrimary = async (id) => {
    setLoading(true);
    const res = await changeDefaultAddress(id);
    setLoading(false);
    if (res.success) {
      setItems((prev) =>
        prev.map((entry) => ({ ...entry, isPrimary: entry.id === id }))
      );
      setStatus("Primary address updated.");
    } else {
      setStatus(res.message || "Failed to update primary address.");
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    const res = await removeAddress(id);
    setLoading(false);
    if (res.success) {
      setItems((prev) => prev.filter((entry) => entry.id !== id));
      setStatus("Address removed from your book.");
    } else {
      setStatus(res.message || "Failed to remove address.");
    }
  };

  const handleEdit = (address) => {
    setDraft(address);
    setModalOpen(true);
  };

  const handleDraftChange = (field) => (event) => {
    const value =
      event?.target?.type === "checkbox" ? event.target.checked : event.target.value;
    setDraft((prev) => ({ ...prev, [field]: value }));
  };

  const handleDraftSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    let res;
    if (draft.id) {
      res = await editAddress(draft);
    } else {
      res = await addAddress(draft);
    }
    console.log(res)
    setLoading(false);

    if (res.success === false) {
      setStatus(res.message || "Failed to save address.");
    } else {
      const savedAddress = res.address || res;
      setItems((prev) => {
        if (draft.id) {
          return prev.map((item) => (item.id === savedAddress.id ? savedAddress : item));
        } else {
          return [...prev, savedAddress];
        }
      });
      setModalOpen(false);
      setDraft(initialDraft);
      setStatus(draft.id ? "Address updated successfully." : "New address added successfully.");
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setDraft(initialDraft);
  };

  return (
    <section className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-6 lg:p-10 space-y-8">
        <header className="space-y-2">
          <p className="text-xs font-semibold tracking-[0.3em] text-gray-400 uppercase">
            Address book
          </p>
          <h2 className="text-2xl lg:text-3xl font-black text-gray-900">
            Where should we send your finds?
          </h2>
          <p className="text-sm text-gray-500 max-w-2xl leading-relaxed">
            Store every doorstep you trust. Set a primary location for fast
            checkout and keep alternates ready for gifts, studios, or weekend
            escapes.
          </p>
        </header>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="btn btn-neutral rounded-full px-6"
          >
            Add new address
          </button>
          <p className="text-xs text-gray-500">
            {status || "Tip: use a nickname to spot the right address instantly."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {loading ? (
            <div className="flex items-center justify-center h-24">
              <span className="loading loading-spinner" />
            </div>
          ) : (
            items.map((address) => (
              <AddressCard
                key={address.id}
                address={address}
                isPrimary={address.isPrimary}
                onSetPrimary={handleSetPrimary}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            )))}
          {!items.length && (
            <EmptyState onAdd={() => setModalOpen(true)} />
          )}
        </div>
      </div>

      {modalOpen && (
        <AddressModal
          draft={draft}
          onChange={handleDraftChange}
          onClose={handleModalClose}
          onSubmit={handleDraftSubmit}
          loading={loading}
        />
      )}
    </section>
  );
}

export function AddressCard({ address, isPrimary, onSetPrimary, onDelete, onEdit, onSelect, isSelected }) {
  return (
    <article
      onClick={() => onSelect && onSelect(address)}
      className={`relative p-6 rounded-2xl border bg-gray-50/40 transition-all cursor-pointer
        ${isSelected
          ? 'border-black ring-1 ring-black shadow-md'
          : 'border-gray-100 hover:border-gray-300'
        }
      `}
    >
      <div className="flex items-center justify-between gap-4 mb-4">
        <span className="text-xs font-semibold tracking-[0.3em] uppercase text-gray-400">
          {address.label}
        </span>
        {isPrimary ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-gray-900 text-white text-xs font-semibold px-3 py-1">
            Default
          </span>
        ) : (
          <button
            type="button"
            onClick={() => onSetPrimary(address.id)}
            className="text-xs font-semibold text-gray-500 hover:text-gray-900 underline underline-offset-4 cursor-pointer"
          >
            Make default
          </button>
        )}
      </div>

      <div className="space-y-1 text-sm text-gray-700">
        <p className="text-lg font-semibold text-gray-900">{address.name}</p>
        <p>{address.addressLine}</p>
        <p>{address.city}, {address.state} {address.pincode}</p>
        <p className="text-gray-500">{address.phone}</p>
      </div>

      {address.instructions && (
        <p className="mt-4 text-xs text-gray-500 bg-white/80 rounded-xl px-3 py-2 border border-gray-100 break-words">
          {address.instructions}
        </p>
      )}

      <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold">
        <button
          type="button"
          className="btn btn-sm btn-neutral rounded-full px-4 cursor-pointer"
          onClick={() => onEdit(address)}
        >
          Edit
        </button>
        <button
          type="button"
          className="btn btn-sm btn-ghost rounded-full px-4 text-gray-500 cursor-pointer"
          onClick={() => onDelete(address.id)}
        >
          Remove
        </button>
      </div>
    </article>
  );
}

function EmptyState({ onAdd }) {
  return (
    <div className="col-span-full border border-dashed border-gray-200 rounded-2xl p-10 text-center space-y-4 bg-gray-50">
      <p className="text-xl font-semibold text-gray-900">
        No addresses yet
      </p>
      <p className="text-sm text-gray-500">
        Add your first location to speed through checkout and keep deliveries on
        track.
      </p>
      <button
        type="button"
        className="btn btn-neutral rounded-full px-6"
        onClick={onAdd}
      >
        Add address
      </button>
    </div>
  );
}

