
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Palette } from "lucide-react";
import { Link } from "react-router-dom";
import { useConversionHistory } from "@/hooks/useConversionHistory";
import { toast } from "@/hooks/use-toast";

const ColorConverter = () => {
  const [hex, setHex] = useState("#FF5733");
  const [rgb, setRgb] = useState({ r: 255, g: 87, b: 51 });
  const [hsl, setHsl] = useState({ h: 9, s: 100, l: 60 });
  const [cmyk, setCmyk] = useState({ c: 0, m: 66, y: 80, k: 0 });

  const { addRecord } = useConversionHistory();

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h! /= 6;
    }

    return {
      h: Math.round(h! * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  const hslToRgb = (h: number, s: number, l: number) => {
    h /= 360;
    s /= 100;
    l /= 100;
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    let r, g, b;
    if (s === 0) {
      r = g = b = l;
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255)
    };
  };

  const rgbToCmyk = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;

    const k = 1 - Math.max(r, Math.max(g, b));
    const c = (1 - r - k) / (1 - k) || 0;
    const m = (1 - g - k) / (1 - k) || 0;
    const y = (1 - b - k) / (1 - k) || 0;

    return {
      c: Math.round(c * 100),
      m: Math.round(m * 100),
      y: Math.round(y * 100),
      k: Math.round(k * 100)
    };
  };

  const updateFromHex = (hexValue: string) => {
    setHex(hexValue);
    const rgbValue = hexToRgb(hexValue);
    if (rgbValue) {
      setRgb(rgbValue);
      setHsl(rgbToHsl(rgbValue.r, rgbValue.g, rgbValue.b));
      setCmyk(rgbToCmyk(rgbValue.r, rgbValue.g, rgbValue.b));
      
      addRecord({
        type: 'conversion',
        category: 'Cores',
        title: 'Conversão de Cor',
        input: `HEX: ${hexValue}`,
        output: `RGB: ${rgbValue.r}, ${rgbValue.g}, ${rgbValue.b}`
      });
    }
  };

  const updateFromRgb = (r: number, g: number, b: number) => {
    const newRgb = { r, g, b };
    setRgb(newRgb);
    setHex(rgbToHex(r, g, b));
    setHsl(rgbToHsl(r, g, b));
    setCmyk(rgbToCmyk(r, g, b));
  };

  const updateFromHsl = (h: number, s: number, l: number) => {
    const newHsl = { h, s, l };
    setHsl(newHsl);
    const rgbValue = hslToRgb(h, s, l);
    setRgb(rgbValue);
    setHex(rgbToHex(rgbValue.r, rgbValue.g, rgbValue.b));
    setCmyk(rgbToCmyk(rgbValue.r, rgbValue.g, rgbValue.b));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/" className="text-pink-600 hover:text-pink-700">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <div className="flex items-center gap-3">
            <Palette className="h-8 w-8 text-pink-600" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Conversor de Cores
            </h1>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Color Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Prévia da Cor</CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                className="w-full h-32 rounded-lg border-2 border-gray-300"
                style={{ backgroundColor: hex }}
              />
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* HEX */}
            <Card>
              <CardHeader>
                <CardTitle>HEX</CardTitle>
              </CardHeader>
              <CardContent>
                <Label htmlFor="hex">Código Hexadecimal</Label>
                <Input
                  id="hex"
                  value={hex}
                  onChange={(e) => updateFromHex(e.target.value)}
                  placeholder="#FF5733"
                />
              </CardContent>
            </Card>

            {/* RGB */}
            <Card>
              <CardHeader>
                <CardTitle>RGB</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label htmlFor="r">Red (0-255)</Label>
                  <Input
                    id="r"
                    type="number"
                    min="0"
                    max="255"
                    value={rgb.r}
                    onChange={(e) => updateFromRgb(parseInt(e.target.value) || 0, rgb.g, rgb.b)}
                  />
                </div>
                <div>
                  <Label htmlFor="g">Green (0-255)</Label>
                  <Input
                    id="g"
                    type="number"
                    min="0"
                    max="255"
                    value={rgb.g}
                    onChange={(e) => updateFromRgb(rgb.r, parseInt(e.target.value) || 0, rgb.b)}
                  />
                </div>
                <div>
                  <Label htmlFor="b">Blue (0-255)</Label>
                  <Input
                    id="b"
                    type="number"
                    min="0"
                    max="255"
                    value={rgb.b}
                    onChange={(e) => updateFromRgb(rgb.r, rgb.g, parseInt(e.target.value) || 0)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* HSL */}
            <Card>
              <CardHeader>
                <CardTitle>HSL</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label htmlFor="h">Hue (0-360°)</Label>
                  <Input
                    id="h"
                    type="number"
                    min="0"
                    max="360"
                    value={hsl.h}
                    onChange={(e) => updateFromHsl(parseInt(e.target.value) || 0, hsl.s, hsl.l)}
                  />
                </div>
                <div>
                  <Label htmlFor="s">Saturation (0-100%)</Label>
                  <Input
                    id="s"
                    type="number"
                    min="0"
                    max="100"
                    value={hsl.s}
                    onChange={(e) => updateFromHsl(hsl.h, parseInt(e.target.value) || 0, hsl.l)}
                  />
                </div>
                <div>
                  <Label htmlFor="l">Lightness (0-100%)</Label>
                  <Input
                    id="l"
                    type="number"
                    min="0"
                    max="100"
                    value={hsl.l}
                    onChange={(e) => updateFromHsl(hsl.h, hsl.s, parseInt(e.target.value) || 0)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* CMYK */}
            <Card>
              <CardHeader>
                <CardTitle>CMYK</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label>Cyan: {cmyk.c}%</Label>
                  <div className="text-sm text-gray-600">Somente leitura</div>
                </div>
                <div>
                  <Label>Magenta: {cmyk.m}%</Label>
                  <div className="text-sm text-gray-600">Somente leitura</div>
                </div>
                <div>
                  <Label>Yellow: {cmyk.y}%</Label>
                  <div className="text-sm text-gray-600">Somente leitura</div>
                </div>
                <div>
                  <Label>Key (Black): {cmyk.k}%</Label>
                  <div className="text-sm text-gray-600">Somente leitura</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Color Values Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Valores da Cor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <strong>HEX:</strong> {hex}
                </div>
                <div>
                  <strong>RGB:</strong> rgb({rgb.r}, {rgb.g}, {rgb.b})
                </div>
                <div>
                  <strong>HSL:</strong> hsl({hsl.h}, {hsl.s}%, {hsl.l}%)
                </div>
                <div>
                  <strong>CMYK:</strong> {cmyk.c}%, {cmyk.m}%, {cmyk.y}%, {cmyk.k}%
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ColorConverter;
