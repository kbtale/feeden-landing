<script lang="ts">
  import CommunityHub from "../lib/components/CommunityHub.svelte";
  import type { CommunityAccount } from "../lib/data/feeden";
  import type { Locale } from "../lib/i18n/translations";
  import I18nTestHost from "./I18nTestHost.svelte";

  interface Props {
    locale?: Locale;
    accounts?: readonly CommunityAccount[];
    onCopyTemplate?: (template: string) => void;
  }

  let {
    locale = "es",
    accounts,
    onCopyTemplate = () => {},
  }: Props = $props();
</script>

<I18nTestHost initialLocale={locale}>
  <CommunityHub {accounts} {onCopyTemplate} />
</I18nTestHost>
