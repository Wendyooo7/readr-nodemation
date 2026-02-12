"use client";

import { DEFAULT_MODULES } from "@/stores/module-management/constants";
import type {
  BasicModuleData,
  ModuleUnit as ModuleUnitType,
} from "@/stores/module-management/types";
import { useModuleStore } from "@/stores/module-management/module-store";
import ModuleUnit from "./module-unit";

export default function ModuleSection() {
  const modules = useModuleStore((state) => state);

  return (
    <section className="flex flex-col gap-y-10">
      {DEFAULT_MODULES.map((defaultModule) => {
        const units: ModuleUnitType[] =
          (
            modules[
              defaultModule.storeKey as keyof typeof modules
            ] as BasicModuleData[]
          )?.map((module) => ({
            ...module,
            id: module.id,
            action: module.name,
            actionIcon: defaultModule.units[0].actionIcon,
            actionCode: defaultModule.units[0].actionCode,
            popUpChild: defaultModule.units[0].popUpChild,
            isDefault: module.isDefault,
            isActive: module.isActive,
          })) || [];

        return (
          <div key={defaultModule.name}>
            <h3 className="title-4 text-gray-900 pb-4">{defaultModule.name}</h3>
            <div className="grid grid-cols-3 gap-x-5 gap-y-6">
              {units.map((unit) => (
                <ModuleUnit
                  key={unit.id}
                  id={unit.id}
                  action={unit.action}
                  actionIcon={unit.actionIcon}
                  actionCode={unit.actionCode}
                  description={unit.description}
                  isActive={unit.isActive}
                  popUpChild={unit.popUpChild}
                  isDefault={unit.isDefault}
                />
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}
