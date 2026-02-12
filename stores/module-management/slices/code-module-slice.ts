import { StateCreator } from "zustand";
import { CodeModuleSlice, ModuleStore } from "../types";
import { DEFAULT_MODULES } from "../constants";

const codeDefaultModules =
  DEFAULT_MODULES.find(
    (module) => module.storeKey === "CodeModules",
  )?.units.map((unit) => ({
    id: unit.id,
    name: unit.action,
    description: unit.description,
    isDefault: unit.isDefault,
    isActive: false,
  })) || [];

export const createCodeModuleSlice: StateCreator<
  ModuleStore,
  [],
  [],
  CodeModuleSlice
> = (set) => ({
  CodeModules: codeDefaultModules,
  addCodeModule: (name: string, description?: string) =>
    set((state) => ({
      CodeModules: [
        ...state.CodeModules,
        {
          id: crypto.randomUUID(),
          name,
          description,
          isDefault: false,
          isActive: false,
        },
      ],
    })),
  toggleCodeModuleActiveState: (id: string) =>
    set((state) => ({
      CodeModules: state.CodeModules.map((module) =>
        module.id === id ? { ...module, isActive: !module.isActive } : module,
      ),
    })),
  deleteCodeModule: (id: string) =>
    set((state) => ({
      CodeModules: [
        ...state.CodeModules.filter((codeModule) => codeModule.id !== id),
      ],
    })),
});
