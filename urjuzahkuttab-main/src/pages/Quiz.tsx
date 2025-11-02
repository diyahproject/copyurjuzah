import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle, XCircle, ArrowLeft, ArrowRight, SkipForward, Trophy, RotateCcw, Clock, Pause, Play, Calendar, BookOpen, Users, Sword, Handshake, Crown, Star, Globe, Flag, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '@/components/BottomNavigation';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
}

interface CategoryInfo {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  questionCount: number;
  events: string;
}

const quizData: QuizQuestion[] = [
  // ===== 1 HIJRIYAH - HIJRAH DAN PEMBENTUKAN KOMUNITAS MUSLIM =====
  // Soal 1-10: Dari tingkat dasar hingga kompleks
  
  // Soal Dasar (1-3): Peristiwa utama dan lokasi
  {
    id: 1,
    question: "Apa peristiwa paling penting yang terjadi pada tahun 1 Hijriyah?",
    options: ["Perang Badr", "Hijrah ke Madinah", "Fathu Makkah", "Wafatnya Nabi Muhammad"],
    correctAnswer: 1,
    explanation: "Hijrah ke Madinah pada tahun 1 Hijriyah (622 M) adalah peristiwa yang menandai dimulainya kalender Islam dan pembentukan komunitas Muslim pertama.",
    category: "1 Hijriyah"
  },
  {
    id: 2,
    question: "Masjid apa yang pertama kali dibangun oleh Nabi Muhammad ﷺ sesampainya di Madinah?",
    options: ["Masjidil Haram", "Masjid Nabawi", "Masjid Quba", "Masjid Al-Aqsa"],
    correctAnswer: 2,
    explanation: "Masjid Quba adalah masjid pertama yang dibangun oleh Nabi Muhammad ﷺ sesampainya di Madinah pada tahun 1 Hijriyah, bahkan sebelum memasuki kota Madinah.",
    category: "1 Hijriyah"
  },
  {
    id: 3,
    question: "Siapa sahabat yang menemani Nabi Muhammad ﷺ dalam perjalanan Hijrah?",
    options: ["Umar bin Khattab", "Ali bin Abi Thalib", "Abu Bakar As-Siddiq", "Utsman bin Affan"],
    correctAnswer: 2,
    explanation: "Abu Bakar As-Siddiq adalah sahabat setia yang menemani Nabi Muhammad ﷺ dalam perjalanan Hijrah dari Makkah ke Madinah.",
    category: "1 Hijriyah"
  },
  
  // Soal Menengah (4-7): Detail peristiwa dan tokoh
  {
    id: 4,
    question: "Di gua mana Nabi Muhammad ﷺ dan Abu Bakar bersembunyi selama perjalanan Hijrah?",
    options: ["Gua Hira", "Gua Tsur", "Gua Uhud", "Gua Nur"],
    correctAnswer: 1,
    explanation: "Gua Tsur adalah tempat persembunyian Nabi Muhammad ﷺ dan Abu Bakar selama tiga hari dalam perjalanan Hijrah untuk menghindari kejaran kaum kafir Quraisy.",
    category: "1 Hijriyah"
  },
  {
    id: 5,
    question: "Dokumen penting apa yang dibuat Nabi Muhammad ﷺ untuk mengatur kehidupan masyarakat Madinah?",
    options: ["Perjanjian Hudaybiyyah", "Piagam Madinah", "Perjanjian Aqabah", "Konstitusi Islam"],
    correctAnswer: 1,
    explanation: "Piagam Madinah (Shahifah Madinah) adalah dokumen bersejarah yang mengatur hubungan antara kaum Muslim, Yahudi, dan suku-suku Arab di Madinah.",
    category: "1 Hijriyah"
  },
  {
    id: 6,
    question: "Apa nama asli kota Madinah sebelum kedatangan Nabi Muhammad ﷺ?",
    options: ["Yatsrib", "Taif", "Khaybar", "Fadak"],
    correctAnswer: 0,
    explanation: "Yatsrib adalah nama asli kota Madinah sebelum kedatangan Nabi Muhammad ﷺ. Setelah Hijrah, kota ini dikenal sebagai Madinatun Nabi (Kota Nabi).",
    category: "1 Hijriyah"
  },
  {
    id: 7,
    question: "Siapa pemimpin suku Aus dan Khazraj yang pertama kali masuk Islam di Makkah?",
    options: ["Sa'd bin Muadz", "Sa'd bin Ubadah", "As'ad bin Zurarah", "Abdullah bin Rawahah"],
    correctAnswer: 2,
    explanation: "As'ad bin Zurarah adalah salah satu pemimpin suku Khazraj yang pertama kali masuk Islam dan berperan penting dalam menyebarkan Islam di Madinah sebelum Hijrah.",
    category: "1 Hijriyah"
  },
  
  // Soal Lanjut (8-10): Analisis dan dampak
  {
    id: 8,
    question: "Apa hikmah utama dari peristiwa Hijrah bagi perkembangan Islam?",
    options: ["Menghindari penganiayaan", "Membentuk negara Islam pertama", "Menyebarkan dakwah", "Membangun masjid"],
    correctAnswer: 1,
    explanation: "Hijrah memungkinkan pembentukan masyarakat Islam pertama yang terorganisir dengan sistem pemerintahan, hukum, dan sosial berdasarkan ajaran Islam.",
    category: "1 Hijriyah"
  },
  {
    id: 9,
    question: "Sistem persaudaraan (Mu'akhah) yang dibentuk di Madinah menghubungkan antara siapa?",
    options: ["Muhajirin dan Ansar", "Aus dan Khazraj", "Muslim dan Yahudi", "Arab dan non-Arab"],
    correctAnswer: 0,
    explanation: "Sistem Mu'akhah menghubungkan kaum Muhajirin (pendatang dari Makkah) dengan kaum Ansar (penduduk asli Madinah) untuk saling membantu dan memperkuat persatuan.",
    category: "1 Hijriyah"
  },
  {
    id: 10,
    question: "Mengapa tahun Hijrah dijadikan sebagai awal kalender Islam?",
    options: ["Tahun kelahiran Nabi", "Tahun turunnya Al-Quran", "Tahun pembentukan umat Islam", "Tahun wafatnya Nabi"],
    correctAnswer: 2,
    explanation: "Hijrah menandai dimulainya era baru pembentukan umat Islam sebagai komunitas yang terorganisir, sehingga dijadikan titik awal kalender Hijriyah oleh Khalifah Umar bin Khattab.",
    category: "1 Hijriyah"
  },

  // ===== 2 HIJRIYAH - PERANG DAN PERISTIWA PENTING =====
  // Soal 11-20: Berdasarkan dokumen soal2hijri (10 soal aktif)
  
  {
    id: 11,
    question: "Perang Abwa termasuk jenis peperangan apa?",
    options: ["Sarriyah", "Ghazwah", "Fathu", "Futuhat"],
    correctAnswer: 1,
    explanation: "Perang Abwa termasuk jenis Ghazwah, yaitu peperangan yang dipimpin langsung oleh Rasulullah ﷺ.",
    category: "2 Hijriyah"
  },
  {
    id: 12,
    question: "Waddan disebut juga Abwa karena letaknya berdekatan di antara…",
    options: ["Thaif dan Madinah", "Khaibar dan Madinah", "Mekah dan Madinah", "Hunain dan Mekah"],
    correctAnswer: 2,
    explanation: "Waddan disebut juga Abwa karena letaknya berdekatan di antara Mekah dan Madinah, menjadi jalur strategis perdagangan.",
    category: "2 Hijriyah"
  },
  {
    id: 13,
    question: "Jumlah pasukan yang berangkat pada Perang Abwa adalah…",
    options: ["30 orang Anshar", "100 orang Muhajirin", "70 orang Muhajirin", "200 orang gabungan"],
    correctAnswer: 2,
    explanation: "Pasukan yang berangkat pada Perang Abwa berjumlah 70 orang Muhajirin yang dipimpin langsung oleh Rasulullah ﷺ.",
    category: "2 Hijriyah"
  },
  {
    id: 14,
    question: "Saat Nabi berangkat ke Abwa, siapa yang diangkat sebagai wakil di Madinah?",
    options: ["Sa'ad bin Mu'adz", "Sa'ad bin Ubadah", "Abu Ubaidah bin Al-Jarrah", "Zaid bin Haritsah"],
    correctAnswer: 1,
    explanation: "Sa'ad bin Ubadah diangkat sebagai wakil (pemimpin) di Madinah saat Nabi Muhammad ﷺ berangkat ke Abwa.",
    category: "2 Hijriyah"
  },
  {
    id: 15,
    question: "Bendera perang berwarna putih pada Perang Abwa dibawa oleh…",
    options: ["Ali bin Abi Thalib", "Sa'ad bin Abi Waqqash", "Hamzah bin Abdul Muththalib", "Zubair bin Awwam"],
    correctAnswer: 2,
    explanation: "Hamzah bin Abdul Muththalib membawa bendera perang berwarna putih pada Perang Abwa.",
    category: "2 Hijriyah"
  },
  {
    id: 16,
    question: "Tujuan utama gerak pasukan pada Perang Abwa adalah…",
    options: ["Mengepung Khaibar", "Menghadang kafilah dagang Quraisy", "Menaklukkan Thaif", "Membuka jalur ke Yaman"],
    correctAnswer: 1,
    explanation: "Tujuan utama Perang Abwa adalah menghadang kafilah dagang Quraisy yang melewati jalur tersebut.",
    category: "2 Hijriyah"
  },
  {
    id: 17,
    question: "Pemimpin Bani Dhamrah yang diajak mengikat perjanjian persahabatan pada Perang Abwa adalah…",
    options: ["Amr bin Makhsyi", "Kurz bin Jabir", "Umayyah bin Khalaf", "Abu Sufyan"],
    correctAnswer: 0,
    explanation: "Amr bin Makhsyi adalah pemimpin Bani Dhamrah yang diajak mengikat perjanjian persahabatan pada Perang Abwa.",
    category: "2 Hijriyah"
  },
  {
    id: 18,
    question: "Durasi Perang Abwa berlangsung selama…",
    options: ["7 hari", "10 hari", "12 hari", "15 hari"],
    correctAnswer: 3,
    explanation: "Perang Abwa berlangsung selama 15 hari sebelum pasukan Muslim kembali ke Madinah.",
    category: "2 Hijriyah"
  },
  {
    id: 19,
    question: "Perang Buwath diikuti Rasulullah dengan jumlah sahabat sebanyak…",
    options: ["70 orang", "150 orang", "200 orang", "300 orang"],
    correctAnswer: 2,
    explanation: "Perang Buwath diikuti Rasulullah ﷺ dengan jumlah sahabat sebanyak 200 orang.",
    category: "2 Hijriyah"
  },
  {
    id: 20,
    question: "Kafilah Quraisy pada Perang Buwath dipimpin oleh…",
    options: ["Abu Jahal", "Umayyah bin Khalaf Al-Jumahi", "Abu Sufyan bin Harb", "Suhail bin Amr"],
    correctAnswer: 1,
    explanation: "Kafilah Quraisy pada Perang Buwath dipimpin oleh Umayyah bin Khalaf Al-Jumahi.",
    category: "2 Hijriyah"
  },
  // ===== SOAL KATEGORI PRAKENABIAN =====
  {
    id: 41,
    question: "Di mana Nabi Muhammad ﷺ dilahirkan?",
    options: ["Madinah", "Makkah", "Thaif", "Yaman"],
    correctAnswer: 1,
    explanation: "Nabi Muhammad ﷺ dilahirkan di Makkah pada tahun 571 M, bertepatan dengan tahun Gajah ketika Abrahah menyerang Ka'bah.",
    category: "Prakenabian"
  },
  {
    id: 42,
    question: "Siapa nama ayah Nabi Muhammad ﷺ?",
    options: ["Abdul Muttalib", "Abdullah", "Abu Thalib", "Abbas"],
    correctAnswer: 1,
    explanation: "Abdullah bin Abdul Muttalib adalah ayah Nabi Muhammad ﷺ yang wafat sebelum kelahiran Nabi.",
    category: "Prakenabian"
  },
  {
    id: 43,
    question: "Siapa yang menyusui Nabi Muhammad ﷺ selain ibunya?",
    options: ["Halimah As-Sa'diyah", "Fatimah binti Asad", "Khadijah binti Khuwailid", "Ummu Aiman"],
    correctAnswer: 0,
    explanation: "Halimah As-Sa'diyah dari suku Bani Sa'd adalah ibu susuan Nabi Muhammad ﷺ yang merawatnya di padang pasir.",
    category: "Prakenabian"
  },
  {
    id: 44,
    question: "Pada usia berapa Nabi Muhammad ﷺ menjadi yatim piatu?",
    options: ["4 tahun", "6 tahun", "8 tahun", "10 tahun"],
    correctAnswer: 1,
    explanation: "Nabi Muhammad ﷺ menjadi yatim piatu pada usia 6 tahun ketika ibunya Aminah binti Wahb wafat di Abwa.",
    category: "Prakenabian"
  },
  {
    id: 45,
    question: "Siapa yang mengasuh Nabi Muhammad ﷺ setelah ibunya wafat?",
    options: ["Abu Thalib", "Abdul Muttalib", "Abbas", "Hamzah"],
    correctAnswer: 1,
    explanation: "Abdul Muttalib, kakek Nabi Muhammad ﷺ, mengasuhnya setelah ibunya wafat hingga Abdul Muttalib wafat ketika Nabi berusia 8 tahun.",
    category: "Prakenabian"
  },
  {
    id: 46,
    question: "Pada usia berapa Nabi Muhammad ﷺ menikah dengan Khadijah?",
    options: ["20 tahun", "25 tahun", "30 tahun", "35 tahun"],
    correctAnswer: 1,
    explanation: "Nabi Muhammad ﷺ menikah dengan Khadijah binti Khuwailid pada usia 25 tahun, sementara Khadijah berusia 40 tahun.",
    category: "Prakenabian"
  },
  {
    id: 47,
    question: "Apa profesi Nabi Muhammad ﷺ sebelum menjadi Rasul?",
    options: ["Peternak", "Pedagang", "Petani", "Pandai besi"],
    correctAnswer: 1,
    explanation: "Nabi Muhammad ﷺ berprofesi sebagai pedagang dan dikenal dengan kejujuran serta amanahnya dalam berdagang.",
    category: "Prakenabian"
  },
  {
    id: 48,
    question: "Apa gelar yang diberikan masyarakat Makkah kepada Nabi Muhammad ﷺ sebelum kenabian?",
    options: ["Al-Amin", "As-Sadiq", "Al-Mustafa", "Al-Amin dan As-Sadiq"],
    correctAnswer: 3,
    explanation: "Masyarakat Makkah memberikan gelar Al-Amin (yang terpercaya) dan As-Sadiq (yang jujur) kepada Nabi Muhammad ﷺ karena akhlaknya yang mulia.",
    category: "Prakenabian"
  },
  {
    id: 49,
    question: "Peristiwa apa yang terjadi ketika Nabi Muhammad ﷺ membantu rekonstruksi Ka'bah?",
    options: ["Perang suku", "Perselisihan penempatan Hajar Aswad", "Banjir besar", "Gempa bumi"],
    correctAnswer: 1,
    explanation: "Terjadi perselisihan antar suku tentang siapa yang berhak meletakkan Hajar Aswad. Nabi Muhammad ﷺ menyelesaikannya dengan bijak menggunakan kain.",
    category: "Prakenabian"
  },
  {
    id: 50,
    question: "Di gua mana Nabi Muhammad ﷺ sering bertahannuts (menyendiri untuk beribadah)?",
    options: ["Gua Tsur", "Gua Hira", "Gua Uhud", "Gua Thawr"],
    correctAnswer: 1,
    explanation: "Nabi Muhammad ﷺ sering bertahannuts di Gua Hira di Jabal Nur, tempat beliau menerima wahyu pertama dari Allah ﷺ.",
    category: "Prakenabian"
  }
];

