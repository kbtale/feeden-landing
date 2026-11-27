<script lang="ts">
  import {
    Dialog,
    DialogBackdrop,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogTitle,
  } from "@ui-sdk/svelte/dialog";
  import { DISCORD_INVITE_URL, X_PROFILE_URL } from "../data/feeden";
  import { getI18n } from "../i18n/store.svelte";
  import SocialIcons from "./SocialIcons.svelte";

  interface Props {
    open?: boolean;
    onCopyTemplate: (template: string) => void;
  }

  let { open = $bindable(false), onCopyTemplate }: Props = $props();
  const i18n = getI18n();

  let copied = $state(false);

  function handleCopy() {
    onCopyTemplate(i18n.t.community.dialog.templateBody);
    copied = true;
    setTimeout(() => {
      copied = false;
    }, 1800);
  }
</script>

<Dialog bind:open>
  <DialogBackdrop />
  <DialogContent class="p-0">
    <div class="flex items-start justify-between gap-4 border-b border-rule-strong bg-surface-900 px-5 py-4 panel:px-6">
      <div class="min-w-0">
        <DialogTitle class="font-display text-3xl leading-none font-bold text-off-white">
          {i18n.t.community.dialog.title}
        </DialogTitle>
        <DialogDescription class="mt-2 text-sm text-body-ink">
          {i18n.t.community.dialog.description}
        </DialogDescription>
      </div>

      <DialogClose
        aria-label={i18n.t.a11y.closeDialog}
        class="inline-flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center border border-rule-strong bg-obsidian text-off-white transition-colors duration-150 hover:border-fdn-lime hover:text-fdn-lime"
      >
        <SocialIcons name="close" size={18} />
      </DialogClose>
    </div>

    <div class="space-y-5 p-5 panel:p-6">
      <div>
        <p class="font-mono text-[11px] font-medium tracking-[0.08em] text-fdn-lime uppercase">
          {i18n.t.community.dialog.stepsTitle}
        </p>
        <ol class="mt-3 space-y-2.5">
          {#each i18n.t.community.dialog.steps as step, index (index)}
            <li class="flex items-start gap-3 text-sm text-body-ink">
              <span class="font-mono text-xs font-medium text-fdn-lime">0{index + 1}</span>
              <span class="min-w-0 flex-1">{step}</span>
            </li>
          {/each}
        </ol>
      </div>

      <div>
        <div class="flex flex-wrap items-center justify-between gap-2">
          <p class="font-mono text-[11px] font-medium tracking-[0.08em] text-muted-ink uppercase">
            {i18n.t.community.dialog.templateLabel}
          </p>
          <button
            type="button"
            onclick={handleCopy}
            class="inline-flex min-h-9 shrink-0 cursor-pointer items-center gap-1.5 border border-fdn-lime bg-fdn-lime px-3 font-mono text-xs font-medium tracking-[0.06em] whitespace-nowrap text-obsidian uppercase transition-colors duration-150 hover:bg-transparent hover:text-fdn-lime active:scale-[0.97]"
          >
            <SocialIcons name={copied ? "check" : "copy"} size={13} />
            <span>
              {copied
                ? i18n.t.community.dialog.copiedTemplate
                : i18n.t.community.dialog.copyTemplate}
            </span>
          </button>
        </div>

        <pre class="mt-2.5 overflow-x-auto border border-rule-strong bg-surface-900 p-4 font-mono text-xs leading-relaxed whitespace-pre-wrap break-words text-off-white select-all">{i18n.t.community.dialog.templateBody}</pre>
      </div>

      <div class="flex flex-col gap-2.5 border-t border-rule-strong pt-4 panel:flex-row panel:items-center panel:justify-between">
        <div class="flex flex-col gap-2 panel:flex-row">
          <a
            href={DISCORD_INVITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            class="fdn-btn-primary"
          >
            <SocialIcons name="discord" size={15} />
            <span>{i18n.t.community.dialog.openDiscord}</span>
            <SocialIcons name="arrow-up-right" size={14} />
          </a>

          <a
            href={X_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            class="fdn-btn-outline"
          >
            <SocialIcons name="x" size={14} />
            <span>{i18n.t.community.dialog.openX}</span>
          </a>
        </div>

        <DialogClose class="fdn-btn-outline">
          {i18n.t.community.dialog.close}
        </DialogClose>
      </div>
    </div>
  </DialogContent>
</Dialog>
