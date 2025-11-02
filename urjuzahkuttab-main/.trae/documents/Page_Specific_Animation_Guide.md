# Panduan Implementasi Animasi Per Halaman

## 1. Halaman Index (Beranda)

### 1.1 Hero Section Animation
```typescript
// src/pages/Index.tsx - Hero Section
import { AnimatedCard } from '@/components/AnimatedCard';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
      
      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <motion.h1
          className="text-5xl md:text-7xl font-bold text-primary mb-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Islamic Chronicle Quest
        </motion.h1>
        
        <motion.p
          className="text-xl md:text-2xl text-gray-600 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Jelajahi Sejarah Islam dengan Cara yang Interaktif
        </motion.p>
        
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.button
            className="bg-primary text-white px-8 py-3 rounded-lg font-semibold"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Mulai Petualangan
          </motion.button>
          
          <motion.button
            className="border-2 border-primary text-primary px-8 py-3 rounded-lg font-semibold"
            whileHover={{ scale: 1.05, backgroundColor: "var(--primary)", color: "white" }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Pelajari Lebih Lanjut
          </motion.button>
        </motion.div>
      </div>
      
      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute bottom-20 right-10 w-16 h-16 bg-secondary/10 rounded-full"
        animate={{
          y: [0, 20, 0],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </section>
  );
};
```

### 1.2 Features Grid Animation
```typescript
// src/pages/Index.tsx - Features Section
const FeaturesSection = () => {
  const features = [
    { icon: "🏛️", title: "Timeline Interaktif", description: "Jelajahi peristiwa sejarah Islam" },
    { icon: "🧩", title: "Quiz Edukatif", description: "Uji pengetahuan Anda" },
    { icon: "📚", title: "Materi Lengkap", description: "Sumber pembelajaran terpercaya" },
    { icon: "🎯", title: "Progress Tracking", description: "Pantau kemajuan belajar" },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-primary mb-4">Fitur Unggulan</h2>
          <p className="text-xl text-gray-600">Belajar sejarah Islam dengan cara yang menyenangkan</p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <AnimatedCard
              key={index}
              delay={index * 100}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <motion.div
                className="text-4xl mb-4"
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-semibold text-primary mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
};
```

## 2. Halaman Timeline

### 2.1 Timeline Scroll Animation
```typescript
// src/pages/Timeline.tsx
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const TimelineEvent = ({ event, index, isLeft }) => {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      className={`flex items-center mb-12 ${isLeft ? 'flex-row-reverse' : ''}`}
      initial={{ opacity: 0, x: isLeft ? 50 : -50 }}
      animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? 50 : -50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      {/* Timeline Line */}
      <motion.div
        className="w-4 h-4 bg-primary rounded-full relative z-10"
        initial={{ scale: 0 }}
        animate={isVisible ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.3, delay: (index * 0.1) + 0.3 }}
      >
        <motion.div
          className="absolute inset-0 bg-primary rounded-full"
          animate={isVisible ? {
            scale: [1, 1.5, 1],
            opacity: [1, 0.5, 1],
          } : {}}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
      
      {/* Event Card */}
      <motion.div
        className={`bg-white rounded-lg shadow-lg p-6 max-w-md ${
          isLeft ? 'mr-8' : 'ml-8'
        }`}
        whileHover={{ scale: 1.02, y: -5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <motion.div
          className="text-sm text-primary font-semibold mb-2"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: (index * 0.1) + 0.5 }}
        >
          {event.year}
        </motion.div>
        
        <motion.h3
          className="text-xl font-bold text-gray-800 mb-3"
          initial={{ opacity: 0, y: 10 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ delay: (index * 0.1) + 0.6 }}
        >
          {event.title}
        </motion.h3>
        
        <motion.p
          className="text-gray-600"
          initial={{ opacity: 0, y: 10 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ delay: (index * 0.1) + 0.7 }}
        >
          {event.description}
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

const TimelinePage = () => {
  const events = [
    { year: "610 M", title: "Wahyu Pertama", description: "Nabi Muhammad SAW menerima wahyu pertama di Gua Hira" },
    { year: "622 M", title: "Hijrah", description: "Perpindahan kaum Muslim dari Mekah ke Madinah" },
    // ... more events
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-primary mb-4">Timeline Sejarah Islam</h1>
          <p className="text-xl text-gray-600">Perjalanan peradaban Islam dari masa ke masa</p>
        </motion.div>
        
        {/* Timeline Container */}
        <div className="relative">
          {/* Central Line */}
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-primary/30 h-full"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{ transformOrigin: "top" }}
          />
          
          {events.map((event, index) => (
            <TimelineEvent
              key={index}
              event={event}
              index={index}
              isLeft={index % 2 === 0}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
```

