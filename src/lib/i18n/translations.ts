export type Locale = "es" | "en";

export interface Translations {
  meta: {
    title: string;
    description: string;
  };
  a11y: {
    skipToContent: string;
    mainNav: string;
    languageSwitcher: string;
    openMenu: string;
    closeMenu: string;
    mobileNavTitle: string;
    mobileNavDescription: string;
    officialSocials: string;
    streamDeskTabs: string;
    communityFilterTabs: string;
    closeDialog: string;
    toastRegion: string;
    brandHome: string;
  };
  nav: {
    live: string;
    stream: string;
    community: string;
    socials: string;
    watchKick: string;
  };
  status: {
    live: string;
    offline: string;
    checking: string;
    viewersSingular: string;
    viewersPlural: string;
    liveInKick: string;
    channelSummary: string;
    lastChecked: string;
    unknownTitle: string;
    offlineSubtitle: string;
  };
  hero: {
    eyebrowOffline: string;
    eyebrowLive: string;
    headline: string;
    standfirst: string;
    primaryCta: string;
    secondaryCta: string;
    telemetryStatus: string;
    telemetryChannel: string;
    telemetryCategory: string;
    telemetryViewers: string;
    telemetryDefaultCategory: string;
    telemetryOfflineValue: string;
    telemetryLiveValue: string;
    copyLink: string;
    copiedLink: string;
    copiedDescription: string;
    logoAlt: string;
  };
  stage: {
    eyebrow: string;
    heading: string;
    subheading: string;
    playerTitle: string;
    skeletonLabel: string;
    fallbackTitle: string;
    fallbackBody: string;
    fallbackCta: string;
    loadPlayerCta: string;
    tabs: {
      status: string;
      games: string;
      info: string;
    };
    desk: {
      nowPlaying: string;
      categoryLabel: string;
      viewersLabel: string;
      channelLabel: string;
      openKick: string;
      copyChannel: string;
      offlineHeadline: string;
      offlineCopy: string;
      gamesCaption: string;
      languageLabel: string;
      languageValue: string;
      handleLabel: string;
      discordLabel: string;
      discordCta: string;
      rulesHeading: string;
      rules: readonly string[];
    };
  };
  pillars: {
    eyebrow: string;
    heading: string;
    items: readonly {
      id: string;
      index: string;
      title: string;
      description: string;
      tag: string;
    }[];
  };
  community: {
    eyebrow: string;
    heading: string;
    description: string;
    submitCta: string;
    badgeOfficial: string;
    badgeFan: string;
    visitCta: string;
    filters: {
      all: string;
      youtube: string;
      tiktok: string;
      social: string;
      discord: string;
    };
    emptyTitle: string;
    emptyBody: string;
    emptyCta: string;
    countLabel: string;
    dialog: {
      title: string;
      description: string;
      stepsTitle: string;
      steps: readonly string[];
      templateLabel: string;
      templateBody: string;
      copyTemplate: string;
      copiedTemplate: string;
      openDiscord: string;
      openX: string;
      close: string;
    };
  };
  closing: {
    socialsEyebrow: string;
    socialsHeading: string;
    heading: string;
    cta: string;
    emblemAlt: string;
  };
  footer: {
    rights: string;
    builtBy: string;
    switchLabel: string;
  };
}

