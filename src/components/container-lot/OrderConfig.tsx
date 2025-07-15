import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShoppingCart, Minus, Plus, Send } from "lucide-react";

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
  const [counterOfferPrice, setCounterOfferPrice] = useState("");
  const [desiredQuantity, setDesiredQuantity] = useState("");

  const handleQuantityChange = (newQuantity: number) => {
    const clampedQuantity = Math.max(
      minContainers,
      Math.min(maxContainers, newQuantity),
    );
    onContainersChange(clampedQuantity);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg text-gray-900">
          <ShoppingCart className="h-5 w-5" />
          Configuración de Pedido
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Container Quantity Section */}
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-3 block">
            Número de Contenedores
          </Label>

          {/* Quantity Selector */}
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center border border-gray-300 rounded-lg">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleQuantityChange(containers - 1)}
                disabled={containers <= minContainers}
                className="h-12 w-12 rounded-none border-r border-gray-300"
              >
                <Minus className="h-4 w-4" />
              </Button>

              <div className="flex items-center justify-center h-12 w-16">
                <span className="text-lg font-semibold">{containers}</span>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleQuantityChange(containers + 1)}
                disabled={containers >= maxContainers}
                className="h-12 w-12 rounded-none border-l border-gray-300"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <p className="text-center text-sm text-gray-600">
            Mínimo: {minContainers} • Máximo: {maxContainers} contenedores
          </p>
        </div>

        {/* Counter Offer Section */}
        <div className="bg-orange-50 border border-orange-100 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Contraoferta</h3>

          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-gray-700">
                Precio por Contenedor (USD)
              </Label>
              <Input
                placeholder="Ingrese su oferta..."
                value={counterOfferPrice}
                onChange={(e) => setCounterOfferPrice(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">
                Cantidad de Producto Deseada (unidades)
              </Label>
              <Input
                placeholder="ej. 25000"
                value={desiredQuantity}
                onChange={(e) => setDesiredQuantity(e.target.value)}
                className="mt-1"
              />
            </div>

            <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">
              <Send className="mr-2 h-4 w-4" />
              Enviar Contraoferta
            </Button>

            <p className="text-xs text-gray-600 text-center">
              El proveedor revisará su contraoferta y responderá en 24-48 horas.
            </p>
          </div>
        </div>

        {/* Direct Offer Button */}
        <div className="space-y-3">
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12">
            <Send className="mr-2 h-4 w-4" />
            Enviar Oferta (1 contenedor)
          </Button>

          <p className="text-sm text-gray-600 text-center">
            Su oferta será enviada directamente al proveedor para revisión
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
