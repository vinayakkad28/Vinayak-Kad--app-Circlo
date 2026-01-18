
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
        <Typography.Heading className="text-center">Vibe Verified.</Typography.Heading>

        <Card className="relative overflow-hidden">
          <Stack gap={8} align="center">
            <div className="relative">
              <img 
                src={intro.avatar} 
                className="w-32 h-32 rounded-[3rem] object-cover border-4 border-slate-900 shadow-2xl" 
                alt="" 
              />
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl">
                <i className="fas fa-bolt"></i>
              </div>
            </div>

            <Stack gap={2} align="center">
              <Typography.Subheading className="text-white text-2xl">{intro.name}</Typography.Subheading>
              <Typography.Meta className="text-indigo-400">{intro.role} • {intro.education}</Typography.Meta>
              <Typography.Meta className="text-slate-500 normal-case tracking-normal">WORK: {intro.work}</Typography.Meta>
            </Stack>

            <div className="flex flex-wrap justify-center gap-2">
              {intro.interests.map((t, i) => (
                <span key={i} className="text-[8px] font-black uppercase text-slate-500 border border-slate-800 px-2 py-1 rounded-md">
                  {t}
                </span>
              ))}
            </div>

            <Typography.Body className="text-center italic px-4">
              "{intro.bio}"
            </Typography.Body>
          </Stack>
        </Card>

        {loading ? (
          <Stack gap={6} className="animate-pulse px-4">
            <div className="h-4 bg-slate-800 rounded-full w-full"></div>
            <div className="h-24 bg-slate-800 rounded-3xl w-full"></div>
            <div className="h-24 bg-slate-800 rounded-3xl w-full"></div>
          </Stack>
        ) : (
          <Stack gap={10} className="px-4">
            {/* Search Grounded Insights */}
            {insight && insight.sources.length > 0 && (
              <Stack gap={4}>
                <div className="flex items-center justify-between">
                  <Typography.Meta>Live Social Context</Typography.Meta>
                  <span className="text-[8px] text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded">Search Grounded</span>
                </div>
                <Card variant="glass" className="p-6">
                  <Typography.Body className="text-slate-300 text-xs mb-4">{insight.text}</Typography.Body>
                  <div className="flex flex-wrap gap-3">
                    {insight.sources.map((s, i) => (
                      <a key={i} href={s.uri} target="_blank" rel="noreferrer" className="text-[9px] text-indigo-400 hover:underline flex items-center gap-1">
                        <i className="fas fa-link"></i> {s.title}
                      </a>
                    ))}
                  </div>
                </Card>
              </Stack>
            )}

            {/* Maps Grounded Insights */}
            {mapInsight && mapInsight.places.length > 0 && (
              <Stack gap={4}>
                <div className="flex items-center justify-between">
                  <Typography.Meta>Meeting Spots Nearby</Typography.Meta>
                  <span className="text-[8px] text-blue-500 bg-blue-500/10 px-2 py-1 rounded">Maps Grounded</span>
                </div>
                <Card variant="glass" className="p-6">
                  <Typography.Body className="text-slate-300 text-xs mb-4">{mapInsight.text}</Typography.Body>
                  <div className="grid grid-cols-1 gap-3">
                    {mapInsight.places.map((p, i) => (
                      <a key={i} href={p.uri} target="_blank" rel="noreferrer" className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[10px] text-slate-300 flex items-center justify-between hover:bg-slate-900 transition-all">
                        <span>{p.title}</span>
                        <i className="fas fa-map-pin text-rose-500"></i>
                      </a>
                    ))}
                  </div>
                </Card>
              </Stack>
            )}

            <Stack gap={4}>
              <Typography.Subheading className="text-slate-200">
                {intel?.reasoning}
              </Typography.Subheading>
              <div className="flex items-center gap-2 text-emerald-400">
                <i className="fas fa-check-circle"></i>
                <Typography.Meta className="text-emerald-400">{intel?.confidence_statement}</Typography.Meta>
              </div>
            </Stack>

            <Stack gap={6}>
              <Card variant="glass" className="p-6">
                <Typography.Meta className="mb-4 block">Bridge Script for {intro.bridgeName}</Typography.Meta>
                <Typography.Body className="italic text-slate-300">"{intel?.magic_script}"</Typography.Body>
              </Card>

              <Button onClick={() => onAction(intro, intel?.magic_script!)} variant="primary">
                Trigger Introduction
              </Button>
            </Stack>
          </Stack>
        )}

        <Button onClick={onReset} variant="subtle" className="mx-auto">
          Explore the Graph
        </Button>
      </Stack>
    </Section>
  );
};

export default IntroductionView;
