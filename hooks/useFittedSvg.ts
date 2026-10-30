import { useEffect, useLayoutEffect, useRef, useState } from 'react';

const useBrowserLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

// Measure the selected browser font in SVG user units. The same fitted source is
// used by the preview and every export, including text placed on a curved path.
export function useFittedSvg(source: string, availableWidth: number) {
  const previewRef = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState({ source: '', svg: '', size: 0 });
  const baseSize = Number(source.match(/font-size="([^"]+)"/)?.[1]);
  const svg = fit.source === source ? fit.svg : source;

  useBrowserLayoutEffect(() => {
    const host = previewRef.current;
    if (typeof host?.querySelector !== 'function') return;
    let active = true;
    const measure = () => {
      if (!active) return;
      const root = host.querySelector('svg');
      const text = root?.querySelector('text');
      if (!root || !text || !Number.isFinite(baseSize) || baseSize <= 0) return;
      const probe = text.cloneNode(false) as SVGTextElement;
      probe.textContent = text.textContent;
      probe.setAttribute('x', '0');
      probe.setAttribute('y', '0');
      probe.setAttribute('text-anchor', 'start');
      probe.setAttribute('visibility', 'hidden');
      let size = baseSize;
      const path = root.querySelector<SVGPathElement>('defs path');
      const pathLength = typeof path?.getTotalLength === 'function' ? path.getTotalLength() : 0;
      const limit = Number.isFinite(pathLength) && pathLength > 60 ? pathLength - 60 : availableWidth;
      root.appendChild(probe);
      try {
        for (let pass = 0; pass < 4; pass++) {
          probe.setAttribute('font-size', String(size));
          const width = Math.max(probe.getComputedTextLength(), probe.getBBox().width);
          if (!Number.isFinite(width) || width <= limit || width <= 0) break;
          size = Math.max(1, size * limit / width * 0.98);
        }
        const next = source.replace(/font-size="[^"]+"/, `font-size="${size}"`);
        setFit(previous => previous.source === source && previous.svg === next ? previous : { source, svg: next, size });
      } finally {
        probe.remove();
      }
    };
    measure();
    void document.fonts?.ready.then(measure);
    document.fonts?.addEventListener('loadingdone', measure);
    return () => {
      active = false;
      document.fonts?.removeEventListener('loadingdone', measure);
    };
  }, [source, availableWidth, baseSize]);

  return { previewRef, svg, fittedSize: fit.source === source ? fit.size : baseSize, measured: fit.source === source };
}
