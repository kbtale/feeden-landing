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
    splitModeSwitcher: string;
    morphModeSwitcher: string;
    closeDialog: string;
    toastRegion: string;
    brandHome: string;
    canvas3dLabel: string;
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
    unknownTitle: string;
  };
  hero: {
    headline: string;
    standfirst: string;
    primaryCta: string;
    liveLinePrefix: string;
    scrollHint: string;
    logoAlt: string;
    copiedLink: string;
    copiedDescription: string;
    loaderLabel: string;
  };
  morphStage: {
    eyebrow: string;
    heading: string;
    subheading: string;
    cardHeader: string;
    modeStreamer: string;
    modeFdn: string;
    tabs: {
      all: string;
      challenges: string;
      gaming: string;
      reactions: string;
    };
    totalLabelLive: string;
    totalLabelOffline: string;
    offlineValue: string;
    lineItemsSuffix: string;
    viewChannel: string;
    copyLink: string;
  };
  splitSlab: {
    eyebrow: string;
    headingLive: string;
    headingCommunity: string;
    tabLive: string;
    tabCommunity: string;
    liveItems: readonly {
      id: string;
      title: string;
      points: readonly string[];
    }[];
    communityItems: readonly {
      id: string;
      title: string;
      points: readonly string[];
    }[];
    communityCardEyebrow: string;
    communityCardTitle: string;
    communityCardBody: string;
    communityCardCta: string;
    communityCardMeta: string;
  };
  stage: {
    playerTitle: string;
    skeletonLabel: string;
    fallbackTitle: string;
    fallbackBody: string;
    fallbackCta: string;
    loadPlayerCta: string;
    openKick: string;
    copyChannel: string;
  };
  pillars: {
    eyebrow: string;
    heading: string;
    items: readonly {
      id: string;
      title: string;
      description: string;
      cta: string;
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
      instagram: string;
      tiktok: string;
      discord: string;
    };
    emptyTitle: string;
    emptyBody: string;
    emptyCta: string;
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
  socialsSlab: {
    eyebrow: string;
    heading: string;
    lead: string;
    cta: string;
  };
  closing: {
    heading: string;
    cta: string;
    emblemAlt: string;
  };
  footer: {
    rights: string;
    builtBy: string;
  };
}

