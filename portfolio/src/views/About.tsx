import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SectionHead } from "@/components/SectionHead";
import { ContactBlock } from "@/components/ContactBlock";
import { site } from "@/content/site";
import { pick, t, type Locale } from "@/lib/i18n";

/**
 * TODO(bruno): two things would make this page much stronger —
 *   1. a photo of you working (at the desk, at the console, or on a stand),
 *      dropped in at /public/bruno.jpg and rendered above the bio;
 *   2. the names of the acts you ran sound for, if you are happy to publish
 *      them. In audio that list is credibility; add it to `audioNote` below.
 */

const bio = {
  en: [
    "I started behind a drum kit, touring Brazil with bands and duos. That turned into the other side of the console — technical production at a live venue, running sound for national touring acts, then studio recording and music video work.",
    "I moved to London to study audio properly, and trained on DiGiCo, Soundcraft and Yamaha systems. What I did not expect was that the discipline would transfer: a signal chain and a stand build are the same problem, which is getting something to work reliably in a room, on a deadline, with no second attempt.",
    "The exhibition floor is where I spent the next decade — London, Frankfurt, Dubai. Installing stands, then drawing them, then specifying them for production. Learning beMatrix and LEDskin because the LED wall always failed at the worst moment and somebody had to fix it.",
    "Along the way I kept noticing the same gap. Companies spending forty to eighty thousand pounds on a stand, with no follow-up system, no way to know who visited, and no digital layer at all. So I built one, which meant learning to build software properly — Next.js, Supabase, automation, AI agents.",
    "That is the whole résumé: four trades that look unrelated on paper and are the same instinct in practice. Understand how the thing is actually made, then make it work.",
  ],
  pt: [
    "Comecei atrás de uma bateria, rodando o Brasil com bandas e duplas. Aquilo virou o outro lado da mesa — produção técnica numa casa de shows, som para artistas de turnê nacional, depois gravação em estúdio e videoclipe.",
    "Vim para Londres estudar áudio de verdade, e me formei nos sistemas DiGiCo, Soundcraft e Yamaha. O que eu não esperava é que a disciplina fosse transferível: uma cadeia de sinal e a montagem de um stand são o mesmo problema — fazer alguma coisa funcionar de forma confiável, numa sala, com prazo, sem segunda tentativa.",
    "O piso de feira foi onde passei a década seguinte — Londres, Frankfurt, Dubai. Montando stands, depois desenhando, depois especificando para produção. Aprendendo beMatrix e LEDskin porque o painel de LED sempre falhava na pior hora e alguém tinha que resolver.",
    "No caminho eu não parava de ver a mesma lacuna. Empresas gastando quarenta, oitenta mil libras num stand, sem sistema de follow-up, sem saber quem visitou, sem nenhuma camada digital. Então construí uma, o que significou aprender a fazer software direito — Next.js, Supabase, automação, agentes de IA.",
    "É esse o currículo inteiro: quatro ofícios que no papel parecem não ter relação e que na prática são o mesmo instinto. Entender como a coisa é feita de verdade, e então fazer funcionar.",
  ],
};

const facts = {
  en: [
    { label: "Based in", value: "London, United Kingdom" },
    { label: "Exhibition industry", value: "10+ years" },
    { label: "Markets", value: "United Kingdom, Europe, Gulf" },
    { label: "Audio training", value: "DiGiCo · Soundcraft · Yamaha, London" },
    { label: "Languages", value: "Portuguese (native) · English · Spanish" },
    { label: "Working", value: "Remote worldwide · On-site in the UK" },
  ],
  pt: [
    { label: "Base", value: "Londres, Reino Unido" },
    { label: "Setor de exposições", value: "10+ anos" },
    { label: "Mercados", value: "Reino Unido, Europa, Golfo" },
    { label: "Formação em áudio", value: "DiGiCo · Soundcraft · Yamaha, Londres" },
    { label: "Idiomas", value: "Português (nativo) · Inglês · Espanhol" },
    { label: "Atuação", value: "Remoto no mundo todo · Presencial no Reino Unido" },
  ],
};

export function About({ locale }: { locale: Locale }) {
  return (
    <>
      <Header locale={locale} path="about" />

      <main id="main">
        <section className="band border-b border-rule">
          <div className="sheet">
            <p className="label-accent mb-6">{t(locale, "about.title")}</p>
            <h1 className="h-display mb-10 max-w-[18ch]">{site.name}</h1>

            <div className="grid gap-12 lg:grid-cols-12">
              <div className="flex flex-col gap-5 lg:col-span-7">
                {pick(bio, locale).map((para, i) => (
                  <p
                    key={i}
                    className={
                      i === 0
                        ? "text-[1.0625rem] leading-relaxed text-ink sm:text-[1.1875rem]"
                        : "text-[15px] leading-relaxed text-ink-2"
                    }
                  >
                    {para}
                  </p>
                ))}
              </div>

              <aside className="lg:col-span-4 lg:col-start-9">
                <dl className="border border-rule-strong bg-surface">
                  {pick(facts, locale).map((f) => (
                    <div key={f.label} className="border-b border-rule px-4 py-3 last:border-b-0">
                      <dt className="label mb-1">{f.label}</dt>
                      <dd className="text-[13px] leading-relaxed text-ink">{f.value}</dd>
                    </div>
                  ))}
                </dl>
              </aside>
            </div>
          </div>
        </section>

        <section className="band-tight">
          <div className="sheet">
            <SectionHead title={t(locale, "contact.title")} />
            <ContactBlock locale={locale} />
          </div>
        </section>
      </main>

      <Footer locale={locale} />
    </>
  );
}
