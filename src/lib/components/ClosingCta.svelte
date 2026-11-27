<script lang="ts">
  import { KICK_URL, OFFICIAL_SOCIALS } from "../data/feeden";
  import { getI18n } from "../i18n/store.svelte";
  import SocialIcons from "./SocialIcons.svelte";

  const i18n = getI18n();
</script>

<section id="redes" class="fdn-hairline-top pt-14 pb-0 stack:pt-20">
  <div class="fdn-container">
    <div class="flex flex-col gap-2 stack:flex-row stack:items-end stack:justify-between">
      <div>
        <p class="fdn-eyebrow text-fdn-lime">{i18n.t.closing.socialsEyebrow}</p>
        <h2 class="mt-2 font-display text-[clamp(32px,4vw,52px)] leading-[1.04] font-bold tracking-[-0.01em] text-off-white">
          {i18n.t.closing.socialsHeading}
        </h2>
      </div>
    </div>

    <ul
      aria-label={i18n.t.a11y.officialSocials}
      class="mt-8 grid grid-cols-2 border-t border-l border-rule-strong panel:grid-cols-3 wide:grid-cols-6"
    >
      {#each OFFICIAL_SOCIALS as social (social.id)}
        <li class="border-r border-b border-rule-strong">
          <a
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            class="fdn-social-tile flex min-h-[88px] flex-col justify-between gap-3 bg-surface-700 p-4 text-off-white no-underline transition-colors duration-150"
          >
            <div class="flex items-center justify-between gap-2">
              <span class="text-fdn-lime">
                <SocialIcons name={social.id} size={18} />
              </span>
              <SocialIcons name="arrow-up-right" size={14} class="text-muted-ink" />
            </div>
            <div class="min-w-0">
              <p class="font-mono text-xs font-medium tracking-[0.06em] uppercase">
                {social.name}
              </p>
              <p class="mt-0.5 truncate font-mono text-[11px] text-muted-ink" translate="no">
                {social.handle}
              </p>
            </div>
          </a>
        </li>
      {/each}
    </ul>
  </div>

  <div class="fdn-rail-frame mt-12 border-t border-obsidian/20 stack:mt-16">
    <div class="flex flex-col stack:flex-row">
      <div class="flex w-full flex-col justify-between gap-8 bg-fdn-lime px-6 py-12 text-obsidian stack:w-[72%] stack:px-11 stack:py-16">
        <h2 class="max-w-[14ch] font-display text-[clamp(44px,5.8vw,86px)] leading-[0.88] font-bold tracking-[-0.02em] text-obsidian">
          {i18n.t.closing.heading}
        </h2>

        <div>
          <a
            href={KICK_URL}
            target="_blank"
            rel="noopener noreferrer"
            class="fdn-btn-dark w-full panel:w-auto"
          >
            <SocialIcons name="kick" size={16} />
            <span>{i18n.t.closing.cta}</span>
            <SocialIcons name="arrow-up-right" size={15} />
          </a>
        </div>
      </div>

      <div
        class="hidden items-center justify-center border-l border-obsidian/20 bg-fdn-emerald p-8 stack:flex stack:w-[28%]"
        aria-hidden="true"
      >
        <div class="relative flex h-44 w-44 items-center justify-center border border-obsidian/30 bg-obsidian">
          <svg
            viewBox="0 0 180 180"
            class="pointer-events-none absolute inset-0 h-full w-full"
            fill="none"
          >
            <path d="M0 24H24M24 0V24M156 0V24M156 24H180M0 156H24M24 156V180M156 156V180M156 156H180" stroke="#9CFF2E" stroke-width="1.5" />
          </svg>
          <img
            src="/logo-fdn.webp"
            alt={i18n.t.closing.emblemAlt}
            width="124"
            height="124"
            loading="lazy"
            class="h-28 w-28 object-contain"
          />
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  @media (hover: hover) and (pointer: fine) {
    .fdn-social-tile:hover {
      background-color: var(--color-surface-400);
    }
  }
</style>
