# 🧭 NavBar Web Part - SharePoint NR Gourmet

Navbar simplificada como **Web Part** que pode ser adicionada manualmente em qualquer página do SharePoint.

---

## 📋 O que é?

Um **Web Part SPFx** contendo apenas a barra de navegação global da NR Gourmet:

- 🏠 **Home** - Retorna à página inicial do site
- 👥 **Contatos** - Link para página de contatos
- 🏢 **Setores** - Dropdown com todos os departamentos  
- 📄 **Formulários** - Dropdown com formulários corporativos
- 🖼️ **Logo NR Gourmet** - Clicável, retorna à home

---

## 🚀 Como Usar

### 1️⃣ **Testar Localmente**

```powershell
# Instalar dependências (primeira vez)
npm install

# Iniciar servidor de desenvolvimento
gulp serve
```

O workbench do SharePoint abrirá. Adicione o Web Part "NavBar NR Gourmet" na página.

### 2️⃣ **Build de Produção**

```powershell
gulp clean
gulp bundle --ship
gulp package-solution --ship
```

O pacote `.sppkg` será gerado em:
```
sharepoint/solution/navbar-intranet.sppkg
```

### 3️⃣ **Deploy no SharePoint**

**Passo A: Upload no App Catalog**
1. Acesse o App Catalog do tenant:
   ```
   https://SEU-TENANT.sharepoint.com/sites/appcatalog
   ```
2. Faça upload do arquivo `.sppkg`
3. Clique em **Deploy**

**Passo B: Adicionar o App no Site**
1. Vá para o site onde quer usar a navbar
2. Clique em **⚙️ Configurações** → **Adicionar um app**
3. Procure por "navbar-intranet" e clique em **Adicionar**

**Passo C: Adicionar o Web Part em Páginas**
1. Edite a página desejada
2. Clique em **+ (Adicionar web part)**
3. Procure por "NavBar NR Gourmet"
4. Adicione no topo da página
5. Publique a página

---

## 📐 Layout Recomendado

Para melhor resultado visual:

1. **Largura total:** Configure o web part para ocupar a largura completa da página
2. **Posição:** Sempre no **topo** da página
3. **Seção:** Use uma seção de largura total (Full-width section)

### Como configurar largura total:

1. Edite a página
2. Adicione uma nova seção do tipo **"Uma coluna"**
3. Clique nos **3 pontos** da seção → **Editar seção**
4. Em "Layout", selecione **"Largura total"**
5. Adicione o Web Part "NavBar NR Gourmet" nesta seção

---

## 🔧 Personalizar URLs

### Editar Links dos Menus

**Arquivo:** [`src/webparts/navbarIntranet/components/IntranetConfig.ts`](../src/webparts/navbarIntranet/components/IntranetConfig.ts)

```typescript
// Setores (Departamentos)
export const setores: ISetor[] = [
  {
    id: 'almoxarifado',
    nome: 'Almoxarifado',
    url: '/sites/intranet/SitePages/Almoxarifado.aspx'
  },
  // Adicionar ou remover conforme necessário
];

// Formulários
export const formularios: IFormulario[] = [
  {
    id: 'ferias',
    nome: 'Solicitação de Férias',
    url: '/sites/intranet/Lists/SolicitacaoFerias/AllItems.aspx',
    categoria: 'RH'
  },
  // Adicionar ou remover conforme necessário
];
```

### Personalizar Cores

**Arquivo:** [`src/webparts/navbarIntranet/components/IntranetApp.module.scss`](../src/webparts/navbarIntranet/components/IntranetApp.module.scss)

```scss
$primary-color: #243e80;    // Azul escuro - cor de fundo da navbar
$secondary-color: #0097ce;  // Azul claro - cor de destaque
```

---

## 🔄 Atualizar o Web Part

Quando fizer alterações:

1. Edite os arquivos necessários
2. Execute:
   ```powershell
   gulp clean
   gulp bundle --ship
   gulp package-solution --ship
   ```
3. Faça upload do novo `.sppkg` no App Catalog (sobrescrever)
4. ⚠️ **Importante:** Atualize a versão em [`config/package-solution.json`](../config/package-solution.json) antes:
   ```json
   "version": "1.0.4.0"  // Incrementar versão
   ```

---

## 📦 Adicionar em Múltiplas Páginas

### Opção 1: Manual (Página por Página)
Adicione o Web Part manualmente em cada página seguindo o "Passo C" acima.

### Opção 2: Criar Template de Página
1. Crie uma página modelo com a navbar
2. Salve como template
3. Use o template ao criar novas páginas

---

## 🆘 Troubleshooting

### ❌ Web Part não aparece na lista
- Verifique se o app foi instalado no site (**Configurações** → **Conteúdo do site**)
- Certifique-se que fez deploy no App Catalog

### ❌ Links não funcionam
- Verifique as URLs em `IntranetConfig.ts`
- Certifique-se que as páginas/listas existem no SharePoint

### ❌ Estilos não aplicados
```powershell
gulp clean
npm install
gulp build
```

### ❌ Erro ao fazer build
- Verifique a versão do Node.js (deve ser 18.x)
- Execute `npm install` novamente

---

## 📁 Estrutura do Projeto

```
src/webparts/navbarIntranet/
├── NavbarIntranetWebPart.ts                # Entry point
├── NavbarIntranetWebPart.manifest.json     # Configuração do Web Part
├── components/
│   ├── IntranetApp.tsx                     # ✅ Componente NAVBAR (código principal)
│   ├── IntranetApp.module.scss             # ✅ Estilos da NAVBAR
│   ├── IntranetConfig.ts                   # ✅ URLs e configurações (EDITAR AQUI)
│   ├── NavbarIntranet.tsx                  # Wrapper
│   └── INavbarIntranetProps.ts
├── assets/
│   └── nr-gourmet-logo.png                 # Logo
└── loc/
    └── en-us.js
```

---

## 🎯 Diferenças: Web Part vs Extension

| Característica | Web Part (Esta Opção) | Extension |
|----------------|----------------------|-----------|
| **Aparece em** | Páginas onde for adicionado | Todas as páginas (automático) |
| **Config** | Manual, página por página | Deploy único |
| **Flexibilidade** | ✅ Alta (cada página diferente) | ❌ Baixa (igual em todas) |
| **Manutenção** | ❌ Trabalhoso (atualizar cada página) | ✅ Fácil (atualiza todas de uma vez) |
| **Ideal para** | Sites pequenos, poucas páginas | Sites grandes, muitas páginas |

---

## 💡 Próximos Passos

1. ✅ Teste localmente com `gulp serve`
2. ✅ Ajuste as URLs em `IntranetConfig.ts`
3. ✅ Personalize as cores em `IntranetApp.module.scss`
4. ✅ Faça build de produção
5. ✅ Deploy no App Catalog
6. ✅ Adicione em páginas do SharePoint

---

**Desenvolvido por:** Centro de Excelência - João Cezar  
**Versão:** 1.0.0  
**SPFx:** 1.20.0  
**Tipo:** Web Part (Client-Side)
