import { StateCreator } from "zustand";
import { CmsModuleSlice, ModuleStore } from "../types";
import { DEFAULT_MODULES } from "../constants";

const cmsDefaultModules =
  DEFAULT_MODULES.find((module) => module.storeKey === "CmsModules")?.units.map(
    (unit) => ({
      id: unit.id,
      name: unit.action,
      description: unit.description,
      isDefault: unit.isDefault,
      isActive: false,
    }),
  ) || [];

export const createCmsModuleSlice: StateCreator<
  ModuleStore,
  [],
  [],
  CmsModuleSlice
> = (set) => ({
  CmsModules: cmsDefaultModules,
  addCmsModule: (name: string, description?: string) =>
    set((state) => ({
      CmsModules: [
        ...state.CmsModules,
        {
          id: crypto.randomUUID(),
          name,
          description,
          isDefault: false,
          isActive: false,
        },
      ],
    })),
  toggleCmsModuleActiveState: (id: string) =>
    set((state) => ({
      CmsModules: state.CmsModules.map((module) =>
        module.id === id ? { ...module, isActive: !module.isActive } : module,
      ),
    })),
  deleteCmsModule: (id: string) =>
    set((state) => ({
      CmsModules: [
        ...state.CmsModules.filter((cmsModule) => cmsModule.id !== id),
      ],
    })),
});
