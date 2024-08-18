import { create } from "zustand";

interface countState {
    count: number;
    increase: () => void;
    decrease: () => void;
    reset: () => void;
}

const useStore = create<countState>((set) => ({
    count: 5,
    increase: () => set((state) => ({ count: state.count + 1 })),
    decrease: () => set((state) => ({ count: state.count - 1 })),
    reset: () => set({ count: 0 }),
}));

export default useStore;
