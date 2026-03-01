import { StateCreator } from "zustand";
import { CmsImportModuleSlice, ModuleStore } from "../types";
import { DEFAULT_MODULES } from "../constants";

const cmsDefaultModules =
  DEFAULT_MODULES.find((module) => module.storeKey === "CmsModules")
    ?.units.filter((unit) => unit.actionCode === "cmsImport")
    .map((unit) => ({
      id: unit.id,
      name: unit.action,
      description: unit.description,
      isDefault: unit.isDefault,
      isActive: false,
    })) || [];

export const createCmsImportModuleSlice: StateCreator<
  ModuleStore,
  [],
  [],
  CmsImportModuleSlice
> = (set) => ({
  CmsImportModules: cmsDefaultModules,
  addCmsImportModule: (name: string, description?: string) =>
    set((state) => ({
      CmsImportModules: [
        ...state.CmsImportModules,
        {
          id: crypto.randomUUID(),
          name,
          description,
          isDefault: false,
          isActive: false,
        },
      ],
    })),
  toggleCmsImportModuleActiveState: (id: string) =>
    set((state) => ({
      CmsImportModules: state.CmsImportModules.map((module) =>
        module.id === id ? { ...module, isActive: !module.isActive } : module,
      ),
    })),
  deleteCmsImportModule: (id: string) =>
    set((state) => ({
      CmsImportModules: state.CmsImportModules.filter(
        (cmsModule) => cmsModule.id !== id,
      ),
    })),
  editCmsImportModule: (
    id: string,
    apiEndpoint: string,
    apiKey: string,
    description?: string,
  ) =>
    set((state) => ({
      CmsImportModules: state.CmsImportModules.map((module) =>
        module.id === id
          ? { ...module, description, apiEndpoint, apiKey }
          : module,
      ),
    })),
});
