import React, { useEffect, useState } from "react";
import api from "../api";

type Task = {
  id: number;
  title: string;
  description?: string | null;
  status: "Pending" | "In Progress" | "Done";
  created_at?: string;
  updated_at?: string;
};

const emptyForm: Omit<Task, "id"> = {
  title: "",
  description: "",
  status: "Pending",
};

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function load() {
    setErr("");
    try {
      const res = await api.get<Task[]>("/tasks");
      setTasks(res.data);
    } catch (e: any) {
      setErr(e?.response?.data?.message || "Failed to load tasks");
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function create() {
    setErr("");
    setLoading(true);
    try {
      await api.post("/tasks", form);
      setForm(emptyForm);
      await load();
    } catch (e: any) {
      setErr(e?.response?.data?.message || "Create failed");
    } finally {
      setLoading(false);
    }
  }

  async function update(id: number) {
    setErr("");
    setLoading(true);
    try {
      await api.put(`/tasks/${id}`, form);
      setEditingId(null);
      setForm(emptyForm);
      await load();
    } catch (e: any) {
      setErr(e?.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  }

  async function remove(id: number) {
    setErr("");
    try {
      await api.delete(`/tasks/${id}`);
      await load();
    } catch (e: any) {
      setErr(e?.response?.data?.message || "Delete failed");
    }
  }

  function startEdit(t: Task) {
    setEditingId(t.id);
    setForm({
      title: t.title,
      description: t.description || "",
      status: t.status,
    });
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6 font-[Roboto]">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-3xl space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-700 mb-2">Your Tasks</h1>
        </div>

        {err && <div className="text-red-500 text-sm text-center">{err}</div>}

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <textarea
            placeholder="Description"
            value={form.description || ""}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <select
            value={form.status}
            onChange={(e) =>
              setForm({ ...form, status: e.target.value as Task["status"] })
            }
            className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option>Pending</option>
            <option>In Progress</option>
            <option>Done</option>
          </select>

          <div className="flex justify-center gap-4">
            {editingId ? (
              <>
                <button
                  onClick={() => update(editingId)}
                  disabled={loading}
                  className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Saving..." : "Save"}
                </button>
                <button
                  onClick={() => {
                    setEditingId(null);
                    setForm(emptyForm);
                  }}
                  className="px-6 py-2 rounded-xl border border-gray-300 hover:bg-gray-50"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={create}
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Adding..." : "Submit"}
              </button>
            )}
          </div>
        </div>

        <div className="border-t pt-6">
          {tasks.length ? (
            <ul className="grid gap-4">
              {tasks.map((t) => (
                <li
                  key={t.id}
                  className="bg-gray-50 p-4 rounded-xl shadow-sm flex justify-between items-start border border-gray-200"
                >
                  <div>
                    <div className="flex items-center gap-3">
                      <strong className="text-lg">{t.title}</strong>
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                        {t.status}
                      </span>
                    </div>
                    {t.description && (
                      <div className="text-sm text-gray-600 mt-1">
                        {t.description}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(t)}
                      className="px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => remove(t.id)}
                      className="px-3 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center">No tasks yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
