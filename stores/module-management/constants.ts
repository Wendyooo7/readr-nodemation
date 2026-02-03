import type { LucideIcon } from "lucide-react";
import {
  Code2,
  Database,
  Download,
  FileSpreadsheet,
  Share2,
  Sparkles,
} from "lucide-react";

import AiModulePopUpChild from "@/app/module-management/_components/ai-module-popup-child";
import CmsModulePopUpChild from "@/app/module-management/_components/cms-module-popup-child";
import CodeModulePopUpChild from "@/app/module-management/_components/code-module-popup-child";
import ContentModulePopUpChild from "@/app/module-management/_components/content-module-popup-child";

export type PopUpChildProps = {
  action?: string;
};

export type ModuleType = {
  name: string;
  storeKey: "AiModule" | "CmsModule" | "CodeModule" | "ExportModule"; // 對應 Zustand Store 的 key
  units: ModuleUnit[];
};

export type ModuleUnit = {
  id: number;
  action: string;
  actionIcon: LucideIcon;
  actionCode: "ai" | "code" | "cms" | "content";
  description: string;
  popUpChild: React.ComponentType<PopUpChildProps>;
};

export const DEFAULT_MODULES: ModuleType[] = [
  {
    name: "AI 模組",
    storeKey: "AiModule",
    units: [
      {
        id: 1,
        action: "呼叫 AI",
        actionIcon: Sparkles,
        actionCode: "ai",
        description: "透過 AI 進行內容處理",
        popUpChild: AiModulePopUpChild,
      },
    ],
  },
  {
    name: "程式碼模組",
    storeKey: "CodeModule",
    units: [
      {
        id: 1,
        action: "撰寫程式碼",
        actionIcon: Code2,
        actionCode: "code",
        description: "輸入程式碼來處理資料",
        popUpChild: CodeModulePopUpChild,
      },
    ],
  },
  {
    name: "CMS 模組",
    storeKey: "CmsModule",
    units: [
      {
        id: 1,
        action: "從 CMS 輸入",
        actionIcon: Database,
        actionCode: "cms",
        description: "從 CMS 系統抓取內容",
        popUpChild: CmsModulePopUpChild,
      },
      {
        id: 2,
        action: "輸出到 CMS",
        actionIcon: Share2,
        actionCode: "cms",
        description: "將內容輸出到 CMS 系統",
        popUpChild: CmsModulePopUpChild,
      },
    ],
  },
  {
    name: "內容整理模組",
    storeKey: "ExportModule",
    units: [
      {
        id: 1,
        action: "匯出結果",
        actionIcon: Download,
        actionCode: "content",
        description: "將處理結果匯出為檔案",
        popUpChild: ContentModulePopUpChild,
      },
      {
        id: 2,
        action: "產出報告紀錄",
        actionIcon: FileSpreadsheet,
        actionCode: "content",
        description: "產出處理報告",
        popUpChild: ContentModulePopUpChild,
      },
    ],
  },
];
