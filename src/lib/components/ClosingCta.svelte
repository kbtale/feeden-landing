<script lang="ts">
  import { KICK_URL } from "../data/feeden";
  import { getI18n } from "../i18n/store.svelte";

  const i18n = getI18n();
</script>

<section class="pt-14 pb-14 stack:pt-24 stack:pb-20">
  <div class="fdn-rail-frame">
    <div class="flex flex-col stack:flex-row">
      <div class="flex w-full flex-col justify-between gap-9 bg-fdn-lime px-6 py-12 text-obsidian stack:w-[72%] stack:px-11 stack:py-16">
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
        class="hidden flex-col items-center justify-center gap-6 bg-fdn-deep p-10 stack:flex stack:w-[28%]"
        aria-hidden="true"
      >
        <div class="relative flex h-52 w-52 items-center justify-center">
          <svg viewBox="0 0 220 220" class="h-full w-full" fill="none">
            <path
              d="M110 14 A96 96 0 1 0 198 148 L142 24 A96 96 0 0 0 110 14 Z"
              fill="#0D9F67"
            />
            <circle cx="110" cy="110" r="78" stroke="#8BFF2A" stroke-width="2" stroke-dasharray="4 6" />
          </svg>
          <img
            src="/logo-fdn.webp"
            alt={i18n.t.closing.emblemAlt}
            width="124"
            height="124"
            loading="lazy"
            class="absolute h-28 w-28 object-contain"
          />
        </div>
        <div class="h-5 w-48 bg-fdn-lime"></div>
      </div>
    </div>
  </div>
</section>
