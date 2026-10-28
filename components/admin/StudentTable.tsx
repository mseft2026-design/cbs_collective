"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Edit2, Trash2, Eye, EyeOff, User, Loader2, Search, Plus, ExternalLink } from "lucide-react";
import { Student } from "@/types/student";
import { getStorageUrl, formatInterests } from "@/lib/utils";
import { deleteStudent, togglePublished } from "@/lib/actions";

interface StudentTableProps {
  students: Student[];
}

function DeleteButton({ id, name }: { id: string; name: string }) {
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);

  if (confirming) {
    return (
      <div className="flex items-center gap-1.5 p-1 rounded-lg bg-red-500/15 border border-red-500/30">
        <span className="text-[11px] text-red-300 font-medium px-1">Delete &ldquo;{name}&rdquo;?</span>
        <button
          onClick={async () => {
            try {
              setLoading(true);
              await deleteStudent(id);
            } catch (err: unknown) {
              setLoading(false);
              setConfirming(false);
              alert(err instanceof Error ? err.message : "Failed to delete student");
            }
          }}
          disabled={loading}
          className="px-2 py-1 text-[11px] bg-red-600 hover:bg-red-700 text-white rounded font-semibold transition-colors flex items-center gap-1"
        >
          {loading ? <Loader2 size={11} className="animate-spin" /> : null}
          Confirm
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="px-2 py-1 text-[11px] bg-white/10 hover:bg-white/15 text-white/80 rounded transition-colors"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="p-1.5 text-white/40 hover:text-red-400 transition-colors rounded-lg hover:bg-red-500/10"
      aria-label={`Delete ${name}`}
      title="Delete student"
    >
      <Trash2 size={15} />
    </button>
  );
}

