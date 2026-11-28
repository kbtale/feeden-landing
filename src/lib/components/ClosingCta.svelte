<script lang="ts">
  import { KICK_URL } from "../data/feeden";
  import { getI18n } from "../i18n/store.svelte";

  const i18n = getI18n();
</script>

<section class="pt-14 pb-14 stack:pt-24 stack:pb-20">
  <div class="fdn-rail-frame">
    <div class="flex flex-col stack:flex-row">
      <div class="flex w-full flex-col justify-between gap-9 bg-fdn-lime px-6 py-12 text-obsidian stack:w-[70%] stack:px-11 stack:py-16">
        <h2 class="max-w-[12ch] font-display text-[clamp(44px,6vw,88px)] leading-[0.88] font-bold tracking-[-0.025em] text-obsidian">
          {i18n.t.closing.heading}
        </h2>

        <div>
          <a
            href={KICK_URL}
            target="_blank"
            rel="noopener noreferrer"
            class="fdn-btn-dark w-full panel:w-[214px]"
          >
            <span>{i18n.t.closing.cta}</span>
          </a>
        </div>
      </div>

      <div
        class="relative hidden flex-col items-center justify-between border-l border-obsidian/15 bg-obsidian p-8 text-off-white stack:flex stack:w-[30%]"
      >
        <div class="flex w-full items-center justify-between font-mono text-[10px] tracking-[0.12em] text-muted-ink uppercase">
          <span>FDN</span>
          <span class="text-fdn-lime">KICK</span>
        </div>

        <div class="relative my-4 flex h-44 w-44 items-center justify-center">
          <span
            class="absolute top-0 left-0 h-3 w-3 border-t border-l border-fdn-lime/60"
            aria-hidden="true"
          ></span>
          <span
            class="absolute top-0 right-0 h-3 w-3 border-t border-r border-fdn-lime/60"
            aria-hidden="true"
          ></span>
          <span
            class="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-fdn-lime/60"
            aria-hidden="true"
          ></span>
          <span
            class="absolute right-0 bottom-0 h-3 w-3 border-r border-b border-fdn-lime/60"
            aria-hidden="true"
          ></span>
          <img
            src="/logo-fdn.webp"
            alt={i18n.t.closing.emblemAlt}
            width="136"
            height="136"
            loading="lazy"
            class="h-32 w-32 object-contain"
          />
        </div>

        <a
          href={KICK_URL}
          target="_blank"
          rel="noopener noreferrer"
          class="font-mono text-[11px] tracking-[0.06em] text-off-white/70 underline decoration-fdn-lime/40 underline-offset-4 transition-colors duration-150 hover:text-fdn-lime"
          translate="no"
        >
          kick.com/feeden
        </a>
      </div>
    </div>
  </div>
</section>
