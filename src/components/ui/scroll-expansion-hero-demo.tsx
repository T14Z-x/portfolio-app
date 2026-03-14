'use client';

import { useEffect, useState } from 'react';
import ScrollExpandMedia from '@/components/ui/scroll-expansion-hero';

interface MediaAbout {
  overview: string;
  conclusion: string;
}

interface MediaContent {
  src: string;
  poster?: string;
  background: string;
  title: string;
  date: string;
  scrollToExpand: string;
  about: MediaAbout;
}

interface MediaContentCollection {
  [key: string]: MediaContent;
}

const sampleMediaContent: MediaContentCollection = {
  video: {
    src: 'https://www.w3schools.com/html/mov_bbb.mp4',
    poster:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1280&q=80',
    background:
      'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?auto=format&fit=crop&w=1920&q=80',
    title: 'Immersive Video Experience',
    date: 'Cosmic Journey',
    scrollToExpand: 'Scroll to Expand Demo',
    about: {
      overview:
        'This demonstrates ScrollExpandMedia with video. As you scroll, the video expands to create a more immersive entry into the content below.',
      conclusion:
        'The component is designed to keep storytelling and interaction in one place, while still supporting reduced-content fallbacks.',
    },
  },
  image: {
    src: 'https://images.unsplash.com/photo-1682687982501-1e58ab814714?auto=format&fit=crop&w=1280&q=80',
    background:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80',
    title: 'Dynamic Image Showcase',
    date: 'Underwater Adventure',
    scrollToExpand: 'Scroll to Expand Demo',
    about: {
      overview:
        'This demonstrates ScrollExpandMedia with an image. The same expansion interaction works for static media.',
      conclusion:
        'You can switch between image and video mode while keeping the same interactive behavior.',
    },
  },
};

const MediaContent = ({ mediaType }: { mediaType: 'video' | 'image' }) => {
  const currentMedia = sampleMediaContent[mediaType];

  return (
    <div className='mx-auto max-w-4xl'>
      <h2 className='mb-6 text-3xl font-bold text-black dark:text-white'>
        About This Component
      </h2>
      <p className='mb-8 text-lg text-black dark:text-white'>
        {currentMedia.about.overview}
      </p>

      <p className='mb-8 text-lg text-black dark:text-white'>
        {currentMedia.about.conclusion}
      </p>
    </div>
  );
};

export const VideoExpansionTextBlend = () => {
  const mediaType = 'video';
  const currentMedia = sampleMediaContent[mediaType];

  useEffect(() => {
    window.scrollTo(0, 0);

    const resetEvent = new Event('resetSection');
    window.dispatchEvent(resetEvent);
  }, []);

  return (
    <div className='min-h-screen'>
      <ScrollExpandMedia
        mediaType={mediaType}
        mediaSrc={currentMedia.src}
        posterSrc={currentMedia.poster}
        bgImageSrc={currentMedia.background}
        title={currentMedia.title}
        date={currentMedia.date}
        scrollToExpand={currentMedia.scrollToExpand}
        textBlend
      >
        <MediaContent mediaType={mediaType} />
      </ScrollExpandMedia>
    </div>
  );
};

export const ImageExpansionTextBlend = () => {
  const mediaType = 'image';
  const currentMedia = sampleMediaContent[mediaType];

  useEffect(() => {
    window.scrollTo(0, 0);

    const resetEvent = new Event('resetSection');
    window.dispatchEvent(resetEvent);
  }, []);

  return (
    <div className='min-h-screen'>
      <ScrollExpandMedia
        mediaType={mediaType}
        mediaSrc={currentMedia.src}
        bgImageSrc={currentMedia.background}
        title={currentMedia.title}
        date={currentMedia.date}
        scrollToExpand={currentMedia.scrollToExpand}
        textBlend
      >
        <MediaContent mediaType={mediaType} />
      </ScrollExpandMedia>
    </div>
  );
};

export const VideoExpansion = () => {
  const mediaType = 'video';
  const currentMedia = sampleMediaContent[mediaType];

  useEffect(() => {
    window.scrollTo(0, 0);

    const resetEvent = new Event('resetSection');
    window.dispatchEvent(resetEvent);
  }, []);

  return (
    <div className='min-h-screen'>
      <ScrollExpandMedia
        mediaType={mediaType}
        mediaSrc={currentMedia.src}
        posterSrc={currentMedia.poster}
        bgImageSrc={currentMedia.background}
        title={currentMedia.title}
        date={currentMedia.date}
        scrollToExpand={currentMedia.scrollToExpand}
      >
        <MediaContent mediaType={mediaType} />
      </ScrollExpandMedia>
    </div>
  );
};

export const ImageExpansion = () => {
  const mediaType = 'image';
  const currentMedia = sampleMediaContent[mediaType];

  useEffect(() => {
    window.scrollTo(0, 0);

    const resetEvent = new Event('resetSection');
    window.dispatchEvent(resetEvent);
  }, []);

  return (
    <div className='min-h-screen'>
      <ScrollExpandMedia
        mediaType={mediaType}
        mediaSrc={currentMedia.src}
        bgImageSrc={currentMedia.background}
        title={currentMedia.title}
        date={currentMedia.date}
        scrollToExpand={currentMedia.scrollToExpand}
      >
        <MediaContent mediaType={mediaType} />
      </ScrollExpandMedia>
    </div>
  );
};

const Demo = () => {
  const [mediaType, setMediaType] = useState<'video' | 'image'>('video');
  const currentMedia = sampleMediaContent[mediaType];

  useEffect(() => {
    window.scrollTo(0, 0);

    const resetEvent = new Event('resetSection');
    window.dispatchEvent(resetEvent);
  }, [mediaType]);

  return (
    <div className='min-h-screen'>
      <div className='fixed right-4 top-4 z-50 flex gap-2'>
        <button
          onClick={() => setMediaType('video')}
          className={`rounded-lg px-4 py-2 ${
            mediaType === 'video'
              ? 'bg-white text-black'
              : 'border border-white/30 bg-black/50 text-white'
          }`}
        >
          Video
        </button>

        <button
          onClick={() => setMediaType('image')}
          className={`rounded-lg px-4 py-2 ${
            mediaType === 'image'
              ? 'bg-white text-black'
              : 'border border-white/30 bg-black/50 text-white'
          }`}
        >
          Image
        </button>
      </div>

      <ScrollExpandMedia
        mediaType={mediaType}
        mediaSrc={currentMedia.src}
        posterSrc={mediaType === 'video' ? currentMedia.poster : undefined}
        bgImageSrc={currentMedia.background}
        title={currentMedia.title}
        date={currentMedia.date}
        scrollToExpand={currentMedia.scrollToExpand}
      >
        <MediaContent mediaType={mediaType} />
      </ScrollExpandMedia>
    </div>
  );
};

export default Demo;
