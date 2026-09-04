"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Pause, Play, Square, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuestionAudioPlayerProps {
  readonly textToRead: string;
  readonly questionId: number; // Used to reset audio when question changes
}

export function QuestionAudioPlayer({
  textToRead,
  questionId,
}: QuestionAudioPlayerProps) {
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
      if (event.error !== "canceled") {
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
    <div className="surface-card border-border/50 mt-6 flex items-center justify-between rounded-2xl border p-3.5 shadow-sm sm:p-4">
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "grid size-9 place-items-center rounded-xl transition-colors duration-500",
            isPlaying
              ? "bg-primary/10 text-primary"
              : "bg-surface-subtle text-muted-foreground",
          )}
        >
          <Volume2
            className={cn(
              "size-4 transition-transform duration-500",
              isPlaying && "scale-110",
            )}
          />
        </div>
        <div>
          <h3 className="text-foreground text-sm font-semibold">Read Aloud</h3>
          <div className="mt-0.5 flex h-3 items-center gap-1.5 overflow-hidden">
            {isPlaying ? (
              [45, 75, 55, 90, 65].map((height, i) => (
                <div
                  key={i}
                  className="bg-primary w-1 animate-pulse rounded-full"
                  style={{
                    height: `${height}%`,
                    animationDuration: `${0.55 + i * 0.08}s`,
                    animationDelay: `${i * 0.08}s`,
                  }}
                />
              ))
            ) : (
              <p className="text-muted-foreground text-xs ">
                Listen to the question
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {(isPlaying || isPaused) && (
          <button
            onClick={handleStop}
            className="bg-surface-subtle text-muted-foreground flex size-8 items-center justify-center rounded-lg transition-colors hover:bg-red-500/10 hover:text-red-500"
            title="Stop"
          >
            <Square className="size-3.5 fill-current" />
          </button>
        )}
        <button
          onClick={togglePlayPause}
          className="bg-primary text-primary-foreground hover:bg-primary/90 flex size-9 items-center justify-center rounded-xl shadow-sm transition-all hover:scale-105 active:scale-95"
          title={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause className="size-4 fill-current" />
          ) : (
            <Play className="ml-0.5 size-4 fill-current" />
          )}
        </button>
      </div>
    </div>
  );
}
