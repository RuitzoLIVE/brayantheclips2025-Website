# Los Mejores Clips de Brayan 2025

Una galería interactiva y moderna que reúne los clips más chistosos, absurdos y memorables del canal de Twitch **@brayanthecrack**, junto con contenido de redes sociales de **@RuitzoLIVE** y **@RuitClips**.

## 🎬 Características Principales

### Galería de Clips de Twitch
- **10+ clips curados** del canal brayanthecrack
- **Filtros por categoría**: Reacciones Exageradas, Momentos Absurdos, Momentos de Juego, Interacciones con Chat, Momentos Épicos, Humor Oscuro
- **Estadísticas en tiempo real**: Total de clips, visualizaciones totales, clip más popular
- **Acceso directo a Twitch** desde cada clip

### Sección de Redes Sociales
- **Tabs alternables** para cambiar entre Twitch, YouTube e Instagram
- **Reels de Instagram** de @ruitzolive y @brayanthecrack_ con métricas (likes, reposts, shares)
- **Videos de YouTube** de @RuitzoLIVE y @RuitClips con estadísticas (vistas, likes, comentarios)
- **Clips de Twitch** con información detallada (vistas, duración, fecha)

### Sistema de Búsqueda Global
- **Búsqueda en tiempo real** de clips, videos y reels
- **Filtrado por plataforma** (Twitch, YouTube, Instagram)
- **Resultados instantáneos** con información completa de cada contenido

### Página de Enlaces
- **Acceso directo** a los perfiles en guns.lol de Brayan y Ruitzo
- **Enlaces a redes sociales** de las fuentes principales

### Experiencia de Usuario
- **Modo oscuro/claro** completamente funcional
- **Diseño responsivo** para dispositivos móviles y desktop
- **Interfaz moderna** con animaciones suaves y transiciones
- **Tema personalizado** con colores de Twitch (púrpura y naranja)

## 🛠️ Stack Tecnológico

| Componente | Tecnología |
|-----------|-----------|
| **Frontend** | React 19 + TypeScript + Tailwind CSS 4 |
| **Backend** | Node.js + Express + tRPC |
| **Base de Datos** | MySQL con Drizzle ORM |
| **Autenticación** | Manus OAuth |
| **Hosting** | Manus (Autoscale) |
| **Testing** | Vitest |
| **Herramientas** | Vite, pnpm, Drizzle Kit |

## 📋 Estructura del Proyecto

```
brayanthecrack-clips/
├── client/                          # Frontend React
│   ├── src/
│   │   ├── pages/                  # Páginas principales
│   │   │   ├── Home.tsx            # Galería de clips
│   │   │   ├── SocialMedia.tsx      # Sección de redes sociales
│   │   │   ├── Links.tsx            # Página de enlaces
│   │   │   └── SearchPage.tsx       # Búsqueda global
│   │   ├── components/              # Componentes reutilizables
│   │   │   ├── ClipCard.tsx         # Card de clip
│   │   │   ├── YouTubeEmbed.tsx     # Embed de YouTube
│   │   │   ├── TwitchEmbed.tsx      # Embed de Twitch
│   │   │   ├── InstagramEmbed.tsx   # Embed de Instagram
│   │   │   ├── GlobalSearch.tsx     # Buscador global
│   │   │   └── ThemeToggle.tsx      # Toggle de tema
│   │   ├── lib/
│   │   │   ├── clipsData.ts         # Datos de clips
│   │   │   └── socialMediaData.ts   # Datos de redes sociales
│   │   ├── App.tsx                  # Enrutador principal
│   │   └── index.css                # Estilos globales
│   └── public/                      # Activos estáticos
├── server/                          # Backend Node.js
│   ├── routers/
│   │   ├── clips.ts                 # Procedimientos tRPC de clips
│   │   └── clips.test.ts            # Tests de clips
│   ├── db.ts                        # Helpers de base de datos
│   ├── routers.ts                   # Router principal
│   └── storage.ts                   # Integración S3
├── drizzle/                         # Esquema y migraciones
│   ├── schema.ts                    # Definición de tablas
│   └── migrations/                  # Migraciones SQL
├── shared/                          # Código compartido
│   └── const.ts                     # Constantes globales
└── package.json                     # Dependencias del proyecto
```

## 🚀 Instalación y Desarrollo

### Requisitos Previos
- Node.js 22+
- pnpm 10+
- MySQL 8+ (o TiDB)

### Configuración Local

