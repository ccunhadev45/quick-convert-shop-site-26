
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft, TrendingUp, Users } from "lucide-react";
import { Link } from "react-router-dom";
import EnhancedHeader from "@/components/EnhancedHeader";
import AdSpace from "@/components/AdSpace";

const EngagementCalculator = () => {
  const [followers, setFollowers] = useState("");
  const [likes, setLikes] = useState("");
  const [comments, setComments] = useState("");
  const [shares, setShares] = useState("");
  const [result, setResult] = useState<any>(null);

  const calculateEngagement = () => {
    if (!followers || !likes) return;
    
    const followersNum = parseInt(followers);
    const likesNum = parseInt(likes);
    const commentsNum = parseInt(comments) || 0;
    const sharesNum = parseInt(shares) || 0;
    
    const totalEngagement = likesNum + commentsNum + sharesNum;
    const engagementRate = (totalEngagement / followersNum) * 100;
    
    let rating = "Baixo";
    if (engagementRate > 6) rating = "Excelente";
    else if (engagementRate > 3) rating = "Bom";
    else if (engagementRate > 1) rating = "Médio";
    
    setResult({
      totalEngagement,
      engagementRate: engagementRate.toFixed(2),
      rating,
      likesPercent: ((likesNum / followersNum) * 100).toFixed(2),
      commentsPercent: ((commentsNum / followersNum) * 100).toFixed(2),
      sharesPercent: ((sharesNum / followersNum) * 100).toFixed(2)
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <EnhancedHeader />
      <AdSpace position="top" />
      
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <div className="flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-pink-600 dark:text-pink-400" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Calculadora de Engajamento
            </h1>
          </div>
        </div>

        <AdSpace position="middle" />

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Calcular Taxa de Engajamento
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Número de Seguidores</label>
                  <Input
                    type="number"
                    value={followers}
                    onChange={(e) => setFollowers(e.target.value)}
                    placeholder="Ex: 10000"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Curtidas</label>
                    <Input
                      type="number"
                      value={likes}
                      onChange={(e) => setLikes(e.target.value)}
                      placeholder="Ex: 500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Comentários</label>
                    <Input
                      type="number"
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                      placeholder="Ex: 50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Compartilhamentos</label>
                    <Input
                      type="number"
                      value={shares}
                      onChange={(e) => setShares(e.target.value)}
                      placeholder="Ex: 25"
                    />
                  </div>
                </div>
              </div>

              <Button onClick={calculateEngagement} className="w-full" size="lg">
                Calcular Engajamento
              </Button>

              {result && (
                <div className="space-y-4">
                  <div className="p-6 bg-pink-50 dark:bg-pink-900/20 rounded-lg text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Taxa de Engajamento</p>
                    <p className="text-4xl font-bold text-pink-600 dark:text-pink-400">
                      {result.engagementRate}%
                    </p>
                    <p className="text-lg font-semibold mt-2 text-pink-700 dark:text-pink-300">
                      {result.rating}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
                      <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
                        {result.totalEngagement}
                      </p>
                    </div>

                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Curtidas</p>
                      <p className="text-xl font-bold text-green-600 dark:text-green-400">
                        {result.likesPercent}%
                      </p>
                    </div>

                    <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-center">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Comentários</p>
                      <p className="text-xl font-bold text-purple-600 dark:text-purple-400">
                        {result.commentsPercent}%
                      </p>
                    </div>

                    <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg text-center">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Shares</p>
                      <p className="text-xl font-bold text-orange-600 dark:text-orange-400">
                        {result.sharesPercent}%
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <AdSpace position="footer" />
      </div>
    </div>
  );
};

export default EngagementCalculator;
