"use client";

import { useState } from "react";
import { useModuleStore } from "@/stores/module-management/module-store";
import ModuleSettingPopUpLayout from "./module-setting-popup-layout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

type AiModulePopUpChildProps = {
  id: string;
  action: string;
  initialDescription?: string;
  initialApiKey?: string;
  initialApiTimeout?: number;
};

export default function AiModulePopUpChild({
  id,
  action,
  initialDescription,
  initialApiKey = "",
  initialApiTimeout = 30,
}: AiModulePopUpChildProps) {
  const { editAiModule } = useModuleStore();

  const [isOpen, setIsOpen] = useState(false);
  const [description, setDescription] = useState(initialDescription || "");
  const [apiKey, setApiKey] = useState(initialApiKey);
  const [apiTimeout, setApiTimeout] = useState(initialApiTimeout);

  const handleSave = () => {
    editAiModule(id, apiKey, apiTimeout, description);
    setIsOpen(false);
  };

  const labelStyle = "title-6 text-gray-900 mb-2";
  const inputBasicStyle =
    "border border-gray-400 rounded-lg py-2 px-3 bg-white body-2 text-gray-900";
  const inputPseudoStyle =
    "placeholder:text-gray-600 focus-visible:outline-none focus-visible:ring-0 focus-visible:border-gray-600";

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="border-none has-[>svg]:px-2 hover:bg-gray-300">
          <Settings size={16} color="#6e6b5e" />
        </Button>
      </DialogTrigger>
      <ModuleSettingPopUpLayout
        action={action}
        description={description}
        onDescriptionChange={setDescription}
        onSave={handleSave}
      >
        <div>
          <h4 className="title-6 text-gray-600 mb-1">AI 設定</h4>
          <div className="flex flex-col gap-y-3">
            <div>
              <Label htmlFor="api-key" className={labelStyle}>
                API 金鑰
              </Label>
              <Input
                id="api-key"
                name="API 金鑰"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className={cn(inputBasicStyle, inputPseudoStyle)}
              />
            </div>
            <div>
              <Label htmlFor="api-timeout" className={labelStyle}>
                逾時時間（秒）
              </Label>
              <Input
                type="number"
                id="api-timeout"
                name="逾時時間"
                value={apiTimeout}
                onChange={(e) => setApiTimeout(Number(e.target.value))}
                className={cn(inputBasicStyle, inputPseudoStyle)}
              />
            </div>
          </div>
        </div>
      </ModuleSettingPopUpLayout>
    </Dialog>
  );
}
