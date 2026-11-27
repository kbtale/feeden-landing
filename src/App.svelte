<script lang="ts">
  import { createI18nStore, setI18n } from "./lib/i18n/store.svelte";
  import { KICK_URL, OFFICIAL_SOCIALS } from "./lib/data/feeden";
  import SocialIcons from "./lib/components/SocialIcons.svelte";

  const i18n = setI18n(createI18nStore());
</script>

<a class="skip-link" href="#contenido-principal">{i18n.t.a11y.skipToContent}</a>

<div class="fdn-sheet fdn-rails min-h-[100svh]">
  <main id="contenido-principal" class="fdn-container py-20">
    <div class="flex flex-wrap items-center justify-between gap-4 border-b border-rule-strong pb-6">
      <div class="flex items-center gap-3">
        <img
          src="/logo-fdn.webp"
          alt={i18n.t.hero.logoAlt}
          width="40"
          height="40"
          class="h-10 w-10 object-contain"
        />
        <span class="font-display text-2xl font-bold tracking-tight uppercase" translate="no">
          FEEDEN
        </span>
      </div>
      <div class="flex items-center gap-3">
        <button
          type="button"
          class="fdn-btn-outline"
          onclick={i18n.toggle}
          aria-label={i18n.t.a11y.languageSwitcher}
        >
          {i18n.locale.toUpperCase()}
        </button>
        <a href={KICK_URL} target="_blank" rel="noopener noreferrer" class="fdn-btn-primary">
          {i18n.t.nav.watchKick}
          <SocialIcons name="arrow-up-right" size={16} />
        </a>
      </div>
    </div>

    <section class="py-16">
      <p class="fdn-eyebrow text-fdn-lime">{i18n.t.hero.eyebrowOffline}</p>
      <h1 class="mt-4 max-w-4xl font-display text-[clamp(44px,6.25vw,90px)] leading-[1.02] font-bold tracking-[-0.01em] text-off-white">
        {i18n.t.hero.headline}
      </h1>
      <p class="mt-6 max-w-[48ch] text-lg text-body-ink">
        {i18n.t.hero.standfirst}
      </p>
      <div class="mt-10 flex flex-wrap gap-3">
        {#each OFFICIAL_SOCIALS as social (social.id)}
          <a
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            class="fdn-btn-outline"
          >
            <SocialIcons name={social.id} size={16} />
            <span>{social.name}</span>
          </a>
        {/each}
      </div>
    </section>
  </main>
</div>
