
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare, Send, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { allEnhancedCategories } from "@/data/enhancedCategoriesData";

interface CategoryCard {
  title: string;
  description: string;
  path: string;
  category: string; // Added missing category property
}

const UserFeedbackForm = () => {
  const [feedback, setFeedback] = useState({
    type: "",
    category: "",
    title: "",
    description: "",
    rating: 0
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const feedbackTypes = [
    { value: "bug", label: "Reportar Bug" },
    { value: "suggestion", label: "Sugestão" },
    { value: "feature", label: "Nova Funcionalidade" },
    { value: "general", label: "Feedback Geral" }
  ];

  const categories = allEnhancedCategories.map(cat => ({
    value: cat.path,
    label: cat.title,
    category: cat.category // Now this property exists
  }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Store feedback in localStorage for demo
    const existingFeedback = JSON.parse(localStorage.getItem('user-feedback') || '[]');
    const newFeedback = {
      ...feedback,
      id: Date.now().toString(),
      userId: JSON.parse(localStorage.getItem('user_data') || '{}').id,
      createdAt: new Date().toISOString()
    };
    
    existingFeedback.push(newFeedback);
    localStorage.setItem('user-feedback', JSON.stringify(existingFeedback));

    toast({
      title: "Feedback enviado com sucesso!",
      description: "Obrigado por ajudar a melhorar nossa plataforma.",
    });

    // Reset form
    setFeedback({
      type: "",
      category: "",
      title: "",
      description: "",
      rating: 0
    });

    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <MessageSquare className="h-6 w-6 text-blue-500" />
        <h2 className="text-2xl font-bold text-foreground">Enviar Feedback</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Compartilhe sua experiência</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="feedback-type">Tipo de Feedback</Label>
                <Select
                  value={feedback.type}
                  onValueChange={(value) => setFeedback(prev => ({ ...prev, type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {feedbackTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="feedback-category">Categoria</Label>
                <Select
                  value={feedback.category}
                  onValueChange={(value) => setFeedback(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="feedback-title">Título</Label>
              <Input
                id="feedback-title"
                value={feedback.title}
                onChange={(e) => setFeedback(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Descreva brevemente o feedback"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="feedback-description">Descrição</Label>
              <Textarea
                id="feedback-description"
                value={feedback.description}
                onChange={(e) => setFeedback(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Forneça detalhes sobre seu feedback..."
                rows={5}
                required
              />
            </div>

            <div className="space-y-3">
              <Label>Avaliação</Label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFeedback(prev => ({ ...prev, rating: star }))}
                    className={`p-1 rounded transition-colors ${
                      star <= feedback.rating
                        ? 'text-yellow-500 hover:text-yellow-600'
                        : 'text-gray-300 hover:text-gray-400'
                    }`}
                  >
                    <Star className="h-6 w-6 fill-current" />
                  </button>
                ))}
                <span className="ml-2 text-sm text-muted-foreground">
                  {feedback.rating > 0 ? `${feedback.rating}/5` : 'Não avaliado'}
                </span>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                "Enviando..."
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Enviar Feedback
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Seu feedback é importante!
            </h3>
            <p className="text-muted-foreground text-sm">
              Ajude-nos a melhorar a plataforma com suas sugestões e reportes.
              Todos os feedbacks são revisados pela nossa equipe.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserFeedbackForm;
