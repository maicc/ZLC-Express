import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ShoppingCart,
  FileText,
  MessageCircle,
  Calculator,
  Info,
  Minus,
  Plus,
} from "lucide-react";

interface OrderConfigProps {
  isNegotiable: boolean;
  minContainers: number;
  maxContainers: number;
  containers: number;
  onContainersChange: (containers: number) => void;
}

export function OrderConfig({
  isNegotiable,
  minContainers,
  maxContainers,
  containers,
  onContainersChange,
}: OrderConfigProps) {
  const [incoterm, setIncoterm] = useState("FOB");
  const [customQuantity, setCustomQuantity] = useState("");

  const handleQuantityChange = (newQuantity: number) => {
    const clampedQuantity = Math.max(
      minContainers,
      Math.min(maxContainers, newQuantity),
    );
    onContainersChange(clampedQuantity);
  };

  return (
    <div className="space-y-6">
      {/* Order Configuration Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Configurar Pedido
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Container Quantity */}
          <div>
            <Label htmlFor="containers" className="text-base font-medium">
              Cantidad de Contenedores
            </Label>
            <div className="flex items-center gap-3 mt-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(containers - 1)}
                disabled={containers <= minContainers}
              >
                <Minus className="h-4 w-4" />
              </Button>

              <Input
                id="containers"
                type="number"
                value={containers}
                onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                min={minContainers}
                max={maxContainers}
                className="w-20 text-center"
              />

              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(containers + 1)}
                disabled={containers >= maxContainers}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Mínimo: {minContainers} | Máximo: {maxContainers}
            </p>
          </div>

          {/* Quick Quantity Selector */}
          <div>
            <Label className="text-sm font-medium text-gray-700">
              Cantidades Frecuentes
            </Label>
            <div className="flex gap-2 mt-2 flex-wrap">
              {[1, 2, 5, 10, 20].map((qty) => (
                <Button
                  key={qty}
                  variant={containers === qty ? "default" : "outline"}
                  size="sm"
                  onClick={() => onContainersChange(qty)}
                  className="text-xs"
                >
                  {qty}
                </Button>
              ))}
            </div>
          </div>

          {/* Incoterm Selection */}
          <div>
            <Label htmlFor="incoterm" className="text-base font-medium">
              Términos de Entrega (Incoterm)
            </Label>
            <Select value={incoterm} onValueChange={setIncoterm}>
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="FOB">FOB - Free On Board</SelectItem>
                <SelectItem value="CIF">
                  CIF - Cost, Insurance & Freight
                </SelectItem>
                <SelectItem value="CFR">CFR - Cost and Freight</SelectItem>
                <SelectItem value="EXW">EXW - Ex Works</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-600 mt-1">
              FOB Zona Libre de Colón incluido
            </p>
          </div>

          <Separator />

          {/* Pricing Summary */}
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Precio por contenedor:</span>
              <span className="font-medium">$18,500</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Cantidad:</span>
              <span className="font-medium">{containers} contenedor(es)</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Subtotal:</span>
              <span className="font-medium">
                ${(18500 * containers).toLocaleString()}
              </span>
            </div>

            {containers >= 2 && (
              <div className="flex justify-between text-sm text-green-600">
                <span>Descuento por volumen:</span>
                <span className="font-medium">
                  -
                  {containers >= 20
                    ? 18
                    : containers >= 10
                      ? 12
                      : containers >= 5
                        ? 7
                        : 3}
                  %
                </span>
              </div>
            )}

            <Separator />

            <div className="flex justify-between text-base font-semibold">
              <span>Total Estimado:</span>
              <span className="text-blue-600">
                $
                {(
                  18500 *
                  containers *
                  (1 -
                    (containers >= 20
                      ? 18
                      : containers >= 10
                        ? 12
                        : containers >= 5
                          ? 7
                          : containers >= 2
                            ? 3
                            : 0) /
                      100)
                ).toLocaleString()}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <Card>
        <CardContent className="p-6 space-y-3">
          <Button className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Agregar al Carrito
          </Button>

          <Button
            variant="outline"
            className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
            size="lg"
          >
            <FileText className="mr-2 h-4 w-4" />
            Solicitar Cotización (RFQ)
          </Button>

          <Button variant="outline" className="w-full" size="lg">
            <MessageCircle className="mr-2 h-4 w-4" />
            Consultar con Asesor
          </Button>
        </CardContent>
      </Card>

      {/* Negotiable Price Notice */}
      {isNegotiable && (
        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-orange-900 mb-1">
                  Precio Negociable
                </h4>
                <p className="text-sm text-orange-800">
                  Este producto tiene precio negociable. Puede solicitar una
                  cotización personalizada según sus necesidades específicas.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Información Rápida</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Unidades por contenedor:</span>
            <span className="font-medium">24,000</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Precio por unidad:</span>
            <span className="font-medium">$0.77</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tiempo de producción:</span>
            <span className="font-medium">14-21 días</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tiempo de envío:</span>
            <span className="font-medium">7-10 días</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
