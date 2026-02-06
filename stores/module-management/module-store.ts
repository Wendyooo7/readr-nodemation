import { create } from "zustand";
import { ModuleStore } from "./types";
import { createAiModuleSlice } from "./slices/ai-module-slice";
import { createCodeModuleSlice } from "./slices/code-module-slice";
import { createCmsModuleSlice } from "./slices/cms-module-slice";
import { createContentModuleSlice } from "./slices/content-module-slice";

export const useModuleStore = create<ModuleStore>((set, get, StoreApi) => ({
  ...createAiModuleSlice(set, get, StoreApi),
  ...createCmsModuleSlice(set, get, StoreApi),
  ...createCodeModuleSlice(set, get, StoreApi),
  ...createContentModuleSlice(set, get, StoreApi),
}));
