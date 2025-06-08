
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2, Save, X } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  link: string;
  category: string;
}

const ProductManager = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    link: '',
    category: ''
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    const saved = localStorage.getItem('admin_products');
    if (saved) {
      setProducts(JSON.parse(saved));
    }
  };

  const saveProducts = (newProducts: Product[]) => {
    localStorage.setItem('admin_products', JSON.stringify(newProducts));
    setProducts(newProducts);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      // Editar produto existente
      const updatedProducts = products.map(p => 
        p.id === editingId 
          ? { ...formData, id: editingId }
          : p
      );
      saveProducts(updatedProducts);
      setEditingId(null);
    } else {
      // Adicionar novo produto
      const newProduct: Product = {
        ...formData,
        id: Date.now().toString()
      };
      saveProducts([...products, newProduct]);
      setIsAdding(false);
    }
    
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      image: '',
      link: '',
      category: ''
    });
  };

  const handleEdit = (product: Product) => {
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      link: product.link,
      category: product.category
    });
    setEditingId(product.id);
  };

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      const filtered = products.filter(p => p.id !== id);
      saveProducts(filtered);
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    resetForm();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Gerenciar Produtos</h2>
        <Button 
          onClick={() => setIsAdding(true)} 
          disabled={isAdding || editingId !== null}
          className="flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Adicionar Produto</span>
        </Button>
      </div>

      {(isAdding || editingId) && (
        <Card>
          <CardHeader>
            <CardTitle>{editingId ? 'Editar Produto' : 'Novo Produto'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nome do Produto</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="price">Preço</Label>
                  <Input
                    id="price"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    placeholder="R$ 99,90"
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="image">URL da Imagem</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <Label htmlFor="category">Categoria</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    placeholder="Eletrônicos, Livros, etc."
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="link">Link do Produto</Label>
                <Input
                  id="link"
                  value={formData.link}
                  onChange={(e) => setFormData({...formData, link: e.target.value})}
                  placeholder="https://..."
                  required
                />
              </div>
              
              <div className="flex space-x-4">
                <Button type="submit" className="flex items-center space-x-2">
                  <Save className="h-4 w-4" />
                  <span>{editingId ? 'Salvar' : 'Adicionar'}</span>
                </Button>
                <Button type="button" variant="outline" onClick={handleCancel}>
                  <X className="h-4 w-4 mr-2" />
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id}>
            <CardContent className="p-4">
              <img 
                src={product.image || "/placeholder.svg"} 
                alt={product.name}
                className="w-full h-32 object-cover rounded-lg mb-3"
              />
              <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{product.description}</p>
              <p className="text-blue-600 font-bold mb-3">{product.price}</p>
              <div className="flex space-x-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => handleEdit(product)}
                  disabled={isAdding || editingId !== null}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  size="sm" 
                  variant="destructive" 
                  onClick={() => handleDelete(product.id)}
                  disabled={isAdding || editingId !== null}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {products.length === 0 && !isAdding && (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-500">Nenhum produto cadastrado ainda.</p>
            <Button 
              onClick={() => setIsAdding(true)} 
              className="mt-4"
            >
              Adicionar Primeiro Produto
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProductManager;
