import { StateCreator } from "zustand";
import { AiModuleSlice, ModuleStore } from "../types";
import { DEFAULT_MODULES } from "../constants";

const aiDefaultModules =
  DEFAULT_MODULES.find((module) => module.storeKey === "AiModules")?.units.map(
    (unit) => ({
      id: unit.id,
      name: unit.action,
      description: unit.description,
      isDefault: unit.isDefault,
      isActive: false,
    }),
  ) || [];

export const createAiModuleSlice: StateCreator<
  ModuleStore,
  [],
  [],
  AiModuleSlice
> = (set) => ({
  AiModules: aiDefaultModules,
  addAiModule: (name: string, description?: string) =>
    set((state) => ({
      AiModules: [
        ...state.AiModules,
        {
          id: crypto.randomUUID(),
          name,
          description,
          isDefault: false,
          isActive: false,
        },
      ],
    })),
  toggleAiModuleActiveState: (id: string) =>
    set((state) => ({
      AiModules: state.AiModules.map((module) =>
        module.id === id ? { ...module, isActive: !module.isActive } : module,
      ),
    })),
  deleteAiModule: (id: string) =>
    set((state) => ({
      AiModules: state.AiModules.filter((aiModule) => aiModule.id !== id),
    })),
  editAiModule: (
    id: string,
    apiKey: string,
    apiTimeout: number,
    description?: string,
  ) =>
    set((state) => ({
      AiModules: state.AiModules.map((module) =>
        module.id === id
          ? { ...module, description, apiKey, apiTimeout }
          : module,
      ),
    })),
});
