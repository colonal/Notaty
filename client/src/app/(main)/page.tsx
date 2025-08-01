"use client";

import ConfirmDialog from "@/components/ConfirmDialog";
import NoteCard from "@/components/NoteCard";
import NoteDialog from "@/components/NoteDialog";
import { Note, deleteNote, getNotes } from "@/services/api";
import { useEffect, useState } from "react";

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create");
  const [selectedNote, setSelectedNote] = useState<Note | undefined>();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState<string | null>(null);

  const handleOpenDialog = (mode: "create" | "edit", noteId?: string) => {
    setDialogMode(mode);
    setSelectedNote(mode === "edit" ? { id: noteId } as Note : undefined);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedNote(undefined);
  };

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await getNotes();
      setNotes(response.data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch notes");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (noteId: string) => {
    setNoteToDelete(noteId);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!noteToDelete) return;

    setIsDeleting(true);
    try {
      await deleteNote(noteToDelete);
      setNotes(notes.filter(note => note.id !== noteToDelete));
      setIsConfirmOpen(false);
      setNoteToDelete(null);
    } catch (err) {
      console.error("Failed to delete note:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = (note: Note) => {
    handleOpenDialog("edit", note.id);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-[var(--text-primary)]">My Notes</h1>
            <button
              className="bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2"
              onClick={() => handleOpenDialog("create", undefined)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              New Note
            </button>
          </div>

          <NoteDialog
            isOpen={isDialogOpen}
            onClose={handleCloseDialog}
            onSuccess={fetchNotes}
            mode={dialogMode}
            noteId={selectedNote?.id}
          />

          {loading ? (
            <div className="flex justify-center items-center h-[calc(100vh-12rem)]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0066FF]"></div>
            </div>
          ) : error ? (
            <div className="bg-red-900/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          ) : notes.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[calc(100vh-12rem)]">
              <p className="text-gray-400 text-lg mb-4">No notes found. Create your first note!</p>
              <button
                onClick={() => handleOpenDialog("create", undefined)}
                className="text-[#0066FF] hover:text-blue-400 transition-colors duration-200"
              >
                Create Note
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {notes.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  onEdit={handleEdit}
                  onDelete={handleDeleteClick}
                />
              ))}
            </div>
          )}

          <ConfirmDialog
            isOpen={isConfirmOpen}
            onClose={() => {
              setIsConfirmOpen(false);
              setNoteToDelete(null);
            }}
            onConfirm={handleConfirmDelete}
            title="Delete Note"
            message="Are you sure you want to delete this note? This action cannot be undone."
            isLoading={isDeleting}
          />
        </div>
      </div>
    </div>
  );
}
