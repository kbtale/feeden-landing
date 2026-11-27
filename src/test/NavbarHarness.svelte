<script lang="ts">
  import Navbar from "../lib/components/Navbar.svelte";
  import type { Locale } from "../lib/i18n/translations";
  import type { KickStreamStatus } from "../lib/utils/kickStatus";
  import I18nTestHost from "./I18nTestHost.svelte";

  interface Props {
    locale?: Locale;
    status: KickStreamStatus;
    checking?: boolean;
  }

  let { locale = "es", status, checking = false }: Props = $props();
</script>

<I18nTestHost initialLocale={locale}>
  <Navbar {status} {checking} />
</I18nTestHost>
