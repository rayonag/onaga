import { create } from "zustand";

export type Page = "home" | "battle" | "rewards" | "game" | "settings" | "settingBoss" | "settingQuiz" | "attack" | "shop";
interface countState {
    page: Page;
    setPage: (page: Page) => void;
}

const usePageStore = create<countState>((set) => ({
    page: "home",
    setPage: (page: Page) => set({ page }),
}));

export default usePageStore;