// ===== QUESTION BANK FOR 1 HIJRIYAH (10 soal cadangan untuk randomisasi) =====
const questionBank1Hijriyah: QuizQuestion[] = [
  {
    id: 201,
    question: "Siapa yang menyambut Nabi Muhammad ﷺ ketika tiba di Quba?",
    options: ["Kulsum bin Hidam", "Sa'ad bin Khaitsama", "Abu Bakar Ash-Shiddiq", "Umar bin Khaththab"],
    correctAnswer: 0,
    explanation: "Kulsum bin Hidam adalah orang yang menyambut Nabi Muhammad ﷺ ketika tiba di Quba.",
    category: "1 Hijriyah"
  },
  {
    id: 202,
    question: "Berapa lama Nabi Muhammad ﷺ tinggal di Quba?",
    options: ["2 hari", "4 hari", "7 hari", "14 hari"],
    correctAnswer: 1,
    explanation: "Nabi Muhammad ﷺ tinggal di Quba selama 4 hari sebelum melanjutkan perjalanan ke Madinah.",
    category: "1 Hijriyah"
  },
  {
    id: 203,
    question: "Masjid pertama yang dibangun dalam Islam adalah…",
    options: ["Masjid Nabawi", "Masjid Quba", "Masjidil Haram", "Masjid Aqsha"],
    correctAnswer: 1,
    explanation: "Masjid Quba adalah masjid pertama yang dibangun dalam Islam.",
    category: "1 Hijriyah"
  },
  {
    id: 204,
    question: "Siapa yang membantu Nabi dalam pembangunan Masjid Nabawi?",
    options: ["Kaum Muhajirin saja", "Kaum Anshar saja", "Kaum Muhajirin dan Anshar", "Penduduk Makkah"],
    correctAnswer: 2,
    explanation: "Kaum Muhajirin dan Anshar bersama-sama membantu Nabi dalam pembangunan Masjid Nabawi.",
    category: "1 Hijriyah"
  },
  {
    id: 205,
    question: "Apa nama tanah yang dibeli Nabi untuk membangun Masjid Nabawi?",
    options: ["Mirbad", "Suffah", "Tanah Sahl dan Suhail", "Tanah Bani Najjar"],
    correctAnswer: 0,
    explanation: "Mirbad adalah nama tanah yang dibeli Nabi untuk membangun Masjid Nabawi.",
    category: "1 Hijriyah"
  },
  {
    id: 206,
    question: "Siapa pemilik tanah tempat Masjid Nabawi dibangun?",
    options: ["Sahl dan Suhail", "Abu Ayyub Al-Anshari", "Sa'ad bin Mu'adz", "Anas bin Malik"],
    correctAnswer: 0,
    explanation: "Sahl dan Suhail adalah pemilik tanah tempat Masjid Nabawi dibangun.",
    category: "1 Hijriyah"
  },
  {
    id: 207,
    question: "Berapa harga tanah yang dibeli Nabi untuk Masjid Nabawi?",
    options: ["600 dirham", "700 dirham", "800 dirham", "1000 dirham"],
    correctAnswer: 0,
    explanation: "Nabi membeli tanah untuk Masjid Nabawi seharga 600 dirham.",
    category: "1 Hijriyah"
  },
  {
    id: 208,
    question: "Apa yang pertama kali dibangun di kompleks Masjid Nabawi?",
    options: ["Mihrab", "Mimbar", "Rumah-rumah Nabi", "Suffah"],
    correctAnswer: 2,
    explanation: "Rumah-rumah Nabi adalah yang pertama kali dibangun di kompleks Masjid Nabawi.",
    category: "1 Hijriyah"
  },
  {
    id: 209,
    question: "Siapa yang pertama kali mengumandangkan adzan di Madinah?",
    options: ["Bilal bin Rabah", "Abdullah bin Zaid", "Umar bin Khaththab", "Abu Bakar Ash-Shiddiq"],
    correctAnswer: 0,
    explanation: "Bilal bin Rabah adalah orang yang pertama kali mengumandangkan adzan di Madinah.",
    category: "1 Hijriyah"
  },
  {
    id: 210,
    question: "Apa nama perjanjian persaudaraan antara Muhajirin dan Anshar?",
    options: ["Piagam Madinah", "Mu'akhat", "Bai'at Aqabah", "Hilf al-Fudhul"],
    correctAnswer: 1,
    explanation: "Mu'akhat adalah nama perjanjian persaudaraan antara Muhajirin dan Anshar.",
    category: "1 Hijriyah"
  }
];

