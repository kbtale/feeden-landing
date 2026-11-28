<script lang="ts">
  import { DISCORD_INVITE_URL, OFFICIAL_SOCIALS } from "../data/feeden";
  import { getI18n } from "../i18n/store.svelte";
  import SocialIcons from "./SocialIcons.svelte";

  const i18n = getI18n();
</script>

<section id="redes" class="pt-14 pb-0 stack:pt-24">
  <div class="fdn-rail-frame bg-warm-stone text-obsidian">
    <div class="px-5 py-10 stack:px-11 stack:py-14">
      <p class="font-mono text-[13px] tracking-[0.04em] text-obsidian/65 uppercase">
        {i18n.t.socialsSlab.eyebrow}
      </p>

      <div class="mt-3 flex flex-col gap-5 stack:flex-row stack:items-center stack:justify-between">
        <h2 class="font-display text-[clamp(32px,3.1vw,46px)] leading-[1.08] font-bold tracking-[-0.02em] text-obsidian">
          {i18n.t.socialsSlab.heading}
        </h2>

        <a
          href={DISCORD_INVITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          class="fdn-btn-emerald w-full panel:w-[214px]"
        >
          <span>{i18n.t.socialsSlab.cta}</span>
          <SocialIcons name="arrow-up-right" size={14} />
        </a>
      </div>

      <p class="mt-4 max-w-[600px] text-[16px] leading-[1.45] text-obsidian/80">
        {i18n.t.socialsSlab.lead}
      </p>
    </div>

    <ul
      aria-label={i18n.t.a11y.officialSocials}
      class="hidden border-t border-obsidian/15 panel:grid panel:grid-cols-2"
    >
      {#each OFFICIAL_SOCIALS as social, index (social.id)}
        <li
          class="border-b border-obsidian/15 {index % 2 === 1
            ? 'border-l border-obsidian/15'
            : ''}"
        >
          <a
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            class="fdn-paper-row grid h-full grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] items-start gap-6 px-8 py-9 text-obsidian no-underline transition-colors duration-150 stack:px-11 stack:py-11"
          >
            <div class="min-w-0">
              <div class="flex items-center gap-2.5">
                <SocialIcons name={social.id} size={18} class="shrink-0 text-obsidian" />
                <h3 class="font-display text-[22px] leading-[1.1] font-bold text-obsidian">
                  {social.name}
                </h3>
              </div>
              <p class="mt-2 truncate font-mono text-xs text-obsidian/65" translate="no">
                {social.handle}
              </p>
            </div>

            <p class="text-[14px] leading-[1.35] text-obsidian/70">
              {social.note[i18n.locale]}
            </p>
          </a>
        </li>
      {/each}
    </ul>

    <div class="border-t border-obsidian/15 px-5 py-6 panel:hidden">
      <div class="fdn-no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2">
        {#each OFFICIAL_SOCIALS as social (social.id)}
          <a
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            class="flex w-[84%] shrink-0 snap-start flex-col justify-between gap-4 border border-obsidian/15 bg-off-white p-5 text-obsidian no-underline"
          >
            <div>
              <div class="flex items-center justify-between gap-2">
                <span class="inline-flex items-center gap-2 font-display text-xl font-bold">
                  <SocialIcons name={social.id} size={18} />
                  {social.name}
                </span>
                <SocialIcons name="arrow-up-right" size={14} class="text-obsidian/60" />
              </div>
              <p class="mt-1 font-mono text-xs text-obsidian/65" translate="no">
                {social.handle}
              </p>
            </div>
            <p class="text-sm leading-snug text-obsidian/75">
              {social.note[i18n.locale]}
            </p>
          </a>
        {/each}
      </div>
    </div>
  </div>
</section>

<style>
  @media (hover: hover) and (pointer: fine) {
    .fdn-paper-row:hover {
      background-color: rgba(13, 17, 20, 0.04);
    }
  }
</style>
