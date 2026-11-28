<script lang="ts">
  import HeroAndMorphStage from "../lib/components/HeroAndMorphStage.svelte";
  import type { Locale } from "../lib/i18n/translations";
  import type { KickStreamStatus } from "../lib/utils/kickStatus";
  import I18nTestHost from "./I18nTestHost.svelte";

  interface Props {
    locale?: Locale;
    status: KickStreamStatus;
    onCopyChannel?: () => void;
  }

  let {
    locale = "es",
    status,
    onCopyChannel = () => {},
  }: Props = $props();
</script>

<I18nTestHost initialLocale={locale}>
  <HeroAndMorphStage {status} {onCopyChannel} />
</I18nTestHost>