// ===== QUESTION BANK FOR 2 HIJRIYAH (10 soal cadangan untuk randomisasi) =====
const questionBank2Hijriyah: QuizQuestion[] = [
  {
    id: 101,
    question: "Kafilah Quraisy yang hendak dihadang pada Perang Buwath membawa…",
    options: ["500 unta", "1.000 unta", "2.500 unta", "3.000 unta"],
    correctAnswer: 2,
    explanation: "Kafilah Quraisy yang hendak dihadang pada Perang Buwath membawa 2.500 unta sebagai barang dagangan.",
    category: "2 Hijriyah"
  },
  {
    id: 102,
    question: "Saat Perang Buwath, siapa yang ditunjuk Nabi sebagai wakil (pemimpin) di Madinah?",
    options: ["Sa'ad bin Mu'adz", "Sa'ad bin Ubadah", "Abu Bakar Ash-Shiddiq", "Umar bin Khaththab"],
    correctAnswer: 0,
    explanation: "Sa'ad bin Mu'adz ditunjuk Nabi sebagai wakil (pemimpin) di Madinah saat Perang Buwath.",
    category: "2 Hijriyah"
  },
  {
    id: 103,
    question: "Pembawa bendera putih pada Perang Buwath adalah…",
    options: ["Hamzah bin Abdul Muththalib", "Sa'ad bin Abi Waqqash", "Ali bin Abi Thalib", "Abu Ubaidah bin Al-Jarrah"],
    correctAnswer: 1,
    explanation: "Sa'ad bin Abi Waqqash adalah pembawa bendera putih pada Perang Buwath.",
    category: "2 Hijriyah"
  },
  {
    id: 104,
    question: "Latar belakang Perang Badr Ula (Safawan) adalah…",
    options: ["Penyerangan Quraisy ke Madinah", "Pengepungan kabilah Yahudi", "Pencurian hewan ternak di Madinah oleh Kurz bin Jabir Al-Fihry dan orang-orang musyrik", "Pelanggaran perjanjian Hudaibiyah"],
    correctAnswer: 2,
    explanation: "Latar belakang Perang Badr Ula adalah pencurian hewan ternak di Madinah oleh Kurz bin Jabir Al-Fihry dan orang-orang musyrik.",
    category: "2 Hijriyah"
  },
  {
    id: 105,
    question: "Perang Badr Ula disebut juga Perang Safawan karena…",
    options: ["Terjadi di oasis Safa", "Pengejaran berlangsung hingga Wadi Safawan dari arah Badr", "Safawan adalah nama pemimpin pasukan", "Bendera pasukan bertuliskan \"Safawan\""],
    correctAnswer: 1,
    explanation: "Perang Badr Ula disebut juga Perang Safawan karena pengejaran berlangsung hingga Wadi Safawan dari arah Badr.",
    category: "2 Hijriyah"
  },
  {
    id: 106,
    question: "Ayat Al-Qur'an yang memberi izin kaum muslimin untuk berperang (pada konteks awal) adalah…",
    options: ["QS. Al-Baqarah: 183", "QS. Al-Baqarah: 143", "QS. Al-Maidah: 67", "QS. Al-Hajj: 39"],
    correctAnswer: 3,
    explanation: "QS. Al-Hajj: 39 adalah ayat Al-Qur'an yang memberi izin kaum muslimin untuk berperang pada konteks awal.",
    category: "2 Hijriyah"
  },
  {
    id: 107,
    question: "Ayat yang menenangkan Rasulullah di tengah ancaman Quraisy adalah…",
    options: ["QS. Al-Baqarah: 183", "QS. Al-Maidah: 67", "QS. Al-Anfal: 1", "QS. Al-Ahzab: 21"],
    correctAnswer: 1,
    explanation: "QS. Al-Maidah: 67 adalah ayat yang menenangkan Rasulullah di tengah ancaman Quraisy.",
    category: "2 Hijriyah"
  },
  {
    id: 108,
    question: "Perpindahan kiblat pada tahun 2 H mengubah arah salat dari…",
    options: ["Masjidil Haram ke Baitul Maqdis", "Baitul Maqdis ke Masjidil Haram (Ka'bah)", "Masjid Nabawi ke Masjidil Haram", "Ka'bah ke Multazam"],
    correctAnswer: 1,
    explanation: "Perpindahan kiblat pada tahun 2 H mengubah arah salat dari Baitul Maqdis ke Masjidil Haram (Ka'bah).",
    category: "2 Hijriyah"
  },
  {
    id: 109,
    question: "Lama kaum muslimin salat menghadap Baitul Maqdis sebelum perpindahan kiblat adalah sekitar…",
    options: ["12 bulan", "14 bulan", "16 bulan", "18 bulan"],
    correctAnswer: 2,
    explanation: "Lama kaum muslimin salat menghadap Baitul Maqdis sebelum perpindahan kiblat adalah sekitar 16 bulan.",
    category: "2 Hijriyah"
  },
  {
    id: 110,
    question: "Pada tahap ketiga pensyariatan puasa, yang tetap berkewajiban membayar fidyah (memberi makan orang miskin) adalah…",
    options: ["Musafir yang kuat", "Orang sakit ringan", "Orang lanjut usia yang tidak mampu berpuasa", "Anak yang sudah mumayyiz"],
    correctAnswer: 2,
    explanation: "Pada tahap ketiga pensyariatan puasa, orang lanjut usia yang tidak mampu berpuasa tetap berkewajiban membayar fidyah (memberi makan orang miskin).",
    category: "2 Hijriyah"
  }
];

