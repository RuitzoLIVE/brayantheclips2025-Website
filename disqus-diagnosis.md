
## Evidencia de producción

Fecha: 2026-08-12.

La página `https://brayantheclips2025.manus.space/` muestra el fallback `No se pudo cargar el widget de comentarios`. En el navegador se observan los siguientes hechos:

| Comprobación | Resultado |
|---|---|
| `window.disqus_config` | Es una función |
| `window.DISQUS` | Es un objeto |
| Script cargado | `https://brayantheclips2025.disqus.com/embed.js` |
| Contenedor `#disqus_thread` | Existe, pero solo contiene un enlace oculto; no hay iframe |
| Solicitud de `embed.js` | `responseStatus: 0` en Resource Timing |
| Origen de la página | `https://brayantheclips2025.manus.space` |
| Mensaje de la aplicación | Fallback de carga de Disqus |

La evidencia indica que React monta el contenedor, define la configuración y añade el script. El fallo ocurre después, cuando el servicio externo no crea el iframe; las causas prioritarias son Trusted Domains, configuración/estado del foro o bloqueo de red/navegador.

## Comprobación de red desde el navegador

`window.DISQUS` expone `reset`, `request` y `host`, pero el contenedor no tiene iframes. Un `fetch` directo a `https://brayantheclips2025.disqus.com/embed.js` termina con `TypeError: Failed to fetch` desde el origen del sitio. Esto no demuestra por sí solo que el tag `<script>` sea bloqueado por CORS —los scripts cross-origin se cargan con reglas distintas—, pero sí confirma una restricción de comunicación entre el navegador y el subdominio de Disqus en esta sesión. Deben descartarse bloqueadores de contenido, políticas de privacidad, Trusted Domains y respuestas de Disqus antes de cambiar el código.

## Cabeceras HTTP

El sitio responde `200` desde Cloudflare y no envía una cabecera `Content-Security-Policy` visible que bloquee `disqus.com`. El recurso `embed.js` también responde `200`, tiene `content-type: application/javascript` y `Cross-Origin-Resource-Policy: cross-origin`. Por tanto, el servidor del sitio y el recurso público de Disqus son accesibles por HTTP; el fallo se manifiesta específicamente durante la inicialización del hilo en el navegador.

## Verificación del panel de Disqus

El panel administrativo está accesible y muestra el foro `brayantheclips2025`, la URL `brayantheclips2025.manus.space/` y el Universal Code oficial con el script `https://brayantheclips2025.disqus.com/embed.js`. El shortname está activo; por tanto, el error no se debe a un shortname inexistente ni a una URL incorrecta del script.

## Resultado tras Trusted Domains

La administración de Disqus muestra explícitamente ambos dominios autorizados:

- `brayclips-7fexstkv.manus.space`
- `brayantheclips2025.manus.space`

Después de volver a cargar `https://brayantheclips2025.manus.space/`, la sección Comunidad sigue en `Cargando comentarios…`; todavía no aparece el iframe en el texto visible. Por tanto, Trusted Domains ya no es una hipótesis pendiente para el dominio principal, aunque el widget puede necesitar una nueva inicialización o existe otro bloqueo de red/estado del hilo.

## Comprobación posterior

Después de la autorización, `window.DISQUS` sigue existiendo, pero `#disqus_thread` no contiene iframe y solo conserva un enlace oculto. La consola del navegador no muestra un error adicional capturable; la solicitud de `embed.js` aparece con `responseStatus: 0`. El fallback de la aplicación continúa visible.

## Causa raíz confirmada

La ejecución directa de `DISQUS.reset` reproduce un error interno de Disqus:

`parseColor received unparseable color: oklch(0.150.02280)`

El widget intenta analizar el color computado del sitio y recibe colores CSS en formato OKLCH:

| Propiedad | Valor computado |
|---|---|
| `body.color` | `oklch(0.15 0.02 280)` |
| `body.backgroundColor` | `oklch(0.98 0.001 0)` |
| `a.color` | `oklch(0.15 0.02 280)` |

Disqus no soporta correctamente este formato en su parser interno: al serializarlo elimina los espacios y produce `oklch(0.150.02280)`. La causa raíz del widget vacío es la incompatibilidad del embed de Disqus con los colores OKLCH usados por el tema CSS del sitio, no el shortname ni Trusted Domains.

## Estado tras propagar la corrección

La versión publicada actual ya contiene `.disqus-compatible-colors`, `body.color: rgb(36, 31, 62)` y `body.background: rgb(250, 250, 250)`. Sin embargo, en la primera carga el iframe aún no aparece y la aplicación muestra el fallback. En esa carga `window.DISQUS.reset` no está disponible, lo que sugiere que el script de Disqus no terminó de inicializarse en esa sesión, aun cuando `embed.js` está presente. La corrección del parser OKLCH quedó desplegada; el siguiente diagnóstico debe distinguir inicialización de red, bloqueo del navegador o estado de carga.

## Diagnóstico final de producción

