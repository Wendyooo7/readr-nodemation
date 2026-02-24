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

type ContentModulePopUpChildProps = {
  id: string;
  action: string;
  initialDescription?: string;
  initialoutputFormat?: string;
};

export default function ContentModulePopUpChild({
  id,
  action,
  initialDescription,
  initialoutputFormat = "CSV",
}: ContentModulePopUpChildProps) {
  const { editContentModule } = useModuleStore();

  const [isOpen, setIsOpen] = useState(false);
  const [description, setDescription] = useState(initialDescription || "");
  const [outputFormat, setOutputFormat] = useState(initialoutputFormat || "");

  const handleSave = () => {
    editContentModule(id, outputFormat, description);
    setIsOpen(false);
  };

  const labelStyle = "title-6 text-gray-900 mb-2";
  const inputBasicStyle =
    "border border-gray-400 rounded-lg py-2 px-3 bg-white body-2 text-gray-900";
  const selectTriggerStyle =
    "w-full cursor-pointer data-[placeholder]:text-gray-600 data-[state=open]:border-gray-600";
  const exportFormats = ["CSV", "JSON", "Markdown", "TXT"];

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
          <h4 className="title-6 text-gray-600 mb-1">內容整理設定</h4>
          <div className="body-2">
            <Label htmlFor="output-format" className={labelStyle}>
              預設輸出格式
            </Label>
            <Select value={outputFormat} onValueChange={setOutputFormat}>
              <SelectTrigger
                id="output-format"
                className={cn(inputBasicStyle, selectTriggerStyle)}
              >
                <SelectValue placeholder="請選擇格式" />
              </SelectTrigger>

              <SelectContent side="bottom" sideOffset={9}>
                {exportFormats.map((format) => (
                  <SelectItem
                    key={format}
                    value={format}
                    className="cursor-pointer"
                  >
                    {format}
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
