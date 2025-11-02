import { useState, useEffect } from "react";
import { Download as DownloadIcon, FileText, Eye, Clock, Star, Heart, Image } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import BottomNavigation from "@/components/BottomNavigation";
import jsPDF from 'jspdf';
import UrutanSyariatImg from '@/assets/UrutanSyariat.png';
import WanitaMenyusuiImg from '@/assets/Wanitayangmenyusui.png';
import AOS from "aos";

interface PDFResource {
  id: string;
  title: string;
  description: string;
  size: string;
  pages: number;
  category: "sirah" | "hadits" | "timeline" | "maps" | "infografis";
  featured: boolean;
  downloadUrl: string;
  previewImages: string[];
  lastUpdated: string;
  isImageToPDF?: boolean;
  imageUrl?: string;
}

const pdfResources: PDFResource[] = [
  {
    id: "urutan-syariat",
    title: "Urutan Syariat",
    description: "Infografis berkualitas tinggi yang menjelaskan urutan dan hierarki syariat Islam dengan detail yang mudah dipahami.",
    size: "2.1 MB",
    pages: 1,
    category: "infografis",
    featured: true,
    downloadUrl: "/downloads/urutan-syariat.pdf",
    previewImages: ["/preview/urutan-syariat.jpg"],
    lastUpdated: "2025-10-15",
    isImageToPDF: true,
    imageUrl: UrutanSyariatImg
  },
  {
    id: "wanita-menyusui",
    title: "Wanita yang Menyusui",
    description: "Infografis komprehensif tentang hukum dan adab wanita yang menyusui dalam Islam dengan penjelasan detail.",
    size: "1.8 MB",
    pages: 1,
    category: "infografis",
    featured: true,
    downloadUrl: "/downloads/wanita-menyusui.pdf",
    previewImages: ["/preview/wanita-menyusui.jpg"],
    lastUpdated: "2025-10-15",
    isImageToPDF: true,
    imageUrl: WanitaMenyusuiImg
  }
];

const categoryLabels = {
  infografis: "Infografis"
};

const categoryColors = {
  infografis: "bg-purple-500/10 text-purple-600"
};

// Function to convert image to PDF with high quality
const convertImageToPDF = async (imageUrl: string, title: string): Promise<void> => {
  // Create a new image element
  const img = new Image();
  img.crossOrigin = 'anonymous';
  
  return new Promise((resolve, reject) => {
    img.onload = () => {
      // Create canvas to get image data
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }
      
      // Set canvas size to image size for high quality
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      
      // Draw image on canvas
      ctx.drawImage(img, 0, 0);
      
      // Get image data as base64
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      
      // Calculate PDF dimensions (A4 size with margins)
      const pdfWidth = 210; // A4 width in mm
      const pdfHeight = 297; // A4 height in mm
      const margin = 10; // 10mm margin
      const maxWidth = pdfWidth - (margin * 2);
      const maxHeight = pdfHeight - (margin * 2);
      
      // Calculate image dimensions to fit in PDF while maintaining aspect ratio
      const imgAspectRatio = img.naturalWidth / img.naturalHeight;
      let imgWidth = maxWidth;
      let imgHeight = maxWidth / imgAspectRatio;
      
      if (imgHeight > maxHeight) {
        imgHeight = maxHeight;
        imgWidth = maxHeight * imgAspectRatio;
      }
      
      // Create PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      // Add title
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text(title, margin, margin + 5);
      
      // Calculate position to center the image
      const xPos = (pdfWidth - imgWidth) / 2;
      const yPos = margin + 15; // Below title
      
      // Add image to PDF with high quality
      pdf.addImage(imgData, 'JPEG', xPos, yPos, imgWidth, imgHeight, undefined, 'FAST');
      
      // Save PDF
      const fileName = `${title.toLowerCase().replace(/\s+/g, '-')}.pdf`;
      pdf.save(fileName);
      
      resolve();
    };
    
    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };
    
    // Load image
    img.src = imageUrl;
  });
};

