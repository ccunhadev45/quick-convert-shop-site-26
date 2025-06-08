
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare, Star, ThumbsUp, ThumbsDown, Reply, Eye, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface FeedbackItem {
  id: string;
  type: 'suggestion' | 'bug' | 'compliment';
  functionality?: string;
  message: string;
  rating?: number;
  timestamp: string;
  status: 'pending' | 'reviewed' | 'resolved';
  userId: string;
  response?: string;
  responseAt?: string;
}

const UserFeedback = () => {
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>(() => {
    const stored = localStorage.getItem('user-feedbacks');
    return stored ? JSON.parse(stored) : [];
  });

  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackItem | null>(null);
  const [response, setResponse] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterType, setFilterType] = useState<string>("all");

  const updateFeedbackStatus = (id: string, status: FeedbackItem['status']) => {
    const updatedFeedbacks = feedbacks.map(f => 
      f.id === id ? { ...f, status } : f
    );
    setFeedbacks(updatedFeedbacks);
    localStorage.setItem('user-feedbacks', JSON.stringify(updatedFeedbacks));
    
    toast({
      title: "Status atualizado",
      description: `Feedback marcado como ${status === 'pending' ? 'pendente' : status === 'reviewed' ? 'analisado' : 'resolvido'}.`
    });
  };

  const respondToFeedback = (id: string) => {
    if (!response.trim()) {
      toast({
        title: "Erro",
        description: "Digite uma resposta antes de enviar.",
        variant: "destructive"
      });
      return;
    }

    const updatedFeedbacks = feedbacks.map(f => 
      f.id === id ? { 
        ...f, 
        response: response.trim(),
        responseAt: new Date().toISOString(),
        status: 'resolved' as const
      } : f
    );
    
    setFeedbacks(updatedFeedbacks);
    localStorage.setItem('user-feedbacks', JSON.stringify(updatedFeedbacks));
    
    setResponse("");
    setSelectedFeedback(null);
    
    toast({
      title: "Resposta enviada!",
      description: "O usuário será notificado da sua resposta."
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'suggestion': return <MessageSquare className="h-4 w-4" />;
      case 'bug': return <ThumbsDown className="h-4 w-4" />;
      case 'compliment': return <ThumbsUp className="h-4 w-4" />;
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

  const filteredFeedbacks = feedbacks.filter(feedback => {
    if (filterStatus !== "all" && feedback.status !== filterStatus) return false;
    if (filterType !== "all" && feedback.type !== filterType) return false;
    return true;
  });

  const stats = {
    total: feedbacks.length,
    pending: feedbacks.filter(f => f.status === 'pending').length,
    reviewed: feedbacks.filter(f => f.status === 'reviewed').length,
    resolved: feedbacks.filter(f => f.status === 'resolved').length,
    bugs: feedbacks.filter(f => f.type === 'bug').length,
    suggestions: feedbacks.filter(f => f.type === 'suggestion').length,
    compliments: feedbacks.filter(f => f.type === 'compliment').length
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <MessageSquare className="h-6 w-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-foreground">Gerenciar Feedbacks</h2>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            <div className="text-sm text-muted-foreground">Total</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <div className="text-sm text-muted-foreground">Pendentes</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.reviewed}</div>
            <div className="text-sm text-muted-foreground">Em análise</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.resolved}</div>
            <div className="text-sm text-muted-foreground">Resolvidos</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{stats.bugs}</div>
            <div className="text-sm text-muted-foreground">Bugs</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.suggestions}</div>
            <div className="text-sm text-muted-foreground">Sugestões</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.compliments}</div>
            <div className="text-sm text-muted-foreground">Elogios</div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os status</SelectItem>
                  <SelectItem value="pending">Pendente</SelectItem>
                  <SelectItem value="reviewed">Em análise</SelectItem>
                  <SelectItem value="resolved">Resolvido</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Tipo</label>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os tipos</SelectItem>
                  <SelectItem value="suggestion">Sugestão</SelectItem>
                  <SelectItem value="bug">Bug</SelectItem>
                  <SelectItem value="compliment">Elogio</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Feedbacks */}
      <Card>
        <CardHeader>
          <CardTitle>Feedbacks ({filteredFeedbacks.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredFeedbacks.map((feedback) => (
              <div key={feedback.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {getTypeIcon(feedback.type)}
                    <Badge style={{ backgroundColor: getTypeColor(feedback.type), color: 'white' }}>
                      {feedback.type === 'suggestion' ? 'Sugestão' : 
                       feedback.type === 'bug' ? 'Bug' : 'Elogio'}
                    </Badge>
                    <Badge 
                      variant="outline" 
                      style={{ 
                        borderColor: getStatusColor(feedback.status),
                        color: getStatusColor(feedback.status)
                      }}
                    >
                      {getStatusText(feedback.status)}
                    </Badge>
                    {feedback.functionality && (
                      <Badge variant="secondary">
                        📍 {feedback.functionality}
                      </Badge>
                    )}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {new Date(feedback.timestamp).toLocaleString('pt-BR')}
                  </span>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300">{feedback.message}</p>

                {feedback.response && (
                  <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border-l-4 border-green-500">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-green-700 dark:text-green-300">
                        Resposta do Admin
                      </span>
                      <span className="text-xs text-green-600">
                        {new Date(feedback.responseAt!).toLocaleString('pt-BR')}
                      </span>
                    </div>
                    <p className="text-green-800 dark:text-green-200">{feedback.response}</p>
                  </div>
                )}
                
                <div className="flex gap-2 flex-wrap">
                  {feedback.status === 'pending' && (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateFeedbackStatus(feedback.id, 'reviewed')}
                        className="flex items-center gap-1"
                      >
                        <Eye className="h-3 w-3" />
                        Marcar como Em Análise
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => setSelectedFeedback(feedback)}
                        className="flex items-center gap-1"
                      >
                        <Reply className="h-3 w-3" />
                        Responder
                      </Button>
                    </>
                  )}
                  {feedback.status === 'reviewed' && !feedback.response && (
                    <Button
                      size="sm"
                      onClick={() => setSelectedFeedback(feedback)}
                      className="flex items-center gap-1"
                    >
                      <Reply className="h-3 w-3" />
                      Responder
                    </Button>
                  )}
                </div>
              </div>
            ))}
            
            {filteredFeedbacks.length === 0 && (
              <p className="text-muted-foreground text-center py-8">
                Nenhum feedback encontrado com os filtros aplicados
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Modal de Resposta */}
      {selectedFeedback && (
        <Card className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Responder Feedback</h3>
              <Button variant="ghost" onClick={() => setSelectedFeedback(null)}>
                ✕
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-muted p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  {getTypeIcon(selectedFeedback.type)}
                  <Badge style={{ backgroundColor: getTypeColor(selectedFeedback.type), color: 'white' }}>
                    {selectedFeedback.type === 'suggestion' ? 'Sugestão' : 
                     selectedFeedback.type === 'bug' ? 'Bug' : 'Elogio'}
                  </Badge>
                  {selectedFeedback.functionality && (
                    <Badge variant="secondary">
                      📍 {selectedFeedback.functionality}
                    </Badge>
                  )}
                </div>
                <p>{selectedFeedback.message}</p>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Sua Resposta</label>
                <Textarea
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                  placeholder="Digite sua resposta para o usuário..."
                  rows={4}
                />
              </div>
              
              <div className="flex gap-2">
                <Button 
                  onClick={() => respondToFeedback(selectedFeedback.id)}
                  disabled={!response.trim()}
                  className="flex items-center gap-2"
                >
                  <Reply className="h-4 w-4" />
                  Enviar Resposta
                </Button>
                <Button variant="outline" onClick={() => setSelectedFeedback(null)}>
                  Cancelar
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default UserFeedback;
