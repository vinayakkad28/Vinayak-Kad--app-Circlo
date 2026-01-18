
import React, { useState, useEffect } from 'react';
import { MatchProfile, IntroIntelligence, SocialInsight, MapInsight } from '../../types';
import { getIntroIntelligence, getSocialContext, getMapsContext } from '../../services/geminiService';
import { MOCK_USER } from '../../constants';
import { Stack, Typography, Section, Button, Card } from '../design-system/Primitives';

interface IntroductionViewProps {
  intro: MatchProfile;
  onAction: (intro: MatchProfile, script: string) => void;
  onReset: () => void;
}

const IntroductionView: React.FC<IntroductionViewProps> = ({ intro, onAction, onReset }) => {
  const [loading, setLoading] = useState(true);
  const [intel, setIntel] = useState<IntroIntelligence | null>(null);
  const [insight, setInsight] = useState<SocialInsight | null>(null);
  const [mapInsight, setMapInsight] = useState<MapInsight | null>(null);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      const [intelData, insightData, mapData] = await Promise.all([
        getIntroIntelligence(MOCK_USER, intro),
        getSocialContext(intro),
        getMapsContext(intro)
      ]);
      setIntel(intelData);
      setInsight(insightData);
      setMapInsight(mapData);
      setLoading(false);
    };
    fetchAll();
  }, [intro]);

  return (
    <Section className="flex-1 flex flex-col p-8 animate-fade-in overflow-y-auto no-scrollbar pb-40">
      <Stack gap={12}>
        <header className="flex flex-col items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
          <Typography.Meta className="text-emerald-500">Node Synchronized</Typography.Meta>
          <Typography.Heading className="text-center">The Warm Path.</Typography.Heading>
        </header>

        <Card variant="dark-glass" className="relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <i className="fas fa-fingerprint text-8xl text-indigo-500"></i>
          </div>
          
          <Stack gap={10} align="center">
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-500/20 blur-3xl rounded-full scale-150 animate-pulse"></div>
              <img 
                src={intro.avatar} 
                className="w-40 h-40 rounded-[4rem] object-cover border-4 border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.5)] relative z-10" 
                alt="" 
              />
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-indigo-600 rounded-full text-[8px] font-black uppercase tracking-widest text-white shadow-xl z-20 whitespace-nowrap">
                {intro.compatibilityScore}% Synergy
              </div>
            </div>

            <Stack gap={4} align="center" className="relative z-10">
              <div className="text-center">
                <Typography.Subheading className="text-white text-3xl font-black tracking-tight">{intro.name}</Typography.Subheading>
                <Typography.Meta className="text-indigo-400 opacity-80">{intro.role} • {intro.location}</Typography.Meta>
              </div>
              
              <div className="flex flex-wrap justify-center gap-2 max-w-xs">
                {intro.interests.map((t, i) => (
                  <span key={i} className="text-[8px] font-black uppercase text-slate-400 bg-white/5 border border-white/5 px-3 py-1.5 rounded-xl">
                    {t}
                  </span>
                ))}
              </div>

              <Typography.Body className="text-center italic text-slate-300 leading-relaxed max-w-xs">
                "{intro.bio}"
              </Typography.Body>
            </Stack>
          </Stack>
        </Card>

        {loading ? (
          <Stack gap={6} className="animate-pulse px-4">
            <div className="h-4 bg-white/5 rounded-full w-24"></div>
            <div className="h-32 bg-white/5 rounded-3xl w-full"></div>
            <div className="h-32 bg-white/5 rounded-3xl w-full"></div>
          </Stack>
        ) : (
          <Stack gap={10}>
            {/* Intel Section */}
            <Stack gap={6}>
              <div className="flex items-center gap-3">
                <div className="w-px h-8 bg-indigo-500/30"></div>
                <Typography.Meta>Identity Intelligence</Typography.Meta>
              </div>
              
              <Card variant="glass" className="relative group">
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                  <i className="fas fa-brain text-5xl"></i>
                </div>
                <Stack gap={4}>
                  <Typography.Body className="text-white text-md font-bold leading-tight">
                    {intel?.reasoning}
                  </Typography.Body>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-emerald-500"></div>
                    <Typography.Meta className="text-emerald-500/80">{intel?.confidence_statement}</Typography.Meta>
                  </div>
                </Stack>
              </Card>
            </Stack>

            {/* Context Section */}
            <div className="grid grid-cols-1 gap-6">
              {insight && insight.sources.length > 0 && (
                <Stack gap={4}>
                  <Typography.Meta>Live Pulse Grounding</Typography.Meta>
                  <Card variant="dark-glass" className="p-6">
                    <Typography.Body className="text-slate-300 text-xs mb-4 leading-relaxed">{insight.text}</Typography.Body>
                    <div className="flex flex-wrap gap-3">
                      {insight.sources.map((s, i) => (
                        <a key={i} href={s.uri} target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-[8px] font-black uppercase tracking-widest text-indigo-400 hover:bg-white/10 transition-all flex items-center gap-2">
                          <i className="fas fa-link"></i> {s.title}
                        </a>
                      ))}
                    </div>
                  </Card>
                </Stack>
              )}

              {mapInsight && mapInsight.places.length > 0 && (
                <Stack gap={4}>
                  <Typography.Meta>Spatial Grounding</Typography.Meta>
                  <Card variant="dark-glass" className="p-6">
                    <Typography.Body className="text-slate-300 text-xs mb-4 leading-relaxed">{mapInsight.text}</Typography.Body>
                    <div className="space-y-2">
                      {mapInsight.places.map((p, i) => (
                        <a key={i} href={p.uri} target="_blank" rel="noreferrer" className="group p-4 rounded-xl bg-black/40 border border-white/5 text-[10px] font-bold text-slate-300 flex items-center justify-between hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all">
                          <div className="flex items-center gap-3">
                            <i className="fas fa-location-arrow text-indigo-500 opacity-50 group-hover:opacity-100"></i>
                            <span>{p.title}</span>
                          </div>
                          <i className="fas fa-external-link-alt text-[8px] opacity-20"></i>
                        </a>
                      ))}
                    </div>
                  </Card>
                </Stack>
              )}
            </div>

            {/* Final Action */}
            <Stack gap={6}>
              <Card variant="accent" className="p-8 shadow-[0_40px_80px_rgba(99,102,241,0.3)]">
                <Stack gap={6}>
                  <Stack gap={2}>
                    <Typography.Meta className="text-white/60">The Magic Script</Typography.Meta>
                    <Typography.Body className="text-white text-lg font-bold italic leading-relaxed">
                      "{intel?.magic_script}"
                    </Typography.Body>
                  </Stack>
                  <Button 
                    onClick={() => onAction(intro, intel?.magic_script!)} 
                    variant="primary" 
                    className="w-full bg-white text-indigo-600 hover:bg-slate-50 border-none"
                  >
                    Request Intro via {intro.bridgeName}
                  </Button>
                </Stack>
              </Card>
            </Stack>
          </Stack>
        )}

        <button 
          onClick={onReset} 
          className="mx-auto mt-12 text-[10px] font-black uppercase tracking-[0.4em] text-slate-600 hover:text-white transition-all flex items-center gap-4 group"
        >
          <div className="w-8 h-px bg-slate-800 group-hover:bg-indigo-500 transition-all"></div>
          Explore the Graph
          <div className="w-8 h-px bg-slate-800 group-hover:bg-indigo-500 transition-all"></div>
        </button>
      </Stack>
    </Section>
  );
};

export default IntroductionView;
