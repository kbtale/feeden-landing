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
    ? "rounded-[5px] border border-off-white/15 bg-surface-900 p-0.5 font-mono text-[12px]"
    : "rounded-[5px] border border-obsidian/20 bg-warm-stone p-0.5 font-mono text-[12px]"}
>
  <SegmentedControlIndicator
    class={variant === "dark" ? "rounded-[3px] bg-fdn-lime" : "rounded-[3px] bg-obsidian"}
  />
  <SegmentedControlItem
    value="es"
    class={variant === "dark"
      ? "relative z-10 inline-flex h-[26px] min-w-8 cursor-pointer items-center justify-center px-2 font-mono text-[12px] font-medium text-muted-ink transition-colors duration-150 data-checked:text-obsidian"
      : "relative z-10 inline-flex h-[26px] min-w-8 cursor-pointer items-center justify-center px-2 font-mono text-[12px] font-medium text-obsidian/65 transition-colors duration-150 data-checked:text-fdn-lime"}
  >
    ES
  </SegmentedControlItem>
  <SegmentedControlItem
    value="en"
    class={variant === "dark"
      ? "relative z-10 inline-flex h-[26px] min-w-8 cursor-pointer items-center justify-center px-2 font-mono text-[12px] font-medium text-muted-ink transition-colors duration-150 data-checked:text-obsidian"
      : "relative z-10 inline-flex h-[26px] min-w-8 cursor-pointer items-center justify-center px-2 font-mono text-[12px] font-medium text-obsidian/65 transition-colors duration-150 data-checked:text-fdn-lime"}
  >
    EN
  </SegmentedControlItem>
</SegmentedControl>
