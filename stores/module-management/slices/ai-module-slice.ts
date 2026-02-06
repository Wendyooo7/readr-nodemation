import { StateCreator } from "zustand";
import { AiModuleSlice, ModuleStore } from "../types";

export const createAiModuleSlice: StateCreator<
  ModuleStore,
  [],
  [],
  AiModuleSlice
> = (set) => ({
  AiModules: [],
  addAiModule: (name: string, description?: string) =>
    set((state) => ({
      AiModules: [
        ...state.AiModules,
        { id: crypto.randomUUID(), name, description },
      ],
    })),
});
