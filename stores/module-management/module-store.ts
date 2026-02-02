import { create } from "zustand";

export type Module = {
  name: string;
  description?: string;
};

type ModuleStore = {
  AiModules: Module[];
  addAiModule: (module: Module) => void;

  CmsModules: Module[];
  addCmsModule: (module: Module) => void;

  CodeModules: Module[];
  addCodeModule: (module: Module) => void;

  ExportModules: Module[];
  addExportModule: (module: Module) => void;
};

export const useModuleStore = create<ModuleStore>((set) => ({
  AiModules: [],
  addAiModule: (module) =>
    set((state) => ({ AiModules: [...state.AiModules, module] })),

  CmsModules: [],
  addCmsModule: (module) =>
    set((state) => ({ CmsModules: [...state.CmsModules, module] })),

  CodeModules: [],
  addCodeModule: (module) =>
    set((state) => ({ CodeModules: [...state.CodeModules, module] })),

  ExportModules: [],
  addExportModule: (module) =>
    set((state) => ({ ExportModules: [...state.ExportModules, module] })),
}));
