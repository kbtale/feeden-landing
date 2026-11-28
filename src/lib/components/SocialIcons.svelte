<script lang="ts">
  export type IconName =
    | "kick"
    | "youtube"
    | "tiktok"
    | "instagram"
    | "x"
    | "discord"
    | "arrow-up-right"
    | "arrow-right"
    | "copy"
    | "check"
    | "menu"
    | "close"
    | "gamepad"
    | "tv"
    | "message"
    | "trophy"
    | "users";

  interface Props {
    name: IconName;
    size?: number;
    class?: string;
  }

  let { name, size = 18, class: className = "" }: Props = $props();
</script>

{#if name === "kick"}
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    class={className}
  >
    <path d="M4 3h5v6h2V7h2V5h2V3h5v5h-2v2h-2v4h2v2h2v5h-5v-2h-2v-2h-2v-2H9v6H4V3Z" />
  </svg>
{:else if name === "youtube"}
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    class={className}
  >
    <path d="M21.8 8.001a2.75 2.75 0 0 0-1.94-1.95C18.14 5.58 12 5.58 12 5.58s-6.14 0-7.86.47A2.75 2.75 0 0 0 2.2 8c-.47 1.73-.47 5.34-.47 5.34s0 3.61.47 5.34a2.75 2.75 0 0 0 1.94 1.95c1.72.47 7.86.47 7.86.47s6.14 0 7.86-.47a2.75 2.75 0 0 0 1.94-1.95c.47-1.73.47-5.34.47-5.34s0-3.61-.47-5.34ZM10 16.5v-6.32l5.45 3.16L10 16.5Z" />
  </svg>
{:else if name === "tiktok"}
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    class={className}
  >
    <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48Z" />
  </svg>
{:else if name === "instagram"}
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="square"
    aria-hidden="true"
    class={className}
  >
    <rect x="3" y="3" width="18" height="18" rx="4" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
{:else if name === "x"}
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    class={className}
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
  </svg>
{:else if name === "discord"}
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    class={className}
  >
    <path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028ZM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418Zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418Z" />
  </svg>
{:else if name === "arrow-up-right"}
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="square"
    aria-hidden="true"
    class={className}
  >
    <path d="M7 17 17 7M9 7h8v8" />
  </svg>
{:else if name === "arrow-right"}
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="square"
    aria-hidden="true"
    class={className}
  >
    <path d="M5 12h13M13 6l6 6-6 6" />
  </svg>
{:else if name === "copy"}
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="square"
    aria-hidden="true"
    class={className}
  >
    <rect x="9" y="9" width="11" height="11" />
    <path d="M5 15H4V4h11v1" />
  </svg>
{:else if name === "check"}
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2.2"
    stroke-linecap="square"
    aria-hidden="true"
    class={className}
  >
    <path d="M5 13 9.5 17.5 19 7" />
  </svg>
{:else if name === "menu"}
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="square"
    aria-hidden="true"
    class={className}
  >
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
{:else if name === "close"}
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="square"
    aria-hidden="true"
    class={className}
  >
    <path d="M6 6 18 18M18 6 6 18" />
  </svg>
{:else if name === "gamepad"}
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="square"
    aria-hidden="true"
    class={className}
  >
    <rect x="2.5" y="6.5" width="19" height="11" />
    <path d="M7.5 9.5v5M5 12h5" />
    <circle cx="15.5" cy="11" r="1" fill="currentColor" stroke="none" />
    <circle cx="18" cy="13.5" r="1" fill="currentColor" stroke="none" />
  </svg>
{:else if name === "tv"}
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="square"
    aria-hidden="true"
    class={className}
  >
    <rect x="3" y="6" width="18" height="12" />
    <path d="M8 21h8M9 3l3 3 3-3" />
    <path d="M10 10.5v3l3-1.5-3-1.5Z" fill="currentColor" stroke="none" />
  </svg>
{:else if name === "message"}
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="square"
    aria-hidden="true"
    class={className}
  >
    <path d="M4 5h16v11H9l-5 4V5Z" />
    <path d="M8 10h8M8 13h5" />
  </svg>
{:else if name === "trophy"}
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="square"
    aria-hidden="true"
    class={className}
  >
    <path d="M7 4h10v6a5 5 0 0 1-10 0V4Z" />
    <path d="M7 6H4v3a3 3 0 0 0 3 3M17 6h3v3a3 3 0 0 1-3 3M12 15v4M8 19h8" />
  </svg>
{:else if name === "users"}
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="square"
    aria-hidden="true"
    class={className}
  >
    <circle cx="9" cy="8.5" r="3" />
    <path d="M3.5 19v-1.5A4.5 4.5 0 0 1 8 13h2a4.5 4.5 0 0 1 4.5 4.5V19" />
    <circle cx="16.5" cy="9.5" r="2.2" />
    <path d="M16.5 14h1A3.5 3.5 0 0 1 21 17.5V19" />
  </svg>
{/if}
