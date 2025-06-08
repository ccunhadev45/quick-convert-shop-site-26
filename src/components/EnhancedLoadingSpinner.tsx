
import { useEffect, useState } from "react";

const EnhancedLoadingSpinner = () => {
  const [showTimeout, setShowTimeout] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTimeout(true);
    }, 10000); // 10 segundos

    return () => clearTimeout(timer);
  }, []);

  if (showTimeout) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <div>
            <p className="text-foreground">Carregando...</p>
            <p className="text-sm text-muted-foreground mt-2">
              Está demorando mais que o normal.{" "}
              <a href="/" className="text-primary hover:underline">
                Clique aqui para voltar ao início
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-foreground">Carregando...</p>
      </div>
    </div>
  );
};

export default EnhancedLoadingSpinner;
