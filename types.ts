export interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  // Optional fields for modal details
  description?: string;
  year?: string;
  location?: string;
  client?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
}

export type CursorState = 'default' | 'hover' | 'text' | 'hidden';

export interface CursorContextType {
  cursorState: CursorState;
  setCursorState: (state: CursorState) => void;
}
