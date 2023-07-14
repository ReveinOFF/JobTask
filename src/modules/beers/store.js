import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useStoreBeers = create(
  devtools((set) => ({
    data: [],
    isLoading: true,
    addData: (beers) =>
      set(() => ({
        isLoading: true,
        data: [...beers],
        isLoading: false,
      })),
    updateData: (beers) =>
      set((state) => ({
        isLoading: true,
        data: [...state.data, ...beers],
        isLoading: false,
      })),
    removeData: (beerId) =>
      set((state) => ({
        isLoading: true,
        data: state.data.filter((beer) => beer.id !== beerId),
        isLoading: false,
      })),
  }))
);
