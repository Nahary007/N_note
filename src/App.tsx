import React, { useState } from 'react';
import { NoteCard } from './components/NoteCard';
import { AddNoteCard } from './components/AddNoteCard';
import { NotePopup } from './components/NotePopup';
import { useNotes } from './hooks/useNotes';
import { Note, PopupState } from './types';
import { StickyNote } from 'lucide-react';

function App() {
  const { notes, addNote, updateNote, deleteNote } = useNotes();
  const [popupState, setPopupState] = useState<PopupState>({
    isOpen: false,
    note: null,
    isEditing: false,
  });

  const handleTitleClick = (note: Note) => {
    setPopupState({
      isOpen: true,
      note,
      isEditing: false,
    });
  };

  const handleAddNote = () => {
    setPopupState({
      isOpen: true,
      note: null,
      isEditing: true,
    });
  };

  const handleClosePopup = () => {
    setPopupState({
      isOpen: false,
      note: null,
      isEditing: false,
    });
  };

  const handleSaveNote = (noteData: Partial<Note>) => {
    if (popupState.isEditing && !popupState.note) {
      // Nouvelle note
      addNote(noteData);
    } else if (popupState.note) {
      // Mise à jour d'une note existante
      updateNote(popupState.note.id, noteData);
    }
    handleClosePopup();
  };

  const handleDeleteNote = (id: string) => {
    deleteNote(id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <StickyNote className="text-blue-600" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Mes Notes</h1>
              <p className="text-sm text-gray-600">
                {notes.length} {notes.length === 1 ? 'note' : 'notes'} au total
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {/* Carte d'ajout de note */}
          <AddNoteCard onAdd={handleAddNote} />
          
          {/* Liste des notes */}
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onTitleClick={handleTitleClick}
              onDelete={handleDeleteNote}
            />
          ))}
        </div>

        {/* Message si aucune note */}
        {notes.length === 0 && (
          <div className="text-center py-12">
            <StickyNote size={64} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucune note pour le moment
            </h3>
            <p className="text-gray-500">
              Cliquez sur le bouton + pour créer votre première note
            </p>
          </div>
        )}
      </main>

      {/* Popup de modification/création */}
      <NotePopup
        isOpen={popupState.isOpen}
        note={popupState.note}
        isNewNote={popupState.isEditing && !popupState.note}
        onClose={handleClosePopup}
        onSave={handleSaveNote}
      />
    </div>
  );
}

export default App;