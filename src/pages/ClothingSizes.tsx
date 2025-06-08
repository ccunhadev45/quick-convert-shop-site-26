
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import EnhancedHeader from "@/components/EnhancedHeader";
import AdSpace from "@/components/AdSpace";
import ProductShowcase from "@/components/ProductShowcase";
import { Shirt, Globe } from "lucide-react";

const ClothingSizes = () => {
  const [size, setSize] = useState("");
  const [gender, setGender] = useState("women");
  const [category, setCategory] = useState("top");
  const [fromCountry, setFromCountry] = useState("BR");
  
  const sizeConversions = {
    women: {
      top: {
        BR: { XS: "PP", S: "P", M: "M", L: "G", XL: "GG" },
        US: { XS: "0-2", S: "4-6", M: "8-10", L: "12-14", XL: "16-18" },
        EU: { XS: "32-34", S: "36-38", M: "40-42", L: "44-46", XL: "48-50" },
        UK: { XS: "4-6", S: "8-10", M: "12-14", L: "16-18", XL: "20-22" }
      }
    },
    men: {
      top: {
        BR: { XS: "PP", S: "P", M: "M", L: "G", XL: "GG" },
        US: { XS: "XS", S: "S", M: "M", L: "L", XL: "XL" },
        EU: { XS: "44", S: "46", M: "48", L: "50", XL: "52" },
        UK: { XS: "32", S: "34", M: "36", L: "38", XL: "40" }
      }
    }
  };

  const getConvertedSizes = () => {
    if (!size || !gender || !category) return {};
    
    const genderData = sizeConversions[gender as keyof typeof sizeConversions];
    const categoryData = genderData[category as keyof typeof genderData];
    
    return Object.keys(categoryData).reduce((acc, country) => {
      if (country !== fromCountry) {
        const countryData = categoryData[country as keyof typeof categoryData];
        const sizeValue = countryData[size as keyof typeof countryData];
        if (sizeValue) {
          acc[country] = sizeValue;
        }
      }
      return acc;
    }, {} as Record<string, string>);
  };

  const convertedSizes = getConvertedSizes();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <EnhancedHeader />
      <AdSpace position="top" />
      
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
                <Shirt className="h-8 w-8 text-blue-600" />
                Conversor de Tamanhos de Roupa
              </CardTitle>
              <p className="text-gray-600">
                Converta tamanhos entre diferentes países
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Gênero</Label>
                  <Select value={gender} onValueChange={setGender}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="women">Feminino</SelectItem>
                      <SelectItem value="men">Masculino</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Categoria</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="top">Blusas/Camisas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>País de Origem</Label>
                  <Select value={fromCountry} onValueChange={setFromCountry}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BR">Brasil</SelectItem>
                      <SelectItem value="US">Estados Unidos</SelectItem>
                      <SelectItem value="EU">Europa</SelectItem>
                      <SelectItem value="UK">Reino Unido</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Tamanho</Label>
                  <Select value={size} onValueChange={setSize}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tamanho" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="XS">XS</SelectItem>
                      <SelectItem value="S">S</SelectItem>
                      <SelectItem value="M">M</SelectItem>
                      <SelectItem value="L">L</SelectItem>
                      <SelectItem value="XL">XL</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {Object.keys(convertedSizes).length > 0 && (
                <div className="mt-8 space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Tamanhos Equivalentes:</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(convertedSizes).map(([country, convertedSize]) => (
                      <div key={country} className="bg-blue-50 p-4 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4 text-blue-600" />
                          <span className="font-medium">{country}</span>
                        </div>
                        <p className="text-2xl font-bold text-blue-900 mt-2">{convertedSize}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <AdSpace position="middle" />
        <ProductShowcase />
      </main>

      <AdSpace position="footer" />
    </div>
  );
};

export default ClothingSizes;