const Download = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [previewPDF, setPreviewPDF] = useState<PDFResource | null>(null);
  const { toast } = useToast();
  const [likedFeatured, setLikedFeatured] = useState<Record<string, boolean>>({});
  const toggleLike = (id: string) => {
    setLikedFeatured(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredResources = pdfResources.filter(resource => 
    selectedCategory === "all" || resource.category === selectedCategory
  );

  const handleDownload = async (resource: PDFResource) => {
    try {
      if (resource.isImageToPDF && resource.imageUrl) {
        // Show loading toast
        toast({
          title: "Memproses PDF",
          description: `Mengkonversi ${resource.title} ke format PDF...`,
        });
        
        // Convert image to PDF
        await convertImageToPDF(resource.imageUrl, resource.title);
        
        // Show success toast
        toast({
          title: "Download Berhasil",
          description: `${resource.title} telah diunduh sebagai PDF berkualitas tinggi`,
        });
      } else {
        // Regular PDF download
        toast({
          title: "Download Dimulai",
          description: `Mengunduh ${resource.title} (${resource.size})`,
        });
      }
    } catch (error) {
      toast({
        title: "Download Gagal",
        description: `Terjadi kesalahan saat mengunduh ${resource.title}`,
        variant: "destructive",
      });
    }
  };

  const openPreview = (resource: PDFResource) => {
    setPreviewPDF(resource);
  };

  useEffect(() => {
    AOS.init({
      duration: 1500,
      easing: "ease-out-cubic",
      once: true,
      offset: 60,
    });
    AOS.refresh();
  }, []);

  return (
    <div className="download-page min-h-screen background-grid pb-20 theme-transition">
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Header */}
        <div
          className="text-center mb-8"
          data-aos="fade-up"
          data-aos-duration="1600"
          data-aos-easing="ease-out-cubic"
        >
          <h1 className="text-3xl font-bold text-primary mb-2">Download Materi</h1>
          <p className="text-muted-foreground">Koleksi PDF berkualitas tinggi untuk pembelajaran sejarah Islam</p>
        </div>

        {/* Category Filter */}
        <Card
          className="download-summary-card p-4 mb-6 bg-card/80 backdrop-blur-sm theme-transition"
          data-aos="fade-up"
          data-aos-duration="1600"
          data-aos-easing="ease-out-cubic"
          data-aos-delay="120"
        >
          <div className="flex flex-wrap gap-2 justify-center">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              onClick={() => setSelectedCategory("all")}
              size="sm"
            >
              Semua Kategori
            </Button>
            {Object.entries(categoryLabels).map(([key, label]) => (
              <Button
                key={key}
                variant={selectedCategory === key ? "default" : "outline"}
                onClick={() => setSelectedCategory(key)}
                size="sm"
              >
                {label}
              </Button>
            ))}
          </div>
        </Card>

        {/* Featured Resources */}
        {selectedCategory === "all" && (
          <div className="mb-8">
            <h2
              className="text-xl font-semibold mb-4"
              data-aos="fade-up"
              data-aos-duration="1600"
              data-aos-easing="ease-out-cubic"
              data-aos-delay="180"
            >
              Materi Unggulan
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pdfResources.filter(r => r.featured).map((resource, index) => (
                <Card
                  key={resource.id}
                  className="download-resource-card overflow-hidden bg-card/80 backdrop-blur-sm border-primary/20 theme-transition"
                  data-aos="fade-up"
                  data-aos-duration="1600"
                  data-aos-easing="ease-out-cubic"
                  data-aos-delay={220 + index * 150}
                >
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-3">
                        <Badge className={`download-category-badge ${categoryColors[resource.category]}`}>
                        {categoryLabels[resource.category]}
                      </Badge>
                      <div className="flex items-center gap-1 text-primary">
                        <Heart
                          onClick={(e) => { e.stopPropagation(); toggleLike(resource.id); }}
                          className={`h-4 w-4 transition-colors duration-300 cursor-pointer ${likedFeatured[resource.id] ? 'text-red-500' : 'text-primary'}`}
                          fill="currentColor"
                          role="button"
                          aria-label={likedFeatured[resource.id] ? 'Unlike resource' : 'Like resource'}
                          aria-pressed={likedFeatured[resource.id] ? true : false}
                        />
                      </div>
                    </div>
                    
                    <h3 className="font-semibold text-lg mb-2">{resource.title}</h3>
                    <p className="download-resource-description text-sm text-muted-foreground mb-4 line-clamp-2 theme-transition">
                      {resource.description}
                    </p>
                    
                    <div className="download-resource-meta flex items-center gap-4 text-sm text-muted-foreground mb-4 theme-transition">
                      <div className="flex items-center gap-1">
                        <FileText className="h-4 w-4" />
                        {resource.pages} halaman
                      </div>
                      <div className="flex items-center gap-1">
                        <DownloadIcon className="h-4 w-4" />
                        {resource.size}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {new Date(resource.lastUpdated).toLocaleDateString('id-ID')}
                      </div>
                    </div>
                    
                    <div className="download-resource-actions flex gap-2 theme-transition">
                      <Button
                        onClick={() => openPreview(resource)}
                        variant="outline"
                        size="sm"
                        className="download-preview-button flex-1 rounded-lg hover:text-white hover:bg-[#435e46] transition-all duration-300 theme-transition"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Preview
                      </Button>
                      <Button
                        onClick={() => handleDownload(resource)}
                        variant="islamic"
                        size="sm"
                        className="download-action-button flex-1 rounded-lg hover:text-white transition-all duration-300 theme-transition"
                      >
                        <DownloadIcon className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* All Resources */}
        <div>
          <h2 className="text-xl font-semibold mb-4">
            {selectedCategory === "all" ? "Semua Materi" : `Kategori: ${categoryLabels[selectedCategory as keyof typeof categoryLabels]}`}
          </h2>
          
          <div className="space-y-4">
            {filteredResources.map((resource, index) => (
              <Card
                key={resource.id}
                className="download-resource-card bg-card/80 backdrop-blur-sm overflow-hidden theme-transition"
                data-aos="fade-up"
                data-aos-duration="1600"
                data-aos-easing="ease-out-cubic"
                data-aos-delay={200 + index * 120}
              >
                <div className="p-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-lg">{resource.title}</h3>
                        </div>
                        <Badge className={`download-category-badge ${categoryColors[resource.category]}`}>
                          {categoryLabels[resource.category]}
                        </Badge>
                      </div>
                      
                      <p className="download-resource-description text-muted-foreground mb-3 leading-relaxed theme-transition">
                        {resource.description}
                      </p>
                      
                      <div className="download-resource-meta flex flex-wrap items-center gap-4 text-sm text-muted-foreground theme-transition">
                        <div className="flex items-center gap-1">
                          <FileText className="h-4 w-4" />
                          {resource.pages} halaman
                        </div>
                        <div className="flex items-center gap-1">
                          <DownloadIcon className="h-4 w-4" />
                          {resource.size}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          Diperbarui {new Date(resource.lastUpdated).toLocaleDateString('id-ID')}
                        </div>
                      </div>
                    </div>
                    
                    <div className="download-resource-actions flex md:flex-col gap-2 md:w-32 theme-transition">
                      <Button
                        onClick={() => openPreview(resource)}
                        variant="outline"
                        size="sm"
                        className="download-preview-button flex-1 md:flex-none rounded-lg hover:text-white hover:bg-[#435e46] transition-all duration-300 theme-transition"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Preview
                      </Button>
                      <Button
                        onClick={() => handleDownload(resource)}
                        variant="islamic"
                        size="sm"
                        className="download-action-button flex-1 md:flex-none rounded-lg hover:text-white transition-all duration-300 theme-transition"
                      >
                        <DownloadIcon className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Preview Dialog */}
      <Dialog open={!!previewPDF} onOpenChange={() => setPreviewPDF(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>{previewPDF?.title}</DialogTitle>
            <DialogDescription>
              Preview halaman dari {previewPDF?.title} - {previewPDF?.pages} halaman total
            </DialogDescription>
          </DialogHeader>
          
          {previewPDF && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <FileText className="h-4 w-4" />
                    {previewPDF.pages} halaman
                  </div>
                  <div className="flex items-center gap-1">
                    <DownloadIcon className="h-4 w-4" />
                    {previewPDF.size}
                  </div>
                </div>
                <Button onClick={() => handleDownload(previewPDF)} variant="islamic" className="rounded-lg hover:text-white transition-all duration-300">
                  <DownloadIcon className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
              </div>
              
              <div className="grid gap-4">
                {previewPDF.isImageToPDF && previewPDF.imageUrl ? (
                  <div className="bg-muted/20 rounded-lg p-4">
                    <div className="text-center mb-4">
                      <div className="text-muted-foreground font-medium">
                        📄 Preview {previewPDF.title}
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <img 
                        src={previewPDF.imageUrl} 
                        alt={`Preview ${previewPDF.title}`}
                        className="max-w-full h-auto rounded-lg shadow-lg border"
                        style={{ maxHeight: '600px' }}
                      />
                    </div>
                  </div>
                ) : (
                  previewPDF.previewImages.map((image, index) => (
                    <div key={index} className="bg-muted/20 rounded-lg p-8 text-center">
                      <div className="text-muted-foreground">
                        📄 Preview Halaman {index + 1}
                      </div>
                      <div className="text-sm text-muted-foreground mt-2">
                        [Gambar preview akan ditampilkan di sini]
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <BottomNavigation />
    </div>
  );
};

export default Download;






