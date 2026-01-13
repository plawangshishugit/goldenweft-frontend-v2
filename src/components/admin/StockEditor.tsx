"use client";

import { useState } from "react";

export default function StockEditor({
  sareeId,
  stock,
  isActive,
}: {
  sareeId: string;
  stock: number;
  isActive: boolean;
}) {
  const [value, setValue] = useState<number>(
    Number.isFinite(stock) ? stock : 0
  );
  const [active, setActive] = useState(isActive);
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);

    await fetch("/api/admin/update-saree", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sareeId,
        stock: value,
        isActive: active,
      }),
    });

    setSaving(false);
  }

  return (
    <div className="flex items-center gap-2">
      <button onClick={() => setValue(Math.max(0, value - 1))}>−</button>

      <input
        type="number"
        min={0}
        value={value}
        onChange={(e) => {
          const v = Number(e.target.value);
          setValue(Number.isFinite(v) ? v : 0);
        }}
        className="w-16 border rounded text-center"
      />

      <button onClick={() => setValue(value + 1)}>+</button>

      <label className="flex items-center gap-1 text-sm">
        <input
          type="checkbox"
          checked={active}
          onChange={() => setActive(!active)}
        />
        Active
      </label>

      <button
        onClick={save}
        disabled={saving}
        className="text-xs underline"
      >
        {saving ? "Saving…" : "Save"}
      </button>
    </div>
  );
}
