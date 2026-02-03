"use client";

import { DEFAULT_MODULES } from "@/stores/module-management/constants";
import ModuleUnit from "./module-unit";

export default function ModuleSection() {
  return (
    <section className="flex flex-col gap-y-10">
      {DEFAULT_MODULES.map((type) => (
        <div key={type.name}>
          <h3 className="title-4 text-gray-900 pb-4">{type.name}</h3>
          <div className="grid grid-cols-3 gap-x-5 gap-y-6">
            {type.units.map((unit) => (
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
      ))}
    </section>
  );
}
