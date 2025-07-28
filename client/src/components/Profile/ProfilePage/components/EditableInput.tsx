import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";

interface EditableFieldProps {
  labelName: string;
  initialValue?: string;
  isLoading?: boolean;
  editable?: boolean;
  onSave?: (newName: string) => void;
}

export default function EditableField({
  labelName,
  initialValue = "",
  isLoading = false,
  editable = false,
  onSave,
}: EditableFieldProps) {
  const [text, setText] = useState<string>(initialValue);
  const [draft, setDraft] = useState<string>(initialValue);
  const [editing, setEditing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const startEditing = () => {
    setEditing(true);
    setDraft(text);
    setError(null);
  };

  const validate = (value: string) => {
    if (value.length < 3) {
      setError("Value must be at least 3 characters long.");
      return false;
    }
    if (value.length > 20) {
      setError("Value must be at most 20 characters long.");
      return false;
    }
    setError(null);
    return true;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setDraft(val);
    validate(val);
  };

  const handleSave = () => {
    if (error) {
      return;
    }
    setText(draft);

    if (onSave) {
      onSave(draft);
    }
    setEditing(false);
  };

  const cancelChanges = () => {
    setDraft(text);
    setError(null);
    setEditing(false);
  };

  return (
    <div className="flex flex-column">
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
            <div className="flex flex-col gap-1 w-full">
              <InputText
                className="input-tooltip w-full"
                value={draft}
                onChange={handleInputChange}
                autoFocus
              />
              {error && <small className="text-red-500">{error}</small>}
            </div>
            <div className="flex gap-2 items-start">
              <Button
                icon="pi pi-check"
                onClick={handleSave}
                className="save-btn"
                disabled={!!error}
              />
              <Button
                icon="pi pi-times"
                onClick={cancelChanges}
                className="cancel-btn"
                outlined
              />
            </div>
          </div>
        ) : (
          <div
            className={`editable-text ${editable ? "cursor-pointer" : ""}`}
            onClick={() => editable && startEditing()}
            data-pr-tooltip={editable ? "Click to edit" : ""}
          >
            {text || initialValue}
          </div>
        )}
      </div>
    </div>
  );
}
