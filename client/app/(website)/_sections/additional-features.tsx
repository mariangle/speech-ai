import * as React from 'react';

import {
  MicIcon,
  LucideIcon,
  ArrowRight,
  Plus,
  Grab,
  CircleDashed,
  Layers,
  Repeat,
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/util/tw-merge';
import { buttonVariants } from '@/components/ui/button';

interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

const features: Feature[] = [
  {
    title: 'Speech Recognition.',
    description: 'Add tasks hands-free with advanced speech recognition.',
    icon: MicIcon,
  },
  {
    title: 'Subtasks',
    description: 'Easily manage and organize subtasks.',
    icon: CircleDashed,
  },
  {
    title: 'Drag and Drop',
    description: 'Effortlessly rearrange tasks with intuitive drag-and-drop.',
    icon: Grab,
  },
  {
    title: 'Recurring Tasks',
    description: 'Set up and manage tasks that repeat at specified intervals.',
    icon: Repeat,
  },
  {
    title: 'Views and Customization',
    description:
      'Tailor task views and customize settings to your preferences.',
    icon: Layers,
  },
  {
    title: 'Plus...',
    description:
      'Explore essential features for an enhanced task management experience.',
    icon: Plus,
  },
];

export default function AdditionalFeatures() {
  return (
    <div className="max-w-screen-lg space-y-12 mx-auto px-6 flex flex-col justify-center text-center relative">
      <div className="grid gap-8 grid-cols-1 md:grid-cols-3 sm:grid-cols-2 mt-12">
        {features.map(({ title, description, icon: Icon }) => (
          <div key={title} className="text-left">
            <div className="flex-gap">
              <span className="font-semibold text-foreground flex-center">
                <Icon className="w-4 h-3 text-primary/50" />
              </span>
              <h4 className="font-semibold text-sm"> {title}</h4>
            </div>
            <p className="text-sm mt-1 text-muted-foreground">{description}</p>
          </div>
        ))}
      </div>
      <Link
        href="/docs/features"
        className={cn(
          buttonVariants({ variant: 'link' }),
          'p-0 w-full text-center',
        )}
      >
        See all features
        <ArrowRight className="ml-2 w-4 h-4" />
      </Link>
    </div>
  );
}
