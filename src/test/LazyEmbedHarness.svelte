<script lang="ts">
  import LazyEmbed from "../lib/components/LazyEmbed.svelte";
  import type { Locale } from "../lib/i18n/translations";
  import I18nTestHost from "./I18nTestHost.svelte";

  interface Props {
    locale?: Locale;
    src: string;
    title: string;
    fallbackUrl: string;
    immediate?: boolean;
    forceFallback?: boolean;
  }

  let {
    locale = "es",
    src,
    title,
    fallbackUrl,
    immediate = false,
    forceFallback = false,
  }: Props = $props();
</script>

<I18nTestHost initialLocale={locale}>
  <LazyEmbed {src} {title} {fallbackUrl} {immediate} {forceFallback} />
</I18nTestHost>
