# Event Data Synchronization & Navigation Implementation Guide

## Overview

Dokumen ini memberikan panduan langkah demi langkah untuk menyinkronkan data event antara halaman Home (HijriyahSection) dan Timeline, serta mengimplementasikan navigasi yang akurat.

## Masalah yang Ditemukan

1. **Data Inconsistency**: Event di HijriyahSection tahun 4 Hijriyah tidak ada di timelineEvents.ts
2. **Navigation Issues**: Klik event di Home tidak mengarah ke event yang tepat di Timeline
3. **Missing Events**: Beberapa event seperti "Perang Bani An-Nadhir" tidak memiliki data detail
4. **Search Mismatch**: Algoritma pencarian event tidak cukup robust

## Step-by-Step Implementation

### Phase 1: Data Synchronization

#### 1.1 Add Missing Events to timelineEvents.ts

**File**: `src/data/timelineEvents.ts`

Tambahkan event-event berikut untuk tahun 4 Hijriyah:

```typescript
// Add these events to the timelineEvents array (insert after year 3 events)

{
  id: 'perang-bani-nadhir',
  title: 'Perang Bani An-Nadhir',
  hijriyahYear: 4,
  gregorianYear: 625,
  month: 'Rabi\'ul Awwal',
  location: 'Madinah - Perkampungan Bani An-Nadhir',
  parties: ['Nabi Muhammad ﷺ dan kaum Muslim', 'Suku Yahudi Bani An-Nadhir'],
  description: 'Pengepungan dan pengusiran suku Yahudi Bani An-Nadhir dari Madinah setelah mereka melanggar perjanjian dan merencanakan pembunuhan terhadap Nabi Muhammad ﷺ. Peristiwa ini bermula ketika Nabi datang ke perkampungan mereka untuk meminta bantuan diyat (denda darah) atas pembunuhan yang dilakukan oleh sekutu mereka.\n\nNamun, Bani An-Nadhir justru merencanakan untuk menjatuhkan batu besar dari atas rumah untuk membunuh Nabi. Allah memberitahukan rencana jahat ini kepada Nabi melalui wahyu, sehingga Nabi segera meninggalkan tempat tersebut.\n\nSetelah itu, Nabi mengepung perkampungan Bani An-Nadhir selama 15 hari hingga mereka menyerah dan setuju untuk meninggalkan Madinah dengan membawa harta benda mereka.',
  facts: 'Peristiwa ini menghasilkan turunnya Surat Al-Hasyr yang mengatur hukum tentang harta rampasan perang (fai\'). Bani An-Nadhir diizinkan membawa harta benda mereka kecuali senjata.',
  phase: 'madinah',
  icon: Sword,
  duration: '15 hari',
  author: 'Ibnu Hisyam',
  references: ['Sirah Nabawiyah Ibnu Hisyam', 'Tafsir Ibnu Katsir Surat Al-Hasyr', 'Sahih Bukhari'],
  audio: ''
},
{
  id: 'wafat-zainab-khuzaimah',
  title: 'Wafatnya Zainab binti Khuzaimah',
  hijriyahYear: 4,
  gregorianYear: 625,
  month: 'Rabi\'ul Akhir',
  location: 'Madinah',
  parties: ['Zainab binti Khuzaimah', 'Nabi Muhammad ﷺ'],
  description: 'Wafatnya Zainab binti Khuzaimah, istri Nabi Muhammad ﷺ yang dikenal dengan sebutan "Ummul Masakin" (Ibu orang-orang miskin) karena kepeduliannya yang luar biasa terhadap orang-orang miskin dan yatim piatu.\n\nZainab binti Khuzaimah adalah janda dari Abdullah bin Jahsy yang gugur dalam Perang Uhud. Nabi menikahinya pada tahun 4 Hijriyah sebagai bentuk perlindungan dan penghormatan terhadap janda syahid.\n\nSayangnya, pernikahan mereka hanya berlangsung sangat singkat, sekitar 2-3 bulan, sebelum Zainab wafat karena sakit. Beliau dimakamkan di Baqi\' dan menjadi istri Nabi yang pertama wafat setelah Khadijah.',
  facts: 'Zainab binti Khuzaimah hanya menjadi istri Nabi selama 2-3 bulan sebelum wafat. Beliau dikenal sangat dermawan kepada orang miskin.',
  phase: 'madinah',
  icon: Heart,
  duration: '2-3 bulan pernikahan',
  author: 'Ibnu Sa\'d',
  references: ['Tabaqat Ibnu Sa\'d', 'Sirah Nabawiyah Ibnu Hisyam'],
  audio: ''
},
{
  id: 'pernikahan-ummu-salamah',
  title: 'Pernikahan Nabi dengan Ummu Salamah',
  hijriyahYear: 4,
  gregorianYear: 625,
  month: 'Syawal',
  location: 'Madinah',
  parties: ['Nabi Muhammad ﷺ', 'Ummu Salamah (Hind binti Abi Umayyah)'],
  description: 'Pernikahan Nabi Muhammad ﷺ dengan Ummu Salamah (Hind binti Abi Umayyah) setelah masa iddahnya berakhir dari suami sebelumnya, Abu Salamah, yang gugur akibat luka yang dideritanya dalam Perang Uhud.\n\nUmmu Salamah awalnya menolak lamaran Nabi dengan alasan sudah tua, memiliki anak-anak, dan sifatnya yang cemburu. Namun Nabi meyakinkannya bahwa Allah akan mengurus semua kekhawatirannya.\n\nUmmu Salamah adalah wanita yang sangat cerdas, bijaksana, dan sering memberikan nasihat kepada Nabi Muhammad ﷺ. Beliau juga dikenal sebagai perawi hadits yang terpercaya.',
  facts: 'Ummu Salamah adalah wanita yang sangat cerdas dan sering memberikan nasihat kepada Nabi Muhammad ﷺ. Beliau meriwayatkan 378 hadits.',
  phase: 'madinah',
  icon: Heart,
  duration: '-',
  author: 'Ibnu Hisyam',
  references: ['Sirah Nabawiyah Ibnu Hisyam', 'Tabaqat Ibnu Sa\'d'],
  audio: ''
},
{
  id: 'ekspedisi-dzat-riqa',
  title: 'Ekspedisi Dzat ar-Riqa',
  hijriyahYear: 4,
  gregorianYear: 625,
  month: 'Jumadil Ula',
  location: 'Dzat ar-Riqa (Najd)',
  parties: ['Nabi Muhammad ﷺ dan 400 sahabat', 'Suku Ghatafan dan Anmar'],
  description: 'Ekspedisi militer yang dipimpin langsung oleh Nabi Muhammad ﷺ untuk menghadapi ancaman dari suku-suku Najd (Ghatafan dan Anmar) yang merencanakan serangan terhadap Madinah.\n\nEkspedisi ini dinamakan "Dzat ar-Riqa" karena para sahabat menambal sepatu mereka dengan kain (riqa\') karena perjalanan yang jauh dan medan yang berat. Dalam ekspedisi ini, tidak terjadi pertempuran besar, namun terjadi beberapa skirmish kecil.\n\nYang paling bersejarah dari ekspedisi ini adalah dilaksanakannya shalat khauf (shalat dalam keadaan takut/perang) untuk pertama kalinya, dimana sebagian pasukan shalat sementara sebagian lain berjaga.',
  facts: 'Dalam ekspedisi ini pertama kali dilaksanakan shalat khauf (shalat dalam keadaan takut) karena situasi perang. Ekspedisi berlangsung tanpa pertempuran besar.',
  phase: 'madinah',
  icon: Sword,
  duration: '10 hari',
  author: 'Al-Waqidi',
  references: ['Maghazi Al-Waqidi', 'Sirah Nabawiyah Ibnu Hisyam'],
  audio: ''
},
{
  id: 'turunnya-ayat-hijab',
  title: 'Hukum Hijab Diturunkan',
  hijriyahYear: 4,
  gregorianYear: 625,
  month: 'Dzulhijjah',
  location: 'Madinah',
  parties: ['Nabi Muhammad ﷺ', 'Istri-istri Nabi', 'Kaum Muslim'],
  description: 'Turunnya ayat-ayat Al-Qur\'an yang mengatur tentang hijab bagi istri-istri Nabi dan wanita mukminah. Ayat-ayat ini turun dalam konteks mengatur etika berinteraksi dengan istri-istri Nabi dan melindungi kehormatan mereka.\n\nAyat hijab pertama turun dalam Surat Al-Ahzab ayat 53 yang mengatur agar para tamu tidak berlama-lama di rumah Nabi dan berbicara dengan istri-istri Nabi dari balik hijab (tabir). Kemudian turun ayat 59 yang memerintahkan istri-istri Nabi dan wanita mukminah untuk menutupi diri mereka.\n\nHukum ini menjadi dasar bagi etika berpakaian dan berinteraksi dalam masyarakat Muslim.',
  facts: 'Ayat hijab turun dalam Surat Al-Ahzab ayat 53 dan 59, mengatur etika berinteraksi dengan istri-istri Nabi dan pakaian wanita mukminah.',
  phase: 'madinah',
  icon: Calendar,
  duration: '-',
  author: 'Imam At-Tabari',
  references: ['Tafsir At-Tabari', 'Tafsir Ibnu Katsir', 'Asbab An-Nuzul As-Suyuti'],
  audio: ''
}
```