// ===== FISHER-YATES SHUFFLE ALGORITHM =====
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Fungsi untuk mendapatkan soal 1 Hijriyah yang sudah diacak
const getRandomized1HijriyahQuestions = (): QuizQuestion[] => {
  // Gabungkan soal aktif dengan question bank
  const active1HijriyahQuestions = quizData.filter(q => q.category === "1 Hijriyah");
  const allQuestions = [...active1HijriyahQuestions, ...questionBank1Hijriyah];
  
  // Acak semua soal dan ambil 10 soal pertama
  const shuffledQuestions = shuffleArray(allQuestions);
  return shuffledQuestions.slice(0, 10).map((q, index) => ({
    ...q,
    id: index + 11 // Renumber IDs untuk konsistensi
  }));
};

// Fungsi untuk mendapatkan soal 2 Hijriyah yang sudah diacak
const getRandomized2HijriyahQuestions = (): QuizQuestion[] => {
  // Gabungkan soal aktif dengan question bank
  const active2HijriyahQuestions = quizData.filter(q => q.category === "2 Hijriyah");
  const allQuestions = [...active2HijriyahQuestions, ...questionBank2Hijriyah];
  
  // Acak semua soal dan ambil 10 soal pertama
  const shuffledQuestions = shuffleArray(allQuestions);
  return shuffledQuestions.slice(0, 10).map((q, index) => ({
    ...q,
    id: index + 21 // Renumber IDs untuk konsistensi
  }));
};

