import supabase from "@/supabase";
import { create } from "zustand";

interface shopState {
    shop: { item: string; id: number; price: number }[];
    getShop: () => any;
    increasePrice: (currentPrice: number, itemId: number) => any;
}

const useShopStore = create<shopState>((set, get) => ({
    shop: [],
    getShop: async () => {
        const { data, error } = await supabase.from("shop").select("*");
        if (error || !data) return alert("Something went wrong");
        set({ shop: data.map((d: any) => ({ id: d.id, item: d.item, price: d.price })) });
    },
    increasePrice: async (currentPrice: number, itemId: number) => {
        const { data, error } = await supabase
            .from("shop")
            .update({ price: Math.floor(currentPrice * 1.1) })
            .eq("id", itemId);
        if (error) return alert("Something went wrong");
        await get().getShop();
    },
}));

export default useShopStore;