function PublishToggle({ student }: { student: Student }) {
  const [loading, setLoading] = useState(false);
  const [published, setPublished] = useState(student.published);

  async function toggle() {
    setLoading(true);
    const next = !published;
    setPublished(next);
    try {
      await togglePublished(student.id, next);
    } catch {
      setPublished(!next);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={`p-1.5 rounded-lg transition-colors ${
        published
          ? "text-emerald-400 hover:bg-emerald-500/10"
          : "text-white/30 hover:text-white/60 hover:bg-white/5"
      }`}
      aria-label={published ? "Unpublish student" : "Publish student"}
      title={published ? "Currently Live (Click to unpublish)" : "Draft / Hidden (Click to publish)"}
    >
      {loading ? (
        <Loader2 size={15} className="animate-spin text-white/40" />
      ) : published ? (
        <Eye size={15} />
      ) : (
        <EyeOff size={15} />
      )}
    </button>
  );
}

export function StudentTable({ students }: StudentTableProps) {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "published" | "draft">("all");

  const filtered = students.filter((s) => {
    const matchesSearch = s.full_name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "published" && s.published) ||
      (filterStatus === "draft" && !s.published);
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4">
      {/* Search & Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-1 max-w-md">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="search"
              placeholder="Search scholars by name…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-site pl-10 text-xs py-2.5"
              id="admin-student-search"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Status filter tabs */}
          <div className="inline-flex rounded-lg border border-white/8 bg-[#090d16] p-0.5 text-xs">
            <button
              onClick={() => setFilterStatus("all")}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                filterStatus === "all"
                  ? "bg-white/10 text-white shadow-sm"
                  : "text-white/50 hover:text-white"
              }`}
            >
              All ({students.length})
            </button>
            <button
              onClick={() => setFilterStatus("published")}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                filterStatus === "published"
                  ? "bg-emerald-500/15 text-emerald-300 shadow-sm"
                  : "text-white/50 hover:text-white"
              }`}
            >
              Published ({students.filter((s) => s.published).length})
            </button>
            <button
              onClick={() => setFilterStatus("draft")}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                filterStatus === "draft"
                  ? "bg-amber-500/15 text-amber-300 shadow-sm"
                  : "text-white/50 hover:text-white"
              }`}
            >
              Draft ({students.filter((s) => !s.published).length})
            </button>
          </div>

          <Link href="/admin/students/new" className="btn-primary py-2 px-3.5 text-xs">
            <Plus size={14} />
            <span>Add Student</span>
          </Link>
        </div>
      </div>

      {/* Table Container */}
      <div className="glass-card overflow-hidden border-white/8 shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/8 bg-white/4">
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-white/50 uppercase tracking-wider">
                  Scholar (1:1 Photo &amp; Name)
                </th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-white/50 uppercase tracking-wider hidden md:table-cell">
                  Specialisation / Interests
                </th>
                <th className="text-center px-5 py-3.5 text-xs font-semibold text-white/50 uppercase tracking-wider">
                  Visibility
                </th>
                <th className="text-center px-5 py-3.5 text-xs font-semibold text-white/50 uppercase tracking-wider">
                  Order
                </th>
                <th className="text-right px-5 py-3.5 text-xs font-semibold text-white/50 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/6">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-16 text-white/40 text-xs">
                    {search || filterStatus !== "all"
                      ? "No scholars match the search or filter criteria."
                      : "No student records found in the database. Click 'Add Student' above to create one."}
                  </td>
                </tr>
              ) : (
                filtered.map((student) => {
                  const photoUrl = getStorageUrl("student-photos", student.photo_path);
                  return (
                    <tr key={student.id} className="hover:bg-white/4 transition-colors">
                      {/* Scholar Info with Square 1:1 Thumbnail */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3.5">
                          {/* 1:1 Square Thumbnail */}
                          <div className="w-11 h-11 rounded-lg overflow-hidden bg-[#0a0f1d] shrink-0 border border-white/12 shadow-inner relative">
                            {photoUrl ? (
                              <Image
                                src={photoUrl}
                                alt={student.full_name}
                                width={44}
                                height={44}
                                className="object-cover w-full h-full"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#121a2d] to-[#0a0f1d]">
                                <User size={16} className="text-white/30" />
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-white text-sm tracking-tight">
                              {student.full_name}
                            </p>
                            <div className="flex items-center gap-2 mt-0.5">
                              {student.cv_path ? (
                                <span className="text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20">
                                  CV Attached
                                </span>
                              ) : (
                                <span className="text-[10px] text-white/30 font-mono">No CV</span>
                              )}
                              {student.linkedin_url && (
                                <a
                                  href={student.linkedin_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[10px] text-[var(--site-accent)] hover:underline flex items-center gap-0.5"
                                >
                                  LinkedIn <ExternalLink size={9} />
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Interests */}
                      <td className="px-5 py-3.5 hidden md:table-cell">
                        <p className="text-xs text-white/70 max-w-[240px] truncate">
                          {formatInterests(student.interests) || "—"}
                        </p>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-3.5 text-center">
                        <span className={student.published ? "badge-published" : "badge-draft"}>
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              student.published ? "bg-emerald-400" : "bg-amber-400"
                            }`}
                          />
                          {student.published ? "Published" : "Draft"}
                        </span>
                      </td>

                      {/* Order */}
                      <td className="px-5 py-3.5 text-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-white/5 border border-white/10 text-[#d4af37]">
                          {String(student.display_order ?? 0).padStart(2, "0")}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center justify-end gap-1.5">
                          <PublishToggle student={student} />
                          <Link
                            href={`/admin/students/${student.id}/edit`}
                            className="p-1.5 text-white/40 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                            aria-label={`Edit ${student.full_name}`}
                            title="Edit profile"
                          >
                            <Edit2 size={15} />
                          </Link>
                          <DeleteButton id={student.id} name={student.full_name} />
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-white/40 px-1 pt-1">
        <span>
          Showing {filtered.length} of {students.length} scholars
        </span>
        <span className="font-mono">Centre for Budget Studies • Batch 2026–2028</span>
      </div>
    </div>
  );
}