export const translations: Record<Locale, Translations> = {
  es: {
    meta: {
      title: "Feeden (FDN) | Streams en vivo en Kick",
      description:
        "Landing oficial de Feeden (FDN). Streams en vivo en Kick: Just Chatting, reacciones, desafios y videojuegos como Fortnite, Clash of Clans y GTA VI.",
    },
    a11y: {
      skipToContent: "Ir al contenido principal",
      mainNav: "Navegacion principal",
      languageSwitcher: "Cambiar idioma",
      openMenu: "Abrir menu de navegacion",
      closeMenu: "Cerrar menu de navegacion",
      mobileNavTitle: "Feeden",
      mobileNavDescription: "Navegacion principal del sitio de Feeden.",
      officialSocials: "Redes oficiales de Feeden",
      streamDeskTabs: "Categorias de videos de YouTube de Feeden",
      communityFilterTabs: "Filtrar cuentas de la comunidad por plataforma",
      splitModeSwitcher: "Elegir vista de stream en vivo o comunidad",
      morphModeSwitcher: "Alternar modo del modelo 3D entre Feeden y Yoda FDN",
      closeDialog: "Cerrar ventana",
      toastRegion: "Notificaciones",
      brandHome: "Feeden inicio",
      canvas3dLabel: "Modelo 3D interactivo de Feeden transformandose en el emblema Yoda FDN",
    },
    nav: {
      live: "En vivo",
      stream: "El stream",
      community: "Comunidad",
      socials: "Redes",
      watchKick: "Ver en Kick",
    },
    status: {
      live: "En vivo",
      offline: "Offline",
      checking: "Verificando",
      viewersSingular: "viewer",
      viewersPlural: "viewers",
      unknownTitle: "Transmision en Kick",
    },
    hero: {
      headline: "Prendé el stream, sumate a la FDN.",
      standfirst:
        "Just Chatting, reacciones, desafios y videojuegos como Fortnite, Clash of Clans y GTA VI desde Argentina. Todo el vivo en Kick y las cuentas de la comunidad en un solo lugar.",
      primaryCta: "Ver en Kick",
      liveLinePrefix: "Ahora en Kick",
      scrollHint: "Scrolleá para activar modo FDN",
      logoAlt: "Emblema oficial de Feeden FDN",
      copiedLink: "Link copiado",
      copiedDescription: "kick.com/feeden listo para compartir.",
      loaderLabel: "FDN // INICIANDO SENAL",
    },
    morphStage: {
      eyebrow: "YOUTUBE · @FEEDEN_",
      heading: "De Feeden a modo FDN.",
      subheading:
        "No hay guion fijo: los mejores desafios, reacciones y partidas del stream quedan subidos al canal de YouTube.",
      cardHeader: "ULTIMOS VIDEOS",
      modeStreamer: "Feeden",
      modeFdn: "Modo FDN",
      tabs: {
        all: "Todo",
        challenges: "Retos",
        gaming: "Gaming",
        reactions: "Chat",
      },
      totalLabelLive: "AUDIENCIA EN KICK",
      totalLabelOffline: "CANAL DE YOUTUBE",
      offlineValue: "@Feeden_",
      lineItemsSuffix: "videos recientes",
      viewChannel: "Ver canal",
      copyLink: "Copiar Kick",
    },
    splitSlab: {
      eyebrow: "EL STREAM",
      headingLive: "Para ver el vivo sin vueltas.",
      headingCommunity: "Para seguir en la FDN 24/7.",
      tabLive: "En vivo en Kick",
      tabCommunity: "Comunidad FDN",
      liveItems: [
        {
          id: "player",
          title: "Reproductor directo de Kick",
          points: [
            "Senal oficial embebida en 16:9 desde player.kick.com/feeden",
            "Deteccion automatica de estado en vivo y viewers actuales",
            "Acceso directo a kick.com/feeden si el navegador bloquea embeds",
          ],
        },
        {
          id: "rotation",
          title: "Reacciones, desafios y gaming",
          points: [
            "Just Chatting largo, TikToks del chat y reacciones en tiempo real",
            "Partidas de Fortnite, Clash of Clans y toda la previa de GTA VI",
            "Retos de varios dias y dinamicas armadas con la comunidad",
          ],
        },
        {
          id: "alerts",
          title: "Enterate ni bien prende",
          points: [
            "Avisos instantaneos en el Discord oficial de la FDN",
            "Historias y previa diaria en @fedenrios",
            "Resumenes y videos completos en YouTube @Feeden_",
          ],
        },
      ],
      communityItems: [
        {
          id: "discord",
          title: "Discord oficial de la FDN",
          points: [
            "Alertas automaticas cada vez que Feeden prende en Kick",
            "Canales de gaming, reacciones, memes y salas de voz",
            "Organizacion de retos y partidas privadas con la comunidad",
          ],
        },
        {
          id: "fanpages",
          title: "Fanpages y cuentas de clips",
          points: [
            "Recortes diarios en Instagram y TikTok hechos por la comunidad",
            "Archivo de reacciones, retos y momentos historicos del stream",
            "Espacio abierto para sumar nuevas cuentas fan verificadas",
          ],
        },
        {
          id: "vibe",
          title: "Codigos del chat",
          points: [
            "Buena onda siempre, cero spam ni links sospechosos",
            "Mandá tus TikToks, ideas de retos y clips para reaccionar en vivo",
            "Los mejores momentos van directo al directorio de clips",
          ],
        },
      ],
      communityCardEyebrow: "SERVIDOR OFICIAL",
      communityCardTitle: "Sumate al Discord de la FDN.",
      communityCardBody:
        "Cuando se apaga el vivo la charla sigue en el servidor: avisos de stream, ideas de desafios, partidas con el chat y envio directo de clips.",
      communityCardCta: "Entrar al Discord",
      communityCardMeta: "discord.gg/jrHe634FU · Abierto a toda la comunidad",
    },
    stage: {
      playerTitle: "Reproductor en vivo de Feeden en Kick",
      skeletonLabel: "Cargando reproductor de Kick…",
      fallbackTitle: "Abrir el stream directo en Kick",
      fallbackBody:
        "Si tu navegador bloquea reproductores embebidos, abri el canal oficial directamente en Kick.",
      fallbackCta: "Abrir kick.com/feeden",
      loadPlayerCta: "Reintentar",
      openKick: "Abrir en Kick",
      copyChannel: "Copiar enlace",
    },
    pillars: {
      eyebrow: "QUE PASA EN EL VIVO",
      heading: "Todo en una misma transmision.",
      items: [
        {
          id: "gaming",
          title: "Gaming en vivo",
          description:
            "Partidas de Fortnite, aldeas de Clash of Clans y la ruta completa hacia GTA VI jugando en directo con el chat.",
          cta: "Ver en Kick",
        },
        {
          id: "reactions",
          title: "Reacciones y virales",
          description:
            "Trailers, TikToks bizarros que manda el chat y videos virales reaccionados sin filtro en cada transmision.",
          cta: "Ver en YouTube",
        },
        {
          id: "just-chatting",
          title: "Just Chatting y humor",
          description:
            "Charlas largas, anecdotas y el ida y vuelta diario con la gente que banca el stream desde el principio.",
          cta: "Ir al reproductor",
        },
        {
          id: "challenges",
          title: "Desafios y retos",
          description:
            "Retos de larga duracion como los 80 dias para conseguir la PS5 y GTA VI, apuestas en vivo y dinamicas con el chat.",
          cta: "Ver en TikTok",
        },
        {
          id: "community-clips",
          title: "Comunidad 24/7",
          description:
            "Discord activo todo el dia y fanpages creadas por la gente que archivan los mejores recortes de cada vivo.",
          cta: "Explorar comunidad",
        },
      ],
    },
    community: {
      eyebrow: "COMUNIDAD FDN",
      heading: "Fanpages y cuentas de clips.",
      description:
        "El ecosistema que arma la comunidad alrededor de cada stream en Instagram, TikTok y Discord.",
      submitCta: "Sumar tu cuenta",
      badgeOfficial: "Oficial",
      badgeFan: "Fanpage",
      visitCta: "Visitar",
      filters: {
        all: "Todos",
        instagram: "Instagram",
        tiktok: "TikTok",
        discord: "Discord",
      },
      emptyTitle: "Todavia no hay cuentas en esta categoria",
      emptyBody: "Manejas una cuenta fan de Feeden aca? Mandanos el link y la sumamos.",
      emptyCta: "Enviar mi cuenta",
      dialog: {
        title: "Sumar cuenta de la comunidad",
        description:
          "Si manejas una fanpage o canal de clips de Feeden, copia esta plantilla y enviala por Discord o X para sumarla al directorio.",
        stepsTitle: "COMO PARTICIPAR",
        steps: [
          "Copia la plantilla con el nombre de tu cuenta, plataforma y link directo.",
          "Enviala en el Discord oficial de la FDN o por mensaje a @Feeden_ en X.",
          "Una vez revisada, aparece publicada en esta seccion.",
        ],
        templateLabel: "PLANTILLA DE ENVIO",
        templateBody:
          "Nombre de la cuenta:\nPlataforma (Instagram / TikTok / YouTube / X):\nUsuario (@handle):\nLink del perfil:\nDescripcion corta:",
        copyTemplate: "Copiar plantilla",
        copiedTemplate: "Plantilla copiada",
        openDiscord: "Abrir Discord",
        openX: "Ir a @Feeden_",
        close: "Cerrar",
      },
    },
    socialsSlab: {
      eyebrow: "REDES OFICIALES",
      heading: "Donde encontrar a Feeden.",
      lead:
        "Todas las cuentas verificadas de Feeden en un solo lugar para no perderte ningun vivo, video o aviso.",
      cta: "Entrar al Discord",
    },
    closing: {
      heading: "Nos vemos en el próximo vivo.",
      cta: "Ver en Kick",
      emblemAlt: "Emblema oficial FDN",
    },
    footer: {
      rights: "Feeden (FDN). Comunidad oficial de streams en Kick.",
      builtBy: "Hecho por kbtale",
    },
  },
  en: {
    meta: {
      title: "Feeden (FDN) | Live Streams on Kick",
      description:
        "Official landing page for Feeden (FDN). Live Kick streams covering Just Chatting, reactions, challenges, and games like Fortnite, Clash of Clans, and GTA VI.",
    },
    a11y: {
      skipToContent: "Skip to main content",
      mainNav: "Main navigation",
      languageSwitcher: "Switch language",
      openMenu: "Open navigation menu",
      closeMenu: "Close navigation menu",
      mobileNavTitle: "Feeden",
      mobileNavDescription: "Primary navigation for Feeden.",
      officialSocials: "Feeden official social links",
      streamDeskTabs: "Feeden YouTube video categories",
      communityFilterTabs: "Filter community accounts by platform",
      splitModeSwitcher: "Switch between live stream player and community view",
      morphModeSwitcher: "Toggle 3D model between Feeden streamer and FDN Yoda mode",
      closeDialog: "Close dialog",
      toastRegion: "Notifications",
      brandHome: "Feeden home",
      canvas3dLabel: "Interactive 3D Feeden sculpture morphing into the FDN Yoda mascot",
    },
    nav: {
      live: "Live",
      stream: "The stream",
      community: "Community",
      socials: "Socials",
      watchKick: "Watch on Kick",
    },
    status: {
      live: "Live",
      offline: "Offline",
      checking: "Checking",
      viewersSingular: "viewer",
      viewersPlural: "viewers",
      unknownTitle: "Kick Broadcast",
    },
    hero: {
      headline: "Tune in live, join the FDN.",
      standfirst:
        "Unfiltered Just Chatting, live reactions, real-world challenges, and games like Fortnite, Clash of Clans, and GTA VI from Argentina. Everything live on Kick plus the community hub in one place.",
      primaryCta: "Watch on Kick",
      liveLinePrefix: "Live now on Kick",
      scrollHint: "Scroll to morph into FDN mode",
      logoAlt: "Feeden FDN official emblem",
      copiedLink: "Link copied",
      copiedDescription: "kick.com/feeden is ready to share.",
      loaderLabel: "FDN // LOCKING SIGNAL",
    },
    morphStage: {
      eyebrow: "YOUTUBE · @FEEDEN_",
      heading: "From Feeden to FDN mode.",
      subheading:
        "No fixed script: the best challenges, live reactions, and gaming moments go straight to Feeden's YouTube channel.",
      cardHeader: "LATEST VIDEOS",
      modeStreamer: "Feeden",
      modeFdn: "FDN Mode",
      tabs: {
        all: "All",
        challenges: "Challenges",
        gaming: "Gaming",
        reactions: "Chat",
      },
      totalLabelLive: "LIVE ON KICK",
      totalLabelOffline: "YOUTUBE CHANNEL",
      offlineValue: "@Feeden_",
      lineItemsSuffix: "recent uploads",
      viewChannel: "Open channel",
      copyLink: "Copy Kick",
    },
    splitSlab: {
      eyebrow: "THE STREAM",
      headingLive: "Built to watch live right away.",
      headingCommunity: "Built for the FDN 24/7.",
      tabLive: "Live on Kick",
      tabCommunity: "FDN Community",
      liveItems: [
        {
          id: "player",
          title: "Direct Kick broadcast player",
          points: [
            "Official 16:9 embed powered by player.kick.com/feeden",
            "Live status and viewer count detection with silent fallback",
            "One-click direct link to kick.com/feeden whenever needed",
          ],
        },
        {
          id: "rotation",
          title: "Reactions, challenges, and gaming",
          points: [
            "Long unfiltered Just Chatting and chat-submitted TikTok reactions",
            "Fortnite, Clash of Clans, and the road to GTA VI",
            "Multi-day challenges and live dares shaped by the chat",
          ],
        },
        {
          id: "alerts",
          title: "Never miss a broadcast",
          points: [
            "Instant live pings inside the official FDN Discord server",
            "Pre-stream stories and daily updates on @fedenrios",
            "Full edited uploads and recaps on YouTube @Feeden_",
          ],
        },
      ],
      communityItems: [
        {
          id: "discord",
          title: "Official FDN Discord",
          points: [
            "Automatic live notifications the moment Feeden goes on air",
            "Dedicated gaming, reaction, meme, and voice channels",
            "Community challenges and custom lobbies with chat",
          ],
        },
        {
          id: "fanpages",
          title: "Fanpages & clip archives",
          points: [
            "Daily Instagram and TikTok cuts edited by the community",
            "Archive of reactions, challenges, and classic FDN moments",
            "Open directory for verified community clip pages",
          ],
        },
        {
          id: "vibe",
          title: "Chat basics",
          points: [
            "Good vibes only, zero spam or shady links",
            "Drop TikToks, challenge ideas, and clips for live reactions",
            "Top moments head straight into the fan clip pages",
          ],
        },
      ],
      communityCardEyebrow: "OFFICIAL SERVER",
      communityCardTitle: "Join the FDN Discord.",
      communityCardBody:
        "When the stream wraps, chat keeps going inside the server: live alerts, challenge ideas, custom lobbies, and clip submissions.",
      communityCardCta: "Join Discord",
      communityCardMeta: "discord.gg/jrHe634FU · Open to the whole community",
    },
    stage: {
      playerTitle: "Feeden live stream player on Kick",
      skeletonLabel: "Loading Kick player…",
      fallbackTitle: "Watch directly on Kick",
      fallbackBody:
        "If your browser blocks embedded players, open the official channel straight on Kick.",
      fallbackCta: "Open kick.com/feeden",
      loadPlayerCta: "Retry",
      openKick: "Open on Kick",
      copyChannel: "Copy link",
    },
    pillars: {
      eyebrow: "WHAT HAPPENS LIVE",
      heading: "Everything inside one broadcast.",
      items: [
        {
          id: "gaming",
          title: "Live gaming",
          description:
            "Fortnite sessions, Clash of Clans raids, and the full road to GTA VI with chat driving every match.",
          cta: "Watch on Kick",
        },
        {
          id: "reactions",
          title: "Reactions & viral clips",
          description:
            "Trailers, weird TikToks submitted by chat, and unfiltered live reactions every broadcast.",
          cta: "Watch on YouTube",
        },
        {
          id: "just-chatting",
          title: "Just Chatting & banter",
          description:
            "Unscripted hangouts, stories, and daily back-and-forth with the regulars who built the FDN community.",
          cta: "Go to player",
        },
        {
          id: "challenges",
          title: "Challenges & dares",
          description:
            "Multi-day challenges like the 80-day PS5 and GTA VI run, live dares, and chat-powered events.",
          cta: "Watch on TikTok",
        },
        {
          id: "community-clips",
          title: "24/7 community clips",
          description:
            "An always-on Discord plus fan-run clip pages archiving the best moments from every stream.",
          cta: "Explore community",
        },
      ],
    },
    community: {
      eyebrow: "FDN COMMUNITY",
      heading: "Fanpages & clip accounts.",
      description:
        "The community ecosystem built around every stream across Instagram, TikTok, and Discord.",
      submitCta: "Submit your page",
      badgeOfficial: "Official",
      badgeFan: "Fanpage",
      visitCta: "Visit",
      filters: {
        all: "All",
        instagram: "Instagram",
        tiktok: "TikTok",
        discord: "Discord",
      },
      emptyTitle: "No accounts listed in this category yet",
      emptyBody: "Run a Feeden clip or fan account here? Send your link and we will add it.",
      emptyCta: "Submit my page",
      dialog: {
        title: "Submit a community account",
        description:
          "If you run an FDN fanpage or clip channel, copy this template and share it via Discord or X to get listed in the directory.",
        stepsTitle: "HOW TO GET LISTED",
        steps: [
          "Copy the template with your account name, platform, and profile link.",
          "Share it inside the official FDN Discord or message @Feeden_ on X.",
          "Once reviewed, your account is published in this section.",
        ],
        templateLabel: "SUBMISSION TEMPLATE",
        templateBody:
          "Account name:\nPlatform (Instagram / TikTok / YouTube / X):\nHandle (@user):\nProfile link:\nShort description:",
        copyTemplate: "Copy template",
        copiedTemplate: "Template copied",
        openDiscord: "Open Discord",
        openX: "Message @Feeden_",
        close: "Close",
      },
    },
    socialsSlab: {
      eyebrow: "OFFICIAL CHANNELS",
      heading: "Where to find Feeden.",
      lead:
        "Every verified Feeden profile in one place so you never miss a stream, upload, or pre-show ping.",
      cta: "Join Discord",
    },
    closing: {
      heading: "See you in the next stream.",
      cta: "Watch on Kick",
      emblemAlt: "Official FDN emblem",
    },
    footer: {
      rights: "Feeden (FDN). Official Kick streamer community.",
      builtBy: "Built by kbtale",
    },
  },
};
