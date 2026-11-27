<script lang="ts">
  import LiveStatusPill from "../lib/components/LiveStatusPill.svelte";
  import type { Locale } from "../lib/i18n/translations";
  import type { KickStreamStatus } from "../lib/utils/kickStatus";
  import I18nTestHost from "./I18nTestHost.svelte";

  interface Props {
    locale?: Locale;
    status: KickStreamStatus;
    checking?: boolean;
    compact?: boolean;
  }

  let { locale = "es", status, checking = false, compact = false }: Props = $props();
</script>

<I18nTestHost initialLocale={locale}>
  <LiveStatusPill {status} {checking} {compact} />
</I18nTestHost>
