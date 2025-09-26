import { useState, useEffect } from 'react';
import { addNote, updateNote, deleteNote, getNotes } from '../services/firebaseNote';
import { Note } from '../types';

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  // Charger les notes depuis Firestore
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const notesFromFirestore = await getNotes();
        setNotes(notesFromFirestore);
      } catch (error) {
        console.error('Erreur lors du chargement des notes:', error);
      }
    };

    fetchNotes();
  }, []);

  const addNewNote = async (noteData: Partial<Note>) => {
    try {
      const newNote = await addNote(noteData);
      // Assure-toi que newNote a toutes les propriétés nécessaires
      const noteToAdd: Note = {
        id: newNote.id,
        title: newNote.title || 'Note sans titre',
        content: newNote.content || '',
        createdAt: newNote.createdAt || new Date(),
        updatedAt: newNote.updatedAt || new Date(),
      };
      setNotes((prevNotes) => [noteToAdd, ...prevNotes]);
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la note:', error);
    }
  };


  const updateExistingNote = async (id: string, noteData: Partial<Note>) => {
    try {
      await updateNote(id, noteData);
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === id
            ? {
                ...note,
                ...noteData,
                // Assurer que `updatedAt` est toujours défini
                updatedAt: new Date(),
              }
            : note
        )
      );
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la note:', error);
    }
  };


  const deleteExistingNote = async (id: string) => {
    try {
      await deleteNote(id);
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression de la note:', error);
    }
  };

  return {
    notes,
    addNote: addNewNote,
    updateNote: updateExistingNote,
    deleteNote: deleteExistingNote,
  };
};
