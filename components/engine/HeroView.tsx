
import React from 'react';
import { Stack, Button, Typography, Section } from '../design-system/Primitives';
import { Logo } from '../brand/Logo';

interface HeroViewProps {
  onStart: () => void;
}

const HeroView: React.FC<HeroViewProps> = ({ onStart }) => {
  return (
    <Section className="flex-1 flex flex-col justify-center items-center p-12 animate-fade-in">
      <Stack gap={16} align="center" className="w-full">
        <Logo size="xl" />
        
        <Stack gap={4} align="center">
          <Typography.Heading className="text-center">Circlo.</Typography.Heading>
          <Typography.Subheading className="text-center">
            Meaningful introductions, <br/>verified through trust.
          </Typography.Subheading>
        </Stack>

        <Stack gap={10} className="w-full">
          <Button onClick={onStart} className="w-full">
            Find a connection
          </Button>
          <Typography.Meta className="text-center opacity-50">
            One path at a time.
          </Typography.Meta>
        </Stack>
      </Stack>
    </Section>
  );
};

export default HeroView;
