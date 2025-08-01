"use client";

import { CloseIcon, LoadingSpinner } from "@/components/icons";
import { createNote, getNote, updateNote } from "@/services/api";
import { useEffect, useState } from "react";

interface NoteDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    mode: "create" | "edit";
    noteId?: string;
}

export default function NoteDialog({
    isOpen,
    onClose,
    onSuccess,
    mode,
    noteId,
}: NoteDialogProps) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [timestamps, setTimestamps] = useState<{ createdAt?: string; updatedAt?: string }>({});
    useEffect(() => {
        const fetchNote = async () => {
            if (mode === "edit" && noteId) {
                setIsFetching(true);
                setError(null);
                try {
                    const response = await getNote(noteId);
                    const note = response.data;
                    setTitle(note.title);
                    setContent(note.content);
                    setTimestamps({
                        createdAt: note.createdAt,
                        updatedAt: note.updatedAt
                    });
                } catch (err) {
                    setError(err instanceof Error ? err.message : "Failed to fetch note");
                    onClose();
                } finally {
                    setIsFetching(false);
                }
            } else {
                setTitle("");
                setContent("");
            }
        };

        if (isOpen) {
            fetchNote();
        }
    }, [mode, noteId, onClose, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            if (mode === "edit" && noteId) {
                await updateNote({
                    _id: noteId,
                    title,
                    content,
                });
            } else {
                await createNote({ title, content });
            }
            setTitle("");
            setContent("");
            onSuccess();
            onClose();
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : `Failed to ${mode === "create" ? "create" : "update"} note`
            );
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-[var(--card-bg)] rounded-lg shadow-xl w-full max-w-lg mx-4">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
                            {mode === "create" ? "Create New Note" : "Edit Note"}
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                        >
                            <CloseIcon />
                        </button>
                    </div>

                    {isFetching ? (
                        <div className="flex justify-center items-center py-12">
                            <LoadingSpinner className="w-8 h-8 border-[var(--primary)]/30 border-t-[var(--primary)]" />
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label
                                    htmlFor="title"
                                    className="block text-sm font-medium text-[var(--text-secondary)] mb-1"
                                >
                                    Title
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-[var(--card-border)] bg-[var(--background)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-colors"
                                    placeholder="Enter note title"
                                    required
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="content"
                                    className="block text-sm font-medium text-[var(--text-secondary)] mb-1"
                                >
                                    Content
                                </label>
                                <textarea
                                    id="content"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    rows={4}
                                    className="w-full px-4 py-2 rounded-lg border border-[var(--card-border)] bg-[var(--background)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-colors resize-none"
                                    placeholder="Enter note content"
                                    required
                                />
                            </div>

                            {error && (
                                <div className="text-[var(--error)] text-sm">{error}</div>
                            )}

                            {mode === "edit" && timestamps.createdAt && (
                                <div className="text-[var(--text-secondary)] text-sm space-y-1">
                                    <div>
                                        Created: {new Date(timestamps.createdAt).toLocaleString()}
                                    </div>
                                    <div>
                                        Last updated: {new Date(timestamps.updatedAt || timestamps.createdAt).toLocaleString()}
                                    </div>
                                </div>
                            )}

                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-4 py-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="px-4 py-2 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    {isLoading ? (
                                        <>
                                            <LoadingSpinner className="w-4 h-4 border-white/30 border-t-white" />
                                            {mode === "create" ? "Creating..." : "Updating..."}
                                        </>
                                    ) : mode === "create" ? (
                                        "Create Note"
                                    ) : (
                                        "Update Note"
                                    )}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}