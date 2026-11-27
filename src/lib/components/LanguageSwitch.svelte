<script lang="ts">
  import {
    SegmentedControl,
    SegmentedControlIndicator,
    SegmentedControlItem,
  } from "@ui-sdk/svelte/segmented-control";
  import { getI18n, isValidLocale } from "../i18n/store.svelte";

  interface Props {
    variant?: "dark" | "light";
  }

  let { variant = "dark" }: Props = $props();
  const i18n = getI18n();

  function handleLocaleChange(next: string | null) {
    if (isValidLocale(next)) {
      i18n.setLocale(next);
    }
  }
</script>

<SegmentedControl
  aria-label={i18n.t.a11y.languageSwitcher}
  value={i18n.locale}
  onValueChange={handleLocaleChange}
  class={variant === "dark"
    ? "border border-rule-strong bg-surface-900 p-0.5 font-mono text-xs uppercase"
    : "border border-obsidian/25 bg-warm-stone p-0.5 font-mono text-xs uppercase"}
>
  <SegmentedControlIndicator
    class={variant === "dark" ? "bg-fdn-lime" : "bg-obsidian"}
  />
  <SegmentedControlItem
    value="es"
    class={variant === "dark"
      ? "relative z-10 inline-flex min-h-9 min-w-10 cursor-pointer items-center justify-center px-2.5 font-mono text-xs font-medium tracking-wider text-muted-ink transition-colors duration-150 data-checked:text-obsidian"
      : "relative z-10 inline-flex min-h-9 min-w-10 cursor-pointer items-center justify-center px-2.5 font-mono text-xs font-medium tracking-wider text-obsidian/70 transition-colors duration-150 data-checked:text-fdn-lime"}
  >
    ES
  </SegmentedControlItem>
  <SegmentedControlItem
    value="en"
    class={variant === "dark"
      ? "relative z-10 inline-flex min-h-9 min-w-10 cursor-pointer items-center justify-center px-2.5 font-mono text-xs font-medium tracking-wider text-muted-ink transition-colors duration-150 data-checked:text-obsidian"
      : "relative z-10 inline-flex min-h-9 min-w-10 cursor-pointer items-center justify-center px-2.5 font-mono text-xs font-medium tracking-wider text-obsidian/70 transition-colors duration-150 data-checked:text-fdn-lime"}
  >
    EN
  </SegmentedControlItem>
</SegmentedControl>
