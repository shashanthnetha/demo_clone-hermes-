import { useEffect, useMemo, useState } from "react";

type InstallTab = "unix" | "windows";

type Feature = {
  eyebrow: string;
  title: string;
  body: string;
  image: string;
};

const remote = "https://hermes-agent.nousresearch.com";
const dpl = "dpl_8sapVPpKdXbuPpqSniihpZxxAwTa";

const nextImage = (path: string, width = 3840) =>
  `${remote}/_next/image?url=${encodeURIComponent(path)}&w=${width}&q=75&dpl=${dpl}`;

const features: Feature[] = [
  {
    eyebrow: "#1 Connect",
    title: "Lives Everywhere",
    body: "Telegram, Discord, Slack, WhatsApp, Signal, Email, CLI — and a growing list of platforms. One agent, one memory, every surface.",
    image: nextImage("/img/desktop/feature-connect.webp"),
  },
  {
    eyebrow: "#2 Remember",
    title: "Persistent Memory",
    body: "It learns your projects, auto-generates skills, and never forgets how it solved a problem.",
    image: nextImage("/img/desktop/feature-memory.webp"),
  },
  {
    eyebrow: "#3 Schedule",
    title: "Focused Automation",
    body: "Natural-language scheduling for reports, backups, and briefings — running unattended through the gateway, focused every time.",
    image: nextImage("/img/desktop/feature-automation.webp"),
  },
  {
    eyebrow: "#4 Delegate",
    title: "Tasks Multiplied",
    body: "Isolated subagents with their own conversations, terminals, and Python RPC scripts for zero-context-cost pipelines.",
    image: nextImage("/img/desktop/feature-tasks.webp"),
  },
  {
    eyebrow: "#5 Search",
    title: "Browse the Web",
    body: "Web search, browser automation, vision, image generation, text-to-speech, and multi-model reasoning.",
    image: nextImage("/img/desktop/feature-browse.webp"),
  },
  {
    eyebrow: "#6 Experiment",
    title: "Isolated Sandboxing",
    body: "Five backends — local, Docker, SSH, Singularity, Modal — with container hardening and namespace isolation.",
    image: nextImage("/img/desktop/feature-sandbox.webp"),
  },
];

