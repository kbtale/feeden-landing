<script lang="ts">
  import { onDestroy } from "svelte";
  import {
    createToaster,
    Toast,
    ToastDescription,
    ToastRegion,
    ToastTitle,
  } from "@ui-sdk/svelte/toast";
  import Hero from "./lib/components/Hero.svelte";
  import Navbar from "./lib/components/Navbar.svelte";
  import StreamStage from "./lib/components/StreamStage.svelte";
  import { KICK_URL } from "./lib/data/feeden";
  import { createI18nStore, setI18n } from "./lib/i18n/store.svelte";
  import {
    createUnknownStatus,
    fetchKickStatus,
    type KickStreamStatus,
  } from "./lib/utils/kickStatus";

  const i18n = setI18n(createI18nStore());
  const toaster = createToaster({ duration: 3200 });

  let status = $state<KickStreamStatus>(createUnknownStatus());
  let checking = $state(true);

  onDestroy(() => {
    toaster.dismiss();
  });

  $effect(() => {
    let active = true;

    async function refreshStatus() {
      const next = await fetchKickStatus();
      if (!active) {
        return;
      }
      status = next;
      checking = false;
    }

    refreshStatus();
    const timer = setInterval(refreshStatus, 60_000);

    return () => {
      active = false;
      clearInterval(timer);
    };
  });

  async function copyText(text: string, title: string, description?: string) {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      }
    } catch {
      return;
    }
    toaster.success(title, description ? { description } : undefined);
  }

  function handleCopyChannel() {
    void copyText(
      KICK_URL,
      i18n.t.hero.copiedLink,
      i18n.t.hero.copiedDescription,
    );
  }
</script>

<a class="skip-link" href="#contenido-principal">{i18n.t.a11y.skipToContent}</a>

<Navbar {status} {checking} />

<div class="fdn-sheet fdn-rails min-h-[100svh]">
  <main id="contenido-principal">
    <Hero {status} {checking} onCopyChannel={handleCopyChannel} />
    <StreamStage {status} onCopyChannel={handleCopyChannel} />
    <div id="stream" class="sr-only"></div>
    <div id="comunidad" class="sr-only"></div>
    <div id="redes" class="sr-only"></div>
  </main>
</div>

<ToastRegion {toaster} aria-label={i18n.t.a11y.toastRegion}>
  <Toast>
    <div class="min-w-0">
      <ToastTitle class="font-mono text-xs font-medium tracking-[0.06em] text-fdn-lime uppercase" />
      <ToastDescription class="mt-0.5 font-sans text-xs text-body-ink" />
    </div>
  </Toast>
</ToastRegion>
