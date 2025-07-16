import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DollarSign, ChevronDown, ChevronUp, Calculator } from "lucide-react";

interface VolumeDiscount {
  containers: string;
  discountPercentage: string;
  pricePerUnit: string;
  status: string;
}

interface PricingDiscountComponentProps {
  pricePerContainer: number;
  estimatedUnitPrice: number;
  volumeDiscounts: VolumeDiscount[];
  selectedContainers: number;
  basePrice: number;
  total: number;
}

export function PricingDiscountComponent({
  pricePerContainer = 18500,
  estimatedUnitPrice = 0.77,
  selectedContainers = 1,
  basePrice = 18500,
  total = 18500,
}: PricingDiscountComponentProps) {
  const [showDiscounts, setShowDiscounts] = useState(true);

  const volumeDiscounts: VolumeDiscount[] = [
    {
      containers: "2+",
      discountPercentage: "3%",
      pricePerUnit: "USD 17,945",
      status: "",
    },
    {
      containers: "5+",
      discountPercentage: "7%",
      pricePerUnit: "USD 17,205",
      status: "",
    },
    {
      containers: "10+",
      discountPercentage: "12%",
      pricePerUnit: "USD 16,280",
      status: "",
    },
    {
      containers: "20+",
      discountPercentage: "18%",
      pricePerUnit: "USD 15,170",
      status: "",
    },
  ];

  return (
    <Card className="w-full bg-white border border-gray-200 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-gray-900 text-lg font-semibold">
          <DollarSign className="h-5 w-5 text-gray-700" />
          Precios y Descuentos
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Pricing Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-600 mb-2">
              Precio por Contenedor
            </h4>
            <div className="text-2xl font-bold text-blue-600">
              USD {pricePerContainer.toLocaleString()}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-600 mb-2">
              Precio Unitario Estimado
            </h4>
            <div className="text-lg font-semibold text-gray-900">
              USD {estimatedUnitPrice.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Volume Discounts Section */}
        <div>
          <Button
            variant="ghost"
            onClick={() => setShowDiscounts(!showDiscounts)}
            className="flex items-center gap-2 p-0 h-auto text-left font-medium text-gray-900 hover:text-gray-700"
          >
            {showDiscounts ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
            Descuentos por Volumen
          </Button>

          {showDiscounts && (
            <div className="mt-4 space-y-4">
              {/* Discounts Table */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Contenedores
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Descuento
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Precio c/u
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Estado
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {volumeDiscounts.map((discount, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {discount.containers}
                        </td>
                        <td className="px-4 py-3 text-sm font-medium text-green-600">
                          {discount.discountPercentage}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {discount.pricePerUnit}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500">
                          {discount.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Calculation Summary */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Calculator className="h-4 w-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-900">
                    Resumen del Cálculo
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      Contenedores seleccionados:
                    </span>
                    <span className="font-medium text-gray-900">
                      {selectedContainers}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      Precio base por contenedor:
                    </span>
                    <span className="font-medium text-gray-900">
                      USD {basePrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 mt-3">
                    <div className="flex justify-between">
                      <span className="text-base font-semibold text-gray-900">
                        Total:
                      </span>
                      <span className="text-base font-bold text-blue-600">
                        USD {total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
