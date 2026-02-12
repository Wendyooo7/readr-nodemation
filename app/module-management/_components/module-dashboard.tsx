"use client";

import { useModuleStore } from "@/stores/module-management/module-store";
import { useShallow } from "zustand/react/shallow";

export default function ModuleDashboard() {
  const { AiModules, CodeModules, CmsModules, ContentModules } = useModuleStore(
    useShallow((state) => ({
      AiModules: state.AiModules,
      CodeModules: state.CodeModules,
      CmsModules: state.CmsModules,
      ContentModules: state.ContentModules,
    })),
  );

  const allTypesModules = [
    ...AiModules,
    ...CodeModules,
    ...CmsModules,
    ...ContentModules,
  ];

  const activeModulesLen = allTypesModules.filter(
    (module) => module.isActive === true,
  ).length;

  const inactiveModulesLen = allTypesModules.length - activeModulesLen;

  const moduleDashboardUnits = [
    { id: "sum", name: "模組總數", number: allTypesModules.length },
    { id: "active", name: "已啟用", number: activeModulesLen },
    { id: "inactive", name: "未啟用", number: inactiveModulesLen },
  ];

  return (
    <div className="grid grid-cols-3 px-6 py-4 bg-white border border-gray-400 rounded-xl">
      {moduleDashboardUnits.map((unit) => (
        <div key={unit.id}>
          <div className="title-6 text-gray-600">{unit.name}</div>
          <div className="title-1 text-gray-900">{unit.number}</div>
        </div>
      ))}
    </div>
  );
}