function App() {
  const [tab, setTab] = useState<InstallTab>("unix");
  const [copied, setCopied] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const command = useMemo(
    () =>
      tab === "unix"
        ? "curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash"
        : "irm https://hermes-agent.nousresearch.com/install.ps1 | iex",
    [tab],
  );

  useEffect(() => {
    document.body.className =
      "monofont_e19415dd-module__HwOVtq__variable displayfont_cf2d22da-module___RLvAq__variable rulesfont_99e82e93-module__eTZNSq__variable bg-hermes text-hermes-fg antialiased";
    document.body.style.backgroundColor = "#0000f2";
    document.body.style.color = "#f5f5f5";
    document.title = "Hermes Agent | Nous Research";
    return () => {
      document.body.className = "";
      document.body.style.backgroundColor = "";
      document.body.style.color = "";
    };
  }, []);

  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".hermes-web");
    const feature = document.querySelector<HTMLElement>(".hw-feature-parallax");
    const images = Array.from(document.querySelectorAll<HTMLElement>(".hw-parallax"));
    if (!root || !feature) return;

    const onScroll = () => {
      const scrollY = window.scrollY;
      feature.style.setProperty("--py", `${Math.max(0, scrollY * 0.035).toFixed(1)}px`);
      images.forEach((img, index) => {
        const amount = -40.2 + (scrollY * (0.018 + index * 0.0015));
        img.style.setProperty("--py-img", `${amount.toFixed(1)}px`);
      });

      const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const progress = scrollY / max;
      const footerProgress = Math.min(Math.max((progress - 0.72) / 0.18, 0), 1);
      root.style.setProperty("--hw-footer-opacity", footerProgress.toFixed(3));
      root.style.setProperty("--hw-footer-pe", footerProgress > 0.08 ? "auto" : "none");
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 1500);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const copyCommand = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <main className="relative z-2 mx-auto max-w-[1600px] p-8">
      <div
        className="hermes-web mx-[calc(50%-50dvw)] -my-8 w-dvw"
        style={
          {
            backgroundColor: "rgb(0, 0, 242)",
            color: "rgb(245, 245, 245)",
            minHeight: "100dvh",
            "--hw-footer-opacity": 0,
            "--hw-footer-pe": "none",
          } as React.CSSProperties
        }
      >
        <div className="hw-scroll">
          <nav className="absolute inset-x-0 top-[var(--hw-frame)] z-20 grid grid-cols-[1fr_auto_1fr] items-start px-[var(--hw-gutter)] pt-[calc(50*var(--u))]">
            <div className="grid grid-cols-2 items-start justify-items-start max-md:flex max-md:justify-start">
              <a
                className="text-[length:clamp(0.8rem,calc(22*var(--u)),1.35rem)] font-extrabold tracking-[0.03em] underline-offset-[0.3em] decoration-1 hover:underline py-[calc(14*var(--u))] -my-[calc(14*var(--u))] max-md:hidden"
                href="https://nousresearch.com"
                rel="noopener noreferrer"
                target="_blank"
              >
                Nous
              </a>
              <a
                className="text-[length:clamp(0.8rem,calc(22*var(--u)),1.35rem)] font-extrabold tracking-[0.03em] underline-offset-[0.3em] decoration-1 hover:underline py-[calc(14*var(--u))] -my-[calc(14*var(--u))]"
                href={`${remote}/docs`}
              >
                Docs
              </a>
            </div>
            <div className="flex flex-col items-center gap-[calc(16*var(--u))] leading-none">
              <a className="text-center text-[length:clamp(1.1rem,calc(40*var(--u)),2.5rem)] font-extrabold tracking-[0.03em]" href="/">
                Hermes
                <br />
                Agent
              </a>
              <span className="flex items-center gap-[calc(18*var(--u))]">
                <a
                  aria-label="Discord"
                  className="opacity-70 transition-opacity duration-200 ease-out hover:opacity-100"
                  href="https://discord.gg/nousresearch"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <svg fill="currentColor" height="21" viewBox="0 0 28 22" width="27" className="block h-[max(calc(21*var(--u)),0.85rem)] w-[max(calc(27*var(--u)),1.1rem)] shrink-0">
                    <path d="M23.0569 1.76461C21.295 0.940249 19.4111 0.341139 17.4415 0C17.1996 0.437328 16.917 1.02554 16.7221 1.49347C14.6284 1.17859 12.5539 1.17859 10.4987 1.49347C10.3039 1.02554 10.0149 0.437328 9.77083 0C7.7991 0.341139 5.91301 0.94245 4.15109 1.76897C0.597274 7.13925 -0.366106 12.3761 0.115585 17.5387C2.47266 19.2989 4.75695 20.3681 7.00269 21.0678C7.55717 20.3047 8.0517 19.4935 8.47772 18.6385C7.66635 18.3302 6.88923 17.9498 6.15494 17.5081C6.34974 17.3637 6.54029 17.2129 6.72438 17.0576C11.203 19.1524 16.0692 19.1524 20.4943 17.0576C20.6806 17.2129 20.8711 17.3637 21.0638 17.5081C20.3273 17.9519 19.5481 18.3324 18.7367 18.6407C19.1627 19.4935 19.6551 20.3069 20.2117 21.07C22.4596 20.3703 24.746 19.3011 27.1031 17.5387C27.6683 11.554 26.1376 6.36518 23.0569 1.76461Z" />
                  </svg>
                </a>
                <a
                  aria-label="GitHub"
                  className="opacity-70 transition-opacity duration-200 ease-out hover:opacity-100"
                  href="https://github.com/NousResearch/hermes-agent"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <svg fill="currentColor" height="24" viewBox="0 0 24 24" width="24" className="block h-[max(calc(26*var(--u)),0.85rem)] w-auto max-w-[max(calc(26*var(--u)),0.85rem)] shrink-0">
                    <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.39 1.24-3.23-.12-.31-.54-1.53.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.18.77.84 1.24 1.92 1.24 3.23 0 4.62-2.81 5.64-5.49 5.94.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 24 12.5C24 5.87 18.63.5 12 .5Z" />
                  </svg>
                </a>
              </span>
            </div>
            <div className="grid grid-cols-2 items-start justify-items-end max-md:flex max-md:justify-end">
              <div className="hw-dropdown relative">
                <button
                  aria-expanded={openMenu}
                  aria-haspopup="menu"
                  className="text-[length:clamp(0.8rem,calc(22*var(--u)),1.35rem)] font-extrabold tracking-[0.03em] underline-offset-[0.3em] decoration-1 hover:underline py-[calc(14*var(--u))] -my-[calc(14*var(--u))] inline-flex cursor-pointer items-center gap-[0.4em] uppercase"
                  type="button"
                  onClick={() => setOpenMenu((v) => !v)}
                >
                  Products
                  <svg fill="currentColor" height="6" viewBox="0 0 10 6" width="10" aria-hidden="true" className={`h-[6px] w-[10px] shrink-0 transition-transform${openMenu ? " rotate-180" : ""}`}>
                    <path d="M10 0v2H8v2H6v2H4V4H2V2H0V0z" />
                  </svg>
                </button>
                {openMenu ? (
                  <div className="absolute top-[calc(100%+0.5rem)] right-0 z-50 min-w-40 overflow-hidden border border-hermes-fg/60 bg-[var(--hermes-dropdown-bg)] ring-1 ring-hermes-fg/60 ring-inset shadow-[var(--hermes-outline-inset)]">
                    <a className="block px-[var(--space-m)] py-[var(--space-s)] hover:bg-[var(--hermes-dropdown-hover)] active:bg-[var(--hermes-dropdown-hover)]" href="https://portal.nousresearch.com/manage-subscription">
                      Nous Portal
                    </a>
                  </div>
                ) : null}
              </div>
              <a
                className="text-[length:clamp(0.8rem,calc(22*var(--u)),1.35rem)] font-extrabold tracking-[0.03em] underline-offset-[0.3em] decoration-1 hover:underline py-[calc(14*var(--u))] -my-[calc(14*var(--u))] inline-flex items-center gap-[calc(10*var(--u))] max-md:hidden"
                href="#downloads"
              >
                Install
                <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" className="block h-[max(0.7em,0.85rem)] w-[max(0.7em,0.85rem)] shrink-0">
                  <path d="M5 12h14m0 0-6-6m6 6-6 6" />
                </svg>
              </a>
            </div>
          </nav>

          <header className="hw-vignette relative flex min-h-[calc(1360*var(--u))] overflow-x-clip max-md:min-h-[88dvh] max-md:items-end max-md:pt-[calc(var(--hw-frame)+210*var(--u))] max-md:pb-[8dvh] md:items-start md:overflow-hidden md:pt-[calc(442*var(--u))]">
            <img
              alt=""
              aria-hidden="true"
              fetchPriority="high"
              width="1129"
              height="1418"
              decoding="async"
              className="hw-hero-art pointer-events-none absolute top-[calc(219*var(--u))] right-[calc(135*var(--u))] z-2 w-[calc(1128*var(--u))] max-w-none mix-blend-lighten select-none max-md:hidden"
              style={{ color: "transparent", pointerEvents: "none", position: "absolute" }}
              sizes="48vw"
              src={nextImage("/img/desktop/hero-art.webp")}
            />
            <div className="relative z-3 mx-[var(--hw-gutter)] flex w-[calc(980*var(--u))] max-w-full min-w-0 flex-col gap-[calc(30*var(--u))] max-md:w-full md:ms-[calc(var(--hw-gutter)-var(--hw-frame))]">
              <p className="hw-mono text-[length:var(--hw-text-eyebrow)] tracking-[0.18em]">Open Source • MIT License</p>
              <h1 className="flex max-w-full min-w-0 flex-col text-[calc(132*var(--u))] leading-[0.88] font-light tracking-[0.03em] max-md:text-[13.75vw]">
                <span>The Agent</span>
                <span>That Grows</span>
                <span>With You</span>
              </h1>
              <div className="mt-[calc(20*var(--u))] flex w-full max-w-full min-w-0 flex-col items-start gap-[calc(48*var(--u))]">
                <section className="flex w-full max-w-full min-w-0 flex-col gap-[calc(15*var(--u))]">
                  <p className="hw-mono text-[length:var(--hw-text-eyebrow)] tracking-[0.14em] opacity-90">Install desktop app</p>
                  <div className="flex flex-col items-start gap-[calc(24*var(--u))] max-w-full">
                    <a
                      className="group bg-hermes-fg text-hermes relative inline-flex items-center px-[calc(30*var(--u))] py-[calc(20*var(--u))] shadow-[0_4px_14px_rgba(0,0,0,0.25)] transition-colors hover:bg-white pl-[calc(68*var(--u))] max-w-full whitespace-nowrap max-md:text-[length:clamp(0.68rem,calc(18*var(--u)),0.92rem)]"
                      href="https://hermes-assets.nousresearch.com/Hermes-Setup.dmg?build=e4ea0a0ed7fc"
                      download
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <span className="hw-mono text-[length:var(--hw-text-body)] leading-none">Download for Mac OS</span>
                    </a>
                  </div>
                </section>

                <section className="flex w-full max-w-full min-w-0 flex-col gap-[calc(15*var(--u))] md:w-fit" id="install">
                  <p className="hw-mono text-[length:var(--hw-text-eyebrow)] tracking-[0.14em] opacity-90">Install via terminal</p>
                  <div className="w-full max-w-full min-w-0 md:w-max">
                    <div className="border-hermes/15 w-full max-w-full overflow-hidden rounded-[4px] border bg-white">
                      <div className="border-hermes/10 flex flex-wrap gap-x-[calc(20*var(--u))] gap-y-[calc(8*var(--u))] border-b px-[calc(18*var(--u))] pt-[calc(14*var(--u))]" role="tablist">
                        <button
                          className={`cursor-pointer border-none bg-transparent pb-[calc(12*var(--u))] font-[family-name:var(--font-mono)] text-[max(calc(15*var(--u)),0.72rem)] tracking-normal normal-case border-b-2 transition-colors duration-200 ${tab === "unix" ? "border-hermes text-hermes font-bold" : "text-hermes/45 hover:text-hermes/70 border-transparent"}`}
                          role="tab"
                          type="button"
                          onClick={() => setTab("unix")}
                        >
                          macOS / Linux
                        </button>
                        <button
                          className={`cursor-pointer border-none bg-transparent pb-[calc(12*var(--u))] font-[family-name:var(--font-mono)] text-[max(calc(15*var(--u)),0.72rem)] tracking-normal normal-case border-b-2 transition-colors duration-200 ${tab === "windows" ? "border-hermes text-hermes font-bold" : "text-hermes/45 hover:text-hermes/70 border-transparent"}`}
                          role="tab"
                          type="button"
                          onClick={() => setTab("windows")}
                        >
                          Windows
                        </button>
                      </div>
                      <div className="px-[calc(18*var(--u))] py-[calc(16*var(--u))]">
                        <div className="w-full max-w-full md:inline-grid">
                          <div className="col-start-1 row-start-1 flex w-full min-w-0 items-center gap-[calc(14*var(--u))] md:overflow-hidden">
                            <div className="font-[family-name:var(--font-mono)] text-[max(calc(17*var(--u)),0.78rem)] leading-none tracking-normal normal-case max-md:break-all max-md:whitespace-normal md:whitespace-nowrap min-w-0 flex-1 max-md:overflow-visible md:overflow-hidden selection:bg-hermes-accent selection:text-hermes">
                              {tab === "unix" ? (
                                <>
                                  <span className="text-hermes/45">curl </span>
                                  <span className="text-hermes font-bold">-fsSL https://hermes-agent.nousresearch.com/install.sh</span>
                                  <span className="text-hermes/45"> | bash</span>
                                </>
                              ) : (
                                <>
                                  <span className="text-hermes/45">irm </span>
                                  <span className="text-hermes font-bold">https://hermes-agent.nousresearch.com/install.ps1</span>
                                  <span className="text-hermes/45"> | iex</span>
                                </>
                              )}
                            </div>
                            <button
                              aria-label="Copy install command"
                              className="flex shrink-0 cursor-pointer items-center justify-center border-none bg-transparent size-[max(calc(26*var(--u)),1.15rem)] transition-colors duration-200 text-hermes/35 hover:text-hermes/60"
                              type="button"
                              onClick={copyCommand}
                            >
                              <svg aria-hidden="true" className="size-[max(calc(18*var(--u)),0.85rem)]" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                                <rect height="13" rx="2" width="13" x="8" y="8" />
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                              </svg>
                            </button>
                          </div>
                        </div>
                        {copied ? (
                          <p className="mt-2 font-[family-name:var(--font-mono)] text-hermes normal-case">Copied</p>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </header>

          <section className="relative z-50 px-[var(--hw-edge)]" id="preview">
            <div className="relative aspect-[2174/1273] w-full overflow-hidden">
              <video className="absolute inset-0 size-full object-cover object-center" loop muted playsInline poster={`${remote}/img/desktop/showcase.webp`} preload="metadata" autoPlay>
                <source src="https://hermes-assets.nousresearch.com/hermes-desktop.mp4" type="video/mp4" />
              </video>
              <div className="pointer-events-none absolute inset-0 border-[calc(55*var(--u))] border-[color:var(--hw-bg)] mix-blend-lighten max-md:border-[16px]"></div>
            </div>
          </section>

          <section className="relative z-1 grid grid-cols-1 gap-[var(--hw-gap)] px-[var(--hw-gutter)] pt-[calc(60*var(--u))] pb-[calc(120*var(--u))] md:grid-cols-3" id="downloads">
            <PlatformCard label="macOS 12+" title="Mac OS" href="https://hermes-assets.nousresearch.com/Hermes-Setup.dmg?build=e4ea0a0ed7fc" image={nextImage("/img/desktop/platform-art-mac.webp")} cta="Download" />
            <PlatformCard label="Windows 10/11" title="Windows" href="https://hermes-assets.nousresearch.com/Hermes-Setup.exe?build=e4ea0a0ed7fc" image={nextImage("/img/desktop/platform-art-windows.webp")} cta="Download" />
            <PlatformCard label="Any distro" title="Linux" href="#install" image={nextImage("/img/desktop/platform-art-linux.webp")} cta="Install via terminal" />
          </section>

          <div className="hw-feature-parallax" style={{ ["--py" as string]: "0px" }}>
            <img
              alt="Hermes"
              loading="lazy"
              width="600"
              height="1200"
              decoding="async"
              className="hw-feature-badge sticky top-[calc(var(--hw-frame)+30*var(--u))] z-10 mb-[calc(-120*var(--u))] ml-[calc(30*var(--u))] block h-[calc(120*var(--u))] w-[calc(84*var(--u))] max-md:hidden"
              style={{ color: "transparent" }}
              sizes="120px"
              src={nextImage("/img/desktop/badge.webp")}
            />
            <section className="hw-feature-panel bg-hermes-paper text-hermes relative pt-[calc(30*var(--u))]">
              <div className="flex absolute top-[calc(30*var(--u))] right-[calc(30*var(--u))] z-2">
                <span className="hw-mono border border-current px-[calc(15*var(--u))] py-[calc(10*var(--u))] text-[0.75rem] opacity-90 not-first:border-l-0">Feature</span>
                <span className="hw-mono border border-current px-[calc(15*var(--u))] py-[calc(10*var(--u))] text-[0.75rem] opacity-90 not-first:border-l-0">Preview</span>
              </div>
              <div className="relative z-1 grid grid-cols-1 gap-x-[calc(30*var(--u))] gap-y-[calc(150*var(--u))] pt-[calc(60*var(--u))] pr-[calc(30*var(--u))] pl-[calc(150*var(--u))] max-md:gap-y-[calc(90*var(--u))] max-md:px-[var(--hw-gutter)] md:grid-cols-3">
                {features.map((feature) => (
                  <article key={feature.eyebrow} className="flex flex-col gap-[calc(60*var(--u))] text-left">
                    <div className="flex flex-col gap-[calc(50*var(--u))] pr-[calc(180*var(--u))] max-md:pr-0">
                      <p className="hw-mono text-[length:var(--hw-text-eyebrow)] tracking-[0.18em] opacity-80">{feature.eyebrow}</p>
                      <h2 className="w-[calc(486*var(--u))] max-w-full text-[calc(64*var(--u))] leading-none font-light">{feature.title}</h2>
                    </div>
                    <div className="hw-noise bg-hermes relative aspect-[666/574] overflow-hidden">
                      <img alt="" aria-hidden="true" loading="lazy" decoding="async" className="hw-parallax pointer-events-none object-cover mix-blend-screen" style={{ position: "absolute", height: "100%", width: "100%", inset: 0, color: "transparent", ["--py-img" as string]: "-40.2px" }} sizes="(min-width: 768px) 33vw, 100vw" src={feature.image} />
                    </div>
                    <p className="hw-mono pr-[calc(180*var(--u))] text-[length:var(--hw-text-body)] leading-[1.4] opacity-90 max-md:pr-0">{feature.body}</p>
                  </article>
                ))}
              </div>
              <div className="hw-feature-stop hw-wordmark relative z-1 mt-[12rem] w-full -translate-x-[0.7%] translate-y-[8px] text-center max-md:mt-[4rem]">Hermes</div>
            </section>
          </div>
        </div>

        <footer className="hw-footer">
          <div className="absolute inset-x-0 top-[7dvh] z-10 mx-auto flex w-[calc(980*var(--u))] max-w-full flex-col items-center gap-[min(calc(36*var(--u)),3dvh)] text-center max-md:px-[var(--hw-gutter)]">
            <p className="hw-mono text-[length:var(--hw-text-eyebrow)] tracking-[0.18em]">Free • Plus • Super • Ultra</p>
            <h2 className="text-[min(calc(112*var(--u)),8dvh)] leading-none font-light tracking-[0.03em] max-md:text-[2.6rem]">Nous Portal</h2>
            <p className="hw-mono w-[calc(800*var(--u))] max-w-full text-[length:var(--hw-text-body)] leading-[1.4] opacity-90">All paid tiers include monthly credits for use in Hermes Agent, access to 300+ cutting-edge models and built-in tool use</p>
            <a className="group bg-hermes-fg text-hermes relative inline-flex items-center px-[calc(30*var(--u))] py-[calc(20*var(--u))] shadow-[0_4px_14px_rgba(0,0,0,0.25)] transition-colors hover:bg-white" href="https://portal.nousresearch.com/manage-subscription" rel="noopener noreferrer" target="_blank">
              <span className="hw-mono text-[length:var(--hw-text-body)] leading-none">View All Our Plans</span>
            </a>
          </div>
          <div aria-hidden="true" className="hw-ghost hw-footer-wordmark max-md:hidden">
            <span>Nous</span>
            <span data-portal-word="true">Portal</span>
          </div>
          <video poster={`${remote}/img/desktop/portal-figure.webp`} aria-hidden="true" autoPlay className="hw-footer-girl" loop playsInline>
            <source src={`${remote}/img/desktop/portal-figure-orb.webm`} type="video/webm" />
          </video>
          <div className="hw-mono absolute bottom-[7dvh] left-[var(--hw-gutter)] z-20 text-[length:var(--hw-text-eyebrow)] leading-none max-md:bottom-[3dvh] max-md:text-[0.62rem]">
            <p>Hermes Agent v0.18.2</p>
          </div>
          <div className="hw-mono absolute right-[var(--hw-gutter)] bottom-[7dvh] z-20 flex flex-col items-end gap-[calc(8*var(--u))] text-right text-[length:var(--hw-text-eyebrow)] leading-none max-md:right-auto max-md:bottom-[calc(3dvh+2.2rem)] max-md:left-[var(--hw-gutter)] max-md:items-start max-md:text-left max-md:text-[0.62rem]">
            <img alt="Nous Research" loading="lazy" width="121" height="173" decoding="async" className="mb-[calc(14*var(--u))] h-[calc(120*var(--u))] w-[calc(84*var(--u))] max-md:hidden" style={{ color: "transparent" }} src={nextImage("/img/desktop/nous.webp", 256)} />
            <p>Nous Research</p>
            <p>MIT License · 2026</p>
          </div>
        </footer>

        <div aria-hidden="true" className="hw-frame max-md:hidden"></div>
        <canvas aria-hidden="true" className="pointer-events-none fixed inset-0 z-101 h-full w-full" style={{ mixBlendMode: "normal", opacity: 0.02 }} width={window.innerWidth * 2} height={window.innerHeight * 2}></canvas>
      </div>
    </main>
  );
}

