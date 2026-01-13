"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditSareeForm({ saree }: { saree: any }) {
  const router = useRouter();
  const [form, setForm] = useState({ ...saree });
  const [saving, setSaving] = useState(false);

  function update(key: string, value: any) {
    setForm((f: any) => ({ ...f, [key]: value }));
  }

  async function save() {
    setSaving(true);
    await fetch("/api/admin/update-saree-full", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    router.refresh();
  }

  return (
    <div className="space-y-4">
      {[
        "name",
        "slug",
        "region",
        "fabric",
        "weave",
        "feel",
        "weight",
        "price",
        "stock",
        "borderWeight",
        "drape",
        "colorTone",
      ].map((key) => (
        <input
          key={key}
          value={form[key] ?? ""}
          onChange={(e) => update(key, e.target.value)}
          placeholder={key}
          className="w-full border rounded px-3 py-2 text-sm"
        />
      ))}

      <textarea
        value={form.reason ?? ""}
        onChange={(e) => update("reason", e.target.value)}
        placeholder="Reason"
        className="w-full border rounded px-3 py-2 text-sm"
      />

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={form.isActive}
          onChange={() => update("isActive", !form.isActive)}
        />
        Active
      </label>

      <button
        onClick={save}
        disabled={saving}
        className="rounded-full border px-4 py-2"
      >
        {saving ? "Saving…" : "Save Changes"}
      </button>
    </div>
  );
}
