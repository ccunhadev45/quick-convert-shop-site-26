
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, FileCode, Copy } from "lucide-react";
import { Link } from "react-router-dom";
import { useConversionHistory } from "@/hooks/useConversionHistory";
import { toast } from "@/hooks/use-toast";

const EncodingConverter = () => {
  const [textInput, setTextInput] = useState("");
  const [base64Output, setBase64Output] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [urlOutput, setUrlOutput] = useState("");
  const [htmlInput, setHtmlInput] = useState("");
  const [htmlOutput, setHtmlOutput] = useState("");

  const { addRecord } = useConversionHistory();

  const encodeBase64 = () => {
    if (textInput) {
      try {
        const encoded = btoa(unescape(encodeURIComponent(textInput)));
        setBase64Output(encoded);
        addRecord({
          type: 'conversion',
          category: 'Encoding',
          title: 'Text → Base64',
          input: textInput,
          output: encoded
        });
        toast({
          title: "Codificado!",
          description: "Texto convertido para Base64"
        });
      } catch (error) {
        toast({
          title: "Erro",
          description: "Erro ao codificar para Base64",
          variant: "destructive"
        });
      }
    }
  };

  const decodeBase64 = () => {
    if (base64Output) {
      try {
        const decoded = decodeURIComponent(escape(atob(base64Output)));
        setTextInput(decoded);
        toast({
          title: "Decodificado!",
          description: "Base64 convertido para texto"
        });
      } catch (error) {
        toast({
          title: "Erro",
          description: "Base64 inválido",
          variant: "destructive"
        });
      }
    }
  };

  const encodeURL = () => {
    if (urlInput) {
      const encoded = encodeURIComponent(urlInput);
      setUrlOutput(encoded);
      addRecord({
        type: 'conversion',
        category: 'Encoding',
        title: 'Text → URL Encoded',
        input: urlInput,
        output: encoded
      });
      toast({
        title: "Codificado!",
        description: "Texto convertido para URL encoding"
      });
    }
  };

  const decodeURL = () => {
    if (urlOutput) {
      try {
        const decoded = decodeURIComponent(urlOutput);
        setUrlInput(decoded);
        toast({
          title: "Decodificado!",
          description: "URL encoding convertido para texto"
        });
      } catch (error) {
        toast({
          title: "Erro",
          description: "URL encoding inválido",
          variant: "destructive"
        });
      }
    }
  };

  const encodeHTML = () => {
    if (htmlInput) {
      const encoded = htmlInput
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
      setHtmlOutput(encoded);
      addRecord({
        type: 'conversion',
        category: 'Encoding',
        title: 'Text → HTML Entities',
        input: htmlInput,
        output: encoded
      });
      toast({
        title: "Codificado!",
        description: "Texto convertido para HTML entities"
      });
    }
  };

  const decodeHTML = () => {
    if (htmlOutput) {
      const decoded = htmlOutput
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'");
      setHtmlInput(decoded);
      toast({
        title: "Decodificado!",
        description: "HTML entities convertido para texto"
      });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado!",
      description: "Texto copiado para a área de transferência"
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/" className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <div className="flex items-center gap-3">
            <FileCode className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Conversor de Encoding
            </h1>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="base64" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="base64">Base64</TabsTrigger>
              <TabsTrigger value="url">URL Encoding</TabsTrigger>
              <TabsTrigger value="html">HTML Entities</TabsTrigger>
            </TabsList>

            <TabsContent value="base64">
              <Card>
                <CardHeader>
                  <CardTitle>Conversor Base64</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="textInput">Texto Original</Label>
                    <Textarea
                      id="textInput"
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      placeholder="Digite o texto para codificar"
                      rows={4}
                    />
                    <Button onClick={encodeBase64} className="mt-2 w-full">
                      Codificar para Base64
                    </Button>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="base64Output">Base64 Codificado</Label>
                      {base64Output && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(base64Output)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <Textarea
                      id="base64Output"
                      value={base64Output}
                      onChange={(e) => setBase64Output(e.target.value)}
                      placeholder="Resultado Base64 ou cole aqui para decodificar"
                      rows={4}
                    />
                    <Button onClick={decodeBase64} className="mt-2 w-full" variant="outline">
                      Decodificar Base64
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="url">
              <Card>
                <CardHeader>
                  <CardTitle>Conversor URL Encoding</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="urlInput">Texto Original</Label>
                    <Textarea
                      id="urlInput"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      placeholder="Digite o texto para codificar"
                      rows={4}
                    />
                    <Button onClick={encodeURL} className="mt-2 w-full">
                      Codificar para URL
                    </Button>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="urlOutput">URL Encoded</Label>
                      {urlOutput && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(urlOutput)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <Textarea
                      id="urlOutput"
                      value={urlOutput}
                      onChange={(e) => setUrlOutput(e.target.value)}
                      placeholder="Resultado URL encoded ou cole aqui para decodificar"
                      rows={4}
                    />
                    <Button onClick={decodeURL} className="mt-2 w-full" variant="outline">
                      Decodificar URL
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="html">
              <Card>
                <CardHeader>
                  <CardTitle>Conversor HTML Entities</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="htmlInput">Texto Original</Label>
                    <Textarea
                      id="htmlInput"
                      value={htmlInput}
                      onChange={(e) => setHtmlInput(e.target.value)}
                      placeholder="Digite o texto para codificar"
                      rows={4}
                    />
                    <Button onClick={encodeHTML} className="mt-2 w-full">
                      Codificar HTML Entities
                    </Button>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="htmlOutput">HTML Entities</Label>
                      {htmlOutput && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(htmlOutput)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <Textarea
                      id="htmlOutput"
                      value={htmlOutput}
                      onChange={(e) => setHtmlOutput(e.target.value)}
                      placeholder="Resultado HTML entities ou cole aqui para decodificar"
                      rows={4}
                    />
                    <Button onClick={decodeHTML} className="mt-2 w-full" variant="outline">
                      Decodificar HTML Entities
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default EncodingConverter;
