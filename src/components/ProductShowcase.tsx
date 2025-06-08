
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  link: string;
  category: string;
}

const ProductShowcase = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Carregar produtos do localStorage (será gerenciado pelo admin)
    const savedProducts = localStorage.getItem('admin_products');
    if (savedProducts) {
      const allProducts = JSON.parse(savedProducts);
      // Mostrar apenas produtos featured ou limitar a 3
      setProducts(allProducts.slice(0, 3));
    }
  }, []);

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
        Produtos Recomendados
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="border border-gray-100 hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <img 
                src={product.image || "/placeholder.svg"} 
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="font-semibold text-lg text-gray-900 mb-2">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-3">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-blue-600">{product.price}</span>
                <Button asChild size="sm">
                  <a href={product.link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Ver Produto
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductShowcase;