## 3. Halaman Quiz

### 3.1 Quiz Animation System
```typescript
// src/pages/Quiz.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const QuizQuestion = ({ question, onAnswer, questionNumber, totalQuestions }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    setTimeout(() => {
      onAnswer(answerIndex);
      setSelectedAnswer(null);
      setShowResult(false);
    }, 1500);
  };

  return (
    <motion.div
      className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8"
      initial={{ opacity: 0, scale: 0.9, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -50 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Progress Bar */}
      <motion.div
        className="w-full bg-gray-200 rounded-full h-2 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div
          className="bg-primary h-2 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </motion.div>
      
      {/* Question */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="text-sm text-primary font-semibold mb-2">
          Pertanyaan {questionNumber} dari {totalQuestions}
        </div>
        <h2 className="text-2xl font-bold text-gray-800">{question.text}</h2>
      </motion.div>
      
      {/* Answers */}
      <div className="space-y-4">
        {question.answers.map((answer, index) => (
          <motion.button
            key={index}
            className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
              selectedAnswer === index
                ? showResult
                  ? index === question.correctAnswer
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-red-500 bg-red-50 text-red-700'
                  : 'border-primary bg-primary/10'
                : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'
            }`}
            onClick={() => !selectedAnswer && handleAnswerSelect(index)}
            disabled={selectedAnswer !== null}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + (index * 0.1), duration: 0.4 }}
            whileHover={selectedAnswer === null ? { scale: 1.02 } : {}}
            whileTap={selectedAnswer === null ? { scale: 0.98 } : {}}
          >
            <div className="flex items-center">
              <motion.div
                className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${
                  selectedAnswer === index
                    ? showResult
                      ? index === question.correctAnswer
                        ? 'border-green-500 bg-green-500'
                        : 'border-red-500 bg-red-500'
                      : 'border-primary bg-primary'
                    : 'border-gray-300'
                }`}
                animate={selectedAnswer === index ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                {selectedAnswer === index && showResult && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    {index === question.correctAnswer ? '✓' : '✗'}
                  </motion.div>
                )}
              </motion.div>
              <span className="font-medium">{answer}</span>
            </div>
          </motion.button>
        ))}
      </div>
      
      {/* Explanation */}
      <AnimatePresence>
        {showResult && (
          <motion.div
            className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h4 className="font-semibold text-blue-800 mb-2">Penjelasan:</h4>
            <p className="text-blue-700">{question.explanation}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const QuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      text: "Kapan Nabi Muhammad SAW lahir?",
      answers: ["570 M", "571 M", "572 M", "573 M"],
      correctAnswer: 0,
      explanation: "Nabi Muhammad SAW lahir pada tahun 570 M di Mekah."
    },
    // ... more questions
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 py-20">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-primary mb-4">Quiz Sejarah Islam</h1>
          <p className="text-xl text-gray-600">Uji pengetahuan Anda tentang sejarah Islam</p>
        </motion.div>
        
        <AnimatePresence mode="wait">
          {!showResults ? (
            <QuizQuestion
              key={currentQuestion}
              question={questions[currentQuestion]}
              onAnswer={(answerIndex) => {
                if (answerIndex === questions[currentQuestion].correctAnswer) {
                  setScore(score + 1);
                }
                
                if (currentQuestion < questions.length - 1) {
                  setCurrentQuestion(currentQuestion + 1);
                } else {
                  setShowResults(true);
                }
              }}
              questionNumber={currentQuestion + 1}
              totalQuestions={questions.length}
            />
          ) : (
            <QuizResults score={score} totalQuestions={questions.length} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
```

