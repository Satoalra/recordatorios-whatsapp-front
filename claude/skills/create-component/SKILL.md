---
name: create-component
description: >
  Crea componentes React con Material UI (MUI) siguiendo buenas prácticas:
  TypeScript estricto, estilos con sx/styled, formularios con estado local,
  y patrones consistentes para componentes UI reutilizables. Usa esta skill 
  siempre que el usuario pida crear, generar o scaffoldear un componente con 
  MUI, Material UI, o mencione términos como "card MUI", "modal MUI", "dialog",
  "button custom", "chip", "alert", "drawer", "snackbar",
  "tabla MUI", "layout con MUI", "componente con theme", o cualquier 
  combinación de React + MUI. También aplica cuando el usuario diga 
  "hazme un componente" dentro de un contexto de proyecto React/MUI.
---

# Skill: Crear Componentes con MUI

## Stack de referencia

- **MUI v5** (`@mui/material`, `@mui/icons-material`, `@emotion/react`, `@emotion/styled`)
- **TypeScript estricto** siempre — sin `any`, sin casteos innecesarios
- **Tema personalizado**: asumir que existe un `theme` custom a menos que el usuario diga lo contrario

---

## Proceso general

1. **Identificar el tipo de componente** solicitado (ver secciones abajo)
2. **Preguntar lo mínimo necesario** si el contexto es ambiguo (nombre, variantes, acciones)
3. **Generar el componente completo** en un solo archivo `.tsx`
4. **Incluir comentarios cortos** donde la lógica no sea obvia
5. **No agregar dependencias externas** — solo `@mui/material` e `@mui/icons-material`

---

## Estructura base de un componente

```tsx
// NombreComponente.tsx
import { Box, Typography } from '@mui/material'
import type { SxProps, Theme } from '@mui/material/styles'

interface NombreComponenteProps {
  // props tipadas — nunca omitir tipos
}

const NombreComponente = ({ ... } : NombreComponenteProps) => {
  return (
    <Box>
      {/* contenido */}
    </Box>
  )
}

export default NombreComponente
```

**Reglas de estructura:**

- Un archivo `.tsx` por componente
- Exportación `default` al final
- Props en interfaz nombrada `{Nombre}Props`
- Estilos inline con `sx`; si se repiten, extraer a `const styles: SxProps<Theme> = { ... }` arriba del componente

---

## Tipo 1 (PRIORITARIO): Componentes UI sueltos

Cards, Dialogs, Drawers, Snackbars, Tooltips, Chips, Alerts, Botones custom, Menus, Badges, etc.

Leer `references/ui-components.md` para patrones completos de cada variante.

**Reglas clave:**

- **Dialogs/Modals**: usar `Dialog` (nunca `Modal` directo salvo casos especiales). Siempre recibir `open` y `onClose` como props.
- **Cards**: usar `CardActions` para botones al pie, `CardHeader` para avatar + título
- **Feedback** (loading, errores, éxito): preferir `Snackbar + Alert` sobre alerts del navegador
- Evitar `makeStyles` / `withStyles` (legacy) — solo `sx`
- Iconos: siempre con `aria-label` si no tienen texto visible

## Tipo 4: Layouts y páginas

- `Box` + `display: 'flex'` o `display: 'grid'` para contenedores
- `Container` para limitar ancho máximo
- `Stack` para apilar elementos con gap uniforme
- `Grid2` (MUI v5.14+) en lugar del `Grid` legacy

---

## Estilos: reglas de oro

| Situación                                 | Solución                                                       |
| ----------------------------------------- | -------------------------------------------------------------- |
| Estilo puntual en JSX                     | `sx={{ mt: 2, color: 'text.secondary' }}`                      |
| Estilos reutilizables en el mismo archivo | `const styles: SxProps<Theme> = { ... }` encima del componente |
| Componente styled con lógica de tema      | `const StyledBox = styled(Box)(({ theme }) => ({ ... }))`      |
| Colores                                   | Del tema: `'primary.main'`, `'error.light'`, `'text.disabled'` |
| Espaciado                                 | Sistema MUI: `1 = 8px`, `2 = 16px`, `3 = 24px`…                |
| ❌ Nunca                                  | Colores hex hardcodeados, `makeStyles`, `withStyles`           |

---

## Checklist antes de entregar

- [ ] TypeScript completo — sin `any`, sin `!` innecesarios
- [ ] JSDoc en props no obvias
- [ ] `aria-label` en iconos sin texto visible
- [ ] Responsive: breakpoints del theme, no `px` fijos en media queries
- [ ] Imports específicos (no barrel imports de todo MUI)
- [ ] Si usa `DataGrid`: avisar que requiere instalar `@mui/x-data-grid`

---

## Referencias detalladas

- `references/ui-components.md` — Patrones completos: Drawer, Snackbar, Menu, Stepper, Tabs, Badge, Tooltip, SpeedDial
- `references/tables.md` — Table simple, DataGrid con columnas custom, paginación server-side, row actions
