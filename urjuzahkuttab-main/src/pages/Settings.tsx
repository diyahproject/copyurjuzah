import { useState, useEffect } from "react";
import {
  Sun,
  Moon,
  Type,
  HelpCircle,
  MessageSquare,
  Info,
  ChevronRight,
  ChevronDown,
  Palette,
  Monitor,
  Users,
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
  Download,
  Globe,
  Heart,
  Star,
  Coffee,
  LifeBuoy,
  Send,
  Smartphone,
  Target,
  Building2,
  BookOpen,
  Laptop,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useTheme, type ThemeScheme } from "@/contexts/ThemeContext";
import BottomNavigation from "@/components/BottomNavigation";
import AOS from "aos";

const Settings = () => {
  const { scheme, setScheme } = useTheme();
  const [fontSize, setFontSize] = useState("medium");
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [email, setEmail] = useState("");
  const [helpExpanded, setHelpExpanded] = useState(false);
  const [feedbackExpanded, setFeedbackExpanded] = useState(false);
  const [appInfoExpanded, setAppInfoExpanded] = useState(false);
  const [aboutExpanded, setAboutExpanded] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1500,
      easing: "ease-out-cubic",
      once: true,
      offset: 60,
    });
    AOS.refresh();
  }, []);

  // Load saved preferences and cleanup old theme storage
  useEffect(() => {
    const savedFontSize = localStorage.getItem("fontSize");

    if (savedFontSize) {
      // Handle fallback for removed "extra-large" option
      if (savedFontSize === "extra-large") {
        setFontSize("large");
        localStorage.setItem("fontSize", "large");
        applyFontSize("large");
      } else {
        setFontSize(savedFontSize);
        applyFontSize(savedFontSize);
      }
    }

    // Clean up old theme storage key to prevent conflicts
    const oldTheme = localStorage.getItem("theme");
    if (oldTheme) {
      localStorage.removeItem("theme");
    }
  }, []);

  const applyFontSize = (size: string) => {
    const root = document.documentElement;

    // Fallback for users who had "extra-large" setting
    let actualSize = size;
    if (size === "extra-large") {
      actualSize = "large";
      // Update localStorage to the fallback value
      localStorage.setItem("fontSize", "large");
      setFontSize("large");
    }

    // Apply font size with optimal line-height for readability
    switch (actualSize) {
      case "small":
        root.style.fontSize = "14px";
        root.style.lineHeight = "1.6";
        break;
      case "medium":
        root.style.fontSize = "16px";
        root.style.lineHeight = "1.6";
        break;
      case "large":
        root.style.fontSize = "18px";
        root.style.lineHeight = "1.7";
        break;
      default:
        root.style.fontSize = "16px";
        root.style.lineHeight = "1.6";
    }

    // Apply consistent font settings for better readability
    root.style.fontFamily =
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
    root.style.letterSpacing = "0.01em";
    root.style.fontWeight = "400";

    // Ensure proper contrast and readability
    root.style.setProperty("--font-smoothing", "antialiased");
    root.style.setProperty("-webkit-font-smoothing", "antialiased");
    root.style.setProperty("-moz-osx-font-smoothing", "grayscale");
  };

  const changeFontSize = (size: string) => {
    setFontSize(size);
    localStorage.setItem("fontSize", size);
    applyFontSize(size);

    toast({
      title: "Ukuran Teks Diubah",
      description: `Ukuran teks telah diatur ke ${fontSizeLabels[size]}`,
    });
  };

  const fontSizeLabels: Record<string, string> = {
    small: "Kecil",
    medium: "Sedang",
    large: "Besar",
  };

  const handleThemeChange = (value: boolean) => {
    const nextScheme: ThemeScheme = value ? "dark" : "light";
    setScheme(nextScheme);

    toast({
      title: "Tema Diperbarui",
      description: `Tema ${value ? "Gelap" : "Terang"} berhasil diaktifkan.`,
    });
  };

  const submitFeedback = () => {
    if (!feedback.trim()) {
      toast({
        title: "Pesan Diperlukan",
        description: "Silakan tulis pesan feedback Anda",
        variant: "destructive",
      });
      return;
    }

    try {
      // Format tanggal untuk subject
      const currentDate = new Date().toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      // Buat subject email
      const subject = `Feedback Aplikasi Sejarah Islam - ${currentDate}`;

      // Buat body email
      let emailBody = `Feedback dari pengguna:\n\n${feedback.trim()}`;

      // Tambahkan email pengguna jika diisi
      if (email.trim()) {
        emailBody += `\n\n---\nEmail pengguna: ${email.trim()}`;
      }

      // Tambahkan informasi tambahan
      emailBody += `\n\nDikirim pada: ${currentDate}`;
      emailBody += `\nUser Agent: ${navigator.userAgent}`;

      // Encode untuk URL
      const encodedSubject = encodeURIComponent(subject);
      const encodedBody = encodeURIComponent(emailBody);

      // Buat mailto link
      const mailtoLink = `mailto:team.karyagemilang@gmail.com?subject=${encodedSubject}&body=${encodedBody}`;

      // Buka aplikasi email default
      window.location.href = mailtoLink;

      toast({
        title: "Email Disiapkan",
        description:
          "Aplikasi email Anda akan terbuka. Silakan kirim email yang telah disiapkan.",
        duration: 5000,
      });

      // Reset form setelah delay singkat
      setTimeout(() => {
        setFeedback("");
        setEmail("");
        setFeedbackOpen(false);
      }, 1000);
    } catch (error) {
      console.error("Error creating mailto link:", error);

      toast({
        title: "Gagal Membuka Email",
        description:
          "Silakan kirim feedback manual ke: team.karyagemilang@gmail.com",
        variant: "destructive",
        duration: 8000,
      });
    }
  };

  const faqData = [
    {
      question: "Bagaimana cara menggunakan aplikasi ini?",
      answer:
        "Aplikasi ini dirancang untuk memberikan pengalaman pembelajaran sejarah Islam yang interaktif. Anda dapat menjelajahi timeline hijriyah, mengikuti kuis, dan mengunduh materi pembelajaran dalam format PDF.",
    },
    {
      question: "Apakah konten aplikasi ini akurat secara sejarah?",
      answer:
        "Ya, semua konten dalam aplikasi ini telah diverifikasi berdasarkan sumber-sumber sejarah Islam yang terpercaya seperti Sirah Nabawiyah karya Ibnu Hisyam, Al-Bidayah wan Nihayah karya Ibnu Katsir, dan referensi otoritatif lainnya.",
    },
    {
      question: "Bagaimana cara mengunduh materi PDF?",
      answer:
        "Buka halaman Download dari menu navigasi bawah, pilih kategori materi yang diinginkan, lalu klik tombol 'Download' pada materi yang ingin Anda unduh. Anda juga dapat melihat preview sebelum mengunduh.",
    },
    {
      question: "Apakah aplikasi ini bisa digunakan offline?",
      answer:
        "Sebagian fitur dapat diakses offline setelah Anda mengunjungi halaman tersebut setidaknya sekali. Namun, untuk pengalaman terbaik dan konten terbaru, disarankan menggunakan koneksi internet.",
    },
    {
      question: "Bagaimana cara mengubah ukuran teks?",
      answer:
        "Anda dapat mengubah ukuran teks melalui pengaturan di halaman ini. Pilih ukuran yang sesuai dengan kebutuhan Anda dari opsi Kecil, Sedang, Besar, atau Sangat Besar.",
    },
    {
      question: "Apakah ada rencana untuk menambahkan lebih banyak konten?",
      answer:
        "Ya, kami terus mengembangkan konten aplikasi ini. Rencana ke depan termasuk penambahan periode sejarah Islam lainnya, lebih banyak kuis interaktif, dan fitur pembelajaran yang lebih canggih.",
    },
  ];

  return (
    <div className="settings-page min-h-screen background-grid pb-20 theme-transition">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <div
          className="text-center mb-10"
          data-aos="fade-up"
          data-aos-duration="1600"
          data-aos-easing="ease-out-cubic"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <SettingsIcon className="h-8 w-8 text-primary" />
          </div>
          <h1 className="settings-heading text-3xl font-bold text-primary mb-2 theme-transition">
            Pengaturan
          </h1>
          <p className="settings-subheading text-lg text-muted-foreground max-w-2xl mx-auto theme-transition">
            Personalisasi pengalaman belajar sejarah Islam Anda dengan berbagai
            opsi kustomisasi
          </p>
        </div>

        {/* Settings Content */}
        <div className="max-w-4xl mx-auto mb-8 px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {/* Display & Appearance Settings */}
            <Card
              className="settings-card bg-card/90 backdrop-blur-sm border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 theme-transition"
              data-aos="fade-up"
              data-aos-duration="1600"
              data-aos-easing="ease-out-cubic"
              data-aos-delay="120"
            >
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Palette className="h-5 w-5 text-primary" />
                  </div>
                  Tampilan & Display
                </CardTitle>
                <CardDescription className="text-base">
                  Kustomisasi tampilan aplikasi sesuai preferensi Anda
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Theme Selection */}
                <div className="settings-tile p-5 rounded-xl border border-muted/30 hover:border-primary/30 transition-colors theme-transition">
                  <div className="settings-theme-header flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between theme-transition">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        {scheme === "dark" ? (
                          <Moon className="h-5 w-5 text-primary" />
                        ) : (
                          <Sun className="h-5 w-5 text-primary" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Tema Aplikasi</h3>
                        <p className="text-sm text-muted-foreground">
                          Aktifkan mode gelap untuk pengalaman membaca malam
                          hari
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-muted-foreground hidden sm:block">
                        {scheme === "dark"
                          ? "Tema Gelap Aktif"
                          : "Tema Terang Aktif"}
                      </span>
                      <Switch
                        checked={scheme === "dark"}
                        onCheckedChange={handleThemeChange}
                        aria-label="Ubah tema aplikasi"
                      />
                    </div>
                  </div>
                  <div className="settings-theme-grid grid gap-3 mt-5 sm:grid-cols-2">
                    <div
                      className={`settings-theme-card theme-transition rounded-lg border p-4 flex items-center gap-3 ${
                        scheme === "light"
                          ? "border-primary/40 bg-background/70 shadow-soft"
                          : "border-border bg-background/40"
                      }`}
                    >
                      <Sun className="h-5 w-5 text-primary" />
                      <div>
                        <span className="font-medium">Tema Terang</span>
                        <p className="text-sm text-muted-foreground">
                          Warna hangat dan kontras tinggi untuk siang hari
                        </p>
                      </div>
                    </div>
                    <div
                      className={`settings-theme-card theme-transition rounded-lg border p-4 flex items-center gap-3 ${
                        scheme === "dark"
                          ? "border-primary/40 bg-background/70 shadow-soft"
                          : "border-border bg-background/30"
                      }`}
                    >
                      <Moon className="h-5 w-5 text-primary" />
                      <div>
                        <span className="font-medium">Tema Gelap</span>
                        <p className="text-sm text-muted-foreground">
                          Tone gelap dengan aksen hijau untuk malam hari
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="my-4" />

                {/* Font Size Settings */}
                <div className="settings-tile p-5 rounded-xl border border-muted/30 theme-transition">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-2 bg-islamic-gold/10 rounded-lg">
                      <Type className="h-5 w-5 text-islamic-gold" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Ukuran Teks</h3>
                      <p className="text-sm text-muted-foreground">
                        Sesuaikan ukuran teks untuk kenyamanan membaca
                      </p>
                    </div>
                  </div>
                  <Select value={fontSize} onValueChange={changeFontSize}>
                    <SelectTrigger className="settings-select-trigger w-full h-12 text-base hover-green-60-border theme-transition">
                      <SelectValue placeholder="Pilih ukuran teks" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(fontSizeLabels).map(([value, label]) => (
                        <SelectItem
                          key={value}
                          value={value}
                          className="text-base py-3"
                        >
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* About Us Section */}
            <Card
              className="settings-card bg-card/80 backdrop-blur-sm theme-transition"
              data-aos="fade-up"
              data-aos-duration="1600"
              data-aos-easing="ease-out-cubic"
              data-aos-delay="240"
            >
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="about-us" className="border-none">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-primary" />
                      <div className="text-left">
                        <h2 className="text-lg font-semibold">Tentang Kami</h2>
                        <p className="text-sm text-muted-foreground font-normal">
                          Pelajari lebih lanjut tentang tim dan visi kami
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="space-y-6">
                      {/* Mission */}
                      <div className="p-4 bg-muted/20 rounded-lg text-center">
                        <Target className="h-6 w-6 text-primary mx-auto mb-3" />
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Kami berpadu dalam satu tujuan, <br />
                          Menghidupkan sirah sebagai tuntunan. <br />
                          Bukan sekadar kenangan yang beku, <br />
                          Melainkan cahaya yang membimbing waktu.
                          <br />
                          <br />
                          "Sejarah adalah cermin jiwa, yang menatapnya akan
                          menemukan cahaya."
                        </p>
                      </div>

                      {/* Team */}
                      <div className="space-y-3">
                        <h3 className="font-semibold flex items-center gap-2">
                          <Users className="h-4 w-4 text-primary" />
                          Tim Kami
                        </h3>

                        <div className="p-3 bg-[#ccc4b2] rounded-lg border border-[#ccc4b2]">
                          <p className="text-sm text-center text-black leading-relaxed">
                            Segala puji bagi Allah, yang dengan cahaya ilmu-Nya
                            sejarah terjaga dan dengan hikmah-Nya peradaban
                            tumbuh. Shalawat dan salam tercurah kepada Nabi
                            Muhammad ﷺ, sang pembawa risalah dan teladan agung.
                          </p>
                        </div>

                        <div className="space-y-3">
                          {/* Dewan Amanah Syariah */}
                          <div className="p-3 bg-muted/20 rounded-lg">
                            <div className="flex items-start gap-3">
                              <Building2 className="h-8 w-8 text-primary" />
                              <div className="flex-1">
                                <h4 className="font-medium text-sm text-primary mb-1">
                                  Dewan Amanah Syariah
                                </h4>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                  <strong className="text-primary">
                                    Ustadz Nizar Ali bachweres, Lc
                                  </strong>
                                  , sang penjaga otentisitas, memastikan setiap
                                  kisah dan riwayat berjalan dalam naungan
                                  syariat.
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Tim Penulis */}
                          <div className="p-3 bg-muted/20 rounded-lg">
                            <div className="flex items-start gap-3">
                              <BookOpen className="h-8 w-8 text-primary" />
                              <div className="flex-1">
                                <h4 className="font-medium text-sm text-primary mb-1">
                                  Tim Penulis Konten
                                </h4>
                                <div className="text-xs text-black leading-relaxed space-y-1">
                                  <div>
                                    <strong className="text-black">
                                      LATIFAH SUMALI
                                    </strong>{" "}
                                    - Merangkai aksara, agar perjalanan agung
                                    tak sirna.
                                  </div>
                                  <div>
                                    <strong className="text-black">
                                      RINI UMMU HAFSHOH
                                    </strong>{" "}
                                    - Menorehkan tinta, agar setiap cerita
                                    kembali bercahaya.
                                  </div>
                                  <div>
                                    <strong className="text-black">
                                      VENY ARDINI
                                    </strong>{" "}
                                    - Menghadirkan makna, agar hikmah terpatri
                                    selamanya.
                                  </div>
                                  <div>
                                    <strong className="text-black">
                                      RATIH UMMU ABDULLAH
                                    </strong>{" "}
                                    - Menuntun kata penuh hikmah, agar sejarah
                                    berkilau indah.
                                  </div>
                                  <div>
                                    <strong className="text-black">
                                      FADILLA AMRI YUNARA
                                    </strong>{" "}
                                    - Menulis dengan rasa, agar tiap kisah makin
                                    mempesona.
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Tim Developer */}
                          <div className="p-3 bg-muted/20 rounded-lg">
                            <div className="flex items-start gap-3">
                              <Laptop className="h-8 w-8 text-primary" />
                              <div>
                                <h4 className="font-medium text-sm text-primary mb-1">
                                  Tim Developer
                                </h4>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                  <strong className="text-primary">
                                    Diyah Hanafi
                                  </strong>{" "}
                                  - Frontend Developer
                                  <br />
                                  <strong className="text-primary">
                                    Yudho Abu Salman
                                  </strong>{" "}
                                  - Backend Developer
                                  <br />
                                  <strong className="text-primary">
                                    Ratna Ummu Abyan
                                  </strong>{" "}
                                  - Data Engineering
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="p-3 bg-[#ccc4b2] rounded-lg border border-[#ccc4b2]">
                          <p className="text-xs text-center text-black leading-relaxed">
                            <strong className="text-black">Visi kami</strong>{" "}
                            adalah menghidupkan kembali warisan Islam sebagai
                            cahaya yang menuntun langkah generasi kini dan
                            nanti.
                          </p>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Card>

            {/* Help & Support Section */}
            <Card
              className="settings-card bg-card/80 backdrop-blur-sm theme-transition"
              data-aos="fade-up"
              data-aos-duration="1600"
              data-aos-easing="ease-out-cubic"
              data-aos-delay="360"
            >
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="help-support" className="border-none">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <HelpCircle className="h-5 w-5 text-primary" />
                      <div className="text-left">
                        <h2 className="text-lg font-semibold">
                          Bantuan & Dukungan
                        </h2>
                        <p className="text-sm text-muted-foreground font-normal">
                          FAQ dan panduan penggunaan aplikasi
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="space-y-4">
                      {faqData.map((faq, index) => (
                        <div key={index} className="p-4 bg-muted/20 rounded-lg">
                          <h3 className="font-medium text-sm mb-2">
                            {faq.question}
                          </h3>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Card>

            {/* Feedback Section */}
            <Card
              className="settings-card bg-card/80 backdrop-blur-sm theme-transition"
              data-aos="fade-up"
              data-aos-duration="1600"
              data-aos-easing="ease-out-cubic"
              data-aos-delay="480"
            >
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="feedback" className="border-none">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <MessageSquare className="h-5 w-5 text-primary" />
                      <div className="text-left">
                        <h2 className="text-lg font-semibold">
                          Kritik & Saran
                        </h2>
                        <p className="text-sm text-muted-foreground font-normal">
                          Bantu kami meningkatkan aplikasi ini
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      Kami sangat menghargai masukan Anda untuk terus
                      meningkatkan kualitas aplikasi ini. Sampaikan kritik,
                      saran, atau laporan bug yang Anda temukan.
                    </p>

                    <Dialog open={feedbackOpen} onOpenChange={setFeedbackOpen}>
                      <DialogTrigger asChild>
                        <Button variant="islamic" className="w-full">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Kirim Feedback
                          <ChevronRight className="h-4 w-4 ml-2" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Kirim Kritik dan Saran</DialogTitle>
                          <DialogDescription>
                            Bantuan Anda sangat berharga untuk pengembangan
                            aplikasi ini
                          </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium mb-2 block">
                              Email (opsional)
                            </label>
                            <Input
                              type="email"
                              placeholder="email@example.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>

                          <div>
                            <label className="text-sm font-medium mb-2 block">
                              Pesan Anda *
                            </label>
                            <Textarea
                              placeholder="Tulis kritik, saran, atau laporan bug Anda di sini..."
                              value={feedback}
                              onChange={(e) => setFeedback(e.target.value)}
                              rows={5}
                              className="resize-none"
                            />
                          </div>

                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              onClick={() => setFeedbackOpen(false)}
                              className="flex-1"
                            >
                              Batal
                            </Button>
                            <Button
                              onClick={submitFeedback}
                              variant="islamic"
                              className="flex-1"
                            >
                              Kirim Feedback
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Card>

            {/* App Information Section */}
            <Card
              className="settings-card bg-card/80 backdrop-blur-sm theme-transition"
              data-aos="fade-up"
              data-aos-duration="1600"
              data-aos-easing="ease-out-cubic"
              data-aos-delay="600"
            >
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="app-info" className="border-none">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <Info className="h-5 w-5 text-primary" />
                      <div className="text-left">
                        <h2 className="text-lg font-semibold">
                          Informasi Aplikasi
                        </h2>
                        <p className="text-sm text-muted-foreground font-normal">
                          Detail teknis dan informasi pengembangan aplikasi
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-muted/20 rounded-lg">
                        <span className="text-sm font-medium">
                          Versi Aplikasi
                        </span>
                        <Badge variant="secondary">v1.2.0</Badge>
                      </div>

                      <div className="flex justify-between items-center p-3 bg-muted/20 rounded-lg">
                        <span className="text-sm font-medium">
                          Terakhir Diperbarui
                        </span>
                        <span className="text-sm text-muted-foreground">
                          15 Oktober 2025
                        </span>
                      </div>

                      <div className="flex justify-between items-center p-3 bg-muted/20 rounded-lg">
                        <span className="text-sm font-medium">Pengembang</span>
                        <span className="text-sm text-muted-foreground">
                          Almaqdisi TechCorp
                        </span>
                      </div>

                      <div className="p-4 bg-[#435e46] rounded-lg border border-[#435e46]">
                        <h3 className="font-medium text-sm text-black mb-2">
                          Tentang Aplikasi
                        </h3>
                        <p className="text-xs text-black leading-relaxed">
                          Aplikasi Sejarah Islam ini dikembangkan dengan tujuan
                          menyediakan platform pembelajaran sejarah Islam yang
                          interaktif, akurat, dan mudah diakses. Semua konten
                          didasarkan pada sumber-sumber sejarah Islam yang
                          terpercaya dan telah diverifikasi oleh para ahli.
                        </p>
                      </div>

                      <div className="pt-4 text-center">
                        <p className="text-xs text-muted-foreground">
                          Dibuat dengan ❤️ untuk umat Islam di seluruh dunia
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Card>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Settings;