#### 1.2 Update HijriyahSection Data

**File**: `src/components/HijriyahSection.tsx`

Pastikan data di `hijriyahYears` untuk tahun 4 sudah sesuai:

```typescript
4: [{
  title: "Perang Bani An-Nadhir",
  icon: Sword,
  type: "battle"
}, {
  title: "Wafatnya Zainab binti Khuzaimah",
  icon: Heart,
  type: "personal"
}, {
  title: "Pernikahan Nabi dengan Ummu Salamah",
  icon: Heart,
  type: "personal"
}, {
  title: "Ekspedisi Dzat ar-Riqa",
  icon: Sword,
  type: "expedition"
}, {
  title: "Hukum Hijab Diturunkan",
  icon: Calendar,
  type: "religious"
}]
```

### Phase 2: Enhanced Navigation Logic

#### 2.1 Improve Event Search Function

**File**: `src/components/Timeline.tsx`

Tambahkan fungsi pencarian yang lebih robust:

```typescript
// Enhanced event search function
const findEventByTitle = (title: string, year: number): TimelineEvent | undefined => {
  // First try exact match
  let event = timelineEvents.find(event => 
    event.hijriyahYear === year && 
    event.title.toLowerCase() === title.toLowerCase()
  );
  
  if (event) return event;
  
  // Then try partial match
  event = timelineEvents.find(event => 
    event.hijriyahYear === year && 
    (event.title.toLowerCase().includes(title.toLowerCase()) ||
     title.toLowerCase().includes(event.title.toLowerCase()))
  );
  
  if (event) return event;
  
  // Finally try fuzzy match for common variations
  const titleMappings: { [key: string]: string } = {
    'perang bani an-nadhir': 'perang bani an-nadhir',
    'wafatnya zainab binti khuzaimah': 'wafatnya zainab binti khuzaimah',
    'pernikahan nabi dengan ummu salamah': 'pernikahan nabi dengan ummu salamah',
    'ekspedisi dzat ar-riqa': 'ekspedisi dzat ar-riqa',
    'hukum hijab diturunkan': 'hukum hijab diturunkan'
  };
  
  const normalizedTitle = title.toLowerCase();
  const mappedTitle = titleMappings[normalizedTitle];
  
  if (mappedTitle) {
    return timelineEvents.find(event => 
      event.hijriyahYear === year && 
      event.title.toLowerCase().includes(mappedTitle)
    );
  }
  
  return undefined;
};
```

