# Project TODO

- [x] Integrar miniaturas reales en clips y videos
- [x] Implementar lazy loading para miniaturas
- [x] Integrar sistema de comentarios de Disqus con shortname brayantheclips2025
- [x] Verificar compilación y pruebas del sistema de comentarios
- [x] Guardar checkpoint de la integración de Disqus
- [x] Revisar y corregir los errores reportados en el sitio (corregida la incompatibilidad de colores OKLCH y sustituido el embed dinámico)
- [x] Configurar el shortname `brayantheclips2025` en Disqus y autorizar los dominios publicados
- [x] Validar en el navegador publicado que el widget de Disqus renderiza correctamente
- [x] Reemplazar la carga indefinida de Disqus por un estado de carga y un fallback visible con diagnóstico
- [x] Validar y endurecer la detección de carga del widget de Disqus tras autorizar los dominios publicados (resuelto mediante iframe directo).
- [x] Revisar la documentación oficial de Disqus Universal Code y ajustar la implementación del embed.
- [x] Diagnosticar el error actual de carga del widget de Disqus en el sitio publicado y documentar la causa.
- [x] Añadir un fallback de colores RGB/hex para evitar que Disqus falle al analizar variables OKLCH.
- [x] Añadir cache-busting controlado al script embed.js de Disqus para evitar reutilizar una carga fallida en el navegador (obsoleto: embed.js fue retirado).
- [x] Reemplazar la carga dinámica de Disqus por un iframe directo conservando el shortname técnico del foro.
- [x] Diagnosticar el iframe de Disqus en producción y reestructurar la sección Comunidad con HTML5 semántico.
- [x] Sustituir el iframe directo por Universal Code oficial de Disqus dentro del contenedor HTML5 semántico y validar que renderice el hilo.
- [x] Convertir las variables CSS globales de tema a hex/sRGB para eliminar el error parseColor de Universal Code.

# Reversión de Comentarios Nativos a Disqus
- [x] Restaurar DisqusComments en `client/src/pages/Home.tsx` conservando el diseño y el resto de funcionalidades.
- [x] Validar que las pruebas de Disqus pasen correctamente y que la compilación y TypeScript no tengan errores.
- [ ] Publicar la versión restaurada con Disqus y sincronizar con GitHub.
