import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  ChevronLeft,
  ChevronRight,
  SkipForward,
  CheckCircle,
  X,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";

const quizQuestions = [
  {
    id: 1,
    question: "Pada tahun berapa Nabi Muhammad ﷺ hijrah ke Madinah?",
    options: [
      { id: "A", text: "620 Masehi", correct: false },
      { id: "B", text: "622 Masehi", correct: true },
      { id: "C", text: "624 Masehi", correct: false },
      { id: "D", text: "626 Masehi", correct: false },
    ],
    explanation:
      "Hijrah Nabi Muhammad ﷺ ke Madinah terjadi pada tahun 622 Masehi (1 Hijriah). Peristiwa ini menandai dimulainya kalender Hijriah dan menjadi titik balik penting dalam sejarah Islam.",
  },
  {
    id: 2,
    question: "Apa nama masjid pertama yang dibangun oleh Nabi Muhammad ﷺ?",
    options: [
      { id: "A", text: "Masjid al-Haram", correct: false },
      { id: "B", text: "Masjid an-Nabawi", correct: true },
      { id: "C", text: "Masjid al-Aqsa", correct: false },
      { id: "D", text: "Masjid Quba", correct: false },
    ],
    explanation:
      "Masjid an-Nabawi adalah masjid pertama yang dibangun oleh Nabi Muhammad ﷺ di Madinah. Masjid ini juga menjadi tempat tinggal Nabi dan pusat kegiatan umat Islam pada masa awal.",
  },
  {
    id: 3,
    question: "Perang pertama dalam sejarah Islam adalah?",
    options: [
      { id: "A", text: "Perang Uhud", correct: false },
      { id: "B", text: "Perang Badr", correct: true },
      { id: "C", text: "Perang Khandaq", correct: false },
      { id: "D", text: "Perang Khaibar", correct: false },
    ],
    explanation:
      "Perang Badr adalah perang pertama dan paling bersejarah dalam Islam, terjadi pada tahun 624 M. Kemenangan umat Islam dalam perang ini menjadi bukti pertolongan Allah dan memperkuat posisi Islam di Jazirah Arab.",
  },
  {
    id: 4,
    question: "Siapa istri pertama Nabi Muhammad ﷺ?",
    options: [
      { id: "A", text: "Aisyah RA", correct: false },
      { id: "B", text: "Khadijah RA", correct: true },
      { id: "C", text: "Hafshah RA", correct: false },
      { id: "D", text: "Ummu Salamah RA", correct: false },
    ],
    explanation:
      "Khadijah RA adalah istri pertama Nabi Muhammad ﷺ. Beliau adalah seorang pedagang sukses yang memberikan dukungan penuh kepada Nabi, baik secara moral maupun finansial, terutama pada masa-masa awal dakwah Islam.",
  },
  {
    id: 5,
    question: "Dalam perang Uhud, apa kesalahan utama pasukan Muslim?",
    options: [
      { id: "A", text: "Kurang persiapan", correct: false },
      { id: "B", text: "Pemanah meninggalkan posisi", correct: true },
      { id: "C", text: "Jumlah pasukan sedikit", correct: false },
      { id: "D", text: "Tidak ada strategi", correct: false },
    ],
    explanation:
      "Dalam Perang Uhud, kesalahan utama adalah para pemanah meninggalkan posisi mereka di bukit untuk mengambil harta rampasan perang. Hal ini memungkinkan pasukan berkuda Khalid bin Walid menyerang dari belakang dan mengubah jalannya pertempuran.",
  },
];

