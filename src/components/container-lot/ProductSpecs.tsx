import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Truck, Clock, Info, Box, Scale } from "lucide-react";

interface Specifications {
  material: string;
  sizes: string[];
  colors: string[];
  category: string;
}

interface Logistics {
  totalUnits: number;
  grossWeight: string;
  netWeight: string;
  containerDimensions: {
    length: string;
    width: string;
    height: string;
    type: string;
  };
  incoterm: string;
  conditions: string;
  leadTime: {
    production: string;
    shipping: string;
  };
}

interface ProductSpecsProps {
  description: string;
  specifications: Specifications;
  logistics: Logistics;
}

export function ProductSpecs({
  description,
  specifications,
  logistics,
}: ProductSpecsProps) {
  return (
    <div className="space-y-6 mb-8">
      {/* Product Description */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            Descripción del Producto
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed">{description}</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Product Specifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Especificaciones
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Material</h4>
              <p className="text-gray-700">{specifications.material}</p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Categoría</h4>
              <Badge variant="outline">{specifications.category}</Badge>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Tallas Disponibles
              </h4>
              <div className="flex flex-wrap gap-2">
                {specifications.sizes.map((size) => (
                  <Badge key={size} variant="secondary">
                    {size}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Colores Disponibles
              </h4>
              <div className="flex flex-wrap gap-2">
                {specifications.colors.map((color) => (
                  <Badge key={color} variant="outline">
                    {color}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Logistics Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5" />
              Información Logística
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  Total Unidades
                </h4>
                <p className="text-gray-700">
                  {logistics.totalUnits.toLocaleString()}
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Peso Bruto</h4>
                <p className="text-gray-700">{logistics.grossWeight}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Peso Neto</h4>
                <p className="text-gray-700">{logistics.netWeight}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Incoterm</h4>
                <Badge className="bg-blue-100 text-blue-800">
                  {logistics.incoterm}
                </Badge>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <Box className="h-4 w-4" />
                Dimensiones del Contenedor
              </h4>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="font-medium mb-1">
                  {logistics.containerDimensions.type}
                </p>
                <p className="text-sm text-gray-600">
                  {logistics.containerDimensions.length} ×{" "}
                  {logistics.containerDimensions.width} ×{" "}
                  {logistics.containerDimensions.height}
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Tiempos de Entrega
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Producción:</span>
                  <span className="font-medium">
                    {logistics.leadTime.production}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Envío:</span>
                  <span className="font-medium">
                    {logistics.leadTime.shipping}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Condiciones</h4>
              <p className="text-sm text-gray-600">{logistics.conditions}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
