# Styllu's Barber Shop - Landing Page

Uma landing page moderna e premium para a barbearia **Styllu's Barber Shop**, desenvolvida com React, TypeScript, Tailwind CSS 3 e animações com Framer Motion.

![Styllu's Barber Shop](https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1200&h=400&fit=crop)

## 🚀 Tecnologias Utilizadas

- **React 18** - Biblioteca JavaScript para construção de interfaces
- **TypeScript** - Superset JavaScript com tipagem estática
- **Vite** - Build tool rápido e moderno
- **Tailwind CSS 3** - Framework CSS utilitário
- **Framer Motion** - Biblioteca de animações
- **Lucide React** - Ícones modernos
- **clsx + tailwind-merge** - Utilitários para classes CSS condicionais

## 📁 Estrutura do Projeto

```
styllus-barber-shop/
├── public/
│   └── images/           # Imagens da galeria e logo
├── src/
│   ├── components/
│   │   ├── layout/       # Componentes de estrutura
│   │   │   ├── Layout.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── index.ts
│   │   ├── sections/     # Seções da landing page
│   │   │   ├── HeroSection.tsx
│   │   │   ├── AboutSection.tsx
│   │   │   ├── ServicesSection.tsx
│   │   │   ├── GallerySection.tsx
│   │   │   ├── BookingSection.tsx
│   │   │   └── index.ts
│   │   └── ui/           # Componentes reutilizáveis
│   │       ├── Logo.tsx
│   │       ├── SectionTitle.tsx
│   │       ├── PrimaryButton.tsx
│   │       ├── FeatureCard.tsx
│   │       ├── ServiceCard.tsx
│   │       ├── GalleryItem.tsx
│   │       ├── TextInput.tsx
│   │       ├── SelectInput.tsx
│   │       ├── Textarea.tsx
│   │       └── index.ts
│   ├── lib/
│   │   └── utils.ts      # Funções utilitárias
│   ├── App.tsx           # Componente principal
│   ├── main.tsx          # Ponto de entrada
│   └── index.css         # Estilos globais
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── PROMPTS_IMAGENS.md    # Prompts para gerar imagens com IA
└── README.md
```

## 🎨 Seções da Landing Page

1. **Hero Section** - Destaque inicial com logo, slogan e CTA
2. **Sobre (About)** - Apresentação da barbearia e diferenciais
3. **Serviços** - Lista de serviços com preços
4. **Galeria** - Portfólio de trabalhos e ambiente
5. **Agendamento** - Formulário para marcação de horários

## 🛠️ Como Rodar o Projeto

### Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn

### Instalação

```bash
# Clone ou navegue até a pasta do projeto
cd styllus-barber-shop

# Instale as dependências
npm install

# Rode o servidor de desenvolvimento
npm run dev
```

### Acesse no navegador

```
http://localhost:5173
```

## 🎨 Paleta de Cores

| Cor | Hex | Uso |
|-----|-----|-----|
| Preto Grafite | `#0a0a0a` | Fundo principal |
| Cinza Escuro | `#1f2937` | Fundo secundário |
| Dourado | `#d4a017` | Destaque principal |
| Dourado Claro | `#facc15` | Acentos |
| Vermelho Profundo | `#8b0000` | Destaque secundário |
| Branco | `#ffffff` | Texto principal |

## 📝 Comandos Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview

# Lint
npm run lint
```

## 🖼️ Geração de Imagens

O projeto inclui um arquivo `PROMPTS_IMAGENS.md` com prompts detalhados para gerar:

- Logo da barbearia
- Imagens para a galeria

Os prompts são compatíveis com:
- DALL·E 3
- Midjourney
- Leonardo AI
- Outras ferramentas de IA generativa

## 📱 Responsividade

A landing page é totalmente responsiva e otimizada para:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (< 768px)

## ✨ Funcionalidades

- ✅ Navegação suave com scroll por âncoras
- ✅ Menu mobile com animações
- ✅ Navbar que muda de estilo ao rolar
- ✅ Formulário de agendamento funcional
- ✅ Galeria com modal de visualização
- ✅ Animações de entrada com Framer Motion
- ✅ Componentes totalmente tipados com TypeScript
- ✅ Tema escuro com acentos dourados

## 📄 Licença

Este projeto é para fins educacionais e demonstrativos.

---

Desenvolvido com ♥ para **Styllu's Barber Shop**