const InteractiveQuiz = () => {
  const { scheme } = useTheme();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);

  const question = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  const handleAnswerSelect = (optionId: string) => {
    if (!isAnswerSubmitted) {
      setSelectedAnswer(optionId);

      // Auto-submit the answer
      const newAnswers = { ...answers, [currentQuestion]: optionId };
      setAnswers(newAnswers);

      // Check if answer is correct
      const correctOption = question.options.find((opt) => opt.correct);
      if (correctOption && optionId === correctOption.id) {
        setScore(score + 20);
      }

      setIsAnswerSubmitted(true);
      setShowExplanation(true);
    }
  };

  const getOptionStyle = (option: { id: string; correct: boolean }) => {
    if (!isAnswerSubmitted) {
      return selectedAnswer === option.id
        ? "bg-primary text-primary-foreground ring-2 ring-accent shadow-elegant"
        : "border border-input bg-background hover:bg-primary/10 hover:text-primary hover:border-primary/50";
    }

    if (option.correct) {
      return "bg-primary/20 border-primary text-primary";
    }

    if (selectedAnswer === option.id && !option.correct) {
      return "bg-destructive/20 border-destructive text-destructive";
    }

    return "border border-input bg-background opacity-60";
  };

  const getOptionIcon = (option: { id: string; correct: boolean }) => {
    if (!isAnswerSubmitted) return null;

    if (option.correct) {
      return <Check className="h-4 w-4 text-primary ml-2" />;
    }

    if (selectedAnswer === option.id && !option.correct) {
      return <X className="h-4 w-4 text-destructive ml-2" />;
    }

    return null;
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setShowExplanation(false);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[currentQuestion - 1] || null);
    }
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(answers[currentQuestion + 1] || null);
    }
  };

  const handleSkip = () => {
    setSelectedAnswer(null);
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  if (showResults) {
    return (
      <section className="interactive-quiz-section py-12 px-4 theme-transition">
        <div className="max-w-2xl mx-auto">
          <Card
            className="interactive-quiz-card shadow-elegant theme-transition bg-transparent p-6"
            data-aos="fade-up"
            data-aos-duration="1600"
            data-aos-easing="ease-out-cubic"
          >
            <CardHeader className="text-center">
              <CardTitle className="interactive-quiz-heading text-2xl font-bold theme-transition text-foreground">
                Hasil Quiz Anda
              </CardTitle>
            </CardHeader>
            <CardContent className="interactive-quiz-card-content text-center space-y-6 theme-transition text-foreground">
              <div className="interactive-quiz-score text-6xl font-bold theme-transition">
                {score}/100
              </div>
              <div className="space-y-2">
                <p className="interactive-quiz-text text-lg theme-transition">
                  Anda berhasil menjawab {Math.floor(score / 20)} dari{" "}
                  {quizQuestions.length} pertanyaan dengan benar!
                </p>
                <p className="interactive-quiz-subtext text-muted-foreground theme-transition">
                  {score >= 80
                    ? "Luar biasa! Pengetahuan sejarah Islam Anda sangat baik."
                    : score >= 60
                    ? "Bagus! Terus belajar untuk meningkatkan pengetahuan Anda."
                    : "Masih perlu belajar lebih banyak. Jangan menyerah!"}
                </p>
              </div>
              <div className="interactive-quiz-results-actions flex justify-center gap-3 theme-transition">
                <Button
                  variant="hero"
                  onClick={() => {
                    setCurrentQuestion(0);
                    setSelectedAnswer(null);
                    setAnswers({});
                    setScore(0);
                    setShowResults(false);
                  }}
                >
                  Ulangi Quiz
                </Button>
                <Button
                  variant="outline"
                  className="interactive-quiz-outline theme-transition"
                >
                  Lihat Pembahasan
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="interactive-quiz-section py-12 px-4 theme-transition">
      <div className="max-w-2xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2
            className="interactive-quiz-heading text-3xl md:text-4xl font-bold mb-4 theme-transition"
            data-aos="fade-up"
            data-aos-duration="1600"
            data-aos-easing="ease-out-cubic"
          >
            Kuis Interaktif
          </h2>
        </div>

        {/* Quiz Card */}
        <Card
          className={cn(
            "interactive-quiz-card shadow-elegant theme-transition",
            scheme === "light" && "interactive-quiz-card-light"
          )}
          data-aos="fade-up"
          data-aos-duration="1600"
          data-aos-easing="ease-out-cubic"
          data-aos-delay="150"
        >
          <CardHeader>
            <div className="flex justify-between items-center mb-4">
              <div className="interactive-quiz-subtext text-sm text-muted-foreground theme-transition">
                QUIZ CARD {currentQuestion + 1}/{quizQuestions.length}
              </div>
              <div className="interactive-quiz-subtext text-sm font-semibold theme-transition">
                Score: {score}/100
              </div>
            </div>
            <Progress
              value={progress}
              className="interactive-quiz-progress h-2 theme-transition"
            />
          </CardHeader>

          <CardContent className="interactive-quiz-card-content space-y-6 theme-transition">
            {/* Question */}
            <div className="space-y-4">
              <h3 className="interactive-quiz-question text-lg font-semibold leading-relaxed theme-transition">
                Pertanyaan: {question.question}
              </h3>

              {/* Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {question.options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleAnswerSelect(option.id)}
                    className={`p-4 rounded-lg text-left transition-all duration-200 ${getOptionStyle(
                      option
                    )}`}
                    disabled={isAnswerSubmitted}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center">
                          {selectedAnswer === option.id &&
                            !isAnswerSubmitted && (
                              <div className="w-3 h-3 rounded-full bg-current" />
                            )}
                        </div>
                        <span className="font-medium">
                          {option.id}) {option.text}
                        </span>
                      </div>
                      {getOptionIcon(option)}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Submit/Next Button */}
            <div className="text-center">
              {isAnswerSubmitted && (
                <div className="space-y-4">
                  {showExplanation && (
                    <div className="space-y-3">
                      {/* Answer Status */}
                      <div
                        className={`p-4 rounded-lg text-left ${
                          question.options.find((opt) => opt.correct)?.id ===
                          selectedAnswer
                            ? "bg-primary/10 border border-primary/30"
                            : "bg-destructive/10 border border-destructive/30"
                        }`}
                      >
                        <div className="flex items-center space-x-2 mb-2">
                          {question.options.find((opt) => opt.correct)?.id ===
                          selectedAnswer ? (
                            <>
                              <Check className="h-5 w-5 text-primary" />
                              <span className="font-semibold text-primary">
                                Jawaban Benar!
                              </span>
                            </>
                          ) : (
                            <>
                              <X className="h-5 w-5 text-destructive" />
                              <span className="font-semibold text-destructive">
                                Jawaban Salah. Jawaban yang benar adalah{" "}
                                {
                                  question.options.find((opt) => opt.correct)
                                    ?.id
                                }
                                )
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Explanation */}
                      <div className="interactive-quiz-explanation p-4 rounded-lg text-left theme-transition">
                        <h4 className="interactive-quiz-explanation-title font-semibold mb-2 theme-transition">
                          Penjelasan:
                        </h4>
                        <p className="interactive-quiz-explanation-text text-sm text-muted-foreground theme-transition">
                          {question.explanation}
                        </p>
                      </div>
                    </div>
                  )}
                  <Button
                    variant="hero"
                    size="lg"
                    onClick={handleNextQuestion}
                    className="min-w-[200px]"
                  >
                    {currentQuestion < quizQuestions.length - 1
                      ? "Pertanyaan Selanjutnya"
                      : "Lihat Hasil"}
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quiz Navigation */}
        <Card className="interactive-quiz-card mt-6 theme-transition">
          <CardContent className="interactive-quiz-card-content p-4 theme-transition">
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="interactive-quiz-outline gap-2 hover:bg-primary hover:text-primary-foreground theme-transition hover:border-primary disabled:hover:bg-transparent disabled:hover:text-muted-foreground disabled:hover:border-input"
              >
                <ChevronLeft className="h-4 w-4" />
                PREV
              </Button>

              <Button
                variant="ghost"
                onClick={handleSkip}
                className="interactive-quiz-outline gap-2 hover:bg-primary hover:text-primary-foreground theme-transition"
              >
                <SkipForward className="h-4 w-4" />
                SKIP
              </Button>

              <Button
                variant="outline"
                onClick={handleNext}
                disabled={currentQuestion === quizQuestions.length - 1}
                className="interactive-quiz-outline gap-2 hover:bg-primary hover:text-primary-foreground theme-transition hover:border-primary disabled:hover:bg-transparent disabled:hover:text-muted-foreground disabled:hover:border-input"
              >
                NEXT
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default InteractiveQuiz;
