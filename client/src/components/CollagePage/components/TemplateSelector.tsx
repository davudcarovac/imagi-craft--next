import { Template } from "@/types/types";

export const TEMPLATES: Template[] = [
  {
    id: "grid",
    name: "Grid",
    icon: "🟦",
    premium: false,
    dimensions: { width: 800, height: 600 },
  },
  {
    id: "heart",
    name: "Heart",
    icon: "❤️",
    premium: true,
    dimensions: { width: 600, height: 600 },
  },
];

interface TemplateSelectorProps {
  selectedTemplate: string;
  onSelect: (templateId: string) => void;
  isPremium: boolean;
}

export const TemplateSelector = ({
  selectedTemplate,
  onSelect,
  isPremium,
}: TemplateSelectorProps) => {
  const handleSelect = (template: Template) => {
    if (!template.premium || isPremium) {
      onSelect(template.id);
    } else {
      alert("Upgrade to Premium for this template!");
    }
  };

  return (
    <div className="template-grid">
      {TEMPLATES.map((template) => (
        <div
          key={template.id}
          onClick={() => handleSelect(template)}
          className={`template ${
            selectedTemplate === template.id ? "active" : ""
          } ${template.premium ? "premium" : ""}`}
        >
          <span>{template.icon}</span>
          {template.premium && <span className="premium-badge">PRO</span>}
        </div>
      ))}
    </div>
  );
};
