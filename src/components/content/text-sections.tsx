export interface TextSection {
  readonly id: string;
  readonly title: string;
  readonly text: string;
}

export function TextSections({ sections }: { sections: readonly TextSection[] }) {
  return (
    <div className="max-w-3xl space-y-10">
      {sections.map((section) => (
        <section key={section.id} aria-labelledby={`${section.id}-title`}>
          <h2 id={`${section.id}-title`} className="text-xl font-semibold text-ink">
            {section.title}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted">{section.text}</p>
        </section>
      ))}
    </div>
  );
}
