import { Typography } from "../ui/typography";

export const FeatureBox = ({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) => (
  <div className="p-6 rounded-xl border border-gray-200 bg-white hover:shadow-lg transition-shadow">
    <div className="flex items-start">
      <div className="flex-shrink-0 mr-4">
        <div className="p-3 rounded-xl bg-gray-100 text-gray-800">
          <Icon size={24} />
        </div>
      </div>
      <div>
        <Typography variant="h4" className="mb-2">
          {title}
        </Typography>
        <Typography variant="muted">{description}</Typography>
      </div>
    </div>
  </div>
);
