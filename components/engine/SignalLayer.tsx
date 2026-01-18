
import React, { useState } from 'react';
import { Stack, Typography, Section, Button } from '../design-system/Primitives';
import { IntentType } from '../../types';

interface SignalLayerProps {
  intent: IntentType;
  onSubmit: (context: string) => void;
}

const SignalLayer: React.FC<SignalLayerProps> = ({ intent, onSubmit }) => {
  const [context, setContext] = useState('');
  const [outcome, setOutcome] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleProcess = () => {
    setIsProcessing(true);
    // Combine context and outcome for the engine
    const fullSignal = `${context} | Desired Outcome: ${outcome}`;
    setTimeout(() => {
      onSubmit(fullSignal);
      setIsProcessing(false);
    }, 1500);
  };

  const isComplete = context.length > 1 && outcome.length > 2;

  const getLabel = () => {
    if (intent === 'ROMANTIC_SOUL') return 'What defines your type?';
    if (intent === 'CASUAL_SPARK') return 'What is the vibe?';
    return 'What is the topic?';
  };

  return (
    <Section className="flex-1 flex flex-col p-10 justify-center animate-fade-in">
      <Stack gap={16}>
        <Stack gap={4}>
          <Typography.Heading>Signal clarity.</Typography.Heading>
          <Typography.Subheading>The AI uses this to verify the bridge.</Typography.Subheading>
        </Stack>

        <Stack gap={10} className="flex-1">
          <Stack gap={4}>
            <Typography.Meta>{getLabel()}</Typography.Meta>
            <input 
              autoFocus
              type="text"
              placeholder="..."
              value={context}
              onChange={(e) => setContext(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-3xl p-6 text-xl font-bold text-white focus:border-indigo-500 outline-none transition-all placeholder:text-slate-800 shadow-inner"
            />
          </Stack>

          <Stack gap={4}>
            <Typography.Meta>The Real Goal (Unfiltered)</Typography.Meta>
            <textarea 
              placeholder="Be direct. What do you actually want?"
              value={outcome}
              onChange={(e) => setOutcome(e.target.value)}
              rows={3}
              className="w-full bg-slate-950 border border-slate-800 rounded-3xl p-6 text-lg font-bold text-white focus:border-indigo-500 outline-none transition-all placeholder:text-slate-800 shadow-inner resize-none"
            />
          </Stack>
        </Stack>

        <Stack gap={6}>
          <Button 
            onClick={handleProcess}
            disabled={!isComplete || isProcessing}
            variant="secondary"
            className="w-full py-8"
          >
            {isProcessing ? 'Syncing Trust Bridges...' : 'Identify the Path'}
          </Button>
          <Typography.Meta className="text-center opacity-30 px-8 leading-relaxed">
            Privacy Vault Active. This text is processed locally and discarded.
          </Typography.Meta>
        </Stack>
      </Stack>
    </Section>
  );
};

export default SignalLayer;
