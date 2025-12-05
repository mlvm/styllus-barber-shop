# Styllu's Barber Shop - Guia de Imagens para IA

Este documento contém prompts detalhados para geração de imagens usando ferramentas de IA como DALL·E, Midjourney, Leonardo AI ou similares.

---

## 🎨 LOGO DA BARBEARIA

### Prompt Principal (DALL·E / Leonardo AI)

```
A premium barbershop logo for "Styllu's Barber Shop". Modern yet classic design featuring elegant crossed scissors and a straight razor forming a sophisticated emblem. The logo uses a dark background (charcoal black #0a0a0a) with gold (#d4a017) and deep red (#8b0000) accents. Include subtle masculine elements like a stylized mustache silhouette integrated into the design. The typography should be bold and strong with a sans-serif font. Style: luxurious, urban, contemporary barbershop with traditional roots. Clean vector-style illustration, suitable for signage and branding. High contrast, professional quality.
```

### Prompt Alternativo (Midjourney)

```
/imagine premium barbershop logo "Styllu's Barber Shop", elegant crossed golden scissors, straight razor, dark charcoal background, gold and deep red accents, stylized mustache element, bold modern typography, luxurious masculine aesthetic, vector style, clean lines, professional branding, 4k quality --ar 1:1 --style raw --v 6
```

### Variação Minimalista

```
Minimalist barbershop logo icon for "Styllu's Barber Shop". A single elegant golden scissors silhouette on black background, with subtle gradient from gold (#d4a017) to deep gold (#b8860b). Clean geometric design, premium feel, suitable for app icon and favicon. Vector illustration style.
```

---

## 📸 IMAGENS DA GALERIA

### Imagem 1: Corte Moderno Degradê

**Prompt:**
```
Professional photograph of a stylish men's haircut in a premium barbershop. Close-up shot showing a perfect fade haircut with clean lines, textured top. Young man with well-groomed appearance. Warm ambient lighting with golden tones. Barbershop setting with leather chairs visible in background. High-end photography style, sharp focus on the haircut details. Moody atmosphere with dark tones and gold highlights.
```

**Categoria:** Cortes
**Nome sugerido:** `corte-moderno-degrade.jpg`

---

### Imagem 2: Barba Estilizada

**Prompt:**
```
Professional close-up photograph of a perfectly groomed beard. Man with full, well-shaped beard styled with precision. Barbershop setting, showing skilled craftsmanship. Warm golden lighting creating dramatic shadows. The beard has clean edges and neat lines. Premium grooming photography with rich dark tones and subtle gold color grading. High resolution, magazine quality.
```

**Categoria:** Barbas
**Nome sugerido:** `barba-estilizada.jpg`

---

### Imagem 3: Ambiente Premium da Barbearia

**Prompt:**
```
Interior photograph of a luxury premium barbershop. Dark sophisticated decor with exposed brick walls, vintage leather barber chairs, warm golden pendant lighting. Industrial-modern aesthetic with classic barbershop elements. Mirrors with brass frames, quality grooming products displayed on wooden shelves. Moody atmosphere with dramatic lighting. Professional architectural photography style. Colors: dark charcoal, leather brown, gold accents.
```

**Categoria:** Ambiente
**Nome sugerido:** `ambiente-premium.jpg`

---

### Imagem 4: Detalhes de Precisão

**Prompt:**
```
Close-up photograph of a barber performing a precise haircut. Focus on the scissors cutting hair with extreme detail. Hands of a professional barber at work. Golden warm lighting, blurred barbershop background. The image captures the artistry and precision of the craft. Professional photography with shallow depth of field. Dark moody color grading with gold highlights.
```

**Categoria:** Cortes
**Nome sugerido:** `detalhes-precisao.jpg`

---

### Imagem 5: Cadeira de Barbeiro Clássica

**Prompt:**
```
Artistic photograph of a classic vintage barber chair in a premium barbershop. The chair has rich leather upholstery in dark brown or burgundy. Dramatic lighting with golden warm tones creating atmosphere. Clean, organized barbershop environment visible. Tools and accessories neatly arranged. Professional interior photography style. Moody, sophisticated ambiance with dark background and gold accent lighting.
```

**Categoria:** Ambiente
**Nome sugerido:** `cadeira-classica.jpg`

---

### Imagem 6: Fade Perfeito

**Prompt:**
```
Professional photograph showcasing a perfect skin fade haircut from the back view. Clean gradient from skin to longer hair on top. Young man sitting in barber chair. Premium barbershop environment with warm ambient lighting. Sharp focus on the fade transition showing the skill and precision. High-end men's grooming photography. Dark, moody color grading with subtle gold tones.
```

**Categoria:** Cortes
**Nome sugerido:** `fade-perfeito.jpg`

---

## 🎯 DICAS PARA MELHORES RESULTADOS

### Parâmetros Recomendados (Midjourney)

- **Aspect Ratio:** `--ar 1:1` para quadradas, `--ar 16:9` para banners
- **Qualidade:** `--q 2` para alta qualidade
- **Estilo:** `--style raw` para resultados mais realistas
- **Versão:** `--v 6` para a versão mais recente

### Parâmetros Leonardo AI

- **Model:** PhotoReal v2 ou Kino XL
- **Guidance Scale:** 7-9
- **Steps:** 30-50
- **Resolution:** 1024x1024 ou superior

### Parâmetros DALL·E 3

- **Size:** 1024x1024 ou 1792x1024
- **Quality:** HD
- **Style:** Natural ou Vivid (dependendo do resultado desejado)

---

## 🎨 PALETA DE CORES DE REFERÊNCIA

| Cor | Hex | Uso |
|-----|-----|-----|
| Preto Grafite | `#0a0a0a` | Fundo principal |
| Cinza Escuro | `#1f2937` | Fundo secundário |
| Dourado | `#d4a017` | Destaque principal |
| Dourado Claro | `#facc15` | Acentos |
| Vermelho Profundo | `#8b0000` | Destaque secundário |
| Branco | `#ffffff` | Texto principal |
| Cinza | `#9ca3af` | Texto secundário |

---

## 📁 ORGANIZAÇÃO DOS ARQUIVOS

Após gerar as imagens, organize-as na seguinte estrutura:

```
public/
└── images/
    ├── logo/
    │   ├── logo-primary.png
    │   ├── logo-icon.png
    │   └── logo-white.png
    └── gallery/
        ├── corte-moderno-degrade.jpg
        ├── barba-estilizada.jpg
        ├── ambiente-premium.jpg
        ├── detalhes-precisao.jpg
        ├── cadeira-classica.jpg
        └── fade-perfeito.jpg
```

---

## 🔄 ATUALIZAÇÃO DAS IMAGENS NO CÓDIGO

Após adicionar as imagens locais, atualize o arquivo `src/components/sections/GallerySection.tsx`:

```tsx
const galleryImages: GalleryImage[] = [
  {
    id: '1',
    src: '/images/gallery/corte-moderno-degrade.jpg',
    alt: 'Corte Moderno Degradê',
    category: 'Cortes',
  },
  // ... outras imagens
];
```

E para a logo, atualize `src/components/ui/Logo.tsx` se quiser usar uma imagem em vez do ícone.
