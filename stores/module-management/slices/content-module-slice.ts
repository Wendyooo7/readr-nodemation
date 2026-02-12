import { StateCreator } from "zustand";
import { ContentModuleSlice, ModuleStore } from "../types";
import { DEFAULT_MODULES } from "../constants";

const contentDefaultModules =
  DEFAULT_MODULES.find(
    (module) => module.storeKey === "ContentModules",
  )?.units.map((unit) => ({
    id: unit.id,
    name: unit.action,
    description: unit.description,
    isDefault: unit.isDefault,
    isActive: false,
  })) || [];

export const createContentModuleSlice: StateCreator<
  ModuleStore,
  [],
  [],
  ContentModuleSlice
> = (set) => ({
  ContentModules: contentDefaultModules,
  addContentModule: (name: string, description?: string) =>
    set((state) => ({
      ContentModules: [
        ...state.ContentModules,
        {
          id: crypto.randomUUID(),
          name,
          description,
          isDefault: false,
          isActive: false,
        },
      ],
    })),
  toggleContentModuleActiveState: (id: string) =>
    set((state) => ({
      ContentModules: state.ContentModules.map((module) =>
        module.id === id ? { ...module, isActive: !module.isActive } : module,
      ),
    })),
  deleteContentModule: (id: string) =>
    set((state) => ({
      ContentModules: state.ContentModules.filter(
        (contentModule) => contentModule.id !== id,
      ),
    })),
});
