/**
 * Configuração da NavBar NR Gourmet
 * 
 * IMPORTANTE: Ajuste as URLs de acordo com a estrutura do seu SharePoint
 */

/**
 * Interface para Setores (Departamentos)
 */
export interface ISetor {
  id: string;
  nome: string;
  url: string;
}

/**
 * Interface para Formulários
 */
export interface IFormulario {
  id: string;
  nome: string;
  url: string;
  categoria?: string;
}

/**
 * Lista de Setores
 * 🔧 EDITE AQUI: Adicione, remova ou modifique os setores
 */
export const setores: ISetor[] = [
  {
    id: 'almoxarifado',
    nome: 'Almoxarifado',
    url: '/sites/intranet/SitePages/Almoxarifado.aspx'
  },
  {
    id: 'cd',
    nome: 'CD - Centro de Distribuição',
    url: '/sites/intranet/SitePages/CD---Centro-de-Distribuição.aspx'
  },
  {
    id: 'coe',
    nome: 'Centro de Excelência',
    url: '/sites/intranet/SitePages/Centro%20de%20Excelência.aspx'
  },
  {
    id: 'compras',
    nome: 'Compras',
    url: '/sites/intranet/SitePages/Compras.aspx'
  },
  {
    id: 'faturamento',
    nome: 'Faturamento',
    url: '/sites/intranet/SitePages/Faturamento.aspx'
  },
  {
    id: 'financeiro',
    nome: 'Financeiro',
    url: '/sites/intranet/SitePages/Financeiro.aspx'
  },
  {
    id: 'licitacoes',
    nome: 'Licitações',
    url: '/sites/intranet/SitePages/Licitações.aspx'
  },
  {
    id: 'logistica',
    nome: 'Logística',
    url: '/sites/intranet/SitePages/Logística.aspx'
  },
  {
    id: 'manutencao',
    nome: 'Manutenção de Equipamentos',
    url: '/sites/intranet/SitePages/Manutenção.aspx'
  },
  {
    id: 'operacional',
    nome: 'Operacional',
    url: '/sites/intranet/SitePages/Operações.aspx'
  },
  {
    id: 'patrimonio',
    nome: 'Patrimônio',
    url: '/sites/intranet/SitePages/Patrimônio.aspx'
  },
  {
    id: 'planejamento',
    nome: 'Planejamento',
    url: '/sites/intranet/SitePages/Planejamento.aspx'
  },
  {
    id: 'rh',
    nome: 'Recursos Humanos',
    url: '/sites/intranet/SitePages/RH.aspx'
  },
  {
    id: 'ti',
    nome: 'TI',
    url: '/sites/intranet/SitePages/TI.aspx'
  }
];

/**
 * Lista de Formulários
 * 🔧 EDITE AQUI: Adicione, remova ou modifique os formulários
 */
export const formularios: IFormulario[] = [
  {
    id: 'chamado_de_compras',
    nome: 'Chamado de Compras',
    url: 'https://nrgourmet.sharepoint.com/:l:/s/intranet/JABcxNLHpZs7Q54qMUCTmLbiAVtE_QCKPHtJksa7PJmoPyM?nav=YzNmM2JiNDYtZWU4Zi00NjM4LWI5YjAtZWY5YWYyMWM5MzE5',
    categoria: 'Compras'
  },
  {
    id: 'solicitacao_de_manutencao_os',
    nome: 'Solicitação de Manutenção - OS',
    url: 'https://nrgourmet.sharepoint.com/:l:/s/intranet/JADiOc196NjnQ4o_73CLNjCUAbsok8WqKpblIkMAmThqHLY?nav=N2I5Y2Q1OGQtNGRmNy00NDgxLWExOGYtYmY4MDMyOGQ5ZGUw',
    categoria: 'Manutenção'
  },
  {
    id: 'solicitacao_de_ti',
    nome: 'Solicitação de TI',
    url: 'https://nrgourmet.sharepoint.com/:l:/s/intranet/JAAnaTqNcKtJSIysmYauX_lLARFnEXklmWO1C5WTiyVTaZE?nav=NjJkNmFiM2QtNDk0ZS00OGVkLWJjNmMtMjFhZDZhZDIxYzM4',
    categoria: 'TI'
  },
  {
    id: 'solicitacao_de_freelancer',
    nome: 'Solicitação de Freelancer',
    url: 'https://nrgourmet.sharepoint.com/:l:/s/intranet/JAB5bmM_w3OrQqrfGL7sbXx7AZuZKjPrxb0fk9zZfbwnkXU?nav=NWY2MTNmMWUtYjA5Mi00YmZmLTgyNWUtZmJkMGU2MDU5NWRk',
    categoria: 'RH'
  },
  {
    id: 'solicitacao_de_pedido_extra',
    nome: 'Solicitação de Pedido Extra',
    url: 'https://nrgourmet.sharepoint.com/:l:/s/intranet/JAD1URsyJyKUQKSPnTsyFLiyAZli_YvGQMBDRi0jL_Z4dOg?nav=YWI4ZDc3OTItYjYyZS00N2UyLTg0MzItZTczYjU1MDNkNDRj',
    categoria: 'Planejamento'
  }
];

/**
 * Navega para uma URL do SharePoint na mesma aba
 */
export const navegarPara = (url: string): void => {
  window.location.href = url;
};
