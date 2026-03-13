import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { SPHttpClient } from '@microsoft/sp-http';
import styles from './IntranetApp.module.scss';
import { 
  BookOpen,
  Building2,
  Circle,
  ClipboardList,
  FileText, 
  Home,
  Link,
  LucideIcon,
  Video,
  ChevronDown
} from 'lucide-react';
import logoNRGourmet from '../assets/nr-gourmet-logo.png';

export interface IIntranetAppProps {
  context: WebPartContext;
}

interface ISharePointNavbarItem {
  Id: number;
  Title: string;
  URL?: string | { Url?: string; Description?: string };
  Grupo?: string;
  Ordem?: number | string;
  Ativo?: boolean | number | string;
  Icone?: string;
  TipoItem?: string;
}

interface INavbarItem {
  id: string;
  title: string;
  url: string;
  group: string;
  order: number;
  icon: string;
  type: string;
  children?: INavbarItem[];
}

const LIST_TITLE = 'INTRA-Navbar';
const DROPDOWN_HIDE_DELAY_MS = 350;

const normalize = (value: string): string => value.trim().toLowerCase();

const toNumber = (value: number | string | undefined): number => {
  if (typeof value === 'number') {
    return value;
  }

  if (typeof value === 'string') {
    const parsed = Number(value.replace(',', '.'));
    return isNaN(parsed) ? 9999 : parsed;
  }

  return 9999;
};

const toUrl = (value: string | { Url?: string; Description?: string } | undefined): string => {
  if (!value) {
    return '';
  }

  if (typeof value === 'string') {
    return value;
  }

  if (typeof value.Url === 'string') {
    return value.Url;
  }

  return '';
};

const iconMap: Record<string, LucideIcon> = {
  home: Home,
  bookopen: BookOpen,
  videotape: Video,
  video: Video,
  building2: Building2,
  filetext: FileText,
  file: FileText,
  link: Link,
  clipboardlist: ClipboardList
};

const getIcon = (iconName: string, size = 16): React.ReactElement => {
  const Icon = iconMap[normalize(iconName)] ?? Circle;
  return <Icon size={size} />;
};

const navegarPara = (url: string): void => {
  window.location.href = url;
};

const IntranetApp: React.FC<IIntranetAppProps> = ({ context }) => {
  const [navItems, setNavItems] = useState<INavbarItem[]>([]);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const hideDropdownTimeoutRef = useRef<number | null>(null);

  const siteUrl = context.pageContext.web.absoluteUrl;
  const homeUrl = siteUrl;

  useEffect(() => {
    const loadNavbarItems = async (): Promise<void> => {
      try {
        const endpoint = `${siteUrl}/_api/web/lists/getbytitle('${LIST_TITLE}')/items?$select=Id,Title,URL,Grupo,Ordem,Ativo,Icone,TipoItem&$orderby=Ordem asc`;
        const response = await context.spHttpClient.get(endpoint, SPHttpClient.configurations.v1);

        if (!response.ok) {
          return;
        }

        const data = await response.json();
        const items: ISharePointNavbarItem[] = data.value || [];

        const activeItems = items
          .filter((item) => item.Ativo === true || item.Ativo === 1 || item.Ativo === '1')
          .map((item) => ({
            id: String(item.Id),
            title: item.Title || '',
            url: toUrl(item.URL),
            group: item.Grupo || '',
            order: toNumber(item.Ordem),
            icon: item.Icone || '',
            type: item.TipoItem || ''
          }));

        const topLevelItems = activeItems
          .filter((item) => item.type === 'NavLink' || item.type === 'Dropdown')
          .sort((a, b) => a.order - b.order);

        const dropdownItems = activeItems
          .filter((item) => item.type === 'DropdownItem')
          .sort((a, b) => a.order - b.order);

        const structuredItems = topLevelItems.map((item) => ({
          ...item,
          children:
            item.type === 'Dropdown'
              ? dropdownItems.filter((child) => normalize(child.group) === normalize(item.title))
              : []
        }));

        setNavItems(structuredItems);
      } catch {
        setNavItems([]);
      }
    };

    loadNavbarItems().then(undefined, () => undefined);
  }, [context.spHttpClient, siteUrl]);

  useEffect(() => {
    return () => {
      if (hideDropdownTimeoutRef.current !== null) {
        window.clearTimeout(hideDropdownTimeoutRef.current);
      }
    };
  }, []);

  const openDropdown = (dropdownId: string): void => {
    if (hideDropdownTimeoutRef.current !== null) {
      window.clearTimeout(hideDropdownTimeoutRef.current);
      hideDropdownTimeoutRef.current = null;
    }

    setOpenDropdownId(dropdownId);
  };

  const closeDropdownWithDelay = (): void => {
    if (hideDropdownTimeoutRef.current !== null) {
      window.clearTimeout(hideDropdownTimeoutRef.current);
    }

    hideDropdownTimeoutRef.current = window.setTimeout(() => {
      setOpenDropdownId(null);
      hideDropdownTimeoutRef.current = null;
    }, DROPDOWN_HIDE_DELAY_MS);
  };

  return (
    <div className={styles.intranet}>
      {/* Navbar do SharePoint NR Gourmet */}
      <div className={styles.navigationWrapper}>
        <div className={styles.logo} onClick={() => navegarPara(homeUrl)}>
          <img src={logoNRGourmet} alt="NR Gourmet" className={styles.logoImage} />
          <div className={styles.logoText}>
            <span className={styles.logoTitle}>NR GOURMET</span>
            <span className={styles.logoSubtitle}>INTRANET</span>
          </div>
        </div>
        
        <nav className={styles.navigation}>
          <ul>
            {navItems.length === 0 && (
              <li>
                <button onClick={() => navegarPara(homeUrl)}>
                  <Home size={16} /> Início
                </button>
              </li>
            )}
            {navItems.map((item) => (
              <li
                key={item.id}
                className={item.type === 'Dropdown' ? styles.dropdownMenu : ''}
                onMouseEnter={() => item.type === 'Dropdown' && openDropdown(item.id)}
                onMouseLeave={() => item.type === 'Dropdown' && closeDropdownWithDelay()}
              >
                {item.type === 'Dropdown' ? (
                  <button className={openDropdownId === item.id ? styles.active : ''}>
                    {getIcon(item.icon)} {item.title}
                    <ChevronDown
                      size={14}
                      className={openDropdownId === item.id ? styles.chevronUp : styles.chevronDown}
                    />
                  </button>
                ) : (
                  <button onClick={() => item.url && navegarPara(item.url)}>
                    {getIcon(item.icon)} {item.title}
                  </button>
                )}

                {item.type === 'Dropdown' && openDropdownId === item.id && (item.children || []).length > 0 && (
                  <div className={styles.dropdownContent}>
                    {(item.children || []).map((child) => (
                      <a
                        key={child.id}
                        href={child.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-interception="off"
                      >
                        {child.title}
                      </a>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default IntranetApp;
