import { useEffect, useMemo, useRef, useState } from 'react';

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));

const easingMap = {
  linear: (t) => t,
  easeInOut: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
  easeOut: (t) => 1 - Math.pow(1 - t, 3),
  easeIn: (t) => t * t * t,
};

function pickEasing(easing) {
  if (typeof easing === 'function') return easing;
  return easingMap[easing] ?? easingMap.easeInOut;
}

function seededNoise(row, col) {
  const seed = Math.sin((row + 1) * 12.9898 + (col + 1) * 78.233) * 43758.5453;
  return seed - Math.floor(seed);
}

function directionWeight(row, col, rows, cols, direction) {
  const maxCol = Math.max(cols - 1, 1);
  const maxRow = Math.max(rows - 1, 1);
  const x = col / maxCol;
  const y = row / maxRow;

  switch (direction) {
    case 'right-to-left':
      return 1 - x;
    case 'top-to-bottom':
      return y;
    case 'bottom-to-top':
      return 1 - y;
    case 'diagonal-tl-br':
      return (x + y) / 2;
    case 'diagonal-br-tl':
      return 1 - (x + y) / 2;
    case 'center-out': {
      const dx = x - 0.5;
      const dy = y - 0.5;
      return Math.sqrt(dx * dx + dy * dy) / Math.sqrt(0.5);
    }
    case 'center-in': {
      const dx = x - 0.5;
      const dy = y - 0.5;
      return 1 - Math.sqrt(dx * dx + dy * dy) / Math.sqrt(0.5);
    }
    case 'left-to-right':
    default:
      return x;
  }
}

function getGrid(viewport, gridSize, pixelSize) {
  if (gridSize?.rows && gridSize?.cols) {
    return {
      rows: Math.max(1, gridSize.rows),
      cols: Math.max(1, gridSize.cols),
    };
  }

  const safePixel = Math.max(8, pixelSize || 52);
  return {
    rows: Math.max(1, Math.ceil(viewport.height / safePixel)),
    cols: Math.max(1, Math.ceil(viewport.width / safePixel)),
  };
}

function buildTiles(rows, cols, direction, jitter, colors) {
  const palette = Array.isArray(colors) && colors.length > 0 ? colors : ['oklch(0.99 0.00 0)'];
  const steps = Math.max(palette.length - 1, 1);
  const all = [];

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const base = directionWeight(row, col, rows, cols, direction);
      const noise = (seededNoise(row, col) - 0.5) * jitter;
      const delay = clamp(base + noise);
      const colorIndex = Math.min(steps, Math.floor(delay * steps));

      all.push({
        key: `${row}-${col}`,
        row,
        col,
        delay,
        color: palette[colorIndex],
      });
    }
  }

  return all;
}

function tileOpacity(progress, delay, mode, softness) {
  const local = clamp((progress - delay) / softness);
  return mode === 'reveal' ? 1 - local : local;
}

function PixelCurtains({
  active = false,
  mode = 'cover',
  duration = 900,
  gridSize,
  pixelSize = 52,
  direction = 'left-to-right',
  easing = 'easeInOut',
  colors = ['oklch(0.99 0.00 0)', 'oklch(0.99 0.00 0)', 'oklch(0.99 0.00 0)'],
  softness = 0.2,
  jitter = 0.14,
  zIndex = 60,
  className = '',
  debug = false,
  debugBorder = false,
  debugOpaque = false,
  debugSampleCount = 3,
  onComplete,
}) {
  const [viewport, setViewport] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1280,
    height: typeof window !== 'undefined' ? window.innerHeight : 720,
  });
  const [progress, setProgress] = useState(mode === 'reveal' ? 0 : 0);
  const [visible, setVisible] = useState(active);
  const frameCounter = useRef(0);
  const debugBucket = useRef(-1);

  useEffect(() => {
    const updateSize = () =>
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const { rows, cols } = useMemo(
    () => getGrid(viewport, gridSize, pixelSize),
    [gridSize, pixelSize, viewport]
  );

  const tiles = useMemo(
    () => buildTiles(rows, cols, direction, jitter, colors),
    [rows, cols, direction, jitter, colors]
  );

  useEffect(() => {
    if (debug) {
      console.log('[PixelCurtains] props', {
        active,
        mode,
        duration,
        rows,
        cols,
        colors,
      });
      console.log('[PixelCurtains] tile colors sample', tiles.slice(0, 3).map((tile) => tile.color));
    }

    if (!active) {
      if (debug) {
        console.log('[PixelCurtains] inactive -> hidden');
      }
      setVisible(false);
      return undefined;
    }

    setVisible(true);
    setProgress(0);
    frameCounter.current = 0;
    debugBucket.current = -1;

    const ease = pickEasing(easing);
    const total = Math.max(120, duration);
    const start = performance.now();
    let frameId = null;
    let finished = false;

    const tick = (now) => {
      const elapsed = now - start;
      const t = clamp(elapsed / total);
      const eased = clamp(ease(t));
      setProgress(eased);
      frameCounter.current += 1;

      if (debug) {
        const bucket = Math.floor(t * 10);
        if (bucket !== debugBucket.current) {
          debugBucket.current = bucket;
          console.log('[PixelCurtains] raf progress', {
            t: Number(t.toFixed(3)),
            eased: Number(eased.toFixed(3)),
            frame: frameCounter.current,
          });
        }
      }

      if (t < 1) {
        frameId = requestAnimationFrame(tick);
        return;
      }

      if (!finished) {
        finished = true;
        if (debug) {
          console.log('[PixelCurtains] onComplete fired');
        }
        onComplete?.();
      }
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [active, duration, easing, onComplete]);

  useEffect(() => {
    if (!debug || !visible || tiles.length === 0) return;

    const sampleTiles = tiles.slice(0, Math.max(1, debugSampleCount)).map((tile) => ({
      key: tile.key,
      delay: Number(tile.delay.toFixed(3)),
      opacity: Number(tileOpacity(progress, tile.delay, mode, softness).toFixed(3)),
    }));

    console.log('[PixelCurtains] samples', {
      progress: Number(progress.toFixed(3)),
      mode,
      sampleTiles,
    });
  }, [debug, debugSampleCount, mode, progress, softness, tiles, visible]);

  if (!visible) return null;

  return (
    <div
      className={`pointer-events-none fixed inset-0 ${className}`.trim()}
      style={{ zIndex }}
      aria-hidden="true"
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          width: '100%',
          height: '100%',
        }}
      >
      {tiles.map((tile) => (
        <span
          key={tile.key}
          style={{
            backgroundColor: tile.color,
            opacity: debugOpaque ? 1 : tileOpacity(progress, tile.delay, mode, softness),
            willChange: 'opacity',
            border: debugBorder ? '1px solid red' : 'none',
          }}
        />
      ))}
      </div>
    </div>
  );
}

export default PixelCurtains;
