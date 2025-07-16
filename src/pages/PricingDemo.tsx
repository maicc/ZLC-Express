import { Navigation } from "@/components/Navigation";
import { PricingDiscountComponent } from "@/components/PricingDiscountComponent";

export default function PricingDemo() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="container mx-auto px-4 py-8 mt-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Componente de Precios y Descuentos - Demo
          </h1>

          <PricingDiscountComponent
            pricePerContainer={18500}
            estimatedUnitPrice={0.77}
            selectedContainers={1}
            basePrice={18500}
            total={18500}
            volumeDiscounts={[]}
          />
        </div>
      </div>
    </div>
  );
}
