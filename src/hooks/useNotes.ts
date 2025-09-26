import { useState, useCallback } from 'react';
import { Note } from '../types';

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      title: 'Ma première note',
      content: 'Ceci est le contenu de ma première note. Je peux écrire tout ce que je veux ici et cela sera sauvegardé automatiquement.',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
    },
    {
      id: '2',
      title: 'Liste de courses',
      content: 'Pain\nLait\nOeufs\nTomates\nFromage\nPâtes',
      createdAt: new Date('2024-01-14'),
      updatedAt: new Date('2024-01-16'),
    },
    {
      id: '3',
      title: 'Idées de projet',
      content: 'Application de gestion de tâches\nSite web portfolio\nApplication de notes (en cours)\nBot Discord',
      createdAt: new Date('2024-01-13'),
      updatedAt: new Date('2024-01-17'),
    },
  ]);

  const addNote = useCallback((noteData: Partial<Note>) => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: noteData.title || 'Note sans titre',
      content: noteData.content || '',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setNotes(prev => [newNote, ...prev]);
    return newNote;
  }, []);

  const updateNote = useCallback((id: string, noteData: Partial<Note>) => {
    setNotes(prev => 
      prev.map(note => 
        note.id === id 
          ? { 
              ...note, 
              ...noteData, 
              updatedAt: new Date() 
            } 
          : note
      )
    );
  }, []);

  const deleteNote = useCallback((id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  }, []);

  const getNoteById = useCallback((id: string) => {
    return notes.find(note => note.id === id);
  }, [notes]);

  return {
    notes,
    addNote,
    updateNote,
    deleteNote,
    getNoteById,
  };
};