import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Id } from "../../convex/_generated/dataModel";

interface Field {
  key: string;
  label: string;
  type: "text" | "textarea" | "number" | "boolean" | "array" | "url" | "select";
  options?: string[];
  required?: boolean;
}

interface ContentManagerProps {
  title: string;
  fields: Field[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  listQuery: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createMutation: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateMutation: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deleteMutation: any;
}

export function ContentManager({ title, fields, listQuery, createMutation, updateMutation, deleteMutation }: ContentManagerProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const items = useQuery(listQuery) as any[] | undefined;
  const createItem = useMutation(createMutation);
  const updateItem = useMutation(updateMutation);
  const deleteItem = useMutation(deleteMutation);

  const [editingId, setEditingId] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [form, setForm] = useState<Record<string, any>>({});
  const [showForm, setShowForm] = useState(false);

  const resetForm = () => {
    const initial: Record<string, unknown> = {};
    fields.forEach((f) => {
      if (f.type === "array") initial[f.key] = [];
      else if (f.type === "boolean") initial[f.key] = false;
      else if (f.type === "number") initial[f.key] = 0;
      else initial[f.key] = "";
    });
    initial.order = 0;
    setForm(initial);
    setEditingId(null);
  };

  const handleCreate = async () => {
    try {
      await createItem(form);
      resetForm();
      setShowForm(false);
    } catch (e) {
      alert("Error creating: " + (e instanceof Error ? e.message : "Unknown error"));
    }
  };

  const handleUpdate = async () => {
    if (!editingId) return;
    try {
      await updateItem({ id: editingId as unknown as Id<"cms_services">, ...form });
      resetForm();
      setEditingId(null);
      setShowForm(false);
    } catch (e) {
      alert("Error updating: " + (e instanceof Error ? e.message : "Unknown error"));
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    try {
      await deleteItem({ id: id as unknown as Id<"cms_services"> });
    } catch (e) {
      alert("Error deleting: " + (e instanceof Error ? e.message : "Unknown error"));
    }
  };

  const handleEdit = (item: Record<string, unknown>) => {
    const editForm: Record<string, unknown> = {};
    fields.forEach((f) => {
      editForm[f.key] = item[f.key] ?? "";
    });
    editForm.order = item.order ?? 0;
    setForm(editForm);
    setEditingId(item._id as string);
    setShowForm(true);
  };

  const updateArrayField = (key: string, index: number, value: string) => {
    const arr = [...(form[key] as string[])];
    arr[index] = value;
    setForm({ ...form, [key]: arr });
  };

  const addArrayField = (key: string) => {
    setForm({ ...form, [key]: [...(form[key] as string[]), ""] });
  };

  const removeArrayField = (key: string, index: number) => {
    const arr = [...(form[key] as string[])];
    arr.splice(index, 1);
    setForm({ ...form, [key]: arr });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        <button
          onClick={() => { resetForm(); setShowForm(!showForm); }}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-[#0F1B2D] text-white hover:bg-[#0F1B2D]/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add New
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white border border-[#E8E2DA] p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">{editingId ? "Edit" : "Create"} {title.slice(0, -1)}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.map((field) => (
              <div key={field.key} className={field.type === "textarea" || field.type === "array" ? "md:col-span-2" : ""}>
                <label className="block text-xs font-medium text-[#8B8178] uppercase tracking-wider mb-1.5">
                  {field.label}
                </label>
                {field.type === "textarea" ? (
                  <textarea
                    value={(form[field.key] as string) || ""}
                    onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                    rows={3}
                    className="w-full border border-[#E8E2DA] px-3 py-2 text-sm focus:outline-none focus:border-[#B8860B]"
                  />
                ) : field.type === "boolean" ? (
                  <input
                    type="checkbox"
                    checked={!!form[field.key]}
                    onChange={(e) => setForm({ ...form, [field.key]: e.target.checked })}
                    className="h-4 w-4 accent-[#B8860B]"
                  />
                ) : field.type === "number" ? (
                  <input
                    type="number"
                    value={(form[field.key] as number) || 0}
                    onChange={(e) => setForm({ ...form, [field.key]: parseInt(e.target.value) || 0 })}
                    className="w-full border border-[#E8E2DA] px-3 py-2 text-sm focus:outline-none focus:border-[#B8860B]"
                  />
                ) : field.type === "array" ? (
                  <div className="space-y-2">
                    {(form[field.key] as string[]).map((item, idx) => (
                      <div key={idx} className="flex gap-2">
                        <input
                          value={item}
                          onChange={(e) => updateArrayField(field.key, idx, e.target.value)}
                          className="flex-1 border border-[#E8E2DA] px-3 py-2 text-sm focus:outline-none focus:border-[#B8860B]"
                          placeholder={`${field.label} item ${idx + 1}`}
                        />
                        <button onClick={() => removeArrayField(field.key, idx)} className="text-red-500 text-sm px-2">&times;</button>
                      </div>
                    ))}
                    <button onClick={() => addArrayField(field.key)} className="text-xs text-[#B8860B] hover:underline">
                      + Add item
                    </button>
                  </div>
                ) : (
                  <input
                    type={field.type === "url" ? "url" : "text"}
                    value={(form[field.key] as string) || ""}
                    onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                    className="w-full border border-[#E8E2DA] px-3 py-2 text-sm focus:outline-none focus:border-[#B8860B]"
                  />
                )}
              </div>
            ))}
            <div>
              <label className="block text-xs font-medium text-[#8B8178] uppercase tracking-wider mb-1.5">Order</label>
              <input
                type="number"
                value={(form.order as number) || 0}
                onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })}
                className="w-full border border-[#E8E2DA] px-3 py-2 text-sm focus:outline-none focus:border-[#B8860B]"
              />
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button
              onClick={editingId ? handleUpdate : handleCreate}
              className="px-6 py-2.5 text-sm bg-[#0F1B2D] text-white hover:bg-[#0F1B2D]/90 transition-colors"
            >
              {editingId ? "Update" : "Create"}
            </button>
            <button
              onClick={() => { setShowForm(false); resetForm(); }}
              className="px-6 py-2.5 text-sm border border-[#E8E2DA] text-[#8B8178] hover:text-[#1A1A1A] transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white border border-[#E8E2DA] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E8E2DA] bg-[#F5F0EB]">
                {fields.slice(0, 4).map((f) => (
                  <th key={f.key} className="text-left px-4 py-3 text-xs font-medium text-[#8B8178] uppercase tracking-wider">{f.label}</th>
                ))}
                <th className="text-right px-4 py-3 text-xs font-medium text-[#8B8178] uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items?.map((item) => (
                <tr key={item._id} className="border-b border-[#E8E2DA] hover:bg-[#FAF6F1]">
                  {fields.slice(0, 4).map((f) => (
                    <td key={f.key} className="px-4 py-3 text-sm truncate max-w-[200px]">
                      {f.type === "array" ? (item[f.key] as string[])?.join(", ") : String(item[f.key] ?? "")}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => handleEdit(item)} className="text-[#8B8178] hover:text-[#1A1A1A] mr-3">
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button onClick={() => handleDelete(item._id)} className="text-red-400 hover:text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {(!items || items.length === 0) && (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-sm text-[#8B8178]">
                    No items yet. Click "Add New" to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
