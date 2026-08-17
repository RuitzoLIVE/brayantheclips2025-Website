# Verificación externa de Disqus

Fecha de verificación: 2026-08-12.

La administración de Disqus redirige a la pantalla de inicio de sesión en `https://disqus.com/publishers/login/?next=/admin/settings/advanced/`. No hay una sesión iniciada en el navegador y no se ha podido comprobar ni modificar la lista de dominios de confianza.

Dominios publicados que deben autorizarse en Disqus:

- `brayantheclips2025.manus.space`
- `brayclips-7fexstkv.manus.space`

La aplicación usa el shortname `brayantheclips2025` y la URL canónica `https://brayantheclips2025.manus.space/`.

Acción pendiente del propietario: iniciar sesión en Disqus y agregar los dos dominios en **Admin → Settings → Advanced → Trusted domains**. No se almacenaron credenciales ni se modificaron ajustes externos.

## Estado técnico

- El frontend muestra estados de carga, éxito y fallback cuando el script externo no responde.
- Las pruebas Vitest, TypeScript y el build de producción pasan.
- La verificación del widget en vivo queda bloqueada hasta autorizar los dominios.


## Sesión administrativa

La sesión de Disqus quedó activa con el sitio `brayantheclips2025` y se abrió la ruta `/admin/settings/advanced/`. La pantalla quedó en carga al momento de la captura; falta esperar el contenido del formulario para confirmar o actualizar los dominios.

## Diagnóstico de Advanced Settings

Aunque la sesión está activa, `/admin/settings/advanced/` solo muestra la navegación de Disqus; el formulario de configuración no aparece en el DOM y no se encontró un campo `Trusted Domains`. La consola no mostró errores adicionales aparte de la inspección del DOM. Se requiere revisar la interfaz de Disqus o usar la sección de configuración del sitio para acceder a la lista de dominios.

## Rutas alternativas del panel

La ruta de organización en `disqus.com/admin/orgs/.../settings/sites/` redirige a inicio de sesión, mientras que el subdominio del foro conserva la sesión. La ruta `brayantheclips2025.disqus.com/admin/settings/general/` devuelve una página en blanco en la captura, por lo que el panel no permite completar de forma fiable el cambio desde esta sesión automatizada.

## Autorización de dominios en curso

Con confirmación del propietario se introdujo `brayantheclips2025.manus.space` y se pulsó **Add**. La pantalla mantuvo el valor en el campo y no mostró todavía una fila visible ni un mensaje de guardado; se debe esperar o revisar el DOM antes de continuar con el segundo dominio.

## Resultado de Add

La inspección del DOM después de pulsar **Add** no muestra una fila de dominio ni un mensaje de éxito; el campo conserva `brayantheclips2025.manus.space`. El formulario parece requerir otra interacción o está bloqueando la operación antes del guardado.

## Estado del formulario

La inspección del DOM muestra que el campo y el botón **Add** están deshabilitados mientras conservan `brayantheclips2025.manus.space`. Esto indica que la solicitud de adición quedó en estado pendiente o que el dominio ya está siendo procesado; aún no aparece una confirmación visible.

## Evidencia de red

La página consultó `https://disqus.com/api/3.0/forums/trustedDomain/list?forum=brayantheclips2025...`, pero la interfaz no mostró filas ni habilitó el botón **Add** después de introducir el dominio. Esto sugiere que la solicitud de listado está disponible, aunque el control visual no ha reflejado el resultado de la operación.

## API de Trusted Domains

La consulta de solo lectura al endpoint de Trusted Domains quedó pendiente y agotó el tiempo de espera; una segunda consulta con aborto controlado terminó con `AbortError`. No se expusieron credenciales ni se ejecutó una operación destructiva. La interfaz permanece con el dominio en el campo y los controles deshabilitados.

## Recarga del panel

Después de recargar `/admin/settings/advanced/`, Disqus volvió a mostrar una página en blanco sin elementos interactivos. No se pudo confirmar desde la interfaz si el primer dominio quedó persistido.

## Navegación posterior

Tras la indicación de los enlaces, el navegador volvió a abrir el subdominio administrativo de Disqus. La primera carga y la espera posterior muestran una página blanca sin controles; el formulario aparece de forma intermitente cuando se navega desde la sección General y se espera a que termine la carga.

## Guardado solicitado

Se pulsó **Save** en Advanced Settings de Disqus con la configuración visible. La página no mostró un mensaje de éxito en la respuesta inmediata; falta recargar o revisar la lista para confirmar la persistencia de los dominios.

## Verificación del sitio publicado

El sitio `https://brayantheclips2025.manus.space/` carga correctamente y muestra la sección Comunidad. Después del guardado de Disqus, el widget sigue mostrando el fallback: `No se pudo cargar el widget de comentarios. Comprueba que el shortname brayantheclips2025 esté activo en Disqus y vuelve a intentarlo.`

La consola del navegador no mostró mensajes adicionales. Por tanto, la configuración de Trusted Domains todavía no está confirmada o el script externo de Disqus no está resolviendo correctamente en el dominio publicado.

## Diagnóstico del embed publicado

En el sitio publicado existe el script `https://brayantheclips2025.disqus.com/embed.js` y `window.DISQUS` es un objeto, pero la solicitud tiene `responseStatus: 0` y el contenedor `#disqus_thread` permanece vacío. La aplicación activa correctamente el embed; el bloqueo ocurre al cargar el recurso externo de Disqus, no en el renderizado de React.

## Website URL en General Settings

La ruta `brayantheclips2025.disqus.com/admin/settings/general/` también carga de forma intermitente; en esta última navegación el formulario quedó en blanco tras la espera. La URL oficial que debe colocarse cuando aparezca el campo es `https://brayantheclips2025.manus.space/`.
