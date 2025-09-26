import React from 'react';
import { Plus } from 'lucide-react';

interface AddNoteCardProps {
  onAdd: () => void;
}

export const AddNoteCard: React.FC<AddNoteCardProps> = ({ onAdd }) => {
  return (
    <div 
      onClick={onAdd}
      className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl border-2 border-dashed border-blue-200 hover:border-blue-300 cursor-pointer transition-all duration-300 transform hover:scale-105 min-h-[200px] flex items-center justify-center group"
    >
      <div className="text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-200 transition-colors duration-200">
          <Plus size={32} className="text-blue-600" />
        </div>
        <p className="text-blue-600 font-medium">Ajouter une nouvelle note</p>
      </div>
    </div>
  );
};