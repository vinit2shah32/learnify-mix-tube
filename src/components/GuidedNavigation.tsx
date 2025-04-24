
import React from 'react';
import { Section } from './Section';
import { LearningCard } from './LearningCard';
import { ExamSelector } from './ExamSelector';
import { Progress } from '@/components/ui/progress';
import { Book, Brain, Calculator, PlayCircle, Route } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from 'framer-motion';

export const GuidedNavigation = () => {
  const steps = [
    {
      title: "1. Select Your Exam",
      description: "Start by choosing the exam you're preparing for",
      progress: 25,
      content: <ExamSelector className="mt-4" />
    },
    {
      title: "2. Choose Your Learning Path",
      description: "Pick how you want to learn",
      progress: 50,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <LearningCard
            title="Practice Questions"
            subtitle="Test your knowledge with targeted questions"
            icon={<Calculator className="w-6 h-6 text-spotify-accent" />}
            href="/practice/1"
            imageSrc="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=500"
          />
          <LearningCard
            title="Study Materials"
            subtitle="Learn concepts through comprehensive guides"
            icon={<Book className="w-6 h-6 text-spotify-accent" />}
            href="/study"
            imageSrc="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=500"
          />
        </div>
      )
    },
    {
      title: "3. Track Your Progress",
      description: "Monitor your learning journey",
      progress: 75,
      content: (
        <div className="space-y-4 mt-4">
          <div className="bg-spotify-card p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-white">Overall Progress</h4>
              <span className="text-spotify-accent">75%</span>
            </div>
            <Progress value={75} className="bg-spotify-hover" indicatorClassName="bg-spotify-accent" />
          </div>
        </div>
      )
    },
    {
      title: "4. Get Personalized Recommendations",
      description: "Based on your performance and goals",
      progress: 100,
      content: (
        <Section title="Recommended for You" useCarousel={true} className="mt-4">
          <LearningCard
            title="Statistics Mix"
            subtitle="Practice statistics concepts"
            icon={<Brain className="w-6 h-6 text-spotify-accent" />}
            href="/mix-practice/1"
            imageSrc="https://images.unsplash.com/photo-1460574283810-2aab119d8511?auto=format&fit=crop&w=500"
          />
          <LearningCard
            title="Video Tutorials"
            subtitle="Learn through guided videos"
            icon={<PlayCircle className="w-6 h-6 text-spotify-accent" />}
            href="/videos/1"
            imageSrc="https://images.unsplash.com/photo-1493397212122-2b85dda8106b?auto=format&fit=crop&w=500"
          />
        </Section>
      )
    }
  ];

  return (
    <div className="container py-8 max-w-7xl mx-auto px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-spotify-text bg-clip-text text-transparent mb-4">
          Welcome to Your Learning Journey
        </h1>
        <p className="text-spotify-text text-lg">
          Follow these steps to get started with your exam preparation
        </p>
      </motion.div>

      <div className="space-y-8">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="bg-spotify-card border-spotify-hover">
              <CardHeader>
                <CardTitle className="text-white">{step.title}</CardTitle>
                <CardDescription className="text-spotify-text">
                  {step.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {step.content}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex justify-center mt-8"
      >
        <Route className="w-8 h-8 text-spotify-accent animate-bounce" />
      </motion.div>
    </div>
  );
};
