import React, { useState, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';

export default function DesignAlchemyLab() {
  const [titleVisible, setTitleVisible] = useState(true);
  const [currentFlask, setCurrentFlask] = useState(0);
  const [flasks, setFlasks] = useState([
    { filled: false, color: '', text: '', ingredients: [] },
    { filled: false, color: '', text: '', ingredients: [] },
    { filled: false, color: '', text: '', ingredients: [] }
  ]);
  const [selectedTubes, setSelectedTubes] = useState([]);
  const [pouring, setPouring] = useState(false);

  const FLASK_IMAGE_URL = '/images/chemical-flasks.jpg';

  const testTubes = [
    { id: 'learnedness', name: 'Spirit of Eternal Learnedness', colors: ['#FFD700', '#FFA500', '#FF69B4', '#9370DB'], baseGlow: '#FFD700' },
    { id: 'analytica', name: 'Elixir Analytica', colors: ['#00CED1', '#4169E1', '#9370DB', '#FF1493'], baseGlow: '#00CED1' },
    { id: 'manyfaces', name: 'Substance of Many Faces', colors: ['#32CD32', '#FFD700', '#FF69B4', '#00CED1'], baseGlow: '#32CD32' },
    { id: 'curiosa', name: 'Elixir Curiosa', colors: ['#FF69B4', '#FFD700', '#9370DB', '#00CED1'], baseGlow: '#FF69B4' },
    { id: 'collaboration', name: 'Concoction of Collaboration', colors: ['#9370DB', '#4169E1', '#00CED1', '#32CD32'], baseGlow: '#9370DB' }
  ];

  const mixSequence = [
    { tubes: ['learnedness', 'collaboration'], flask: 0 },
    { tubes: ['analytica', 'curiosa'], flask: 1 },
    { tubes: ['manyfaces', 'analytica'], flask: 2 }
  ];

  const mixResults = {
    'learnedness-collaboration': {
      color: 'linear-gradient(135deg, #FFD700, #9370DB)',
      text: 'Learning that 10% of BUCK\'s leadership started as interns ignited my passion. I\'m ready to grow from emerging talent to creative leader in an environment that values fresh voices and collaborative excellence.'
    },
    'collaboration-learnedness': {
      color: 'linear-gradient(135deg, #FFD700, #9370DB)',
      text: 'Learning that 10% of BUCK\'s leadership started as interns ignited my passion. I\'m ready to grow from emerging talent to creative leader in an environment that values fresh voices and collaborative excellence.'
    },
    'analytica-curiosa': {
      color: 'linear-gradient(135deg, #00CED1, #FF69B4)',
      text: 'My analytical mindset meets experimental curiosity. I approach design with both strategic thinking and playful exploration—balancing data-driven decisions with bold creative risks, just like BUCK\'s multifaceted approach.'
    },
    'curiosa-analytica': {
      color: 'linear-gradient(135deg, #00CED1, #FF69B4)',
      text: 'My analytical mindset meets experimental curiosity. I approach design with both strategic thinking and playful exploration—balancing data-driven decisions with bold creative risks, just like BUCK\'s multifaceted approach.'
    },
    'manyfaces-analytica': {
      color: 'linear-gradient(135deg, #32CD32, #00CED1)',
      text: 'My cross-disciplinary versatility—from motion graphics to 3D modeling to UX design—is strengthened by analytical rigor. I adapt my craft to any challenge while maintaining strategic clarity, matching BUCK\'s style-agnostic philosophy.'
    },
    'analytica-manyfaces': {
      color: 'linear-gradient(135deg, #32CD32, #00CED1)',
      text: 'My cross-disciplinary versatility—from motion graphics to 3D modeling to UX design—is strengthened by analytical rigor. I adapt my craft to any challenge while maintaining strategic clarity, matching BUCK\'s style-agnostic philosophy.'
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleVisible(prev => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getActiveGlowingTubes = () => {
    if (currentFlask < mixSequence.length) {
      return mixSequence[currentFlask].tubes;
    }
    return [];
  };

  const isGlowing = (tubeId) => getActiveGlowingTubes().includes(tubeId);
  const isDisabled = (tubeId) => !isGlowing(tubeId);

  const handleTubeClick = (tubeId) => {
    if (isDisabled(tubeId) || pouring) return;
    const newSelected = [...selectedTubes, tubeId];
    setSelectedTubes(newSelected);

    if (newSelected.length === 2) {
      setPouring(true);
      setTimeout(() => {
        const mixKey = `${newSelected[0]}-${newSelected[1]}`;
        const result = mixResults[mixKey];
        const newFlasks = [...flasks];
        newFlasks[currentFlask] = {
          filled: true,
          color: result.color,
          text: result.text,
          ingredients: newSelected
        };
        setFlasks(newFlasks);
        setSelectedTubes([]);
        setCurrentFlask(currentFlask + 1);
        setPouring(false);
      }, 1500);
    }
  };

  const getCurrentInstructions = () => {
    if (currentFlask === 0) return "Click the two glowing test tubes to pour them into the first flask!";
    if (currentFlask === 1) return "Now mix the next two glowing elements into the second flask!";
    if (currentFlask === 2) return "Final mix! Pour the glowing elements into the last flask!";
    return "All potions created! See what happens when you combine different aspects of design.";
  };

  const ConicalFlask = ({ flask, index, isActive, pouring }) => (
    <div className="relative w-full h-full">
      <img src={FLASK_IMAGE_URL} alt="Conical Flask" className="absolute inset-0 w-full h-full object-contain" crossOrigin="anonymous" />
      {isActive && !flask.filled && !pouring && <div className="absolute inset-0 border-4 border-amber-400 rounded-lg animate-pulse"></div>}
      {flask.filled && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-2/3 animate-in fade-in slide-in-from-bottom duration-1000"
          style={{ background: flask.color, clipPath: 'polygon(30% 20%, 70% 20%, 100% 100%, 0% 100%)', opacity: 0.7 }}>
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/30 to-transparent animate-pulse"></div>
        </div>
      )}
      {pouring && isActive && <div className="absolute inset-0 flex items-center justify-center"><div className="text-4xl animate-bounce">✨</div></div>}
    </div>
  );

  const BeakerFlask = ({ flask, index, isActive, pouring }) => (
    <div className="relative w-full h-full">
      <img src={FLASK_IMAGE_URL} alt="Beaker" className="absolute inset-0 w-full h-full object-contain" crossOrigin="anonymous" />
      {isActive && !flask.filled && !pouring && <div className="absolute inset-0 border-4 border-amber-400 rounded-lg animate-pulse"></div>}
      {flask.filled && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-4/5 h-3/4 animate-in fade-in slide-in-from-bottom duration-1000"
          style={{ background: flask.color, clipPath: 'polygon(8% 0%, 92% 0%, 95% 100%, 5% 100%)', opacity: 0.7 }}>
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/30 to-transparent animate-pulse"></div>
        </div>
      )}
      {pouring && isActive && <div className="absolute inset-0 flex items-center justify-center"><div className="text-4xl animate-bounce">✨</div></div>}
    </div>
  );

  const RoundFlask = ({ flask, index, isActive, pouring }) => (
    <div className="relative w-full h-full">
      <img src={FLASK_IMAGE_URL} alt="Round Bottom Flask" className="absolute inset-0 w-full h-full object-contain" crossOrigin="anonymous" />
      {flask.filled && (
        <svg viewBox="0 0 200 300" className="absolute inset-0 w-full h-full animate-in fade-in slide-in-from-bottom duration-1000" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id={`liquidGrad3${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={flask.color.includes('gradient') ? '#32CD32' : flask.color} stopOpacity="0.7" />
              <stop offset="100%" stopColor={flask.color.includes('gradient') ? '#00CED1' : flask.color} stopOpacity="0.9" />
            </linearGradient>
          </defs>
          <circle cx="100" cy="200" r="75" fill={`url(#liquidGrad3${index})`} opacity="0.8" />
        </svg>
      )}
      {pouring && isActive && <div className="absolute inset-0 flex items-center justify-center"><div className="text-4xl animate-bounce">✨</div></div>}
    </div>
  );

  return (
    <div className="min-h-screen p-8 overflow-hidden relative">
      <div className="absolute inset-0 opacity-90" style={{
        backgroundImage: `linear-gradient(to right, #a5b4fc 1px, transparent 1px), linear-gradient(to bottom, #a5b4fc 1px, transparent 1px)`,
        backgroundSize: '20px 20px',
        backgroundColor: '#f8fafc'
      }} />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className={`text-7xl font-black text-gray-900 tracking-tight transition-opacity duration-1000 ${titleVisible ? 'opacity-100' : 'opacity-30'}`}>
            Welcome to Design Alchemy!
          </h1>
        </div>

        <div className="mb-12">
          <div className="flex items-center justify-center mb-6">
            <ArrowDown className="w-8 h-8 text-gray-700 animate-bounce" />
            <span className="ml-2 text-2xl font-bold text-gray-800">Potions</span>
            <ArrowDown className="w-8 h-8 text-gray-700 animate-bounce ml-2" />
          </div>

          <div className="flex justify-center gap-12">
            {flasks.map((flask, index) => {
              const flaskType = index === 0 ? 'conical' : index === 1 ? 'beaker' : 'round';
              const isActive = index === currentFlask;
              return (
                <div key={index} className="relative">
                  <div className={`relative transition-all duration-500 ${isActive && !pouring ? 'scale-110' : 'scale-100'} ${flaskType === 'conical' ? 'w-48 h-72' : flaskType === 'beaker' ? 'w-40 h-64' : 'w-48 h-72'}`}>
                    {flaskType === 'conical' && <ConicalFlask flask={flask} index={index} isActive={isActive} pouring={pouring} />}
                    {flaskType === 'beaker' && <BeakerFlask flask={flask} index={index} isActive={isActive} pouring={pouring} />}
                    {flaskType === 'round' && <RoundFlask flask={flask} index={index} isActive={isActive} pouring={pouring} />}
                  </div>

                  {flask.filled && flask.text && (
                    <div className="absolute -bottom-48 left-1/2 -translate-x-1/2 w-80 p-4 bg-white rounded-2xl shadow-xl border-2 border-gray-300 animate-in fade-in slide-in-from-top duration-700 delay-500">
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-white border-l-2 border-t-2 border-gray-300 rotate-45"></div>
                      <p className="text-sm text-gray-800 leading-relaxed">{flask.text}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-80 pt-12">
          <div className="flex items-center justify-center mb-6">
            <ArrowDown className="w-8 h-8 text-gray-700 animate-bounce" />
            <span className="ml-2 text-2xl font-bold text-gray-800">Core Elements</span>
            <ArrowDown className="w-8 h-8 text-gray-700 animate-bounce ml-2" />
          </div>

          <div className="flex justify-center gap-8">
            {testTubes.map((tube) => {
              const glowing = isGlowing(tube.id);
              const disabled = isDisabled(tube.id);
              const selected = selectedTubes.includes(tube.id);

              return (
                <div key={tube.id} className="flex flex-col items-center">
                  <button
                    onClick={() => handleTubeClick(tube.id)}
                    disabled={disabled || pouring}
                    className={`relative w-20 h-48 transition-all duration-500 ${glowing ? 'scale-110 cursor-pointer' : 'scale-100'} ${disabled ? 'opacity-40 cursor-not-allowed' : ''} ${selected ? 'scale-95' : ''}`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-white/30 rounded-b-3xl rounded-t-lg border-3 border-gray-300 backdrop-blur-sm shadow-xl overflow-hidden">
                      <div className="absolute top-2 left-2 w-6 h-20 bg-gradient-to-br from-white/80 to-transparent rounded-full blur-sm"></div>

                      <div className={`absolute bottom-0 w-full rounded-b-3xl overflow-hidden transition-all duration-500 ${selected ? 'h-12' : 'h-36'}`}>
                        <div className="absolute inset-0 animate-pulse" style={{
                          background: `linear-gradient(135deg, ${tube.colors.join(', ')})`,
                          animation: 'swirl 4s ease-in-out infinite'
                        }}>
                          <div className="absolute inset-0 opacity-60" style={{
                            background: `radial-gradient(circle at 30% 50%, ${tube.colors[0]} 0%, transparent 50%), radial-gradient(circle at 70% 50%, ${tube.colors[1]} 0%, transparent 50%)`,
                            animation: 'rotate 6s linear infinite'
                          }}></div>
                        </div>

                        <div className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent animate-pulse"></div>
                      </div>
                    </div>

                    {glowing && !disabled && (
                      <div className="absolute inset-0 rounded-b-3xl rounded-t-lg animate-pulse pointer-events-none" style={{
                        boxShadow: `0 0 30px ${tube.baseGlow}, 0 0 60px ${tube.baseGlow}`,
                        animation: 'glow 1.5s ease-in-out infinite'
                      }}></div>
                    )}

                    {selected && (
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">✓</div>
                    )}
                  </button>

                  <div className="mt-4 text-center max-w-[120px]">
                    <p className={`text-xs font-bold text-gray-800 transition-all duration-300 ${glowing ? 'scale-110 text-amber-600' : ''}`}>{tube.name}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-2xl font-bold text-gray-800 bg-white/80 backdrop-blur-sm px-8 py-4 rounded-full inline-block shadow-lg">{getCurrentInstructions()}</p>
          {selectedTubes.length === 1 && <p className="text-lg text-gray-600 mt-4">Select one more glowing element to complete the mix!</p>}
        </div>
      </div>

      <style>{`
        @keyframes swirl {
          0%, 100% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.1); }
        }
        @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes glow { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
      `}</style>
    </div>
  );
}
