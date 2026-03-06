import * as React from 'react';
import { useState } from 'react';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import styles from './IntranetApp.module.scss';
import { 
  FileText, 
  Users, 
  Home,
  Video,
  ChevronDown
} from 'lucide-react';
import { navegarPara, setores, formularios } from './IntranetConfig';
import logoNRGourmet from '../assets/nr-gourmet-logo.png';

export interface IIntranetAppProps {
  context: WebPartContext;
}

const IntranetApp: React.FC<IIntranetAppProps> = ({ context }) => {
  const [setoresDropdownOpen, setSetoresDropdownOpen] = useState(false);
  const [formulariosDropdownOpen, setFormulariosDropdownOpen] = useState(false);

  // URL base do site
  const siteUrl = context.pageContext.web.absoluteUrl;
  const homeUrl = siteUrl;
  const centralDocumentosUrl = `${siteUrl}/SitePages/CentralDeDocumentos.aspx`;
  const videotecaUrl = `${siteUrl}/SitePages/Videoteca.aspx`;

  return (
    <div className={styles.intranet}>
      {/* Navbar do SharePoint NR Gourmet */}
      <div className={styles.navigationWrapper}>
        <div className={styles.logo} onClick={() => navegarPara(homeUrl)}>
          <img src={logoNRGourmet} alt="NR Gourmet" className={styles.logoImage} />
        </div>
        
        <nav className={styles.navigation}>
          <ul>
            <li>
              <button onClick={() => navegarPara(homeUrl)}>
                <Home size={16} /> Início
              </button>
            </li>
            <li>
              <button onClick={() => navegarPara(centralDocumentosUrl)}>
                <FileText size={16} /> Central de Documentos
              </button>
            </li>
            <li>
              <button onClick={() => navegarPara(videotecaUrl)}>
                <Video size={16} /> Videoteca
              </button>
            </li>
            <li 
              className={styles.dropdownMenu}
              onMouseEnter={() => setSetoresDropdownOpen(true)}
              onMouseLeave={() => setSetoresDropdownOpen(false)}
            >
              <button className={setoresDropdownOpen ? styles.active : ''}>
                <Users size={16} /> Setores
                <ChevronDown size={14} className={setoresDropdownOpen ? styles.chevronUp : styles.chevronDown} />
              </button>
              {setoresDropdownOpen && (
                <div className={styles.dropdownContent}>
                  {setores.map((setor) => (
                    <a 
                      key={setor.id}
                      href={String(setor.url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-interception="off"
                    >
                      {setor.nome}
                    </a>
                  ))}
                </div>
              )}
            </li>
            <li 
              className={styles.dropdownMenu}
              onMouseEnter={() => setFormulariosDropdownOpen(true)}
              onMouseLeave={() => setFormulariosDropdownOpen(false)}
            >
              <button className={formulariosDropdownOpen ? styles.active : ''}>
                <FileText size={16} /> Formulários
                <ChevronDown size={14} className={formulariosDropdownOpen ? styles.chevronUp : styles.chevronDown} />
              </button>
              {formulariosDropdownOpen && (
                <div className={styles.dropdownContent}>
                  {formularios.map((formulario) => (
                    <a 
                      key={formulario.id}
                      href={formulario.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-interception="off"
                    >
                      {formulario.nome}
                    </a>
                  ))}
                </div>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default IntranetApp;