Tras propagar el bundle que contiene `.disqus-compatible-colors`, la página pública usa colores sRGB y el wrapper está presente. No obstante, tras esperar la carga, `window.DISQUS` queda `undefined`, no hay iframe y el script de Disqus no aparece en los recursos medidos de esa sesión. La consola no muestra un nuevo `parseColor`; el error de carga visible proviene del temporizador/fallback del componente. En la vista previa, con los mismos colores sRGB, `DISQUS.reset` sí creó un iframe. Esto separa dos hechos: la incompatibilidad OKLCH quedó corregida en código, mientras que la sesión de producción todavía presenta un bloqueo o fallo de carga de `embed.js` que debe tratarse como problema externo de navegador/red/privacidad o propagación del recurso.

## Validación del iframe directo

En la vista previa, la integración ya no añade `embed.js`. El DOM contiene un único iframe con:

`https://disqus.com/embed/comments/?base=default&f=brayantheclips2025&t_u=https%3A%2F%2Fbrayantheclips2025.manus.space%2F&t_d=Los+mejores+clips+de+Brayan+2025&t_t=Los+mejores+clips+de+Brayan+2025&s_o=default&t_i=brayantheclips2025-home`

El iframe usa `loading="lazy"`, tiene título accesible y no hay alertas de error. El shortname permanece solo como parámetro técnico `f`, tal como requiere Disqus para identificar el foro.

## Evidencia del fallo del iframe publicado

En producción, el iframe se encuentra visible y tiene 1,405 px de ancho por 460 px de alto, pero permanece en blanco. Su entrada de red hacia `https://disqus.com/embed/comments/` termina con `responseStatus: 0` después de aproximadamente 3 segundos. El endpoint sí responde mediante HTTP con `200 OK`, `Content-Type: text/html`, contiene referencias al foro y entrega una política CSP propia de Disqus. Por lo tanto, el problema no es la URL canónica ni la sintaxis HTML básica: el navegador/sandbox bloquea o no completa la navegación del documento cross-origin, y el uso de `loading="lazy"` retrasa innecesariamente la solicitud porque la sección está muy abajo.

## Reestructuración HTML5

La vista previa ahora usa `section#community`, `article`, `header`, `div[role="region"]`, `iframe loading="eager"`, `aside[role="alert"]`, `footer` y `noscript`. No se carga `embed.js`, no hay alertas iniciales y el iframe tiene 520 px de alto. Aun así, la entrada de red del endpoint cross-origin de Disqus finaliza con `responseStatus: 0` en el navegador de validación, mientras que el mismo endpoint responde `200 OK` con curl. La reestructuración elimina el retraso de `loading="lazy"`; cualquier blanco restante pertenece a la navegación cross-origin o al entorno del navegador, no al marcado HTML5.

## Universal Code en la vista previa

Tras restaurar el Universal Code oficial, `embed.js` sí se añade al documento y `window.DISQUS` existe, pero `#disqus_thread` conserva solo un `span` oculto y no crea iframes durante la ventana de validación. La solicitud del script aparece con estado de red del navegador `0`, aunque el endpoint HTTP responde `200 OK` desde el entorno de terminal. El problema queda aislado a la ejecución/carga cross-origin de Disqus en el navegador de validación; la estructura HTML5, la configuración canónica y el código Universal Code ya están presentes.

## Resultado tras convertir el tema a sRGB

Las variables globales `--background`, `--foreground`, `--primary`, `--card`, `--border` y `--muted-foreground` ahora se exponen como valores hex. La vista previa ya no reporta `parseColor` con OKLCH. Universal Code carga `embed.js`, pero el navegador de validación aún no monta un iframe y, después de 15 segundos, muestra el fallback semántico con enlace al foro. Esto confirma que el error de colores fue corregido; el bloqueo restante corresponde a la carga cross-origin del recurso de Disqus en este entorno.

## Bloqueo restante después del fallback sRGB

La ejecución de `DISQUS.reset` ya no muestra el error `parseColor` cuando las variables del documento son hex. Sin embargo, tras el timeout el script `https://brayantheclips2025.disqus.com/embed.js` permanece en el DOM, `window.DISQUS` vuelve a quedar indefinido, `#disqus_thread` queda vacío y se muestra el fallback. Las cabeceras públicas del sitio solo incluyen `X-Content-Type-Options: nosniff`; no hay CSP, X-Frame-Options ni Permissions-Policy que bloqueen el recurso. El bloqueo restante es externo al marcado HTML5 y se observa como una carga cross-origin incompleta del script en el navegador de validación.

## Universal Code funcionando en la vista previa

Después de convertir el tema global a sRGB y alinear `createDisqusConfig` con el contrato oficial, la vista previa muestra `window.DISQUS` como objeto, `DISQUS.reset` como función y `#disqus_thread iframe` con un iframe real de Disqus (`height: 631px`). La solicitud del embed contiene el foro `brayantheclips2025`, el identificador `brayantheclips2025-home` y la URL canónica publicada. Ya no aparece `parseColor` ni el fallback de error.