// Fungsi untuk mendapatkan soal Prakenabian yang sudah diacak
const getRandomizedPrakenabianQuestions = (): QuizQuestion[] => {
  const prakenabianQuestions = quizData.filter(q => q.category === "Prakenabian");
  return shuffleArray(prakenabianQuestions);
};

// Category definitions with icons and descriptions
const categories: CategoryInfo[] = [
  {
    id: "all",
    name: "Semua Kategori",
    description: "Mainkan semua pertanyaan dari seluruh periode sejarah Islam",
    icon: BookOpen,
    questionCount: quizData.length,
    events: "Seluruh periode sejarah Islam"
  },
  {
    id: "Prakenabian",
    name: "Prakenabian",
    description: "Kehidupan Nabi Muhammad ﷺ sebelum diangkat menjadi Rasul",
    icon: Heart,
    questionCount: 10,
    events: "Kelahiran, Masa Kecil, Pernikahan dengan Khadijah"
  },
  {
    id: "1 Hijriyah",
    name: "1 Hijriyah",
    description: "Hijrah ke Madinah dan pembentukan komunitas Muslim pertama",
    icon: Users,
    questionCount: 10,
    events: "Hijrah, Masjid Quba, Piagam Madinah"
  },
  {
    id: "2 Hijriyah",
    name: "2 Hijriyah",
    description: "Perang Abwa, Buwath, dan peristiwa penting tahun 2 H",
    icon: Sword,
    questionCount: 10,
    events: "Perang Abwa, Perang Buwath, Perpindahan Kiblat"
  },

];

