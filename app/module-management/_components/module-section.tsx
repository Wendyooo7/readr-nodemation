"use client";

import { DEFAULT_MODULES } from "@/stores/module-management/constants";
import type {
  BasicModuleData,
  ModuleUnit as ModuleUnitType,
} from "@/stores/module-management/types";
import { useModuleStore } from "@/stores/module-management/module-store";
import ModuleUnit from "./module-unit";

export default function ModuleSection() {
  const userModules = useModuleStore((state) => state);

  return (
    <section className="flex flex-col gap-y-10">
      {DEFAULT_MODULES.map((defaultModule) => {
        const userCreatedModules: ModuleUnitType[] =
          (
            userModules[
              defaultModule.storeKey as keyof typeof userModules
            ] as BasicModuleData[]
          )?.map((module) => ({
            ...module,
            id: module.id,
            action: module.name,
            actionIcon: defaultModule.units[0].actionIcon,
            actionCode: defaultModule.units[0].actionCode,
            popUpChild: defaultModule.units[0].popUpChild,
          })) || [];

        const units = [...defaultModule.units, ...userCreatedModules];

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
                  active={true}
                  // TODO: 暫時將上行 'active' 屬性值寫死為真, 之後此屬性將由 state 接手
                  popUpChild={<unit.popUpChild />}
                />
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}
