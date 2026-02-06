import type { LucideIcon } from "lucide-react";

export type PopUpChildProps = {
  action?: string;
};

export type ModuleType = {
  name: string;
  storeKey: "AiModules" | "CmsModules" | "CodeModules" | "ContentModules";
  units: ModuleUnit[];
};

export type ModuleUnit = {
  id: string;
  action: string;
  actionIcon: LucideIcon;
  actionCode: "ai" | "code" | "cms" | "content";
  description: string;
  popUpChild: React.ComponentType<PopUpChildProps>;
};

export type BasicModuleData = {
  id: string;
  name: string;
  description?: string;
};

export type AiModuleSlice = {
  AiModules: BasicModuleData[];
  addAiModule: (name: string, description?: string) => void;
};

export type CodeModuleSlice = {
  CodeModules: BasicModuleData[];
  addCodeModule: (name: string, description?: string) => void;
};

export type CmsModuleSlice = {
  CmsModules: BasicModuleData[];
  addCmsModule: (name: string, description?: string) => void;
};

export type ContentModuleSlice = {
  ContentModules: BasicModuleData[];
  addContentModule: (name: string, description?: string) => void;
};

export type ModuleStore = AiModuleSlice &
  CodeModuleSlice &
  CmsModuleSlice &
  ContentModuleSlice;
