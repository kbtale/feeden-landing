<script lang="ts">
  import { untrack, type Snippet } from "svelte";
  import { createI18nStore, setI18n } from "../lib/i18n/store.svelte";
  import type { Locale } from "../lib/i18n/translations";

  interface Props {
    initialLocale?: Locale;
    children: Snippet;
  }

  let { initialLocale = "es", children }: Props = $props();
  const store = createI18nStore(untrack(() => initialLocale));
  setI18n(store);
</script>

{@render children()}
