import { create } from "zustand";

export type Page = "home" | "battle" | "rewards" | "game" | "settings" | "settingBoss" | "settingQuiz" | "attack" | "shop";
interface countState {
    page: Page;
    setPage: (page: Page) => void;
}

const usePageStore = create<countState>((set) => ({
    page: "home",
    setPage: (page: Page) => {
        // const pageElem = document.querySelector(".app-container") as HTMLElement;
        // if (pageElem) pageElem.style.overflow = "hidden";
        document.body.style.overflow = "hidden";
        set({ page });
    },
}));

export default usePageStore;