#### 2.2 Update URL Parameter Handling

**File**: `src/pages/Timeline.tsx`

Perbaiki logika handling parameter URL:

```typescript
useEffect(() => {
  const eventParam = searchParams.get('event');
  const yearParam = searchParams.get('year');
  
  if (eventParam && yearParam) {
    const year = parseInt(yearParam);
    const targetEvent = findEventByTitle(eventParam, year);
    
    if (targetEvent) {
      // Set the correct year and expand the event
      setSelectedYear(year);
      setExpandedEvents(new Set([targetEvent.id]));
      
      // Scroll to event after DOM update
      setTimeout(() => {
        const element = document.getElementById(targetEvent.id);
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center',
            inline: 'nearest'
          });
          
          // Add visual highlight
          element.classList.add('ring-2', 'ring-primary', 'ring-opacity-50');
          setTimeout(() => {
            element.classList.remove('ring-2', 'ring-primary', 'ring-opacity-50');
          }, 3000);
        }
      }, 500);
    } else {
      // Show error message if event not found
      console.warn(`Event "${eventParam}" not found for year ${year}`);
      // You can add toast notification here
    }
  }
}, [searchParams, timelineEvents]);
```

### Phase 3: Validation & Testing

#### 3.1 Data Validation Function

Tambahkan fungsi untuk memvalidasi konsistensi data:

