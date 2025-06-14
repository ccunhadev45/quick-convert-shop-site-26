
import EnhancedConverterCard from "@/components/EnhancedConverterCard";

interface Category {
  title: string;
  description: string;
  icon: any;
  path: string;
  color: string;
  type: string;
}

interface CategorySectionProps {
  title: string;
  description: string;
  cards: Category[];
}

const CategorySection = ({ title, description, cards }: CategorySectionProps) => {
  if (cards.length === 0) return null;
  
  return (
    <div className="mb-16">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
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
          />
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
