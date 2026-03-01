import { StateCreator } from "zustand";
import { CmsExportModuleSlice, ModuleStore } from "../types";
import { DEFAULT_MODULES } from "../constants";

const cmsDefaultModules =
  DEFAULT_MODULES.find((module) => module.storeKey === "CmsModules")
    ?.units.filter((unit) => unit.actionCode === "cmsExport")
    .map((unit) => ({
      id: unit.id,
      name: unit.action,
      description: unit.description,
      isDefault: unit.isDefault,
      isActive: false,
    })) || [];

export const createCmsExportModuleSlice: StateCreator<
  ModuleStore,
  [],
  [],
  CmsExportModuleSlice
> = (set) => ({
  CmsExportModules: cmsDefaultModules,
  addCmsExportModule: (name: string, description?: string) =>
    set((state) => ({
      CmsExportModules: [
        ...state.CmsExportModules,
        {
          id: crypto.randomUUID(),
          name,
          description,
          isDefault: false,
          isActive: false,
        },
      ],
    })),
  toggleCmsExportModuleActiveState: (id: string) =>
    set((state) => ({
      CmsExportModules: state.CmsExportModules.map((module) =>
        module.id === id ? { ...module, isActive: !module.isActive } : module,
      ),
    })),
  deleteCmsExportModule: (id: string) =>
    set((state) => ({
      CmsExportModules: state.CmsExportModules.filter(
        (cmsModule) => cmsModule.id !== id,
      ),
    })),
  editCmsExportModule: (
    id: string,
    apiEndpoint: string,
    apiKey: string,
    description?: string,
  ) =>
    set((state) => ({
      CmsExportModules: state.CmsExportModules.map((module) =>
        module.id === id
          ? { ...module, description, apiEndpoint, apiKey }
          : module,
      ),
    })),
});
