import { Zap, Target, Lightbulb, TrendingUp } from 'lucide-react';

const sectionConfig = {
  situation: {
    icon: Zap,
    color: 'bg-blue-50 text-blue-600',
    label: 'Situation',
  },
  task: {
    icon: Target,
    color: 'bg-green-50 text-green-600',
    label: 'Task',
  },
  action: {
    icon: Lightbulb,
    color: 'bg-orange-50 text-orange-600',
    label: 'Action',
  },
  result: {
    icon: TrendingUp,
    color: 'bg-purple-50 text-purple-600',
    label: 'Result',
  },
};

export default function STARCard({ star, editable = false, onChange }) {
  const handleChange = (field, value) => {
    if (editable && onChange) {
      onChange({ ...star, [field]: value });
    }
  };

  const renderContent = (field, content, placeholder) => {
    if (!content) {
      return (
        <p className="text-gray-400 italic text-sm">{placeholder}</p>
      );
    }

    if (editable) {
      return (
        <textarea
          value={content}
          onChange={(e) => handleChange(field, e.target.value)}
          className="w-full bg-transparent border-none text-sm text-gray-700 resize-none focus:outline-none"
          rows={3}
        />
      );
    }

    return <p className="text-sm text-gray-700">{content}</p>;
  };

  return (
    <div className="space-y-3">
      {Object.entries(sectionConfig).map(([field, config]) => {
        const Icon = config.icon;
        const content = star?.[field];
        const placeholder = field === 'result' 
          ? 'What was the outcome? Add details here.' 
          : `Add details for ${config.label.toLowerCase()}...`;

        return (
          <div key={field} className="flex gap-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${config.color}`}>
              <Icon size={16} />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-normal text-gray-900 mb-1">{config.label}</h4>
              {renderContent(field, content, placeholder)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
