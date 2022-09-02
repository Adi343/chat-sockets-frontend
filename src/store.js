import create from "zustand/react";

export const useStore = create((set) => ({
  chatData: [],
  addChat: (data) =>
    set((state) => ({
      chatData: [...state.chatData, data],
    })),
}));
