<script lang="ts">
  import {
    Drawer,
    DrawerBackdrop,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerTitle,
    DrawerTrigger,
  } from "@ui-sdk/svelte/drawer";
  import { KICK_URL, OFFICIAL_SOCIALS } from "../data/feeden";
  import { getI18n } from "../i18n/store.svelte";
  import type { KickStreamStatus } from "../utils/kickStatus";
  import LanguageSwitch from "./LanguageSwitch.svelte";
  import LiveStatusPill from "./LiveStatusPill.svelte";
  import SocialIcons from "./SocialIcons.svelte";

  interface Props {
    status: KickStreamStatus;
    checking?: boolean;
  }

  let { status, checking = false }: Props = $props();
  const i18n = getI18n();

  let isAtTop = $state(true);
  let drawerOpen = $state(false);

  $effect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const updateScroll = () => {
      isAtTop = window.scrollY <= 24;
    };
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateScroll);
    };
  });

  const navLinks = $derived([
    { href: "#en-vivo", label: i18n.t.nav.live },
    { href: "#stream", label: i18n.t.nav.stream },
    { href: "#comunidad", label: i18n.t.nav.community },
    { href: "#redes", label: i18n.t.nav.socials },
  ]);

  function handleNavClick() {
    drawerOpen = false;
  }
</script>

<header
  data-top={isAtTop ? "true" : "false"}
  class="fdn-navbar fixed inset-x-0 top-0 z-40 h-[var(--nav-height)] pt-[env(safe-area-inset-top,0px)] transition-[background-color,border-color] duration-[var(--dur-state)] ease-[var(--ease-cg)]"
>
  <div class="fdn-container flex h-full items-center justify-between gap-4">
    <a
      href="#inicio"
      aria-label={i18n.t.a11y.brandHome}
      class="inline-flex min-h-11 shrink-0 items-center gap-3 text-off-white no-underline"
    >
      <img
        src="/logo-fdn.webp"
        alt={i18n.t.hero.logoAlt}
        width="36"
        height="36"
        class="h-9 w-9 shrink-0 object-contain"
      />
      <span
        class="font-display text-[26px] leading-none font-bold tracking-[0.02em] uppercase"
        translate="no"
      >
        FEEDEN
      </span>
    </a>

    <nav
      aria-label={i18n.t.a11y.mainNav}
      class="hidden items-center gap-6 bar:flex"
    >
      <ul class="flex items-center gap-5">
        {#each navLinks as link (link.href)}
          <li>
            <a
              href={link.href}
              class="fdn-nav-link inline-flex min-h-11 items-center font-mono text-[13px] tracking-[0.06em] text-body-ink uppercase no-underline transition-colors duration-150"
            >
              {link.label}
            </a>
          </li>
        {/each}
      </ul>

      <div class="flex items-center gap-3 border-l border-rule-strong pl-5">
        <LanguageSwitch />
        <LiveStatusPill {status} {checking} compact />
        <a
          href={KICK_URL}
          target="_blank"
          rel="noopener noreferrer"
          class="fdn-btn-primary"
        >
          <span>{i18n.t.nav.watchKick}</span>
          <SocialIcons name="arrow-up-right" size={15} />
        </a>
      </div>
    </nav>

    <div class="flex items-center gap-2 bar:hidden">
      <LiveStatusPill {status} {checking} compact />

      <Drawer bind:open={drawerOpen} side="right">
        <DrawerTrigger
          aria-label={i18n.t.a11y.openMenu}
          class="inline-flex h-11 w-11 cursor-pointer items-center justify-center border border-rule-strong bg-surface-900 text-off-white transition-colors duration-150 active:scale-[0.97]"
        >
          <SocialIcons name="menu" size={20} />
        </DrawerTrigger>
        <DrawerBackdrop />
        <DrawerContent
          class="flex h-[100dvh] w-full max-w-[420px] flex-col justify-between border-l border-rule-strong bg-obsidian px-5 pt-[calc(20px+env(safe-area-inset-top,0px))] pb-[calc(24px+env(safe-area-inset-bottom,0px))] text-off-white"
        >
          <div>
            <div class="flex items-center justify-between border-b border-rule-strong pb-4">
              <div class="flex items-center gap-3">
                <img
                  src="/logo-fdn.webp"
                  alt=""
                  width="32"
                  height="32"
                  class="h-8 w-8 shrink-0 object-contain"
                />
                <div>
                  <DrawerTitle class="font-display text-2xl leading-none font-bold uppercase">
                    {i18n.t.a11y.mobileNavTitle}
                  </DrawerTitle>
                  <DrawerDescription class="sr-only">
                    {i18n.t.a11y.mobileNavDescription}
                  </DrawerDescription>
                </div>
              </div>

              <DrawerClose
                aria-label={i18n.t.a11y.closeMenu}
                class="inline-flex h-11 w-11 cursor-pointer items-center justify-center border border-rule-strong bg-surface-900 text-off-white"
              >
                <SocialIcons name="close" size={20} />
              </DrawerClose>
            </div>

            <div class="flex items-center justify-between gap-3 border-b border-rule-strong py-4">
              <LiveStatusPill {status} {checking} />
              <LanguageSwitch />
            </div>

            <nav aria-label={i18n.t.a11y.mainNav} class="mt-2">
              <ul class="divide-y divide-rule-strong border-b border-rule-strong">
                {#each navLinks as link, idx (link.href)}
                  <li>
                    <a
                      href={link.href}
                      onclick={handleNavClick}
                      class="flex min-h-[54px] items-center justify-between font-mono text-sm tracking-[0.08em] text-off-white uppercase no-underline"
                    >
                      <span>{link.label}</span>
                      <span class="text-xs text-fdn-lime">0{idx + 1}</span>
                    </a>
                  </li>
                {/each}
              </ul>
            </nav>
          </div>

          <div class="mt-6 space-y-4">
            <div class="grid grid-cols-2 gap-2 min-[400px]:grid-cols-3" aria-label={i18n.t.a11y.officialSocials}>
              {#each OFFICIAL_SOCIALS as social (social.id)}
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex min-h-11 items-center justify-center gap-2 border border-rule-strong bg-surface-700 px-2 font-mono text-xs text-body-ink no-underline"
                >
                  <SocialIcons name={social.id} size={15} />
                  <span class="truncate">{social.name}</span>
                </a>
              {/each}
            </div>

            <a
              href={KICK_URL}
              target="_blank"
              rel="noopener noreferrer"
              class="fdn-btn-primary w-full"
            >
              <span>{i18n.t.nav.watchKick}</span>
              <SocialIcons name="arrow-up-right" size={16} />
            </a>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  </div>

  <div class="fdn-nav-rule" aria-hidden="true"></div>
</header>

<style>
  .fdn-navbar[data-top="true"] {
    background-color: transparent;
  }

  .fdn-navbar[data-top="false"] {
    background-color: var(--color-obsidian);
  }

  .fdn-nav-rule {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 1px;
    background-color: var(--color-rule-strong);
    transform-origin: left center;
    animation: nav-rule var(--dur-draw) var(--ease-cg) both;
  }

  @media (hover: hover) and (pointer: fine) {
    .fdn-nav-link:hover {
      color: var(--color-fdn-lime);
    }
  }
</style>
