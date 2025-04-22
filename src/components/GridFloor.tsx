'use client';

const GridFloor = () => {
  return (
    <div
      className="fixed inset-0"
      style={{
        transform: 'perspective(200px) rotateX(80deg)',
        maskImage: 'radial-gradient(at 50% 100%, black, transparent 70%)',
        WebkitMaskImage: 'radial-gradient(at 50% 100%, black, transparent 70%)',
        zIndex: -15,
      }}
      aria-hidden="true"
    >
      <div
        className="h-full w-full"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(139, 255, 235, 0.2) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(139, 255, 235, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          animation: 'move-background 2s linear infinite',
        }}
      />
    </div>
  );
};

export default GridFloor;
