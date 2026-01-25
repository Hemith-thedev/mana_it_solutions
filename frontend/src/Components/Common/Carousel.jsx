import React, { useState, useEffect, useRef, useCallback } from "react";
import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";

const Carousel = ({ slides = [] }) => {
  // --- 1. HOOKS (Must be at the top) ---
  const SLIDE_DURATION = 4000;
  const len = slides?.length || 0;
  const clonesCount = 2;

  const [index, setIndex] = useState(clonesCount);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isResetting, setIsResetting] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [isPressing, setIsPressing] = useState(false);
  const [isHoveringControls, setIsHoveringControls] = useState(false);

  const isMoving = useRef(false);
  const requestRef = useRef();
  const lastTimeRef = useRef();
  const lastMousePos = useRef({ x: 0, y: 0 });

  const move = useCallback((newIndex) => {
    if (isMoving.current || isResetting) return;
    isMoving.current = true;
    setIsTransitioning(true);
    setIndex(newIndex);
    setElapsedTime(0);
  }, [isResetting]);

  const handleNext = useCallback(() => move(index + 1), [index, move]);
  const handlePrev = useCallback(() => move(index - 1), [index, move]);

  const animate = useCallback((time) => {
    if (lastTimeRef.current !== undefined && !isResetting && !isMoving.current) {
      const deltaTime = time - lastTimeRef.current;
      setElapsedTime((prev) => {
        const total = prev + deltaTime;
        if (total >= SLIDE_DURATION) {
          handleNext();
          return 0;
        }
        return total;
      });
    }
    lastTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  }, [handleNext, isResetting]);

  useEffect(() => {
    if (isPlaying && len > 0) requestRef.current = requestAnimationFrame(animate);
    else {
      cancelAnimationFrame(requestRef.current);
      lastTimeRef.current = undefined;
    }
    return () => cancelAnimationFrame(requestRef.current);
  }, [isPlaying, animate, len]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") { setIsPlaying(false); handleNext(); }
      else if (e.key === "ArrowLeft") { setIsPlaying(false); handlePrev(); }
      else if (e.key === " ") { e.preventDefault(); setIsPlaying(p => !p); }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  useEffect(() => {
    if (len === 0) return;
    if (index >= len + clonesCount) {
      setIsResetting(true);
      const resetTimeout = setTimeout(() => {
        setIsTransitioning(false);
        setIndex(clonesCount);
        setElapsedTime(0);
        setTimeout(() => { setIsResetting(false); isMoving.current = false; }, 50);
      }, 400);
      return () => clearTimeout(resetTimeout);
    }
    if (index <= clonesCount - 1) {
      const timeout = setTimeout(() => {
        setIsTransitioning(false);
        setIndex(len + clonesCount - 1);
        isMoving.current = false;
      }, 250);
      return () => clearTimeout(timeout);
    }
    const normalTimeout = setTimeout(() => { isMoving.current = false; }, 300);
    return () => clearTimeout(normalTimeout);
  }, [index, len]);

  // --- 2. EARLY RETURN (Safe now, hooks are called) ---
  if (len === 0) return <div className="h-screen bg-black flex items-center justify-center text-white">No slides provided.</div>;

  const adjacentSlides = [...slides.slice(-clonesCount), ...slides, ...slides.slice(0, clonesCount)];
  const isLeftSide = mousePos.x < window.innerWidth / 2;
  const activeDotIndex = (index - clonesCount + len) % len;
  const progressPercent = (elapsedTime / SLIDE_DURATION) * 100;

  // Parallax Calculation: How much the title leans toward the mouse
  const tiltX = (mousePos.x - window.innerWidth / 2) / 25;
  const tiltY = (mousePos.y - window.innerHeight / 2) / 25;

  return (
    <div
      className={`relative w-screen h-[75vh] overflow-hidden bg-black font-sans select-none`}
      onMouseDown={() => setIsPressing(true)}
      onMouseUp={() => setIsPressing(false)}
    >
      {/* THE TRACK */}
      <div
        className={`flex h-full transform-gpu ${isTransitioning ? "transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]" : "transition-none"}`}
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {adjacentSlides.map((slide, i) => {
          const isActive = i === index;
          return (
            <div key={i} className="min-w-full h-full relative overflow-hidden flex-shrink-0">
              <img
                src={slide.img || `https://picsum.photos/seed/${i + 20}/1920/1080`}
                alt=""
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-[2000ms] ease-out
                  ${isActive ? "scale-105 brightness-[0.6]" : "scale-100 brightness-[0.2]"}
                `}
              />
              {slide.title && <div className="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] flex items-center justify-center">
                {/* Main White Layer */}
                <p className="relative text-white text-2xl md:text-4xl uppercase drop-shadow-[0_15px_15px_rgba(0,0,0,0.8)]">
                  {slide.title}
                </p>
              </div>}
            </div>
          );
        })}
      </div>

      {/* HITBOXES (Lower Z-index than Button) */}
      <div className={`absolute inset-0 z-10 flex ${isPlaying ? "pointer-events-none" : "pointer-events-auto"}`}>
        <div className="w-1/2 h-full" onClick={() => { handlePrev(); setIsPlaying(false); }} />
        <div className="w-1/2 h-full" onClick={() => { handleNext(); setIsPlaying(false); }} />
      </div>

      {/* Controls */}
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className={`absolute top-10 right-10 z-50 p-4 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all border border-white/20 ${isPlaying ? "opacity-100" : "opacity-50"}`}
      >
        {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
      </button>

      <div className={`absolute inset-0 flex items-center justify-between transition-opacity duration-500 ${isPlaying ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"}`}>
        <button
          onClick={() => { handlePrev(); setIsPlaying(false); }}
          className="cursor-pointer h-full p-8 bg-gradient-to-r from-black/30 to-black/0 text-white hover:bg-white hover:text-black transition-all"
        >
          <ChevronLeft size={40} />
        </button>
        <button
          onClick={() => { handleNext(); setIsPlaying(false); }}
          className="cursor-pointer h-full p-8 bg-gradient-to-r from-black/0 to-black/30 text-white hover:bg-white hover:text-black transition-all"
        >
          <ChevronRight size={40} />
        </button>
      </div>

      {/* PROGRESS BAR */}
      <div className={`absolute bottom-10 w-full flex flex-col items-center gap-6 z-30 transition-all duration-500 ${isPlaying ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
        <div className="flex gap-2 bg-black/40 p-2 rounded-full backdrop-blur-md border border-white/10">
          {slides.map((_, i) => (
            <div key={i} className="relative w-10 h-1 bg-white/20 rounded-full overflow-hidden">
              <div
                className="absolute inset-0 bg-blue-500 origin-left"
                style={{
                  transform: (isResetting || i > activeDotIndex) ? 'scaleX(0)' : (i === activeDotIndex ? `scaleX(${progressPercent / 100})` : 'scaleX(1)'),
                  opacity: isResetting ? 0 : (i > activeDotIndex ? 0 : (i < activeDotIndex ? 0.4 : 1)),
                  transition: isResetting ? 'opacity 400ms ease-in-out, transform 0s 400ms' : 'opacity 400ms ease-in-out, transform 100ms linear'
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        h2 { font-size: clamp(3rem, 12vw, 10rem); line-height: 0.8; }
      `}} />
    </div>
  );
};

export default Carousel;


// import React, { useState, useEffect, useRef, useCallback } from "react";
// import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";

// const Carousel = ({ slides = [] }) => {
//   const SLIDE_DURATION = 4000;

//   const [index, setIndex] = useState(2);
//   const [isTransitioning, setIsTransitioning] = useState(true);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [elapsedTime, setElapsedTime] = useState(0);
//   const [isResetting, setIsResetting] = useState(false);
//   const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
//   const [isPressing, setIsPressing] = useState(false);
//   const [isHoveringControls, setIsHoveringControls] = useState(false);

//   const isMoving = useRef(false);
//   const requestRef = useRef();
//   const lastTimeRef = useRef();
//   const len = slides.length;
//   const clonesCount = 2;

//   const move = useCallback((newIndex) => {
//     if (isMoving.current) return;
//     isMoving.current = true;
//     setIsTransitioning(true);
//     setIndex(newIndex);
//     setElapsedTime(0);
//   }, []);

//   const handleNext = useCallback(() => move(index + 1), [index, move]);
//   const handlePrev = useCallback(() => move(index - 1), [index, move]);

//   const animate = useCallback((time) => {
//     if (lastTimeRef.current !== undefined && !isResetting) {
//       const deltaTime = time - lastTimeRef.current;
//       setElapsedTime((prev) => {
//         const total = prev + deltaTime;
//         if (total >= SLIDE_DURATION) {
//           handleNext();
//           return 0;
//         }
//         return total;
//       });
//     }
//     lastTimeRef.current = time;
//     requestRef.current = requestAnimationFrame(animate);
//   }, [handleNext, isResetting]);

//   useEffect(() => {
//     if (isPlaying) requestRef.current = requestAnimationFrame(animate);
//     else {
//       cancelAnimationFrame(requestRef.current);
//       lastTimeRef.current = undefined;
//     }
//     return () => cancelAnimationFrame(requestRef.current);
//   }, [isPlaying, animate]);

//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (e.key === "ArrowRight") { setIsPlaying(false); handleNext(); }
//       else if (e.key === "ArrowLeft") { setIsPlaying(false); handlePrev(); }
//       else if (e.key === " ") { e.preventDefault(); setIsPlaying(p => !p); }
//     };
//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, [handleNext, handlePrev]);

//   // --- THE STEALTH RESET LOGIC ---
//   useEffect(() => {
//     if (len === 0) return;

//     if (index >= len + clonesCount) {
//       setIsResetting(true);

//       const resetTimeout = setTimeout(() => {
//         // 1. Snap index and time back while invisible
//         setIsTransitioning(false);
//         setIndex(clonesCount);
//         setElapsedTime(0);

//         // 2. Shortest possible delay to let the DOM update scaleX(0)
//         setTimeout(() => {
//           setIsResetting(false);
//           isMoving.current = false;
//         }, 50);
//       }, 400); // Wait for the opacity fade to finish

//       return () => clearTimeout(resetTimeout);
//     } else {
//       const timeout = setTimeout(() => {
//         isMoving.current = false;
//         if (index <= clonesCount - 1) {
//           setIsTransitioning(false);
//           setIndex(len + clonesCount - 1);
//         }
//       }, 250);
//       return () => clearTimeout(timeout);
//     }
//   }, [index, len]);

//   useEffect(() => {
//     const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
//     window.addEventListener("mousemove", handleMouseMove);
//     return () => window.removeEventListener("mousemove", handleMouseMove);
//   }, []);

//   if (len === 0) return <div className="h-screen bg-black" />;

//   const adjacentSlides = [...slides.slice(-clonesCount), ...slides, ...slides.slice(0, clonesCount)];
//   const isLeftSide = mousePos.x < window.innerWidth / 2;
//   const activeDotIndex = (index - clonesCount + len) % len;
//   const progressPercent = (elapsedTime / SLIDE_DURATION) * 100;

//   return (
//     <div
//       className={`relative w-screen h-screen overflow-hidden bg-black select-none transition-all duration-300 ${!isPlaying ? "cursor-none" : "cursor-default"}`}
//       onMouseDown={() => setIsPressing(true)}
//       onMouseUp={() => setIsPressing(false)}
//     >
//       {/* TRACK */}
//       <div
//         className={`flex h-full transform-gpu ${isTransitioning ? "transition-transform duration-250 ease-out" : "transition-none"}`}
//         style={{ transform: `translateX(-${index * 100}%)` }}
//       >
//         {adjacentSlides.map((slide, i) => (
//           <div key={i} className="min-w-full h-full relative overflow-hidden">
//             <img src={slide.img} className={`absolute inset-0 w-full h-full object-cover transition-all duration-[4000ms] ${i === index ? "scale-110 brightness-50" : "scale-100 brightness-[0.2]"}`} alt="" />
//             <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-4 text-center">
//               <h2 className="text-white text-5xl md:text-9xl font-black uppercase italic tracking-tighter" style={{ transform: `translateX(${(index - i) * 40}%)` }}>
//                 {slide.title}
//               </h2>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* PROGRESS BAR SECTION */}
//       <div className={`absolute bottom-10 w-full flex flex-col items-center gap-6 z-30 transition-all duration-500 ${isPlaying ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
//         <div className="flex gap-2 bg-black/40 p-2 rounded-full backdrop-blur-md border border-white/10">
//           {slides.map((_, i) => {
//             const isCompleted = i < activeDotIndex;
//             const isActive = i === activeDotIndex;
//             const isFuture = i > activeDotIndex;

//             return (
//               <div key={i} className="relative w-10 h-1 bg-white/20 rounded-full overflow-hidden">
//                 <div
//                   className="absolute inset-0 bg-blue-500 origin-left"
//                   style={{
//                     // Scale Logic: If resetting, we want to go back to 0 eventually
//                     transform: (isResetting || isFuture) ? 'scaleX(0)' : (isActive ? `scaleX(${progressPercent / 100})` : 'scaleX(1)'),

//                     // Opacity Logic: Fade to 0 during reset
//                     opacity: isResetting ? 0 : (isFuture ? 0 : (isCompleted ? 0.4 : 1)),

//                     // TRANSITION SETTINGS:
//                     // When resetting: Opacity fades (400ms), then Transform snaps (0s) after a 400ms delay.
//                     // When normal: Both react quickly.
//                     transition: isResetting
//                       ? 'opacity 400ms ease-in-out, transform 0s 400ms'
//                       : 'opacity 400ms ease-in-out, transform 100ms linear'
//                   }}
//                 />
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* PLAY/PAUSE */}
//       <div className="absolute top-10 right-10 z-[100]" onMouseEnter={() => setIsHoveringControls(true)} onMouseLeave={() => setIsHoveringControls(false)}>
//         <button onClick={(e) => { e.stopPropagation(); setIsPlaying(!isPlaying); }} className={`relative w-16 h-16 bg-white/10 backdrop-blur-md rounded-full text-white border border-white/20 hover:bg-white/30 transition-all flex items-center justify-center overflow-hidden ${isPlaying ? "opacity-100 scale-110" : "opacity-60"}`}>
//           <div key={isPlaying ? 'pause' : 'play'} className="absolute animate-swipe-x">
//             {isPlaying ? <Pause size={24} fill="white" /> : <Play size={24} fill="white" />}
//           </div>
//         </button>
//       </div>

//       {/* MAGNETIC FOLLOWER */}
//       <div
//         className={`fixed pointer-events-none z-[60] flex items-center justify-center transition-all duration-500 ${(isHoveringControls || isPlaying) ? "opacity-0 scale-50" : "opacity-100 scale-100"} ${isPressing && !isPlaying ? "scale-90 opacity-70" : ""}`}
//         style={{ left: mousePos.x, top: mousePos.y, transform: 'translate(-50%, -50%)', transition: isPressing ? 'none' : 'transform 0.15s cubic-bezier(0.17, 0.67, 0.83, 0.67), opacity 0.5s, scale 0.5s' }}
//       >
//         <div className="relative p-6 rounded-full bg-white/10 backdrop-blur-lg border border-white/30 text-white shadow-2xl overflow-hidden flex items-center justify-center w-24 h-24">
//           <div key={isLeftSide ? 'left' : 'right'} className="absolute animate-swipe-x">
//             {isLeftSide ? <ChevronLeft size={48} strokeWidth={3} /> : <ChevronRight size={48} strokeWidth={3} />}
//           </div>
//         </div>
//       </div>

//       {/* HITBOXES */}
//       <div className={`absolute inset-0 z-50 flex ${isPlaying ? "pointer-events-none" : "pointer-events-auto"}`}>
//         <div className="w-1/2 h-full" onClick={() => { if (!isHoveringControls) handlePrev(); }} />
//         <div className="w-1/2 h-full" onClick={() => { if (!isHoveringControls) handleNext(); }} />
//       </div>

//       <style dangerouslySetInnerHTML={{
//         __html: `
//         @keyframes swipe-x-in { 0% { transform: translateX(100%); opacity: 0; } 100% { transform: translateX(0); opacity: 1; } }
//         .animate-swipe-x { animation: swipe-x-in 0.4s cubic-bezier(0.23, 1, 0.32, 1) forwards; }
//       `}} />
//     </div>
//   );
// };

// export default Carousel;