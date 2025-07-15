import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { FileText, Send, Settings } from "lucide-react";

interface CustomQuoteProps {
  availableSizes: string[];
  availableColors: string[];
}

export function CustomQuote({
  availableSizes,
  availableColors,
}: CustomQuoteProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState({
    containers: "",
    targetPrice: "",
    sizeDistribution: {} as Record<string, string>,
    colorDistribution: {} as Record<string, string>,
    specialRequirements: "",
    customLabeling: false,
    customPackaging: false,
    urgentDelivery: false,
  });

  const handleSizeDistributionChange = (size: string, percentage: string) => {
    setFormData((prev) => ({
      ...prev,
      sizeDistribution: {
        ...prev.sizeDistribution,
        [size]: percentage,
      },
    }));
  };

  const handleColorDistributionChange = (color: string, percentage: string) => {
    setFormData((prev) => ({
      ...prev,
      colorDistribution: {
        ...prev.colorDistribution,
        [color]: percentage,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Custom quote request:", formData);
  };

  if (!isExpanded) {
    return (
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                ¿Necesita una cotización personalizada?
              </h3>
              <p className="text-gray-600">
                Configure distribuciones específicas de tallas, colores, y
                solicite precios especiales según sus necesidades.
              </p>
            </div>
            <Button
              onClick={() => setIsExpanded(true)}
              className="bg-orange-600 hover:bg-orange-700"
            >
              <Settings className="mr-2 h-4 w-4" />
              Personalizar
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Cotización Personalizada
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="containers">Cantidad de Contenedores</Label>
                <Input
                  id="containers"
                  type="number"
                  placeholder="Ej: 5"
                  value={formData.containers}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      containers: e.target.value,
                    }))
                  }
                />
              </div>

              <div>
                <Label htmlFor="targetPrice">
                  Precio Objetivo (por contenedor)
                </Label>
                <Input
                  id="targetPrice"
                  type="number"
                  placeholder="Ej: 17000"
                  value={formData.targetPrice}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      targetPrice: e.target.value,
                    }))
                  }
                />
              </div>

              {/* Special Requirements */}
              <div className="space-y-3">
                <Label>Requerimientos Especiales</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="customLabeling"
                      checked={formData.customLabeling}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({
                          ...prev,
                          customLabeling: checked as boolean,
                        }))
                      }
                    />
                    <Label htmlFor="customLabeling" className="text-sm">
                      Etiquetado personalizado
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="customPackaging"
                      checked={formData.customPackaging}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({
                          ...prev,
                          customPackaging: checked as boolean,
                        }))
                      }
                    />
                    <Label htmlFor="customPackaging" className="text-sm">
                      Empaque personalizado
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="urgentDelivery"
                      checked={formData.urgentDelivery}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({
                          ...prev,
                          urgentDelivery: checked as boolean,
                        }))
                      }
                    />
                    <Label htmlFor="urgentDelivery" className="text-sm">
                      Entrega urgente
                    </Label>
                  </div>
                </div>
              </div>
            </div>

            {/* Size and Color Distribution */}
            <div className="space-y-4">
              <div>
                <Label className="mb-3 block">Distribución de Tallas (%)</Label>
                <div className="grid grid-cols-3 gap-2">
                  {availableSizes.map((size) => (
                    <div key={size} className="space-y-1">
                      <Label className="text-xs text-gray-600">{size}</Label>
                      <Input
                        type="number"
                        placeholder="0"
                        max="100"
                        className="text-xs"
                        value={formData.sizeDistribution[size] || ""}
                        onChange={(e) =>
                          handleSizeDistributionChange(size, e.target.value)
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="mb-3 block">
                  Distribución de Colores (%)
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  {availableColors.map((color) => (
                    <div key={color} className="space-y-1">
                      <Label className="text-xs text-gray-600">{color}</Label>
                      <Input
                        type="number"
                        placeholder="0"
                        max="100"
                        className="text-xs"
                        value={formData.colorDistribution[color] || ""}
                        onChange={(e) =>
                          handleColorDistributionChange(color, e.target.value)
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Additional Requirements */}
          <div>
            <Label htmlFor="specialRequirements">
              Requerimientos Adicionales
            </Label>
            <Textarea
              id="specialRequirements"
              placeholder="Describa cualquier requerimiento específico como certificaciones adicionales, modificaciones al producto, condiciones de entrega especiales, etc."
              rows={4}
              value={formData.specialRequirements}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  specialRequirements: e.target.value,
                }))
              }
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
            <Button
              type="submit"
              className="bg-orange-600 hover:bg-orange-700 flex-1"
            >
              <Send className="mr-2 h-4 w-4" />
              Enviar Solicitud de Cotización
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsExpanded(false)}
            >
              Cancelar
            </Button>
          </div>

          {/* Info Notice */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800">
              <strong>Tiempo de respuesta:</strong> Recibirá una cotización
              personalizada en un plazo de 24-48 horas hábiles. Nuestro equipo
              de ventas se contactará con usted para confirmar los detalles y
              proporcionar la mejor oferta posible.
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
