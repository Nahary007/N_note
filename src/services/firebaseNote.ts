import { db } from '../firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, orderBy } from 'firebase/firestore';
import { Note } from '../types';

// Référence à la collection 'notes' dans Firestore
const notesCollectionRef = collection(db, 'notes');

    // Ajouter une note
    export const addNote = async (noteData: Partial<Note>) => {
    try {
        const docRef = await addDoc(notesCollectionRef, {
        title: noteData.title || 'Note sans titre',
        content: noteData.content || '',
        createdAt: new Date(),
        updatedAt: new Date(),
        });
        // Retourner un objet complet de type Note
        return {
        id: docRef.id,
        title: noteData.title || 'Note sans titre',
        content: noteData.content || '',
        createdAt: new Date(),
        updatedAt: new Date(),
        };
    } catch (error) {
        console.error('Erreur lors de l\'ajout de la note :', error);
        throw error;
    }
    };


// Mettre à jour une note
export const updateNote = async (id: string, noteData: Partial<Note>) => {
  try {
    const noteDocRef = doc(db, 'notes', id);
    await updateDoc(noteDocRef, {
      ...noteData,
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la note :', error);
    throw error;
  }
};

// Supprimer une note
export const deleteNote = async (id: string) => {
  try {
    const noteDocRef = doc(db, 'notes', id);
    await deleteDoc(noteDocRef);
  } catch (error) {
    console.error('Erreur lors de la suppression de la note :', error);
    throw error;
  }
};

// Lire toutes les notes
export const getNotes = async () => {
  try {
    const q = query(notesCollectionRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const notes: Note[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      // S'assurer que les données sont bien typées en tant que `Note`
      notes.push({
        id: doc.id,
        title: data.title || 'Note sans titre',
        content: data.content || '',
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      });
    });
    return notes;
  } catch (error) {
    console.error('Erreur lors de la récupération des notes :', error);
    throw error;
  }
};

