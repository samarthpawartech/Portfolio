import { useReducedMotion } from "motion/react";

/**
 * Orbits `items` around a shared center on ONE perfectly synchronized
 * circular path: a single shared CSS keyframe (`orbit-shared`, defined in
 * theme.css) applied identically to every item — same transform-origin,
 * same radius, same duration, same (linear) easing. The only thing that
 * differs between items is `animation-delay`, a negative offset into the
 * same cycle, which is mathematically equivalent to giving each item a
 * different starting angle while keeping everything else identical.
 */
export function OrbitRing({
  items,
  radius,
  duration = 24,
  reverse = false,
  renderItem,
  startAngle = -90,
}) {
  const shouldReduceMotion = useReducedMotion();
  const dir = reverse ? -1 : 1;
  const n = items.length;

  return (
    <div className="absolute inset-0">
      {items.map((item, i) => {
        // Angle this item should sit at, evenly spaced from startAngle.
        const targetAngle = startAngle + (360 / n) * i;

        // Fraction of one cycle (0–1) the shared keyframe needs to have
        // already run for its live angle to equal targetAngle right now.
        // Normalized into [0, 1) so the resulting delay is ALWAYS <= 0.
        // (A *positive* animation-delay makes CSS hold the element frozen
        // at the keyframe's "from" state — angle 0 — until the delay
        // elapses, which is what was stacking icons on top of each other
        // at the 0° position instead of spreading them out.)
        const rawFraction = (dir * targetAngle) / 360;
        const cycleFraction = ((rawFraction % 1) + 1) % 1;
        const delay = -(cycleFraction * duration);

        return (
          <div
            key={item.key ?? i}
            className="absolute left-1/2 top-1/2 h-0 w-0"
            style={
              shouldReduceMotion
                ? { transform: `rotate(${targetAngle}deg) translateX(${radius}px)`, transformOrigin: "center" }
                : {
                    "--orbit-radius": `${radius}px`,
                    "--orbit-dir": dir,
                    animation: `orbit-shared ${duration}s linear infinite`,
                    animationDelay: `${delay}s`,
                    transformOrigin: "center",
                  }
            }
          >
            {shouldReduceMotion ? (
              <div style={{ transform: `rotate(${-targetAngle}deg)` }}>
                <div className="-translate-x-1/2 -translate-y-1/2">{renderItem(item, i)}</div>
              </div>
            ) : (
              <div className="-translate-x-1/2 -translate-y-1/2">{renderItem(item, i)}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
