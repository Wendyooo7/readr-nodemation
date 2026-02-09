import { StateCreator } from "zustand";
import { CodeModuleSlice, ModuleStore } from "../types";

export const createCodeModuleSlice: StateCreator<
  ModuleStore,
  [],
  [],
  CodeModuleSlice
> = (set) => ({
  CodeModules: [],
  addCodeModule: (name: string, description?: string) =>
    set((state) => ({
      CodeModules: [
        ...state.CodeModules,
        { id: crypto.randomUUID(), name, description },
      ],
    })),
  deleteCodeModule: (id: string) =>
    set((state) => ({
      CodeModules: [
        ...state.CodeModules.filter((codeModule) => codeModule.id !== id),
      ],
    })),
});
