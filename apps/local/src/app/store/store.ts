import { create } from 'zustand';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface AppState {}

export const useAppStore = create<AppState>()(() => ({}));