export const translations: Record<Locale, Translations> = {
  es: {
    meta: {
      title: "Feeden (FDN) | Streams en vivo en Kick",
      description:
        "Landing oficial de Feeden (FDN). Streams en vivo en Kick: gaming, reacciones, debates de futbol, Just Chatting y cuentas de clips de la comunidad.",
    },
    a11y: {
      skipToContent: "Ir al contenido principal",
      mainNav: "Navegacion principal",
      languageSwitcher: "Cambiar idioma",
      openMenu: "Abrir menu de navegacion",
      closeMenu: "Cerrar menu de navegacion",
      mobileNavTitle: "Menu de Feeden",
      mobileNavDescription: "Accesos rapidos al stream, comunidad y redes oficiales.",
      officialSocials: "Redes oficiales de Feeden",
      streamDeskTabs: "Panel de informacion del stream",
      communityFilterTabs: "Filtrar cuentas de la comunidad por plataforma",
      closeDialog: "Cerrar ventana",
      toastRegion: "Notificaciones",
      brandHome: "Feeden inicio",
    },
    nav: {
      live: "En Vivo",
      stream: "El Stream",
      community: "Comunidad",
      socials: "Redes",
      watchKick: "Ver en Kick",
    },
    status: {
      live: "EN VIVO",
      offline: "OFFLINE",
      checking: "VERIFICANDO",
      viewersSingular: "viewer",
      viewersPlural: "viewers",
      liveInKick: "EN VIVO EN KICK",
      channelSummary: "KICK.COM/FEEDEN · STREAMER ARG",
      lastChecked: "Actualizado",
      unknownTitle: "Transmision en Kick",
      offlineSubtitle: "Cuando se prenda el vivo aparece aca mismo.",
    },
    hero: {
      eyebrowOffline: "KICK.COM/FEEDEN · STREAMER ARG",
      eyebrowLive: "EN VIVO EN KICK",
      headline: "Prendé el stream, sumate a la FDN.",
      standfirst:
        "Gaming en vivo, reacciones, debates de futbol y Just Chatting sin filtro desde Argentina. Todo el vivo y las cuentas de la comunidad en un solo lugar.",
      primaryCta: "Ver en Kick",
      secondaryCta: "Ir al reproductor",
      telemetryStatus: "ESTADO",
      telemetryChannel: "CANAL",
      telemetryCategory: "CATEGORIA",
      telemetryViewers: "VIEWERS",
      telemetryDefaultCategory: "Gaming / Reacciones / Futbol",
      telemetryOfflineValue: "EN ESPERA",
      telemetryLiveValue: "AL AIRE",
      copyLink: "Copiar link del canal",
      copiedLink: "Link copiado",
      copiedDescription: "kick.com/feeden listo para compartir.",
      logoAlt: "Emblema oficial de Feeden FDN",
    },
    stage: {
      eyebrow: "EN VIVO",
      heading: "El stream, directo acá.",
      subheading: "Reproductor oficial de Kick y mesa de control del canal.",
      playerTitle: "Reproductor en vivo de Feeden en Kick",
      skeletonLabel: "Preparando reproductor de Kick…",
      fallbackTitle: "Reproductor de Kick no disponible en este navegador",
      fallbackBody: "Si tu navegador bloquea embeds externos o el stream esta offline, podes abrir el canal directo en Kick.",
      fallbackCta: "Abrir kick.com/feeden",
      loadPlayerCta: "Cargar reproductor",
      tabs: {
        status: "Estado",
        games: "Juegos & Vibe",
        info: "Chat & Info",
      },
      desk: {
        nowPlaying: "TITULO DEL VIVO",
        categoryLabel: "CATEGORIA",
        viewersLabel: "AUDIENCIA ACTUAL",
        channelLabel: "SEÑAL DIRECTA",
        openKick: "Abrir en Kick",
        copyChannel: "Copiar enlace",
        offlineHeadline: "Stream offline en este momento",
        offlineCopy:
          "Seguí el canal en Kick o sumate al Discord de la FDN para enterarte ni bien prenda.",
        gamesCaption: "ROTACION HABITUAL DEL CANAL",
        languageLabel: "IDIOMA",
        languageValue: "Español (Argentina)",
        handleLabel: "CANAL OFICIAL",
        discordLabel: "COMUNIDAD",
        discordCta: "Entrar al Discord FDN",
        rulesHeading: "CODIGOS DEL CHAT",
        rules: [
          "Buena onda en el chat, cero spam ni links raros.",
          "Los debates de futbol se pican con respeto.",
          "Clips y mejores momentos van directo a la comunidad.",
        ],
      },
    },
    pillars: {
      eyebrow: "EL STREAM",
      heading: "Lo que pasa cuando se prende.",
      items: [
        {
          id: "gaming",
          index: "01",
          title: "Gaming en vivo",
          description:
            "Partidas competitivas y caoticas en Fortnite, Fall Guys, Counter-Strike, Clash Royale y Roblox con el chat encima.",
          tag: "COMPETITIVO & CAOS",
        },
        {
          id: "reactions",
          index: "02",
          title: "Reacciones y futbol",
          description:
            "Partidos, polemicas, videos virales y debates futboleros en vivo con toda la comunidad opinando.",
          tag: "FUTBOL & VIRALES",
        },
        {
          id: "just-chatting",
          index: "03",
          title: "Just Chatting y humor",
          description:
            "Charlas largas, anecdotas y el ida y vuelta diario con la gente que bancó el stream desde el principio.",
          tag: "CONVERSACION",
        },
        {
          id: "events",
          index: "04",
          title: "Eventos y torneos FDN",
          description:
            "Showmatches, cruces especiales, desafios contra otros creadores y noches tematicas armadas para la comunidad.",
          tag: "EVENTOS ESPECIALES",
        },
        {
          id: "community-clips",
          index: "05",
          title: "Comunidad 24/7",
          description:
            "Discord activo todo el dia y canales de clips creados por fans que suben los mejores recortes de cada transmision.",
          tag: "CLIPS & ARCHIVO",
        },
      ],
    },
    community: {
      eyebrow: "COMUNIDAD FDN",
      heading: "Cuentas de clips y comunidad.",
      description:
        "La FDN no termina cuando se apaga el vivo. Aca estan el Discord oficial y las cuentas de clips creadas por fans que archivan los mejores momentos en YouTube, TikTok y redes.",
      submitCta: "Sumar tu cuenta de clips",
      badgeOfficial: "OFICIAL",
      badgeFan: "FAN CLIPS",
      visitCta: "Visitar",
      filters: {
        all: "Todos",
        youtube: "YouTube",
        tiktok: "TikTok",
        social: "Instagram / X",
        discord: "Discord",
      },
      emptyTitle: "Todavia no hay cuentas cargadas en esta plataforma",
      emptyBody: "Tenes una cuenta fan de clips o recortes de Feeden aca? Enviala y la sumamos al directorio.",
      emptyCta: "Enviar mi cuenta",
      countLabel: "cuentas activas",
      dialog: {
        title: "Sumar cuenta fan de clips",
        description:
          "Si manejas un canal de clips o archivo de la FDN, copia esta plantilla y mandanos los datos por Discord o X para agregarte al directorio.",
        stepsTitle: "COMO PARTICIPAR",
        steps: [
          "Copia la plantilla con el nombre de tu cuenta, plataforma y link directo.",
          "Enviala en el canal de comunidad de Discord o por mensaje en X.",
          "Una vez verificada, aparece en el hub de comunidad FDN.",
        ],
        templateLabel: "PLANTILLA DE ENVIO",
        templateBody:
          "Nombre de la cuenta:\nPlataforma (YouTube / TikTok / Instagram / X):\nUsuario (@handle):\nLink del canal:\nDescripcion corta:",
        copyTemplate: "Copiar plantilla",
        copiedTemplate: "Plantilla copiada",
        openDiscord: "Abrir Discord",
        openX: "Enviar por X",
        close: "Cerrar",
      },
    },
    closing: {
      socialsEyebrow: "REDES OFICIALES",
      socialsHeading: "Seguí a Feeden en todas las plataformas.",
      heading: "Nos vemos en el próximo vivo.",
      cta: "Ver en Kick",
      emblemAlt: "Marca geometrica FDN",
    },
    footer: {
      rights: "Feeden (FDN) · Comunidad oficial de streams en Kick",
      builtBy: "Hecho por kbtale",
      switchLabel: "Idioma",
    },
  },
  en: {
    meta: {
      title: "Feeden (FDN) | Live Streams on Kick",
      description:
        "Official landing page for Feeden (FDN). Live Kick streams covering gaming, reactions, football debates, Just Chatting, and fan clip channels.",
    },
    a11y: {
      skipToContent: "Skip to main content",
      mainNav: "Main navigation",
      languageSwitcher: "Switch language",
      openMenu: "Open navigation menu",
      closeMenu: "Close navigation menu",
      mobileNavTitle: "Feeden Menu",
      mobileNavDescription: "Quick links to the live stream, community hub, and official socials.",
      officialSocials: "Feeden official social links",
      streamDeskTabs: "Stream desk information tabs",
      communityFilterTabs: "Filter community accounts by platform",
      closeDialog: "Close dialog",
      toastRegion: "Notifications",
      brandHome: "Feeden home",
    },
    nav: {
      live: "Live",
      stream: "The Stream",
      community: "Community",
      socials: "Socials",
      watchKick: "Watch on Kick",
    },
    status: {
      live: "LIVE",
      offline: "OFFLINE",
      checking: "CHECKING",
      viewersSingular: "viewer",
      viewersPlural: "viewers",
      liveInKick: "LIVE ON KICK",
      channelSummary: "KICK.COM/FEEDEN · ARG STREAMER",
      lastChecked: "Updated",
      unknownTitle: "Kick Broadcast",
      offlineSubtitle: "The stream appears right here the moment Feeden goes live.",
    },
    hero: {
      eyebrowOffline: "KICK.COM/FEEDEN · ARG STREAMER",
      eyebrowLive: "LIVE ON KICK",
      headline: "Tune in live, join the FDN.",
      standfirst:
        "Live gaming, unfiltered reactions, football debates, and Just Chatting from Argentina. The live broadcast and every community clip channel in one place.",
      primaryCta: "Watch on Kick",
      secondaryCta: "Jump to Player",
      telemetryStatus: "STATUS",
      telemetryChannel: "CHANNEL",
      telemetryCategory: "CATEGORY",
      telemetryViewers: "VIEWERS",
      telemetryDefaultCategory: "Gaming / Reactions / Football",
      telemetryOfflineValue: "STANDBY",
      telemetryLiveValue: "ON AIR",
      copyLink: "Copy channel link",
      copiedLink: "Link copied",
      copiedDescription: "kick.com/feeden is ready to share.",
      logoAlt: "Feeden FDN official emblem",
    },
    stage: {
      eyebrow: "ON AIR",
      heading: "The stream, right here.",
      subheading: "Official Kick player paired with the live stream desk.",
      playerTitle: "Feeden live stream player on Kick",
      skeletonLabel: "Preparing Kick player…",
      fallbackTitle: "Kick embed unavailable in this browser",
      fallbackBody: "If your browser blocks embedded players or the stream is offline, open the channel directly on Kick.",
      fallbackCta: "Open kick.com/feeden",
      loadPlayerCta: "Load player",
      tabs: {
        status: "Status",
        games: "Games & Vibe",
        info: "Chat & Info",
      },
      desk: {
        nowPlaying: "STREAM TITLE",
        categoryLabel: "CATEGORY",
        viewersLabel: "CURRENT AUDIENCE",
        channelLabel: "DIRECT FEED",
        openKick: "Open on Kick",
        copyChannel: "Copy link",
        offlineHeadline: "Stream is offline right now",
        offlineCopy:
          "Follow the channel on Kick or join the official FDN Discord to get pinged as soon as Feeden goes live.",
        gamesCaption: "REGULAR CHANNEL ROTATION",
        languageLabel: "LANGUAGE",
        languageValue: "Spanish (Argentina)",
        handleLabel: "OFFICIAL CHANNEL",
        discordLabel: "COMMUNITY",
        discordCta: "Join FDN Discord",
        rulesHeading: "CHAT BASICS",
        rules: [
          "Keep chat welcoming, no spam or shady links.",
          "Football debates can get loud, always keep it respectful.",
          "Best moments and clips go straight into the community hub.",
        ],
      },
    },
    pillars: {
      eyebrow: "THE STREAM",
      heading: "What happens when the stream goes live.",
      items: [
        {
          id: "gaming",
          index: "01",
          title: "Live gaming",
          description:
            "Competitive and chaotic sessions across Fortnite, Fall Guys, Counter-Strike, Clash Royale, and Roblox with chat driving the pace.",
          tag: "COMPETITIVE & CHAOS",
        },
        {
          id: "reactions",
          index: "02",
          title: "Reactions & football",
          description:
            "Matches, hot takes, viral clips, and live football debates with the whole community weighing in.",
          tag: "FOOTBALL & VIRAL",
        },
        {
          id: "just-chatting",
          index: "03",
          title: "Just Chatting & banter",
          description:
            "Unscripted hangouts, stories, and daily back-and-forth with the regulars who built the FDN community.",
          tag: "HANGOUTS",
        },
        {
          id: "events",
          index: "04",
          title: "FDN events & showmatches",
          description:
            "Special matchups, creator showmatches, community tournaments, and themed broadcast nights.",
          tag: "SPECIAL NIGHTS",
        },
        {
          id: "community-clips",
          index: "05",
          title: "24/7 community clips",
          description:
            "An always-on Discord plus fan-run clip and archive channels capturing the best moments from every broadcast.",
          tag: "CLIPS & ARCHIVE",
        },
      ],
    },
    community: {
      eyebrow: "FDN COMMUNITY",
      heading: "Fan clip channels & community.",
      description:
        "The FDN community keeps rolling after the stream ends. Browse the official Discord and fan-created clip channels archiving highlights across YouTube, TikTok, and socials.",
      submitCta: "Submit your clip channel",
      badgeOfficial: "OFFICIAL",
      badgeFan: "FAN CLIPS",
      visitCta: "Visit",
      filters: {
        all: "All",
        youtube: "YouTube",
        tiktok: "TikTok",
        social: "Instagram / X",
        discord: "Discord",
      },
      emptyTitle: "No fan accounts listed on this platform yet",
      emptyBody: "Run a Feeden clip or archive account here? Send your channel details and we will add it to the directory.",
      emptyCta: "Submit my channel",
      countLabel: "active channels",
      dialog: {
        title: "Submit a fan clip channel",
        description:
          "If you run an FDN clip or archive page, copy this template and send your link via Discord or X to get listed in the community hub.",
        stepsTitle: "HOW TO GET LISTED",
        steps: [
          "Copy the template with your channel name, platform, and direct link.",
          "Share it in the FDN Discord community channel or via X DM.",
          "Once reviewed, your channel is added to the FDN Community Hub.",
        ],
        templateLabel: "SUBMISSION TEMPLATE",
        templateBody:
          "Account name:\nPlatform (YouTube / TikTok / Instagram / X):\nHandle (@user):\nChannel link:\nShort description:",
        copyTemplate: "Copy template",
        copiedTemplate: "Template copied",
        openDiscord: "Open Discord",
        openX: "Message on X",
        close: "Close",
      },
    },
    closing: {
      socialsEyebrow: "OFFICIAL CHANNELS",
      socialsHeading: "Follow Feeden across every platform.",
      heading: "See you in the next stream.",
      cta: "Watch on Kick",
      emblemAlt: "FDN geometric brand mark",
    },
    footer: {
      rights: "Feeden (FDN) · Official Kick streamer community",
      builtBy: "Built by kbtale",
      switchLabel: "Language",
    },
  },
};