```typescript
// Add to utils or create new validation file
export const validateEventConsistency = () => {
  const hijriyahEvents = Object.entries(hijriyahYears).flatMap(([year, events]) =>
    events.map(event => ({ ...event, year: parseInt(year) }))
  );
  
  const missingEvents: Array<{title: string, year: number}> = [];
  
  hijriyahEvents.forEach(hijriyahEvent => {
    const found = timelineEvents.find(timelineEvent =>
      timelineEvent.hijriyahYear === hijriyahEvent.year &&
      timelineEvent.title.toLowerCase().includes(hijriyahEvent.title.toLowerCase())
    );
    
    if (!found) {
      missingEvents.push({
        title: hijriyahEvent.title,
        year: hijriyahEvent.year
      });
    }
  });
  
  if (missingEvents.length > 0) {
    console.warn('Missing events in timelineEvents:', missingEvents);
  }
  
  return missingEvents;
};
```

#### 3.2 Testing Checklist

1. **Data Consistency Test**:
   - [ ] Semua event di HijriyahSection ada di timelineEvents
   - [ ] Judul event konsisten antara kedua sumber
   - [ ] Tahun Hijriyah sesuai

2. **Navigation Test**:
   - [ ] Klik "Perang Bani An-Nadhir" mengarah ke event yang tepat
   - [ ] Auto-expand berfungsi dengan benar
   - [ ] Scroll ke posisi yang tepat
   - [ ] URL parameter ter-update dengan benar

3. **Edge Cases Test**:
   - [ ] Event dengan judul panjang
   - [ ] Event dengan karakter khusus
   - [ ] Event yang tidak ditemukan (error handling)

### Phase 4: Performance Optimization

#### 4.1 Memoization

```typescript
// Optimize event search with useMemo
const eventsByYear = useMemo(() => {
  return timelineEvents.reduce((acc, event) => {
    if (!acc[event.hijriyahYear]) {
      acc[event.hijriyahYear] = [];
    }
    acc[event.hijriyahYear].push(event);
    return acc;
  }, {} as Record<number, TimelineEvent[]>);
}, [timelineEvents]);
```

#### 4.2 Lazy Loading

```typescript
// Implement lazy loading for large event descriptions
const [expandedDescriptions, setExpandedDescriptions] = useState<Set<string>>(new Set());

const toggleDescription = (eventId: string) => {
  setExpandedDescriptions(prev => {
    const newSet = new Set(prev);
    if (newSet.has(eventId)) {
      newSet.delete(eventId);
    } else {
      newSet.add(eventId);
    }
    return newSet;
  });
};
```

## Implementation Timeline

- **Week 1**: Phase 1 - Data Synchronization
- **Week 2**: Phase 2 - Enhanced Navigation Logic  
- **Week 3**: Phase 3 - Validation & Testing
- **Week 4**: Phase 4 - Performance Optimization & Final Testing

## Success Metrics

1. **Functional**: 100% event navigation success rate
2. **Performance**: Page load time < 2 seconds
3. **UX**: Smooth scroll animation < 500ms
4. **Data**: Zero missing events between HijriyahSection and Timeline

## Rollback Plan

Jika terjadi masalah:
1. Revert changes ke commit sebelumnya
2. Restore original timelineEvents.ts
3. Test basic navigation functionality
4. Implement fixes incrementally