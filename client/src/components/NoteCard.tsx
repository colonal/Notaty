import { DeleteIcon, EditIcon } from "@/components/icons";
import { Note } from "@/services/api";
import { formatDistanceToNow } from "date-fns";

interface NoteCardProps {
    note: Note;
    onEdit?: (note: Note) => void;
    onDelete?: (noteId: string) => void;
}

export default function NoteCard({ note, onEdit, onDelete }: NoteCardProps) {
    const formattedDate = formatDistanceToNow(new Date(note.updatedAt), {
        addSuffix: true,
    });

    return (
        <div className="bg-[var(--card-bg)] rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-[var(--card-border)] hover:border-[var(--primary)]/30">
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-[var(--text-primary)] line-clamp-1">
                        {note.title}
                    </h3>
                    <div className="flex space-x-2">
                        {onEdit && (
                            <button
                                onClick={() => onEdit(note)}
                                className="text-[var(--primary)] hover:text-[var(--primary-hover)] transition-colors duration-200"
                            >
                                <EditIcon />
                            </button>
                        )}
                        {onDelete && (
                            <button
                                onClick={() => onDelete(note.id)}
                                className="text-[var(--error)] hover:opacity-80 transition-colors duration-200"
                            >
                                <DeleteIcon />
                            </button>
                        )}
                    </div>
                </div>
                <p className="text-[var(--text-secondary)] mb-4 line-clamp-3">
                    {note.content}
                </p>
                <div className="flex justify-between items-center text-sm text-[var(--text-secondary)]">
                    <span>{formattedDate}</span>
                </div>
            </div>
        </div>
    );
}