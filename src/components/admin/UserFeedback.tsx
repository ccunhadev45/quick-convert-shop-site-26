
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Star, ThumbsUp, ThumbsDown } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface FeedbackItem {
  id: string;
  type: 'suggestion' | 'bug' | 'compliment';
  message: string;
  rating?: number;
  timestamp: string;
  status: 'pending' | 'reviewed' | 'resolved';
}

const UserFeedback = () => {
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>(() => {
    const stored = localStorage.getItem('user-feedbacks');
    return stored ? JSON.parse(stored) : [];
  });

  const [newFeedback, setNewFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState<'suggestion' | 'bug' | 'compliment'>('suggestion');

  const addFeedback = () => {
    if (!newFeedback.trim()) return;

    const feedback: FeedbackItem = {
      id: Date.now().toString(),
      type: feedbackType,
      message: newFeedback,
      timestamp: new Date().toISOString(),
      status: 'pending'
    };

    const updatedFeedbacks = [feedback, ...feedbacks];
    setFeedbacks(updatedFeedbacks);
    localStorage.setItem('user-feedbacks', JSON.stringify(updatedFeedbacks));
    
    setNewFeedback("");
    toast({
      title: "Feedback enviado!",
      description: "Obrigado pela sua contribuição."
    });
  };

  const updateFeedbackStatus = (id: string, status: FeedbackItem['status']) => {
    const updatedFeedbacks = feedbacks.map(f => 
      f.id === id ? { ...f, status } : f
    );
    setFeedbacks(updatedFeedbacks);
    localStorage.setItem('user-feedbacks', JSON.stringify(updatedFeedbacks));
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

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Enviar Feedback</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button
              variant={feedbackType === 'suggestion' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFeedbackType('suggestion')}
            >
              Sugestão
            </Button>
            <Button
              variant={feedbackType === 'bug' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFeedbackType('bug')}
            >
              Bug
            </Button>
            <Button
              variant={feedbackType === 'compliment' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFeedbackType('compliment')}
            >
              Elogio
            </Button>
          </div>
          
          <Textarea
            value={newFeedback}
            onChange={(e) => setNewFeedback(e.target.value)}
            placeholder="Descreva seu feedback..."
            rows={3}
          />
          
          <Button onClick={addFeedback} disabled={!newFeedback.trim()}>
            Enviar Feedback
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Feedbacks Recebidos ({feedbacks.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {feedbacks.map((feedback) => (
              <div key={feedback.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {getTypeIcon(feedback.type)}
                    <Badge style={{ backgroundColor: getTypeColor(feedback.type) }}>
                      {feedback.type === 'suggestion' ? 'Sugestão' : 
                       feedback.type === 'bug' ? 'Bug' : 'Elogio'}
                    </Badge>
                    <Badge variant="outline" style={{ borderColor: getStatusColor(feedback.status) }}>
                      {feedback.status === 'pending' ? 'Pendente' :
                       feedback.status === 'reviewed' ? 'Analisado' : 'Resolvido'}
                    </Badge>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {new Date(feedback.timestamp).toLocaleString('pt-BR')}
                  </span>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300">{feedback.message}</p>
                
                <div className="flex gap-2">
                  {feedback.status === 'pending' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateFeedbackStatus(feedback.id, 'reviewed')}
                    >
                      Marcar como Analisado
                    </Button>
                  )}
                  {feedback.status === 'reviewed' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateFeedbackStatus(feedback.id, 'resolved')}
                    >
                      Marcar como Resolvido
                    </Button>
                  )}
                </div>
              </div>
            ))}
            
            {feedbacks.length === 0 && (
              <p className="text-muted-foreground text-center py-8">
                Nenhum feedback recebido ainda
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserFeedback;