function PlatformCard({
  label,
  title,
  href,
  image,
  cta,
}: {
  label: string;
  title: string;
  href: string;
  image: string;
  cta: string;
}) {
  return (
    <div className="group hw-noise hw-vignette bg-hermes relative flex aspect-[627/547] flex-col items-center justify-center overflow-hidden text-center max-md:aspect-[2/1]">
      <img alt="" aria-hidden="true" loading="lazy" decoding="async" className="pointer-events-none object-cover opacity-45" style={{ position: "absolute", height: "100%", width: "100%", inset: 0, color: "transparent" }} sizes="(min-width: 768px) 33vw, 100vw" src={image} />
      <span aria-hidden="true" className="hw-arc"></span>
      <div className="relative z-2 flex flex-col items-center gap-[calc(30*var(--u))]">
        <p className="hw-mono text-[length:var(--hw-text-eyebrow)] tracking-[0.18em] text-[calc(23*var(--u))] tracking-[0.1em] opacity-70">{label}</p>
        <h2 className="text-[calc(64*var(--u))] leading-none font-normal normal-case">{title}</h2>
        <a className="group bg-hermes-fg text-hermes relative inline-flex items-center px-[calc(30*var(--u))] py-[calc(20*var(--u))] shadow-[0_4px_14px_rgba(0,0,0,0.25)] transition-colors hover:bg-white pl-[calc(68*var(--u))] whitespace-nowrap" href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined}>
          <span className="hw-mono text-[length:var(--hw-text-body)] leading-none">{cta}</span>
        </a>
      </div>
    </div>
  );
}

export default App;
