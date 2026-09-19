import type { Project } from "@/content/work"

const PreviewSkeleton = ({ project }: { project: Project }) => (
  <div
    className="w-full rounded-lg border border-white/10 bg-card/80 p-4 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.8)]"
    aria-hidden="true"
  >
    <div
      className="h-2 w-[42%] rounded-full"
      style={{ background: project.brand.from }}
    />

    <div className="mt-3 space-y-1.5">
      <div className="h-1.5 w-full rounded-full bg-foreground/10" />
      <div className="h-1.5 w-[76%] rounded-full bg-foreground/10" />
    </div>

    <div className="mt-4 grid grid-cols-3 gap-2">
      {["24", "33", "1F"].map((alpha, index) => (
        <div
          key={alpha}
          className="aspect-[4/3] rounded-md"
          style={{ background: `${index === 1 ? project.brand.to : project.brand.from}${alpha}` }}
        />
      ))}
    </div>
  </div>
)

export default PreviewSkeleton
