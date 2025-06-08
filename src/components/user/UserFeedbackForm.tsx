
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Send, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { allEnhancedCategories } from "@/data/enhancedCategoriesData";

interface FeedbackItem {
  id: string;
  type: 'suggestion' | 'bug' | 'compliment';
  functionality: string;
  message: string;
  timestamp: string;
  status: 'pending' | 'reviewed' | 'resolved';
  userId: string;
}

const UserFeedbackForm = () => {
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>(() => {
    const stored = localStorage.getItem('user-feedbacks');
    return stored ? JSON.parse(stored) : [];
  });

  const [newFeedback, setNewFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState<'suggestion' | 'bug' | 'compliment'>('suggestion');
  const [selectedFunctionality, setSelectedFunctionality] = useState("");
  const { toast } = useToast();

  // Organizar funcionalidades por categoria
  const functionalitiesByCategory = allEnhancedCategories.reduce((acc, item) => {
    const category = item.category || 'Outros';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push({
      value: item.path,
      label: item.title
    });
    return acc;
  }, {} as Record<string, Array<{value: string, label: string}>>);

  const addFeedback = () => {
    if (!newFeedback.trim() || !selectedFunctionality) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha a funcionalidade e a mensagem.",
        variant: "destructive"
      });
      return;
    }

    const functionalityName = allEnhancedCategories.find(
      item => item.path === selectedFunctionality
    )?.title || selectedFunctionality;

    const feedback: FeedbackItem = {
      id: Date.now().toString(),
      type: feedbackType,
      functionality: functionalityName,
      message: newFeedback,
      timestamp: new Date().toISOString(),
      status: 'pending',
      userId: 'current-user' // Em produção, pegar do contexto de autenticação
    };

    const updatedFeedbacks = [feedback, ...feedbacks];
    setFeedbacks(updatedFeedbacks);
    localStorage.setItem('user-feedbacks', JSON.stringify(updatedFeedbacks));
    
    setNewFeedback("");
    setSelectedFunctionality("");
    toast({
      title: "Feedback enviado!",
      description: "Obrigado pela sua contribuição. Analisaremos seu feedback em breve."
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'suggestion': return <MessageSquare className="h-4 w-4" />;
      case 'bug': return "🐛";
      case 'compliment': return "👍";
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'suggestion': return 'blue';
      case 'bug': return 'red';
      case 'compliment': return 'green';
      default: return 'gray';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'yellow';
      case 'reviewed': return 'blue';
      case 'resolved': return 'green';
      default: return 'gray';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Pendente';
      case 'reviewed': return 'Em análise';
      case 'resolved': return 'Resolvido';
      default: return 'Desconhecido';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <MessageSquare className="h-6 w-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-foreground">Feedback</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Send className="h-5 w-5" />
            Enviar Feedback
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Tipo de Feedback</label>
              <div className="flex gap-2">
                <Button
                  variant={feedbackType === 'suggestion' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFeedbackType('suggestion')}
                >
                  💡 Sugestão
                </Button>
                <Button
                  variant={feedbackType === 'bug' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFeedbackType('bug')}
                >
                  🐛 Bug
                </Button>
                <Button
                  variant={feedbackType === 'compliment' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFeedbackType('compliment')}
                >
                  👍 Elogio
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Funcionalidade</label>
              <Select value={selectedFunctionality} onValueChange={setSelectedFunctionality}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma funcionalidade" />
                </SelectTrigger>
                <SelectContent className="max-h-[200px]">
                  {Object.entries(functionalitiesByCategory).map(([category, items]) => (
                    <div key={category}>
                      <div className="px-2 py-1 text-sm font-semibold text-muted-foreground border-b">
                        {category}
                      </div>
                      {items.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </div>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Mensagem</label>
            <Textarea
              value={newFeedback}
              onChange={(e) => setNewFeedback(e.target.value)}
              placeholder="Descreva seu feedback de forma detalhada..."
              rows={4}
            />
          </div>
          
          <Button 
            onClick={addFeedback} 
            disabled={!newFeedback.trim() || !selectedFunctionality}
            className="flex items-center gap-2"
          >
            <Send className="h-4 w-4" />
            Enviar Feedback
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Meus Feedbacks ({feedbacks.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {feedbacks.map((feedback) => (
              <div key={feedback.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center gap-1">
                      {getTypeIcon(feedback.type)}
                      <Badge 
                        style={{ 
                          backgroundColor: getTypeColor(feedback.type),
                          color: 'white'
                        }}
                      >
                        {feedback.type === 'suggestion' ? 'Sugestão' : 
                         feedback.type === 'bug' ? 'Bug' : 'Elogio'}
                      </Badge>
                    </div>
                    <Badge 
                      variant="outline" 
                      style={{ 
                        borderColor: getStatusColor(feedback.status),
                        color: getStatusColor(feedback.status)
                      }}
                    >
                      {getStatusText(feedback.status)}
                    </Badge>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {new Date(feedback.timestamp).toLocaleString('pt-BR')}
                  </span>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm font-medium text-blue-600">
                    📍 {feedback.functionality}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">{feedback.message}</p>
                </div>

                {feedback.status === 'resolved' && (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm">Feedback resolvido! Obrigado pela contribuição.</span>
                  </div>
                )}
              </div>
            ))}
            
            {feedbacks.length === 0 && (
              <p className="text-muted-foreground text-center py-8">
                Você ainda não enviou nenhum feedback
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserFeedbackForm;
