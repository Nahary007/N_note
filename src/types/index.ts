export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PopupState {
  isOpen: boolean;
  note: Note | null;
  isEditing: boolean;
}