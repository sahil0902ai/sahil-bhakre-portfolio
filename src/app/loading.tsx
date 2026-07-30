export default function Loading() {
  return (
    <div className="min-h-screen bg-bg-base flex items-center justify-center p-6 text-center">
      <div className="space-y-4">
        <div className="relative w-12 h-12 mx-auto">
          <div className="absolute inset-0 rounded-full border-2 border-accent-primary/20" />
          <div className="absolute inset-0 rounded-full border-2 border-t-accent-primary animate-spin" />
        </div>
        <p className="font-mono text-xs text-text-muted tracking-wider uppercase animate-pulse">
          Loading Application...
        </p>
      </div>
    </div>
  );
}
