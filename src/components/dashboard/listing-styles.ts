import { StudioCategory, StudioStatus } from "@/type/studioType";

export const categoryPill: Record<StudioCategory, string> = {
	"photo-studio": "bg-primary/15 text-primary ring-primary/30",
	"film-stage": "bg-orange-500/15 text-orange-400 ring-orange-500/30",
	"podcast-lounge": "bg-rose-500/15 text-rose-400 ring-rose-500/30",
	"music-suite": "bg-violet-500/15 text-violet-400 ring-violet-500/30",
	workshop: "bg-fuchsia-500/15 text-fuchsia-400 ring-fuchsia-500/30",
	"sound-stage": "bg-sky-500/15 text-sky-400 ring-sky-500/30",
	"rehearsal-space": "bg-emerald-500/15 text-emerald-400 ring-emerald-500/30",
};

export const statusBadge: Record<StudioStatus, string> = {
	approved: "bg-emerald-500/15 text-emerald-400 ring-emerald-500/30",
	pending: "bg-amber-500/15 text-amber-400 ring-amber-500/30",
	rejected: "bg-red-500/15 text-red-400 ring-red-500/30",
};

export const statusDot: Record<StudioStatus, string> = {
	approved: "bg-emerald-400",
	pending: "bg-amber-400",
	rejected: "bg-red-400",
};

export const fallbackPill =
	"bg-white/10 text-foreground/70 ring-white/20";

export const fallbackDot = "bg-foreground/50";
