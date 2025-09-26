import React from 'react';
import { Trash2 } from 'lucide-react';
import { Note } from '../types';

interface NoteCardProps {
  note: Note;
  onTitleClick: (note: Note) => void;
  onDelete: (id: string) => void;
}

export const NoteCard: React.FC<NoteCardProps> = ({ note, onTitleClick, onDelete }) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(note.id);
  };

  const truncateContent = (content: string, maxLength: number = 100) => {
    return content.length > maxLength ? content.substring(0, maxLength) + '...' : content;
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
      <div className="p-6">
        {/* Header avec titre et icône poubelle */}
        <div className="flex items-center justify-between mb-4">
          <h3 
            className="text-lg font-semibold text-gray-800 cursor-pointer hover:text-blue-600 transition-colors duration-200 flex-1 truncate"
            onClick={() => onTitleClick(note)}
          >
            {note.title || 'Note sans titre'}
          </h3>
          <button
            onClick={handleDelete}
            className="ml-3 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
            aria-label="Supprimer la note"
          >
            <Trash2 size={18} />
          </button>
        </div>
        
        {/* Contenu de la note */}
        <div className="text-gray-600 text-sm leading-relaxed">
          {truncateContent(note.content) || 'Aucun contenu'}
        </div>
        
        {/* Date de modification */}
        <div className="mt-4 text-xs text-gray-400">
          Modifié le {note.updatedAt.toLocaleDateString('fr-FR')}
        </div>
      </div>
    </div>
  );
};