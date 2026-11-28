<script lang="ts">
  import LiveAndVibeSlab from "../lib/components/LiveAndVibeSlab.svelte";
  import type { Locale } from "../lib/i18n/translations";
  import I18nTestHost from "./I18nTestHost.svelte";

  interface Props {
    locale?: Locale;
    onCopyChannel?: () => void;
    forceEmbedFallback?: boolean;
  }

  let {
    locale = "es",
    onCopyChannel = () => {},
    forceEmbedFallback = true,
  }: Props = $props();
</script>

<I18nTestHost initialLocale={locale}>
  <LiveAndVibeSlab {onCopyChannel} {forceEmbedFallback} />
</I18nTestHost>
