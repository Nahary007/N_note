import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { Note } from '../types';

interface NotePopupProps {
  isOpen: boolean;
  note: Note | null;
  isNewNote: boolean;
  onClose: () => void;
  onSave: (note: Partial<Note>) => void;
}

export const NotePopup: React.FC<NotePopupProps> = ({ 
  isOpen, 
  note, 
  isNewNote, 
  onClose, 
  onSave 
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setHasChanges(false);
    } else if (isNewNote) {
      setTitle('');
      setContent('');
      setHasChanges(false);
    }
  }, [note, isNewNote, isOpen]);

  useEffect(() => {
    if (note && !isNewNote) {
      setHasChanges(title !== note.title || content !== note.content);
    } else if (isNewNote) {
      setHasChanges(title.trim() !== '' || content.trim() !== '');
    }
  }, [title, content, note, isNewNote]);

  const handleSave = () => {
    const noteData: Partial<Note> = {
      title: title.trim() || 'Note sans titre',
      content: content.trim(),
    };

    if (!isNewNote && note) {
      noteData.id = note.id;
    }

    onSave(noteData);
    setHasChanges(false);
  };

  const handleClose = () => {
    setTitle('');
    setContent('');
    setHasChanges(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col animate-in fade-in-0 zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            {isNewNote ? 'Nouvelle note' : 'Modifier la note'}
          </h2>
          <button
            onClick={handleClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
          >
            <X size={20} />
          </button>
        </div>

        {/* Contenu */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="space-y-6">
            {/* Champ titre */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Titre
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Entrez le titre de votre note..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg"
                autoFocus
              />
            </div>

            {/* Champ contenu */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contenu
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Écrivez le contenu de votre note..."
                rows={12}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
              />
            </div>
          </div>
        </div>

        {/* Footer avec bouton Enregistrer */}
        {hasChanges && (
          <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
            <button
              onClick={handleSave}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center gap-2 font-medium"
            >
              <Save size={18} />
              Enregistrer
            </button>
          </div>
        )}
      </div>
    </div>
  );
};