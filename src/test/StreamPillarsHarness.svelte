<script lang="ts">
  import StreamPillars from "../lib/components/StreamPillars.svelte";
  import type { Locale } from "../lib/i18n/translations";
  import I18nTestHost from "./I18nTestHost.svelte";

  interface Props {
    locale?: Locale;
  }

  let { locale = "es" }: Props = $props();
</script>

<I18nTestHost initialLocale={locale}>
  <StreamPillars />
</I18nTestHost>
