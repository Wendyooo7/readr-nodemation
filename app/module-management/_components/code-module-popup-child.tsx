"use client";

import { useState } from "react";
import { useModuleStore } from "@/stores/module-management/module-store";
import ModuleSettingPopUpLayout from "./module-setting-popup-layout";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/custom-select";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type CodeModulePopUpChildProps = {
  id: string;
  action: string;
  initialDescription?: string;
  initialLanguage?: string;
};

export default function CodeModulePopUpChild({
  id,
  action,
  initialDescription,
  initialLanguage = "JavaScript",
}: CodeModulePopUpChildProps) {
  const { editCodeModule } = useModuleStore();

  const [isOpen, setIsOpen] = useState(false);
  const [description, setDescription] = useState(initialDescription || "");
  const [language, setLanguage] = useState(initialLanguage);

  const handleSave = () => {
    editCodeModule(id, language, description);
    setIsOpen(false);
  };

  const labelStyle = "title-6 text-gray-900 mb-2";
  const inputBasicStyle =
    "border border-gray-400 rounded-lg py-2 px-3 bg-white body-2 text-gray-900";
  const selectTriggerStyle =
    "w-full cursor-pointer data-[placeholder]:text-gray-600 data-[state=open]:border-gray-600";
  const languages = ["JavaScript", "TypeScript", "Python"];

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
          <h4 className="title-6 text-gray-600 mb-1">程式碼設定</h4>
          <div className="body-2">
            <Label htmlFor="module-type" className={labelStyle}>
              模組類型
            </Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger
                id="module-type"
                className={cn(inputBasicStyle, selectTriggerStyle)}
              >
                <SelectValue placeholder="請選擇模組類型" />
              </SelectTrigger>

              <SelectContent side="bottom" sideOffset={9}>
                {languages.map((language) => (
                  <SelectItem
                    key={language}
                    value={language}
                    className="cursor-pointer"
                  >
                    {language}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </ModuleSettingPopUpLayout>
    </Dialog>
  );
}
