<script lang="ts">
  import Footer from "../lib/components/Footer.svelte";
  import type { Locale } from "../lib/i18n/translations";
  import I18nTestHost from "./I18nTestHost.svelte";

  interface Props {
    locale?: Locale;
  }

  let { locale = "es" }: Props = $props();
</script>

<I18nTestHost initialLocale={locale}>
  <Footer />
</I18nTestHost>
