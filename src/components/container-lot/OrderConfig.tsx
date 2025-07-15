import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ShoppingCart,
  MessageCircle,
  Minus,
  Plus,
  Package,
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
  const [customQuantity, setCustomQuantity] = useState("");

  const handleQuantityChange = (newQuantity: number) => {
    const clampedQuantity = Math.max(
      minContainers,
      Math.min(maxContainers, newQuantity),
    );
    onContainersChange(clampedQuantity);
  };

  const basePrice = 18500;
  const unitsPerContainer = 24000;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Package className="h-5 w-5" />
          Configuración de Pedido
        </CardTitle>
        <p className="text-sm text-gray-600">Número de Contenedores</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Container Quantity Selector */}
        <div className="flex items-center justify-center">
          <div className="flex items-center border rounded-lg">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleQuantityChange(containers - 1)}
              disabled={containers <= minContainers}
              className="h-12 w-12 rounded-none"
            >
              <Minus className="h-4 w-4" />
            </Button>

            <div className="flex items-center justify-center h-12 w-16 border-x">
              <span className="text-lg font-semibold">{containers}</span>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleQuantityChange(containers + 1)}
              disabled={containers >= maxContainers}
              className="h-12 w-12 rounded-none"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <p className="text-center text-sm text-gray-600">
          Mínimo: {minContainers} | Máximo: {maxContainers} contenedores
        </p>

        <Separator />

        {/* Container Details */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Contenedor</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">
                Precio por Contenedor (USD):
              </span>
              <span className="font-medium">${basePrice.toLocaleString()}</span>
            </div>
            <p className="text-xs text-gray-500">Negociar precio</p>
          </div>
        </div>

        <Separator />

        {/* Product Details */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">
            Cantidad de Productos Deseados (unidades)
          </h4>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-lg font-semibold text-center">
              {(containers * unitsPerContainer).toLocaleString()}
            </p>
          </div>
        </div>

        <Separator />

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white h-12">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Pedir Cotización
          </Button>
          <p className="text-xs text-gray-600 text-center">
            El proveedor revisará su consulta y le responderá en 24-48 horas.
          </p>

          <Button
            variant="outline"
            className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 h-12"
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            Enviar Oferta (1 contenedor)
          </Button>
          <p className="text-xs text-gray-600 text-center">
            Sin riesgo, solo pague directamente para el pedido.
          </p>
        </div>

        {/* Negotiable Notice */}
        {isNegotiable && (
          <div className="bg-orange-50 border border-orange-200 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-orange-600 font-medium text-sm">
                Negociable
              </span>
            </div>
            <p className="text-xs text-orange-800">
              Este producto tiene precio negociable según cantidad y
              especificaciones requeridas.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
