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
  import { KICK_URL } from "../data/feeden";
  import { getI18n } from "../i18n/store.svelte";
  import type { KickStreamStatus } from "../utils/kickStatus";
  import LanguageSwitch from "./LanguageSwitch.svelte";
  import SocialIcons from "./SocialIcons.svelte";

  interface Props {
    status: KickStreamStatus;
    checking?: boolean;
  }

  let { status }: Props = $props();
  const i18n = getI18n();

  let isAtTop = $state(true);
  let drawerOpen = $state(false);
  let activeSection = $state<string>("");

  const sectionIds = ["en-vivo", "stream", "comunidad", "redes"] as const;

  $effect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const updateScroll = () => {
      isAtTop = window.scrollY <= 24;
      let current = "";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) {
          continue;
        }
        const rect = el.getBoundingClientRect();
        if (rect.top <= 160 && rect.bottom > 100) {
          current = id;
        }
      }
      activeSection = current;
    };

    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateScroll);
    };
  });

  const navLinks = $derived([
    { id: "en-vivo", href: "#en-vivo", label: i18n.t.nav.live },
    { id: "stream", href: "#stream", label: i18n.t.nav.stream },
    { id: "comunidad", href: "#comunidad", label: i18n.t.nav.community },
    { id: "redes", href: "#redes", label: i18n.t.nav.socials },
  ]);

  function handleNavClick() {
    drawerOpen = false;
  }
</script>

<header
  data-top={isAtTop ? "true" : "false"}
  class="fdn-navbar fixed inset-x-0 top-0 z-40 h-[var(--nav-height)] pt-[env(safe-area-inset-top,0px)] transition-[background-color,border-color] duration-[var(--dur-state)] ease-[var(--ease-fdn)]"
>
  <div class="fdn-container flex h-full items-center justify-between gap-4">
    <a
      href="#inicio"
      aria-label={i18n.t.a11y.brandHome}
      class="inline-flex min-h-11 shrink-0 items-center gap-2.5 text-off-white no-underline"
    >
      <img
        src="/logo-fdn.webp"
        alt={i18n.t.hero.logoAlt}
        width="26"
        height="26"
        class="h-[26px] w-[26px] shrink-0 object-contain"
      />
      <span
        class="font-display text-[21px] leading-none font-bold tracking-[-0.03em]"
        translate="no"
      >
        feeden
      </span>
    </a>

    <nav
      aria-label={i18n.t.a11y.mainNav}
      class="hidden items-center gap-7 bar:flex wide:gap-9"
    >
      <ul class="flex items-center gap-6 wide:gap-8">
        {#each navLinks as link (link.href)}
          <li>
            <a
              href={link.href}
              class="fdn-nav-link inline-flex min-h-9 items-center font-mono text-[14px] leading-none no-underline transition-colors duration-150 {activeSection === link.id
                ? 'text-fdn-lime'
                : 'text-warm-stone'}"
            >
              {link.label}
            </a>
          </li>
        {/each}
      </ul>

      <div class="flex items-center gap-3">
        <LanguageSwitch />

        {#if status.isLive}
          <a
            href={KICK_URL}
            target="_blank"
            rel="noopener noreferrer"
            class="fdn-btn-primary !min-h-[32px] !px-4 !text-[13px]"
          >
            <span class="inline-block h-2 w-2 rounded-full bg-obsidian" aria-hidden="true"></span>
            <span>{i18n.t.nav.watchKick}</span>
          </a>
        {:else}
          <a
            href={KICK_URL}
            target="_blank"
            rel="noopener noreferrer"
            class="fdn-btn-primary !min-h-[32px] !px-4 !text-[13px]"
          >
            <span>{i18n.t.nav.watchKick}</span>
          </a>
        {/if}
      </div>
    </nav>

    <div class="flex items-center gap-2 bar:hidden">
      <Drawer bind:open={drawerOpen} side="right">
        <DrawerTrigger
          aria-label={i18n.t.a11y.openMenu}
          class="inline-flex h-11 w-11 cursor-pointer items-center justify-center text-off-white transition-opacity duration-150 active:opacity-70"
        >
          <SocialIcons name="menu" size={22} />
        </DrawerTrigger>
        <DrawerBackdrop />
        <DrawerContent
          class="flex h-[100dvh] w-full max-w-none flex-col bg-obsidian px-5 pt-[env(safe-area-inset-top,0px)] pb-[calc(24px+env(safe-area-inset-bottom,0px))] text-off-white"
        >
          <div class="flex h-[54px] items-center justify-between border-b border-off-white/12">
            <div class="flex items-center gap-2.5">
              <img
                src="/logo-fdn.webp"
                alt=""
                width="26"
                height="26"
                class="h-[26px] w-[26px] shrink-0 object-contain"
              />
              <DrawerTitle class="font-display text-[21px] leading-none font-bold tracking-[-0.03em]">
                {i18n.t.a11y.mobileNavTitle}
              </DrawerTitle>
              <DrawerDescription class="sr-only">
                {i18n.t.a11y.mobileNavDescription}
              </DrawerDescription>
            </div>

            <DrawerClose
              aria-label={i18n.t.a11y.closeMenu}
              class="inline-flex h-11 w-11 cursor-pointer items-center justify-center text-off-white"
            >
              <SocialIcons name="close" size={22} />
            </DrawerClose>
          </div>

          <nav aria-label={i18n.t.a11y.mainNav} class="mt-2">
            <ul class="divide-y divide-off-white/12 border-b border-off-white/12">
              {#each navLinks as link (link.href)}
                <li>
                  <a
                    href={link.href}
                    onclick={handleNavClick}
                    class="flex min-h-[58px] items-center font-mono text-[18px] text-off-white no-underline"
                  >
                    {link.label}
                  </a>
                </li>
              {/each}
            </ul>
          </nav>

          <div class="mt-6 flex items-center justify-between gap-4">
            <a
              href={KICK_URL}
              target="_blank"
              rel="noopener noreferrer"
              class="fdn-btn-primary w-[214px]"
            >
              <span>{i18n.t.nav.watchKick}</span>
            </a>
            <LanguageSwitch />
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  </div>

  <div class="fdn-nav-rule" aria-hidden="true"></div>
</header>
