import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";

interface EditableFieldProps {
  labelName: string;
  initialValue?: string | "";
  isLoading?: boolean;
  editable?: boolean;
}

export default function EditableField({
  labelName,
  initialValue = "",
  isLoading,
  editable,
}: EditableFieldProps) {
  const [text, setText] = useState<string>(initialValue || "Click to edit");
  const [draft, setDraft] = useState<string>(text);
  const [editing, setEditing] = useState<boolean>(false);

  useEffect(() => {
    if (initialValue) {
      setText(initialValue);
      setDraft(initialValue);
    }
  }, [initialValue]);

  const startEditing = () => {
    setDraft(text);
    setEditing(true);
  };

  const saveChanges = () => {
    setText(draft);
    setEditing(false);
  };

  const cancelChanges = () => {
    setEditing(false);
  };

  return (
    <div className="flex flex-column ">
      {editable && <Tooltip target=".editable-text" />}

      <div
        className={`flex flex-col ${editable && editing ? "gap-2" : "gap-0"}`}
      >
        <label className="text-md text-[#1aac83] font-semibold saira-font">
          {labelName}
        </label>

        {isLoading ? (
          <div className="text-gray-400 italic">...</div>
        ) : editing && editable ? (
          <div className="flex flex-row gap-2">
            <InputText
              className="input-tooltip w-full"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              autoFocus
            />
            <div className="flex gap-2">
              <Button
                icon="pi pi-check"
                onClick={saveChanges}
                className="save-btn"
                // data-pr-tooltip="Sačuvaj promene"
              />
              <Button
                icon="pi pi-times"
                onClick={cancelChanges}
                className="cancel-btn"
                outlined
                // data-pr-tooltip="Otkaži"
              />
            </div>
          </div>
        ) : (
          <div
            className="editable-text "
            onClick={() => editable && startEditing()}
            data-pr-tooltip={editable ? "Click to edit" : ""}
          >
            {text}
          </div>
        )}
      </div>
    </div>
  );
}