## 4. Halaman About

### 4.1 Team Section Animation
```typescript
// src/pages/About.tsx
const TeamMember = ({ member, index }) => {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      className="bg-white rounded-xl shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 50, rotateY: -15 }}
      animate={isVisible ? { 
        opacity: 1, 
        y: 0, 
        rotateY: 0 
      } : { 
        opacity: 0, 
        y: 50, 
        rotateY: -15 
      }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: "easeOut"
      }}
      whileHover={{ 
        y: -10, 
        scale: 1.02,
        rotateY: 5,
        transition: { duration: 0.3 }
      }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <motion.div
        className="relative overflow-hidden"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
      >
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-64 object-cover"
        />
        <motion.div
          className="absolute inset-0 bg-primary/20"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
      
      <div className="p-6">
        <motion.h3
          className="text-xl font-bold text-gray-800 mb-2"
          initial={{ opacity: 0, x: -20 }}
          animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ delay: (index * 0.1) + 0.3 }}
        >
          {member.name}
        </motion.h3>
        
        <motion.p
          className="text-primary font-semibold mb-3"
          initial={{ opacity: 0, x: -20 }}
          animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ delay: (index * 0.1) + 0.4 }}
        >
          {member.role}
        </motion.p>
        
        <motion.p
          className="text-gray-600"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: (index * 0.1) + 0.5 }}
        >
          {member.description}
        </motion.p>
      </div>
    </motion.div>
  );
};
```

## 5. Halaman Settings

### 5.1 Settings Panel Animation
```typescript
// src/pages/Settings.tsx
const SettingsSection = ({ title, children, icon: Icon }) => {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      className="bg-white rounded-xl shadow-lg p-6 mb-6"
      initial={{ opacity: 0, x: -50 }}
      animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.div
        className="flex items-center mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <motion.div
          className="bg-primary/10 p-3 rounded-lg mr-4"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Icon className="w-6 h-6 text-primary" />
        </motion.div>
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

const ThemeSelector = () => {
  const [selectedTheme, setSelectedTheme] = useState('light');
  
  const themes = [
    { id: 'light', name: 'Terang', preview: '#ffffff' },
    { id: 'dark', name: 'Gelap', preview: '#1a1a1a' },
    { id: 'islamic', name: 'Islamic', preview: '#435e46' },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {themes.map((theme, index) => (
        <motion.button
          key={theme.id}
          className={`p-4 rounded-lg border-2 transition-all ${
            selectedTheme === theme.id
              ? 'border-primary bg-primary/10'
              : 'border-gray-200 hover:border-primary/50'
          }`}
          onClick={() => setSelectedTheme(theme.id)}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className="w-full h-16 rounded-lg mb-3"
            style={{ backgroundColor: theme.preview }}
            animate={selectedTheme === theme.id ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.3 }}
          />
          <div className="text-sm font-medium">{theme.name}</div>
        </motion.button>
      ))}
    </div>
  );
};
```

## 6. Global Animation Utilities

### 6.1 Page Transition Wrapper
```typescript
// src/components/PageTransition.tsx
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
  in: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  out: {
    opacity: 0,
    y: -20,
    scale: 1.02,
  },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.4,
};

export const PageTransition = ({ children }) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
```

### 6.2 Scroll Progress Indicator
```typescript
// src/components/ScrollProgress.tsx
import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
      style={{ scaleX }}
    />
  );
};
```

Panduan ini memberikan implementasi detail untuk setiap halaman dengan animasi yang konsisten, optimal, dan mudah dipelihara.