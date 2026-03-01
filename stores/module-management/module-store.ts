import { create } from "zustand";
import { ModuleStore } from "./types";
import { createAiModuleSlice } from "./slices/ai-module-slice";
import { createCodeModuleSlice } from "./slices/code-module-slice";
import { createCmsImportModuleSlice } from "./slices/cms-import-module-slice";
import { createCmsExportModuleSlice } from "./slices/cms-export-module-slice";
import { createContentModuleSlice } from "./slices/content-module-slice";

export const useModuleStore = create<ModuleStore>((set, get, StoreApi) => ({
  ...createAiModuleSlice(set, get, StoreApi),
  ...createCmsImportModuleSlice(set, get, StoreApi),
  ...createCmsExportModuleSlice(set, get, StoreApi),
  ...createCodeModuleSlice(set, get, StoreApi),
  ...createContentModuleSlice(set, get, StoreApi),
}));
