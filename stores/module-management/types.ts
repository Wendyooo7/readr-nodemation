import type { LucideIcon } from "lucide-react";

export type ModuleType = {
  name: string;
  storeKey: "AiModules" | "CmsModules" | "CodeModules" | "ContentModules";
  units: ModuleUnitConstant[];
};

export type ModuleUnitConstant = {
  id: string;
  action: string;
  actionIcon: LucideIcon;
  actionCode: "ai" | "code" | "cmsImport" | "cmsExport" | "content";
  description?: string;
  isDefault: boolean;
};

export type ModuleUnit = {
  id: string;
  action: string;
  actionIcon: LucideIcon;
  actionCode: "ai" | "code" | "cmsImport" | "cmsExport" | "content";
  description?: string;
  isDefault: boolean;
  isActive: boolean;
};

export type BasicModuleData = {
  id: string;
  name: string;
  description?: string;
  isDefault: boolean;
  isActive: boolean;
};

export type AiModuleSlice = {
  AiModules: BasicModuleData[];
  addAiModule: (name: string, description?: string) => void;
  toggleAiModuleActiveState: (id: string) => void;
  deleteAiModule: (id: string) => void;
  editAiModule: (
    id: string,
    apiKey: string,
    apiTimeout: number,
    description?: string,
  ) => void;
};

export type CodeModuleSlice = {
  CodeModules: BasicModuleData[];
  addCodeModule: (name: string, description?: string) => void;
  toggleCodeModuleActiveState: (id: string) => void;
  deleteCodeModule: (id: string) => void;
  editCodeModule: (id: string, language: string, description?: string) => void;
};

export type CmsImportModuleSlice = {
  CmsImportModules: BasicModuleData[];
  addCmsImportModule: (name: string, description?: string) => void;
  toggleCmsImportModuleActiveState: (id: string) => void;
  deleteCmsImportModule: (id: string) => void;
  editCmsImportModule: (
    id: string,
    apiEndpoint: string,
    apiKey: string,
    description?: string,
  ) => void;
};

export type CmsExportModuleSlice = {
  CmsExportModules: BasicModuleData[];
  addCmsExportModule: (name: string, description?: string) => void;
  toggleCmsExportModuleActiveState: (id: string) => void;
  deleteCmsExportModule: (id: string) => void;
  editCmsExportModule: (
    id: string,
    apiEndpoint: string,
    apiKey: string,
    description?: string,
  ) => void;
};

export type ContentModuleSlice = {
  ContentModules: BasicModuleData[];
  addContentModule: (name: string, description?: string) => void;
  toggleContentModuleActiveState: (id: string) => void;
  deleteContentModule: (id: string) => void;
  editContentModule: (
    id: string,
    outputFormat: string,
    description?: string,
  ) => void;
};

export type ModuleStore = AiModuleSlice &
  CodeModuleSlice &
  CmsImportModuleSlice &
  CmsExportModuleSlice &
  ContentModuleSlice;
