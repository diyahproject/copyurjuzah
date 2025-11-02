import { Heart, Target, Users, Book, Globe, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import BottomNavigation from "@/components/BottomNavigation";
const About = () => {
  const teamMembers = [{
    name: "Dr. Ahmad Maulana",
    role: "Konsultan Sejarah Islam",
    expertise: "Sirah Nabawiyah & Sejarah Peradaban Islam",
    description: "Lulusan Al-Azhar dengan spesialisasi sejarah Islam klasik"
  }, {
    name: "Ustadz Muhammad Faris",
    role: "Content Reviewer",
    expertise: "Hadits & Tafsir Al-Quran",
    description: "Pengkaji hadits dengan pengalaman 15+ tahun"
  }, {
    name: "Sarah Islamiyah",
    role: "UI/UX Designer",
    expertise: "Islamic Design Principles",
    description: "Spesialis desain dengan perspektif budaya Islam"
  }, {
    name: "Fahmi Teknologi",
    role: "Lead Developer",
    expertise: "Web & Mobile Development",
    description: "Pengembang dengan fokus pada aplikasi edukasi"
  }];
  const achievements = [{
    icon: Users,
    title: "50,000+",
    description: "Pengguna Aktif"
  }, {
    icon: Book,
    title: "200+",
    description: "Materi Pembelajaran"
  }, {
    icon: Globe,
    title: "25+",
    description: "Kota"
  }, {
    icon: Star,
    title: "4.8/5",
    description: "Rating Pengguna"
  }];
  return <div className="min-h-screen bg-background pattern-hero pb-20">
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Tentang Kami</h1>
          <p className="text-muted-foreground">Misi kami dalam menyebarkan pengetahuan sejarah Islam</p>
        </div>

        {/* Mission Statement */}
        <Card className="bg-muted/20 border-muted-foreground/20 mb-8">
          <div className="p-6 text-center">
            <Target className="h-8 w-8 text-primary mx-auto mb-4" />
            <div className="flex items-center justify-center gap-3 mb-4">
              <h2 className="text-2xl font-bold text-primary">Misi Kami</h2>
            </div>
            <p className="text-lg leading-relaxed">
              Menyediakan platform pembelajaran sejarah Islam yang akurat, interaktif, dan mudah diakses 
              untuk membantu umat Islam memahami warisan spiritual dan peradaban mereka.
            </p>
          </div>
        </Card>

        {/* Vision & Values */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-card/80 backdrop-blur-sm">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Heart className="h-5 w-5 text-primary" />
                  Visi Kami
                </h3>

              </div>
              <p className="text-muted-foreground leading-relaxed">
                Menjadi platform edukasi sejarah Islam terdepan yang menginspirasi generasi Muslim 
                untuk memahami dan mengamalkan nilai-nilai Islam dalam kehidupan modern.
              </p>
            </div>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Star className="h-5 w-5 text-primary" />
                Nilai-Nilai Kami
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Akurasi berdasarkan sumber otentik</li>
                <li>• Pembelajaran yang mudah diakses</li>
                
                <li>• Inovasi dalam metode pembelajaran</li>
              </ul>
            </div>
          </Card>
        </div>

        {/* Achievements */}
        <Card className="bg-card/80 backdrop-blur-sm mb-8">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-6 text-center">Pencapaian Kami</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon;
              return <div key={index} className="text-center p-4 bg-muted/20 rounded-lg">
                    <IconComponent className="h-8 w-8 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold text-primary">{achievement.title}</div>
                    <div className="text-sm text-muted-foreground">{achievement.description}</div>
                  </div>;
            })}
            </div>
          </div>
        </Card>

        {/* Team Section */}
        <Card className="bg-card/80 backdrop-blur-sm mb-8">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Tim Kami
            </h2>
            
            <div className="mb-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
              <p className="text-center leading-relaxed text-muted-foreground">
                Segala puji bagi Allah, yang dengan cahaya ilmu-Nya sejarah terjaga dan dengan hikmah-Nya peradaban tumbuh. 
                Shalawat dan salam tercurah kepada Nabi Muhammad ﷺ, sang pembawa risalah dan teladan agung.
              </p>
            </div>

            <div className="mb-4 text-center">
              <p className="text-muted-foreground leading-relaxed">
                Aplikasi ini lahir dari tiga pilar utama:
              </p>
            </div>
            
            <div className="space-y-6">
              {/* Dewan Amanah Syariah */}
              <div className="p-4 bg-muted/20 rounded-lg">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">🕌</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-primary mb-2">Dewan Amanah Syariah</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      <strong className="text-primary">Ustadz Nizar</strong>, sang penjaga otentisitas, 
                      memastikan setiap kisah dan riwayat berjalan dalam naungan syariat.
                    </p>
                  </div>
                </div>
              </div>

              {/* Tim Penulis Konten */}
              <div className="p-4 bg-muted/20 rounded-lg">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">📖</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-primary mb-2">Tim Penulis Konten</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      <strong className="text-primary">
                        Mbak Ratih, Mbak Ella, Mbak Ifa, Mbak Veni, Mbak Rini, Mbak Ratna, dan Mbak Dee
                      </strong>, yang dengan pena mereka merangkai sirah menjadi kisah yang dapat dipelajari dengan mudah.
                    </p>
                  </div>
                </div>
              </div>

              {/* Tim Editor */}
              <div className="p-4 bg-muted/20 rounded-lg">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">✒️</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-primary mb-2">Tim Editor</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      <strong className="text-primary">Pak Yudho</strong>, sang penyaring bahasa, 
                      yang menjaga narasi agar tetap jernih, indah, dan berwibawa.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
              <p className="text-center text-muted-foreground leading-relaxed">
                <strong className="text-primary">Visi kami</strong> adalah menghidupkan kembali warisan Islam 
                sebagai cahaya yang menuntun langkah generasi kini dan nanti.
              </p>
            </div>
          </div>
        </Card>

        {/* Features Highlight */}
        <Card className="bg-card/80 backdrop-blur-sm mb-8">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-6">Mengapa Memilih Aplikasi Kami?</h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div>
                  <h3 className="font-medium">Sumber Terpercaya</h3>
                  <p className="text-sm text-muted-foreground">
                    Semua konten diverifikasi berdasarkan kitab-kitab sejarah Islam otentik
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div>
                  <h3 className="font-medium">Pembelajaran Interaktif</h3>
                  <p className="text-sm text-muted-foreground">
                    Kuis, timeline, dan visualisasi yang membantu pemahaman
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div>
                  <h3 className="font-medium">Desain Islami</h3>
                  <p className="text-sm text-muted-foreground">
                    Interface yang indah dengan sentuhan estetika Islam
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
                <div>
                  <h3 className="font-medium">Gratis & Mudah Diakses</h3>
                  <p className="text-sm text-muted-foreground">
                    Dapat diakses kapan saja, di mana saja tanpa biaya
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Contact & Support */}
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <div className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-4">Dukungan & Kontak</h2>
            <p className="text-muted-foreground mb-4">
              Punya pertanyaan atau saran? Kami siap membantu Anda
            </p>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="p-3 bg-muted/20 rounded-lg">
                <strong>Email:</strong><br />
                info@islamicchronicle.app
              </div>
              <div className="p-3 bg-muted/20 rounded-lg">
                <strong>Media Sosial:</strong><br />
                @IslamicChronicle
              </div>
              <div className="p-3 bg-muted/20 rounded-lg">
                <strong>WhatsApp:</strong><br />
                +62 812-3456-7890
              </div>
            </div>
          </div>
        </Card>
      </div>

      <BottomNavigation />
    </div>;
};
export default About;