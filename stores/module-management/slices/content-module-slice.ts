import { StateCreator } from "zustand";
import { ContentModuleSlice, ModuleStore } from "../types";

export const createContentModuleSlice: StateCreator<
  ModuleStore,
  [],
  [],
  ContentModuleSlice
> = (set) => ({
  ContentModules: [],
  addContentModule: (name: string, description?: string) =>
    set((state) => ({
      ContentModules: [
        ...state.ContentModules,
        { id: crypto.randomUUID(), name, description },
      ],
    })),
  deleteContentModule: (id: string) =>
    set((state) => ({
      ContentModules: [
        ...state.ContentModules.filter(
          (contentModule) => contentModule.id !== id,
        ),
      ],
    })),
});
