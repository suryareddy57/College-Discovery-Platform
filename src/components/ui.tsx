import { AlertTriangle, ArrowRight, Heart, Search, Sparkles, X } from 'lucide-react';

export function SectionHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="max-w-3xl space-y-3">
      <p className="inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-brand-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-brand-100">
        <Sparkles className="h-3.5 w-3.5" />
        {eyebrow}
      </p>
      <h1 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">{title}</h1>
      <p className="text-sm leading-7 text-slate-300 sm:text-base">{description}</p>
    </div>
  );
}

export function StatusCard({
  title,
  description,
  action,
  variant = 'info'
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
  variant?: 'info' | 'warning' | 'error';
}) {
  const icon = variant === 'warning' ? <AlertTriangle className="h-5 w-5 text-gold-100" /> : variant === 'error' ? <X className="h-5 w-5 text-rose-100" /> : <Sparkles className="h-5 w-5 text-brand-100" />;

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-panel backdrop-blur-sm">
      <div className="flex items-start gap-4">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-3">{icon}</div>
        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">{description}</p>
          {action ? <div className="mt-4">{action}</div> : null}
        </div>
      </div>
    </div>
  );
}

export function PrimaryButton({
  children,
  icon,
  onClick,
  href,
  tone = 'primary',
  type = 'button',
  disabled
}: {
  children: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  href?: string;
  tone?: 'primary' | 'ghost' | 'danger';
  type?: 'button' | 'submit';
  disabled?: boolean;
}) {
  const base =
    tone === 'ghost'
      ? 'border-white/10 bg-white/5 text-slate-100 hover:bg-white/10'
      : tone === 'danger'
        ? 'border-rose-500/20 bg-rose-500/10 text-rose-100 hover:bg-rose-500/15'
        : 'border-brand-500/30 bg-gradient-to-r from-brand-500 to-brand-600 text-white hover:opacity-95';

  const classes = `inline-flex items-center justify-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-100 disabled:cursor-not-allowed disabled:opacity-60 ${base}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
        {icon}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} disabled={disabled}>
      {children}
      {icon}
    </button>
  );
}

export function Chip({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200">{children}</span>;
}

export function EmptySearchState({ onReset }: { onReset: () => void }) {
  return (
    <StatusCard
      variant="warning"
      title="No colleges matched your filters"
      description="Try widening the fee range, switching the location filter, or clearing the current search term."
      action={
        <PrimaryButton icon={<ArrowRight className="h-4 w-4" />} onClick={onReset}>
          Reset filters
        </PrimaryButton>
      }
    />
  );
}

export function SavedBadge({ active }: { active: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${active ? 'bg-rose-500/15 text-rose-100' : 'bg-white/5 text-slate-300'}`}>
      <Heart className={`h-3.5 w-3.5 ${active ? 'fill-current' : ''}`} />
      {active ? 'Saved' : 'Save'}
    </span>
  );
}

export function SearchPill({ value }: { value: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200">
      <Search className="h-4 w-4 text-brand-100" />
      {value}
    </span>
  );
}