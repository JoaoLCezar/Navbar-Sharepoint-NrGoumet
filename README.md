# 🧭 NavBar SharePoint - NR Gourmet

Barra de navegação global para SharePoint desenvolvida com SPFx como **Web Part**.

---

## 📦 O que é?

Um **Web Part** SPFx que fornece uma navbar moderna e funcional para sites SharePoint:

- 🏠 **Home** - Retorna à página inicial
- 👥 **Contatos** - Página de contatos
- 🏢 **Setores** - Dropdown com 15 departamentos
- 📄 **Formulários** - Dropdown com formulários corporativos
- 🖼️ **Logo NR Gourmet** - Clicável

**Adicione manualmente** em qualquer página SharePoint onde precisar da navbar.

---

## 🚀 Quick Start

### 1️⃣ Instalar e Testar
```powershell
npm install
gulp serve
```
Adicione o Web Part "NavBar NR Gourmet" no workbench.

### 2️⃣ Build de Produção
```powershell
gulp clean
gulp bundle --ship
gulp package-solution --ship
```

### 3️⃣ Deploy
1. Upload do `.sppkg` no **App Catalog**
2. Instale o app no seu site SharePoint
3. **Adicione o Web Part** nas páginas desejadas

**📖 [Guia completo de uso →](NAVBAR_WEBPART_README.md)**

---

## 🔧 Personalizar

### URLs dos Menus
[`src/webparts/navbarIntranet/components/IntranetConfig.ts`](src/webparts/navbarIntranet/components/IntranetConfig.ts)

```typescript
export const setores: ISetor[] = [
  { id: 'almoxarifado', nome: 'Almoxarifado', url: '/sites/...' },
  // Editar conforme necessário
];
```

### Cores
[`src/webparts/navbarIntranet/components/IntranetApp.module.scss`](src/webparts/navbarIntranet/components/IntranetApp.module.scss)

```scss
$primary-color: #243e80;    // Fundo da navbar
$secondary-color: #0097ce;  // Destaque
```

---

## 📁 Estrutura

```
src/webparts/navbarIntranet/
├── components/
│   ├── IntranetApp.tsx           # ✅ Código da NAVBAR
│   ├── IntranetApp.module.scss   # ✅ Estilos
│   └── IntranetConfig.ts         # ✅ URLs (EDITAR AQUI)
└── assets/
    └── nr-gourmet-logo.png
```

---

## 📚 Documentação

- 📖 **[Guia completo →](NAVBAR_WEBPART_README.md)** - Instruções detalhadas de uso e personalização

---

## 🛠️ Tecnologias

- SharePoint Framework (SPFx) 1.20.0
- React 17.0.1
- TypeScript 4.7.4
- Lucide React (ícones)
- Node.js 18.x

---

## 📝 Scripts

```powershell
npm run build          # Build debug
gulp serve             # Desenvolvimento local
gulp bundle --ship     # Build produção
gulp package-solution  # Gerar .sppkg
```

---

## 💡 Como Adicionar em Páginas

1. Edite a página SharePoint
2. Clique em **+ Adicionar web part**
3. Procure **"NavBar NR Gourmet"**
4. Adicione no topo da página
5. Configure largura total para melhor visual
6. Publique a página

**Dica:** Crie uma seção "Largura total" antes de adicionar a navbar.

---

## 👨‍💻 Desenvolvido por

**Centro de Excelência - João Cezar**  
NR Gourmet Corporate

---

## 📄 Licença

Uso interno - NR Gourmet

