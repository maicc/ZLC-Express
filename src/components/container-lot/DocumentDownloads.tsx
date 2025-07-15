import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  FileText,
  Image,
  CheckCircle,
  Shield,
  FileCheck,
} from "lucide-react";

interface DocumentDownloadsProps {
  lotId: string;
}

const documents = [
  {
    id: "product-spec",
    name: "Especificaciones Técnicas",
    description: "Detalles completos del producto, materiales y dimensiones",
    type: "PDF",
    size: "2.3 MB",
    icon: FileText,
    available: true,
  },
  {
    id: "quality-cert",
    name: "Certificados de Calidad",
    description: "OEKO-TEX, GOTS y certificaciones ISO",
    type: "PDF",
    size: "1.8 MB",
    icon: Shield,
    available: true,
  },
  {
    id: "sample-images",
    name: "Galería de Imágenes HD",
    description: "Fotos de alta resolución del producto y proceso",
    type: "ZIP",
    size: "45.2 MB",
    icon: Image,
    available: true,
  },
  {
    id: "test-reports",
    name: "Reportes de Pruebas",
    description: "Resultados de pruebas de calidad y control",
    type: "PDF",
    size: "3.1 MB",
    icon: FileCheck,
    available: true,
  },
  {
    id: "compliance-docs",
    name: "Documentos de Cumplimiento",
    description: "Certificaciones regulatorias y aduanales",
    type: "PDF",
    size: "1.5 MB",
    icon: CheckCircle,
    available: false,
  },
];

export function DocumentDownloads({ lotId }: DocumentDownloadsProps) {
  const handleDownload = (documentId: string) => {
    // Simulate download
    console.log(`Downloading document: ${documentId} for lot: ${lotId}`);
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="h-5 w-5" />
          Documentación Técnica
        </CardTitle>
        <p className="text-sm text-gray-600">
          Descargue la documentación completa del lote {lotId}
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {documents.map((doc) => {
            const IconComponent = doc.icon;

            return (
              <div
                key={doc.id}
                className={`p-4 rounded-lg border-2 transition-all ${
                  doc.available
                    ? "border-gray-200 hover:border-blue-300 bg-white"
                    : "border-gray-100 bg-gray-50"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      doc.available
                        ? "bg-blue-100 text-blue-600"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    <IconComponent className="h-5 w-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4
                        className={`font-medium ${
                          doc.available ? "text-gray-900" : "text-gray-500"
                        }`}
                      >
                        {doc.name}
                      </h4>
                      <Badge
                        variant={doc.available ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {doc.type}
                      </Badge>
                    </div>

                    <p
                      className={`text-sm mb-2 ${
                        doc.available ? "text-gray-600" : "text-gray-400"
                      }`}
                    >
                      {doc.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs ${
                          doc.available ? "text-gray-500" : "text-gray-400"
                        }`}
                      >
                        Tamaño: {doc.size}
                      </span>

                      <Button
                        size="sm"
                        onClick={() => handleDownload(doc.id)}
                        disabled={!doc.available}
                        className={
                          doc.available
                            ? "bg-blue-600 hover:bg-blue-700"
                            : undefined
                        }
                      >
                        <Download className="h-3 w-3 mr-1" />
                        {doc.available ? "Descargar" : "No disponible"}
                      </Button>
                    </div>
                  </div>
                </div>

                {!doc.available && (
                  <div className="mt-3 p-2 bg-orange-50 border border-orange-200 rounded text-xs text-orange-800">
                    Disponible después de solicitar cotización
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-1">
                Paquete Completo de Documentación
              </h4>
              <p className="text-sm text-gray-600 mb-3">
                Descargue todos los documentos disponibles en un solo archivo
                comprimido.
              </p>
              <Button
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                <Download className="h-4 w-4 mr-2" />
                Descargar Todo (ZIP - 52.9 MB)
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            Los documentos se actualizan automáticamente. Última actualización:{" "}
            <span className="font-medium">15 de Enero, 2024</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
