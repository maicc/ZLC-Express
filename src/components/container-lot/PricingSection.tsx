import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingDown, Calculator } from "lucide-react";

interface VolumeDiscount {
  containers: number;
  discountPercentage: number;
}

interface Pricing {
  pricePerContainer: number;
  estimatedUnitPrice: number;
  currency: string;
  volumeDiscounts: VolumeDiscount[];
}

interface PricingSectionProps {
  pricing: Pricing;
  selectedContainers: number;
}

export function PricingSection({
  pricing,
  selectedContainers,
}: PricingSectionProps) {
  const getCurrentDiscount = () => {
    const applicableDiscounts = pricing.volumeDiscounts.filter(
      (discount) => selectedContainers >= discount.containers,
    );
    return applicableDiscounts.length > 0
      ? applicableDiscounts[applicableDiscounts.length - 1]
      : null;
  };

  const calculateDiscountedPrice = (containers: number, discount: number) => {
    return pricing.pricePerContainer * (1 - discount / 100);
  };

  const currentDiscount = getCurrentDiscount();

  return (
    <div className="mb-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Estructura de Precios
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Base Pricing */}
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  Precio Base
                </h4>

                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl font-bold text-blue-600">
                      ${pricing.pricePerContainer.toLocaleString()}
                    </span>
                    <span className="text-gray-600">por contenedor</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Equivale a ${pricing.estimatedUnitPrice} por unidad
                  </p>

                  {currentDiscount && (
                    <div className="mt-4 pt-4 border-t border-blue-200">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingDown className="h-4 w-4 text-green-600" />
                        <span className="font-medium text-green-600">
                          Descuento Aplicado:{" "}
                          {currentDiscount.discountPercentage}%
                        </span>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-green-600">
                          $
                          {calculateDiscountedPrice(
                            selectedContainers,
                            currentDiscount.discountPercentage,
                          ).toLocaleString()}
                        </span>
                        <span className="text-gray-600">por contenedor</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Price Breakdown */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  Desglose de Costos
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Costo del producto:</span>
                    <span className="font-medium">$16,200</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Manejo y empaque:</span>
                    <span className="font-medium">$1,500</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Documentación:</span>
                    <span className="font-medium">$300</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Carga contenedor:</span>
                    <span className="font-medium">$500</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between font-semibold">
                    <span>Total FOB ZLC:</span>
                    <span>${pricing.pricePerContainer.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Volume Discounts Table */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                Descuentos por Volumen
              </h4>

              <div className="space-y-3">
                {pricing.volumeDiscounts.map((discount, index) => {
                  const isActive = selectedContainers >= discount.containers;
                  const isCurrent = currentDiscount === discount;
                  const discountedPrice = calculateDiscountedPrice(
                    selectedContainers,
                    discount.discountPercentage,
                  );

                  return (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        isCurrent
                          ? "border-green-500 bg-green-50"
                          : isActive
                            ? "border-blue-200 bg-blue-50"
                            : "border-gray-200 bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">
                            {discount.containers}+ contenedores
                          </span>
                          {isCurrent && (
                            <Badge className="bg-green-100 text-green-800 text-xs">
                              Aplicado
                            </Badge>
                          )}
                        </div>
                        <span className="font-bold text-green-600">
                          -{discount.discountPercentage}%
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Precio unitario:</span>
                        <span className="font-medium">
                          $
                          {calculateDiscountedPrice(
                            1,
                            discount.discountPercentage,
                          ).toLocaleString()}
                        </span>
                      </div>

                      {isCurrent && (
                        <div className="mt-3 pt-3 border-t border-green-200">
                          <div className="flex items-center justify-between font-semibold">
                            <span>Su precio total:</span>
                            <span className="text-green-600">
                              $
                              {(
                                discountedPrice * selectedContainers
                              ).toLocaleString()}
                            </span>
                          </div>
                          <div className="text-xs text-green-600 mt-1">
                            Ahorro: $
                            {(
                              pricing.pricePerContainer * selectedContainers -
                              discountedPrice * selectedContainers
                            ).toLocaleString()}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Calculator className="h-4 w-4 text-gray-600" />
                  <span className="font-medium text-gray-900">
                    Calculadora de Ahorro
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Con {selectedContainers} contenedor(es) y el{" "}
                  {currentDiscount ? currentDiscount.discountPercentage : 0}% de
                  descuento, usted ahorra{" "}
                  <span className="font-medium text-green-600">
                    $
                    {currentDiscount
                      ? (
                          (pricing.pricePerContainer -
                            calculateDiscountedPrice(
                              selectedContainers,
                              currentDiscount.discountPercentage,
                            )) *
                          selectedContainers
                        ).toLocaleString()
                      : "0"}
                  </span>{" "}
                  en total.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
