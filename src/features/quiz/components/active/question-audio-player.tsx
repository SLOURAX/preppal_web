"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Play, Pause, Square, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuestionAudioPlayerProps {
  readonly textToRead: string;
  readonly questionId: number; // Used to reset audio when question changes
}

export function QuestionAudioPlayer({ textToRead, questionId }: QuestionAudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Initialize speech synthesis
  useEffect(() => {
    if (typeof window !== "undefined") {
      synthRef.current = window.speechSynthesis;
    }
    
    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  // Reset/stop when question changes
  useEffect(() => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsPlaying(false);
      setIsPaused(false);
    }
  }, [questionId]);

  const handlePlay = useCallback(() => {
    if (!synthRef.current) return;

    if (isPaused) {
      synthRef.current.resume();
      setIsPlaying(true);
      setIsPaused(false);
      return;
    }

    synthRef.current.cancel(); // Stop any current speech
    
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = 0.9; // Slightly slower for better comprehension
    
    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utterance.onerror = (event) => {
      if (event.error !== 'canceled') {
        setIsPlaying(false);
        setIsPaused(false);
      }
    };

    utteranceRef.current = utterance;
    synthRef.current.speak(utterance);
    setIsPlaying(true);
    setIsPaused(false);
  }, [textToRead, isPaused]);

  const handlePause = useCallback(() => {
    if (synthRef.current && isPlaying) {
      synthRef.current.pause();
      setIsPlaying(false);
      setIsPaused(true);
    }
  }, [isPlaying]);

  const handleStop = useCallback(() => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsPlaying(false);
      setIsPaused(false);
    }
  }, []);

  const togglePlayPause = isPlaying ? handlePause : handlePlay;

  return (
    <div className="surface-card mt-8 flex items-center justify-between rounded-2xl p-4 sm:p-5 shadow-sm border border-border/50">
      <div className="flex items-center gap-3">
        <div className={cn(
          "grid size-10 place-items-center rounded-xl transition-colors duration-500",
          isPlaying ? "bg-primary/10 text-primary" : "bg-surface-subtle text-muted-foreground"
        )}>
          <Volume2 className={cn("size-5 transition-transform duration-500", isPlaying && "scale-110")} />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-foreground">Read Aloud</h3>
          <div className="flex items-center gap-1.5 mt-0.5 h-3 overflow-hidden">
            {isPlaying ? (
              // Animated sound wave bars
              Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-primary rounded-full animate-pulse"
                  style={{ 
                    height: `${Math.max(40, Math.random() * 100)}%`,
                    animationDuration: `${0.5 + Math.random() * 0.5}s`,
                    animationDelay: `${Math.random() * 0.5}s`
                  }}
                />
              ))
            ) : (
              <p className="text-xs text-muted-foreground">Listen to the question</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {(isPlaying || isPaused) && (
          <button
            onClick={handleStop}
            className="flex size-9 items-center justify-center rounded-full bg-surface-subtle text-muted-foreground hover:bg-red-500/10 hover:text-red-500 transition-colors"
            title="Stop"
          >
            <Square className="size-3.5 fill-current" />
          </button>
        )}
        <button
          onClick={togglePlayPause}
          className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 transition-all hover:scale-105 active:scale-95"
          title={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause className="size-4 fill-current" />
          ) : (
            <Play className="size-4 ml-0.5 fill-current" />
          )}
        </button>
      </div>
    </div>
  );
}