```bash
# Clonar el repositorio
git clone https://github.com/RuitzoLIVE/brayantheclips2025-Website.git
cd brayantheclips2025-Website

# Instalar dependencias
pnpm install

# Configurar variables de entorno
cp .env.example .env.local

# Ejecutar migraciones de base de datos
pnpm db:push

# Iniciar servidor de desarrollo
pnpm dev
```

El sitio estará disponible en `http://localhost:3000`

## 📝 Scripts Disponibles

| Script | Descripción |
|--------|-----------|
| `pnpm dev` | Inicia el servidor de desarrollo |
| `pnpm build` | Compila el proyecto para producción |
| `pnpm start` | Ejecuta la versión de producción |
| `pnpm test` | Ejecuta los tests con Vitest |
| `pnpm db:push` | Ejecuta migraciones de base de datos |
| `pnpm format` | Formatea el código con Prettier |
| `pnpm check` | Verifica tipos de TypeScript |

## 🔐 Variables de Entorno

```env
# Base de datos
DATABASE_URL=mysql://user:password@localhost:3306/brayanthecrack_clips

# Autenticación
JWT_SECRET=tu_secreto_jwt
VITE_APP_ID=tu_app_id
OAUTH_SERVER_URL=https://oauth.manus.im
VITE_OAUTH_PORTAL_URL=https://login.manus.im

# APIs de Manus
BUILT_IN_FORGE_API_URL=https://api.manus.im
BUILT_IN_FORGE_API_KEY=tu_api_key
VITE_FRONTEND_FORGE_API_KEY=tu_frontend_key
VITE_FRONTEND_FORGE_API_URL=https://api.manus.im

# Información del propietario
OWNER_NAME=RuitzoLIVE
OWNER_OPEN_ID=tu_open_id
```

## 📊 Datos del Sitio

### Clips de Twitch
- **Total de clips**: 10+
- **Categorías**: 6 (Reacciones, Momentos Absurdos, Juego, Interacciones, Épicos, Humor Oscuro)
- **Visualizaciones totales**: 651+
- **Clip más popular**: 128 vistas

### Contenido de Redes Sociales
- **Reels de Instagram**: 5 (de @ruitzolive y @brayanthecrack_)
- **Videos de YouTube**: 5 (de @RuitzoLIVE y @RuitClips)
- **Clips de Twitch**: 5 (de @brayanthecrack)

## 🌐 Despliegue

El sitio está desplegado en **Manus** con hosting automático y escalable.

### URLs Disponibles
- **Dominio automático**: https://brayantheclips2025.manus.space
- **Dominio alternativo**: https://brayclips-7fexstkv.manus.space

### Configuración de Cloudflare (Protección contra Bots)

Para agregar protección contra bots usando Cloudflare:

1. Crear cuenta en [Cloudflare](https://dash.cloudflare.com)
2. Agregar tu dominio personalizado
3. Cambiar los nameservers en tu registrador
4. Activar **Bot Fight Mode** en Security > Bots
5. Crear reglas personalizadas para Managed Challenge

## 🧪 Testing

El proyecto incluye tests con Vitest para los procedimientos tRPC:

```bash
# Ejecutar todos los tests
pnpm test

# Tests disponibles
- server/routers/clips.test.ts (6 tests)
- server/auth.logout.test.ts (1 test)
```

## 📱 Funcionalidades Futuras

- [ ] Integración con APIs de Twitch y YouTube para estadísticas en tiempo real
- [ ] Sistema de votación para clips favoritos
- [ ] Ranking dinámico de clips más populares
- [ ] Notificaciones push para nuevos clips
- [ ] Panel de administración para gestionar contenido
- [ ] Análisis y dashboard de engagement
- [ ] Integración con Discord para compartir clips

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para cambios importantes, abre un issue primero para discutir qué te gustaría cambiar.

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo LICENSE para más detalles.

## 👥 Créditos

- **Creador del contenido**: [@brayanthecrack](https://www.twitch.tv/brayanthecrack)
- **Productora**: [Ruitzo Studios Media](https://guns.lol/ruitzolive)
- **Desarrollador**: Manus AI

## 📞 Contacto

- **Twitch**: [@brayanthecrack](https://www.twitch.tv/brayanthecrack)
- **Instagram**: [@brayanthecrack_](https://www.instagram.com/brayanthecrack_)
- **YouTube**: [@RuitzoLIVE](https://www.youtube.com/@RuitzoLIVE)
- **Guns.lol**: [Ruitzo](https://guns.lol/ruitzolive) | [Brayan](https://guns.lol/brayanthecrack)

---

**© 2026 Ruitzo Studios Media. Todos los clips pertenecen a sus respectivos creadores.**
