<script lang="ts">
  import { getI18n } from "../i18n/store.svelte";
  import SocialIcons from "./SocialIcons.svelte";

  interface Props {
    src: string;
    title: string;
    fallbackUrl: string;
    immediate?: boolean;
    forceFallback?: boolean;
  }

  let {
    src,
    title,
    fallbackUrl,
    immediate = false,
    forceFallback = false,
  }: Props = $props();

  const i18n = getI18n();

  let hostEl = $state<HTMLDivElement | null>(null);
  let shouldLoad = $state(false);
  let iframeLoaded = $state(false);
  let hasError = $state(false);

  $effect(() => {
    if (forceFallback) {
      hasError = true;
      return;
    }
    if (immediate) {
      shouldLoad = true;
      return;
    }
    if (!hostEl || typeof window === "undefined") {
      return;
    }

    let idleHandle: number | null = null;
    let timeoutHandle: ReturnType<typeof setTimeout> | null = null;

    const triggerLoad = () => {
      if (typeof window.requestIdleCallback === "function") {
        idleHandle = window.requestIdleCallback(
          () => {
            shouldLoad = true;
          },
          { timeout: 600 },
        );
      } else {
        timeoutHandle = setTimeout(() => {
          shouldLoad = true;
        }, 120);
      }
    };

    if (typeof IntersectionObserver !== "function") {
      triggerLoad();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          triggerLoad();
        }
      },
      { rootMargin: "200px 0px" },
    );

    observer.observe(hostEl);

    return () => {
      observer.disconnect();
      if (idleHandle !== null && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleHandle);
      }
      if (timeoutHandle !== null) {
        clearTimeout(timeoutHandle);
      }
    };
  });

  function retryEmbed() {
    hasError = false;
    iframeLoaded = false;
    shouldLoad = true;
  }
</script>

<div
  bind:this={hostEl}
  class="relative aspect-video w-full overflow-hidden border border-rule-strong bg-surface-900"
>
  {#if hasError}
    <div class="flex h-full w-full flex-col items-center justify-center gap-4 p-6 text-center">
      <div class="flex h-12 w-12 items-center justify-center border border-rule-strong bg-surface-700 text-fdn-lime">
        <SocialIcons name="kick" size={22} />
      </div>
      <div class="max-w-md space-y-2">
        <h3 class="font-display text-2xl font-bold text-off-white">
          {i18n.t.stage.fallbackTitle}
        </h3>
        <p class="text-sm text-body-ink">
          {i18n.t.stage.fallbackBody}
        </p>
      </div>
      <div class="flex flex-wrap items-center justify-center gap-3">
        <a
          href={fallbackUrl}
          target="_blank"
          rel="noopener noreferrer"
          class="fdn-btn-primary"
        >
          <span>{i18n.t.stage.fallbackCta}</span>
          <SocialIcons name="arrow-up-right" size={15} />
        </a>
        {#if !forceFallback}
          <button type="button" class="fdn-btn-outline" onclick={retryEmbed}>
            {i18n.t.stage.loadPlayerCta}
          </button>
        {/if}
      </div>
    </div>
  {:else}
    {#if shouldLoad}
      <iframe
        {src}
        {title}
        class="h-full w-full border-0 transition-opacity duration-300 {iframeLoaded
          ? 'opacity-100'
          : 'opacity-0'}"
        allow="autoplay; fullscreen; picture-in-picture"
        referrerpolicy="no-referrer-when-downgrade"
        onload={() => {
          iframeLoaded = true;
        }}
        onerror={() => {
          hasError = true;
        }}
      ></iframe>
    {/if}

    {#if !shouldLoad || !iframeLoaded}
      <div
        class="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-surface-900 p-6 text-center"
        aria-live="polite"
      >
        <div class="flex items-center gap-2 font-mono text-xs tracking-[0.08em] text-fdn-lime uppercase">
          <span class="inline-block h-2 w-2 bg-fdn-lime motion-safe:animate-pulse" aria-hidden="true"></span>
          <span>{i18n.t.stage.skeletonLabel}</span>
        </div>
        <a
          href={fallbackUrl}
          target="_blank"
          rel="noopener noreferrer"
          class="fdn-btn-outline"
        >
          <span>{i18n.t.stage.fallbackCta}</span>
          <SocialIcons name="arrow-up-right" size={15} />
        </a>
      </div>
    {/if}
  {/if}
</div>
