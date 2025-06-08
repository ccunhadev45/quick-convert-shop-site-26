
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import ErrorFallback from "@/components/ErrorFallback";
import { ErrorBoundary } from "react-error-boundary";
import RouteManager from "@/components/RouteManager";
import ImprovedBreadcrumbs from "@/components/ImprovedBreadcrumbs";


function App() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, errorInfo) => {
        console.error("Global error caught:", error, errorInfo);
      }}
    >
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Router>
          <div className="App">
            <ImprovedBreadcrumbs />
            <RouteManager />
            <Toaster />
          </div>
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
