
import EnhancedConverterCard from "@/components/EnhancedConverterCard";

interface CategoryCard {
  title: string;
  description: string;
  icon: any;
  path: string;
  color: string;
  type: string;
  conversionExample?: {
    from: string;
    to: string;
    value: string;
  };
}

interface CategorySectionProps {
  title: string;
  description: string;
  cards: CategoryCard[];
}

const CategorySection = ({ title, description, cards }: CategorySectionProps) => {
  if (cards.length === 0) return null;
  
  return (
    <div className="mb-16">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((category) => (
          <EnhancedConverterCard
            key={category.title}
            title={category.title}
            description={category.description}
            icon={category.icon}
            path={category.path}
            color={category.color}
            conversionExample={category.conversionExample}
          />
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
