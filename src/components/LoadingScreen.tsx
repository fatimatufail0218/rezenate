"use client";

import { createContext, useContext, useEffect, useState } from "react";

const LoadingContext = createContext(false);
export const useLoadingComplete = () => useContext(LoadingContext);

// Timing constants - inhi numbers ko tune karein
const LOAD_DURATION = 2900;   // ms - 0% se 100% tak counter AUR logo-reveal ki total duration
const EXPAND_DURATION = 1200;  // ms - box ke poori screen tak phailne ki duration

export default function LoadingScreen({ children }: { children: React.ReactNode }) {
  const [percent, setPercent] = useState(0);
  const [phase, setPhase] = useState<"counting" | "expanding" | "done">("counting");
  const [boxStage, setBoxStage] = useState<"hidden" | "small" | "expanded">("hidden");

  // 0% -> 100% counter
  useEffect(() => {
    if (phase !== "counting") return;

    const start = Date.now();
    let raf: number;

    const tick = () => {
      const elapsed = Date.now() - start;
      const next = Math.min(100, Math.floor((elapsed / LOAD_DURATION) * 120));
      setPercent(next);

      if (next >= 100) {
        setPhase("expanding");
      } else {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  
  useEffect(() => {
    if (phase !== "expanding") return;

    setBoxStage("small");
    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(() => setBoxStage("expanded"));
      return () => cancelAnimationFrame(raf2);
    });

    return () => cancelAnimationFrame(raf1);
  }, [phase]);

  useEffect(() => {
    if (phase !== "expanding") return;
    const timer = setTimeout(() => setPhase("done"), EXPAND_DURATION);
    return () => clearTimeout(timer);
  }, [phase]);

  // Loading ke dauran background scroll na ho
  useEffect(() => {
    document.body.style.overflow = phase === "done" ? "" : "hidden";
  }, [phase]);

  return (
    <LoadingContext.Provider value={phase === "done"}>
      
      {children}

      {phase !== "done" && (
        <div className="fixed inset-0 z-[999] overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-white">
            <img
              src="/load-bg.png"
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          {/* Logo - part3 -> part2 -> part1 sequence, LOAD_DURATION ke barabar, sirf EK dafa */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" viewBox="0 0 192 192" fill="none">
              {/* Part 1 - big shape, sabse aakhir mein aata hai */}
              <path
                className="loader-logo-part-1"
                d="M191.704 0H0L36.569 36.792C44.2651 44.535 54.7313 48.8889 65.6484 48.8889H141.63V124.943C141.63 135.817 145.949 146.246 153.638 153.935L191.704 192V0Z"
                fill="#9564F4"
              />
              {/* Part 2 - middle shape, beech mein aata hai */}
              <path
                className="loader-logo-part-2"
                d="M122.666 68.7407H0.295898L37.762 106.207C45.0759 113.521 54.9957 117.63 65.3391 117.63H73.4811V126.364C73.4811 136.708 77.59 146.627 84.9039 153.941L122.666 191.704V68.7407Z"
                fill="#9564F4"
              />
              {/* Part 3 - chhota triangle, sabse pehle fly-in hota hai */}
              <path
                className="loader-logo-part-3"
                d="M54.2222 191.704V137.481H0L54.2222 191.704Z"
                fill="#9564F4"
              />
            </svg>
          </div>

          <style>{`
            /* Har part ki animation-duration = LOAD_DURATION (JS constant se seedha aa raha hai,
               isliye counter aur logo hamesha sync rahenge, chahe LOAD_DURATION baad mein badlein).
               "forwards" + sirf 1 dafa (infinite hata diya) - taake 100% pe logo poora/static reh jaye. */
            .loader-logo-part-1 {
              opacity: 0;
              animation: loaderPart1Reveal ${LOAD_DURATION}ms ease-out forwards;
              transform-box: fill-box;
              transform-origin: center;
            }
            .loader-logo-part-2 {
              opacity: 0;
              animation: loaderPart2Reveal ${LOAD_DURATION}ms ease-out forwards;
              transform-box: fill-box;
              transform-origin: center;
            }
            .loader-logo-part-3 {
              opacity: 0;
              animation: loaderPart3Reveal ${LOAD_DURATION}ms ease-out forwards;
              transform-box: fill-box;
              transform-origin: top right;
            }

            /* PART 3 - sabse pehle: 0% se ~25% duration ke andar fly-in ho kar settle */
            @keyframes loaderPart3Reveal {
              0% {
                opacity: 0;
                transform: translate(99px, -99px) scale(0.6);
              }
              25% {
                opacity: 1;
                transform: translate(0, 0) scale(1);
              }
              100% {
                opacity: 1;
                transform: translate(0, 0) scale(1);
              }
            }

            /* PART 2 - part 3 ke baad: ~28% se ~50% ke beech fade-in */
            @keyframes loaderPart2Reveal {
              0%, 28% {
                opacity: 0;
                transform: translateY(10px);
              }
              50% {
                opacity: 1;
                transform: translateY(0);
              }
              100% {
                opacity: 1;
                transform: translateY(0);
              }
            }

            /* PART 1 - sabse aakhir mein: ~55% se ~85% ke beech fade-in,
               taake 100% (LOAD_DURATION khatam) tak poora logo ban chuka ho */
            @keyframes loaderPart1Reveal {
              0%, 55% {
                opacity: 0;
                transform: translateY(10px);
              }
              85% {
                opacity: 1;
                transform: translateY(0);
              }
              100% {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>

          {/* Box - counting ke dauran hidden, 100% hote hi center se expand */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              width: boxStage === "expanded" ? "300vmax" : 60,
              height: boxStage === "expanded" ? "300vmax" : 60,
              opacity: boxStage === "hidden" ? 0 : 1,
              transition:
                boxStage === "expanded"
                  ? `width ${EXPAND_DURATION}ms cubic-bezier(0.76,0,0.24,1), height ${EXPAND_DURATION}ms cubic-bezier(0.76,0,0.24,1)`
                  : "none",
            }}
          >
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 60 60"
              preserveAspectRatio="none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="60" height="60" fill="#9564F4" />
            </svg>
          </div>

          {/* Bottom-left percentage counter */}
          <div className="absolute bottom-10 left-10 font-[family-name:var(--font-boldonse)] text-[28px] text-black">
            {percent}%
          </div>
        </div>
      )}
    </LoadingContext.Provider>
  );
}