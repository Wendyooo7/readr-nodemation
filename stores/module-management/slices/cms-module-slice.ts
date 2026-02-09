import { StateCreator } from "zustand";
import { CmsModuleSlice, ModuleStore } from "../types";

export const createCmsModuleSlice: StateCreator<
  ModuleStore,
  [],
  [],
  CmsModuleSlice
> = (set) => ({
  CmsModules: [],
  addCmsModule: (name: string, description?: string) =>
    set((state) => ({
      CmsModules: [
        ...state.CmsModules,
        { id: crypto.randomUUID(), name, description },
      ],
    })),
  deleteCmsModule: (id: string) =>
    set((state) => ({
      CmsModules: [
        ...state.CmsModules.filter((cmsModule) => cmsModule.id !== id),
      ],
    })),
});
