import { cva, type VariantProps } from "class-variance-authority";
import { CircleCheck, CircleX, Trash2 } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import toggleActive from "@/public/module-management/toggle-active.svg";
import toggleInactive from "@/public/module-management/toggle-inactive.svg";
import type { ModuleUnit } from "@/stores/module-management/types";
import AiModulePopUpChild from "./ai-module-popup-child";
import CodeModulePopUpChild from "./code-module-popup-child";
import CmsModulePopUpChild from "./cms-module-popup-child";
import ContentModulePopUpChild from "./content-module-popup-child";
import { Button } from "@/components/ui/button";
import { useModuleStore } from "@/stores/module-management/module-store";

const actionIconVariants = cva(
  "flex items-center justify-center size-10 rounded-[10px] text-white",
  {
    variants: {
      actionCode: {
        ai: "bg-red-500",
        code: "bg-purple-500",
        cmsImport: "bg-green-500",
        cmsExport: "bg-green-500",
        content: "bg-blue-500",
      },
    },
    defaultVariants: {
      actionCode: "ai",
    },
  },
);

const actionCodeVariants = cva("absolute top-0 left-4 w-12 h-1 rounded-b-md", {
  variants: {
    actionCode: {
      ai: "bg-red-500",
      code: "bg-purple-500",
      cmsImport: "bg-green-500",
      cmsExport: "bg-green-500",
      content: "bg-blue-500",
    },
  },
  defaultVariants: {
    actionCode: "ai",
  },
});

const trashIconVariants = cva("cursor-pointer", {
  variants: {
    actionCode: {
      ai: "text-red-500",
      code: "text-purple-500",
      cmsImport: "text-green-500",
      cmsExport: "text-green-500",
      content: "text-blue-500",
    },
  },
  defaultVariants: {
    actionCode: "ai",
  },
});

const trashIconWrapperVariants = cva("has-[>svg]:px-2", {
  variants: {
    actionCode: {
      ai: "hover:bg-red-100",
      code: "hover:bg-purple-100",
      cmsImport: "hover:bg-green-100",
      cmsExport: "hover:bg-green-100",
      content: "hover:bg-blue-100",
    },
  },
  defaultVariants: {
    actionCode: "ai",
  },
});

export default function ModuleUnit({
  id,
  action,
  actionIcon: ActionIcon,
  actionCode,
  description,
  isActive,
  isDefault,
}: ModuleUnit &
  VariantProps<typeof actionIconVariants> &
  VariantProps<typeof actionCodeVariants> &
  VariantProps<typeof trashIconVariants> &
  VariantProps<typeof trashIconWrapperVariants>) {
  const {
    toggleAiModuleActiveState,
    toggleCodeModuleActiveState,
    toggleCmsImportModuleActiveState,
    toggleCmsExportModuleActiveState,
    toggleContentModuleActiveState,
    deleteAiModule,
    deleteCodeModule,
    deleteCmsImportModule,
    deleteCmsExportModule,
    deleteContentModule,
  } = useModuleStore();

  const handleToggle = (id: string, actionCode: string) => {
    switch (actionCode) {
      case "ai":
        toggleAiModuleActiveState(id);
        break;
      case "code":
        toggleCodeModuleActiveState(id);
        break;
      case "cmsImport":
        toggleCmsImportModuleActiveState(id);
        break;
      case "cmsExport":
        toggleCmsExportModuleActiveState(id);
        break;
      case "content":
        toggleContentModuleActiveState(id);
        break;
      default:
        break;
    }
  };

  const handleClick = (id: string, actionCode: string) => {
    switch (actionCode) {
      case "ai":
        deleteAiModule(id);
        break;
      case "code":
        deleteCodeModule(id);
        break;
      case "cmsImport":
        deleteCmsImportModule(id);
        break;
      case "cmsExport":
        deleteCmsExportModule(id);
        break;
      case "content":
        deleteContentModule(id);
        break;
      default:
        break;
    }
  };

  const renderSettingPopup = () => {
    switch (actionCode) {
      case "ai":
        return (
          <AiModulePopUpChild
            id={id}
            action={action}
            initialDescription={description}
          />
        );
      case "code":
        return (
          <CodeModulePopUpChild
            id={id}
            action={action}
            initialDescription={description}
          />
        );
      case "cmsImport":
        return (
          <CmsModulePopUpChild
            id={id}
            action={action}
            initialDescription={description}
            actionCode={actionCode}
          />
        );
      case "cmsExport":
        return (
          <CmsModulePopUpChild
            id={id}
            action={action}
            initialDescription={description}
            actionCode={actionCode}
          />
        );
      case "content":
        return (
          <ContentModulePopUpChild
            id={id}
            action={action}
            initialDescription={description}
          />
        );
    }
  };

  const activeUnit = (
    <div className="flex justify-between items-center border-t border-gray-400 pt-4">
      <div className="flex items-center gap-x-2 text-green-500">
        <CircleCheck size={16} />
        <div className="body-3">啟用中</div>
      </div>
      <div className="flex items-center gap-x-3">
        <Image
          onClick={() => handleToggle(id, actionCode)}
          src={toggleActive}
          width={30}
          height={16}
          alt="啟用模組"
          className="cursor-pointer"
        />
        {renderSettingPopup()}
        {!isDefault && (
          <Button
            onClick={() => handleClick(id, actionCode)}
            variant="ghost"
            className={cn(trashIconWrapperVariants({ actionCode }))}
          >
            <Trash2
              size={16}
              className={cn(trashIconVariants({ actionCode }))}
            />
          </Button>
        )}
      </div>
    </div>
  );

  const inactiveUnit = (
    <div className="flex justify-between items-center border-t border-gray-400 pt-4">
      <div className="flex items-center gap-x-2 text-gray-600">
        <CircleX size={16} />
        <div className="body-3">未啟用</div>
      </div>
      <div className="flex items-center gap-x-3">
        <Image
          onClick={() => handleToggle(id, actionCode)}
          src={toggleInactive}
          width={30}
          height={16}
          alt="停用模組"
          className="cursor-pointer"
        />
        {renderSettingPopup()}
        {!isDefault && (
          <Button
            onClick={() => handleClick(id, actionCode)}
            variant="ghost"
            className={cn(trashIconWrapperVariants({ actionCode }))}
          >
            <Trash2
              size={16}
              className={cn(trashIconVariants({ actionCode }))}
            />
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <div className="relative bg-white border border-gray-400 rounded-xl flex flex-col gap-y-4 p-4">
      <div className={cn(actionCodeVariants({ actionCode: actionCode }))} />
      <div className="flex gap-x-3 items-center">
        <div className={cn(actionIconVariants({ actionCode: actionCode }))}>
          <ActionIcon size={20} />
        </div>
        <div>
          <div className="title-5 text-gray-900">{action}</div>
          <div className="body-3 text-gray-700">{description}</div>
        </div>
      </div>
      {isActive ? activeUnit : inactiveUnit}
      {/* TODO: 做完 toggle 功能後：
      1. 實測決定上行用整塊/局部渲染對使用者體驗較好
      2. 承上，決定寫法要：
        (1) 維持現狀
        (2) 將 activeUnit 和 inactiveUnit 分別抽成元件
        (3) 將 activeUnit 和 inactiveUnit 不同的樣式抽成變數，用模板字符串拼接
        (4) 有其他寫法也歡迎推薦！
      */}
    </div>
  );
}