const Quiz: React.FC = () => {
  const navigate = useNavigate();
  
  // Quiz state
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>(new Array(10).fill(null));
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isAutoAdvancing, setIsAutoAdvancing] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [remainingTime, setRemainingTime] = useState<number | null>(null);
  
  // Category state
  const [selectedCategory, setSelectedCategory] = useState<string>("1 Hijriyah");
  const [filteredQuizData, setFilteredQuizData] = useState<QuizQuestion[]>(quizData.filter(q => q.category === "1 Hijriyah"));

  // Filter quiz data based on selected category
  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredQuizData(quizData);
    } else if (selectedCategory === "Prakenabian") {
      setFilteredQuizData(getRandomizedPrakenabianQuestions());
    } else if (selectedCategory === "1 Hijriyah") {
      setFilteredQuizData(getRandomized1HijriyahQuestions());
    } else if (selectedCategory === "2 Hijriyah") {
      // Gunakan soal yang sudah diacak untuk 2 Hijriyah
      setFilteredQuizData(getRandomized2HijriyahQuestions());
    } else {
      setFilteredQuizData(quizData.filter(q => q.category === selectedCategory));
    }
  }, [selectedCategory]);

  // Reset user answers when filtered data changes
  useEffect(() => {
    setUserAnswers(new Array(filteredQuizData.length).fill(null));
  }, [filteredQuizData]);

  // Timer countdown effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isAutoAdvancing && countdown !== null && countdown > 0 && !isPaused) {
      interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev === null || prev <= 1) {
            // Timer selesai, lanjutkan ke pertanyaan berikutnya
            setIsAutoAdvancing(false);
            setIsPaused(false);
            setRemainingTime(null);
            
            if (currentQuestion < filteredQuizData.length - 1) {
              setCurrentQuestion(currentQuestion + 1);
              setSelectedAnswer(userAnswers[currentQuestion + 1]);
              setShowExplanation(false);
            } else {
              completeQuiz();
            }
            
            return null;
          }
          return prev - 1;
        });
        
        setRemainingTime((prev) => {
          if (prev === null || prev <= 1) {
            return null;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isAutoAdvancing, countdown, isPaused, currentQuestion, filteredQuizData.length, userAnswers]);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setQuizCompleted(false);
    setScore(0);
    setCountdown(null);
    setIsAutoAdvancing(false);
    setIsPaused(false);
    setRemainingTime(null);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showExplanation) return;

    setSelectedAnswer(answerIndex);
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setUserAnswers(newAnswers);
    
    const isCorrect = answerIndex === filteredQuizData[currentQuestion].correctAnswer;
    
    if (isCorrect) {
      // Jika jawaban benar, lanjutkan otomatis tanpa penjelasan
      if (currentQuestion < filteredQuizData.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(userAnswers[currentQuestion + 1]);
        setShowExplanation(false);
      } else {
        completeQuiz();
      }
    } else {
      // Jika jawaban salah, tampilkan penjelasan selama 3 detik
      setShowExplanation(true);
      setCountdown(3);
      setIsAutoAdvancing(true);
      setRemainingTime(3);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < filteredQuizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(userAnswers[currentQuestion + 1]);
      setShowExplanation(false);
    } else {
      completeQuiz();
    }
  };

  const handlePreviousQuestion = () => {
    // Reset countdown dan pause state jika user manually navigate
    setCountdown(null);
    setIsAutoAdvancing(false);
    setIsPaused(false);
    setRemainingTime(null);
    
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(userAnswers[currentQuestion - 1]);
      setShowExplanation(false);
    }
  };

  const handleSkipQuestion = () => {
    // Reset countdown dan pause state, langsung skip
    setCountdown(null);
    setIsAutoAdvancing(false);
    setIsPaused(false);
    setRemainingTime(null);
    handleNextQuestion();
  };

  const completeQuiz = () => {
    const finalScore = userAnswers.reduce((acc, answer, index) => {
      if (answer === filteredQuizData[index]?.correctAnswer) {
        return acc + 1;
      }
      return acc;
    }, 0);
    setScore(finalScore);
    setQuizCompleted(true);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setUserAnswers(new Array(filteredQuizData.length).fill(null));
    setShowExplanation(false);
    setQuizCompleted(false);
    setScore(0);
    setCountdown(null);
    setIsAutoAdvancing(false);
    setIsPaused(false);
    setRemainingTime(null);
  };



  const handleNext = () => {
    if (currentQuestion < filteredQuizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(userAnswers[currentQuestion + 1]);
      setShowExplanation(false);
    } else {
      completeQuiz();
    }
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  const getScoreMessage = () => {
    const percentage = (score / filteredQuizData.length) * 100;
    if (percentage >= 90) return "Luar biasa! Anda sangat menguasai sejarah Islam!";
    if (percentage >= 80) return "Bagus sekali! Pengetahuan Anda tentang sejarah Islam sangat baik!";
    if (percentage >= 70) return "Baik! Anda memiliki pemahaman yang cukup baik tentang sejarah Islam.";
    if (percentage >= 60) return "Cukup baik! Masih ada ruang untuk belajar lebih banyak.";
    return "Jangan menyerah! Terus belajar dan pelajari lebih banyak tentang sejarah Islam.";
  };

  const progressPercentage = ((currentQuestion + 1) / filteredQuizData.length) * 100;

  // Category Selection Component




  // Update quiz completion to use filtered data
  if (quizCompleted) {
    return (
      <>
        <div className="min-h-screen background-grid py-8 px-4 pb-24">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-card shadow-elegant">
              <CardContent className="p-8 text-center space-y-6">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                    <Trophy className="h-10 w-10 text-primary" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-foreground">Quiz Selesai!</h2>
                  <div className="text-4xl font-bold text-primary">
                    {score}/{filteredQuizData.length}
                  </div>
                  <div className="text-lg text-muted-foreground">
                    Skor: {Math.round((score / filteredQuizData.length) * 100)}%
                  </div>
                  
                  <div className="bg-muted/50 rounded-lg p-4 mt-6">
                    <p className="text-muted-foreground">
                      {getScoreMessage()}
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-center mt-8">
                  <Button 
                    onClick={() => {
                      setCurrentQuestion(0);
                      setSelectedAnswer(null);
                      setUserAnswers(new Array(filteredQuizData.length).fill(null));
                      setShowExplanation(false);
                      setQuizCompleted(false);
                      setScore(0);
                      setCountdown(null);
                      setIsAutoAdvancing(false);
                      setIsPaused(false);
                      setRemainingTime(null);
                    }}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-all duration-300"
                  >
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Ulangi Quiz
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <BottomNavigation />
      </>
    );
  }

  return (
    <>
      <div className="quiz-page min-h-screen background-grid py-8 px-4 pb-24 theme-transition">
        <div className="max-w-4xl mx-auto">
          {/* Header with Category Dropdown */}
          <div className="text-center mb-8">
            <h1 className="quiz-heading text-3xl font-bold text-[#435e46] mb-4 theme-transition">
              Kuis Sejarah Islam
            </h1>
            
            {/* Category Selection Dropdown */}
            <div className="flex justify-center mb-4">
              <div className="w-80">
                <Select value={selectedCategory} onValueChange={handleCategorySelect}>
                  <SelectTrigger className="border-primary text-primary hover:bg-primary/10 focus:ring-primary">
                    <SelectValue placeholder="Pilih Kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => {
                      const IconComponent = category.icon;
                      return (
                        <SelectItem key={category.id} value={category.id}>
                          <div className="flex items-center space-x-2">
                            <IconComponent className="h-4 w-4 text-primary" />
                            <span>{category.name}</span>
                            <span className="text-sm text-gray-500">({category.questionCount} soal)</span>
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <p className="quiz-subheading text-primary font-medium theme-transition">
              {categories.find(cat => cat.id === selectedCategory)?.description || "Pilih kategori untuk memulai kuis"}
            </p>
          </div>

          {/* Progress Section */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="quiz-progress-label text-sm font-medium text-primary theme-transition">
                Pertanyaan {currentQuestion + 1} dari {filteredQuizData.length}
              </span>
              <span className="quiz-progress-label text-sm font-medium text-primary theme-transition">
                Kategori: {filteredQuizData[currentQuestion]?.category}
              </span>
            </div>
            
            {/* Progress Dots */}
            <div className="flex justify-center mt-4 space-x-2 flex-wrap">
              {filteredQuizData.map((_, index) => (
                <div
                  key={index}
                  className={`quiz-progress-dot w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentQuestion
                      ? 'bg-primary scale-125 quiz-progress-dot--active'
                    : index < currentQuestion
                      ? 'bg-primary/70 quiz-progress-dot--completed'
                      : 'bg-gray-300 quiz-progress-dot--upcoming'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Quiz Card */}
          <Card className="quiz-card bg-card shadow-elegant theme-transition">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground quiz-progress-label theme-transition">
                  QUIZ CARD {currentQuestion + 1}/{filteredQuizData.length}
                </div>
                <div className="quiz-score-label text-sm font-semibold text-primary theme-transition">
                  Score: {score}/{filteredQuizData.length}
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="quiz-card-content space-y-6 theme-transition">
              {/* Question */}
              <div className="space-y-4">
                <h3 className="quiz-question text-lg font-semibold leading-relaxed theme-transition">
                  Pertanyaan: {filteredQuizData[currentQuestion]?.question}
                </h3>
                
                {/* Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {filteredQuizData[currentQuestion]?.options.map((option, index) => {
                    const isSelected = selectedAnswer === index;
                    const isCorrect = index === filteredQuizData[currentQuestion].correctAnswer;
                    const isIncorrect = showExplanation && isSelected && !isCorrect;
                    const showCorrect = showExplanation && isCorrect;
                    
                    const getOptionStyle = () => {
                      if (!showExplanation) {
                        return isSelected 
                          ? "bg-primary text-primary-foreground ring-2 ring-accent shadow-elegant" 
                          : "border border-input bg-background hover:bg-primary/10 hover:text-primary hover:border-primary/50";
                      }
                      
                      if (isCorrect) {
                        return "bg-primary/20 border-primary text-primary";
                      }
                      
                      if (isSelected && !isCorrect) {
                        return "bg-destructive/20 border-destructive text-destructive";
                      }
                      
                      return "border border-input bg-background opacity-60";
                    };

                    const optionStateClass = !showExplanation
                      ? (isSelected ? 'quiz-option--selected' : 'quiz-option--idle')
                      : (isCorrect
                          ? 'quiz-option--correct'
                          : (isSelected && !isCorrect
                              ? 'quiz-option--incorrect'
                              : 'quiz-option--disabled'));

                    const getOptionIcon = () => {
                      if (!showExplanation) return null;
                      
                      if (isCorrect) {
                        return <CheckCircle className="quiz-option-icon h-4 w-4 text-primary ml-2" />;
                      }
                      
                      if (isSelected && !isCorrect) {
                        return <XCircle className="quiz-option-icon h-4 w-4 text-destructive ml-2" />;
                      }
                      
                      return null;
                    };
                    
                    return (
                      <button
                        key={index}
                        onClick={() => !showExplanation && handleAnswerSelect(index)}
                        disabled={showExplanation}
                        className={`quiz-option ${optionStateClass} p-4 rounded-lg text-left transition-all duration-200 theme-transition ${getOptionStyle()}`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center">
                              {selectedAnswer === index && !showExplanation && (
                                <div className="w-3 h-3 rounded-full bg-current" />
                              )}
                            </div>
                            <span className="font-medium">{String.fromCharCode(65 + index)}) {option}</span>
                          </div>
                          {getOptionIcon()}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Explanation */}
              {showExplanation && (
                <div className="quiz-explanation bg-gradient-to-r from-primary/10 to-islamic-gold/10 rounded-lg p-6 mb-6 border border-primary/20 theme-transition">
                  {/* Header Section */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                    <h4 className="quiz-explanation-title font-bold text-lg text-primary theme-transition">
                      {selectedAnswer === filteredQuizData[currentQuestion].correctAnswer ? 'Benar!' : 'Penjelasan:'}
                    </h4>
                    
                    {/* Countdown Timer & Control Section - Only show when answer is wrong */}
                    {countdown !== null && countdown > 0 && selectedAnswer !== filteredQuizData[currentQuestion].correctAnswer && (
                      <div className="quiz-countdown-card flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3 bg-white/50 rounded-lg border border-islamic-gold/30 theme-transition">
                        {/* Timer Display */}
                        <div className="quiz-countdown-text flex items-center text-islamic-gold font-semibold min-w-fit theme-transition">
                          <Clock className="quiz-countdown-icon h-5 w-5 mr-2 text-islamic-gold" />
                          <span className="text-sm font-medium theme-transition">
                            {isPaused ? 'Dijeda' : `Lanjut dalam ${countdown}s`}
                          </span>
                        </div>
                        
                        {/* Control Button */}
                        <Button
                          onClick={handlePauseResume}
                          size="sm"
                          className={`
                            min-w-[100px] h-9 px-4 py-2 rounded-md font-medium text-sm
                            transition-all duration-300 ease-in-out
                            border-2 border-islamic-gold
                            ${isPaused 
                              ? 'bg-islamic-gold text-white hover:bg-islamic-gold/90 hover:shadow-md' 
                              : 'bg-white text-islamic-gold hover:bg-islamic-gold/10 hover:text-islamic-gold hover:shadow-md'
                            }
                            focus:outline-none focus:ring-2 focus:ring-islamic-gold/50 focus:ring-offset-2
                            active:transform active:scale-95
                          `}
                        >
                          {isPaused ? (
                            <>
                              <Play className="h-4 w-4 mr-2" />
                              Lanjutkan
                            </>
                          ) : (
                            <>
                              <Pause className="h-4 w-4 mr-2" />
                              Jeda
                            </>
                          )}
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  {/* Explanation Content */}
                  <div className="quiz-explanation-body prose prose-gray max-w-none theme-transition">
                    <p className="quiz-explanation-text text-gray-700 leading-relaxed text-base theme-transition">
                      {filteredQuizData[currentQuestion]?.explanation}
                    </p>
                  </div>
                  
                  {/* Pause Status Indicator - Only show when timer is active */}
                  {isPaused && countdown !== null && countdown > 0 && selectedAnswer !== filteredQuizData[currentQuestion].correctAnswer && (
                    <div className="quiz-pause-indicator mt-4 p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border-l-4 border-primary shadow-sm theme-transition">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="quiz-pause-indicator-icon w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center theme-transition">
                            <Pause className="h-4 w-4 text-primary" />
                          </div>
                        </div>
                        <div className="ml-3">
                          <p className="quiz-pause-indicator-title text-sm font-medium text-primary theme-transition">
                            Countdown Dijeda
                          </p>
                          <p className="quiz-pause-indicator-text text-xs text-primary/80 mt-1 theme-transition">
                            Klik tombol "Lanjutkan" untuk melanjutkan ke pertanyaan berikutnya
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}





              {/* Navigation Buttons */}
               <div className="flex justify-between items-center mt-6 pt-4 border-t quiz-navigation theme-transition">
                 <Button
                   onClick={handlePreviousQuestion}
                   disabled={currentQuestion === 0}
                   variant="outline"
                   size="sm"
                   className="quiz-nav-button rounded-lg hover:text-white hover:bg-[#435e46] transition-all duration-300 theme-transition"
                 >
                   PREV
                 </Button>
                 
                 <div className="flex space-x-2">
                   <Button
                     onClick={handleSkipQuestion}
                     variant="outline"
                     size="sm"
                     className="quiz-nav-button rounded-lg hover:text-white hover:bg-[#435e46] transition-all duration-300 theme-transition"
                   >
                     SKIP
                   </Button>
                   
                   <Button
                     onClick={handleNextQuestion}
                     disabled={currentQuestion === filteredQuizData.length - 1}
                     variant="outline"
                     size="sm"
                     className="quiz-nav-button rounded-lg hover:text-white hover:bg-[#435e46] transition-all duration-300 theme-transition"
                   >
                     NEXT
                   </Button>
                 </div>
               </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <BottomNavigation />
    </>
  );
};

export default Quiz;
