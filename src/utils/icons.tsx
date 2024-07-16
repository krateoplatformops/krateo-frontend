import Dashboard from '../assets/icons/dashboard.svg?react';
import Projects from '../assets/icons/projects.svg?react';
import Templates from '../assets/icons/templates.svg?react';
import Providers from '../assets/icons/providers.svg?react';
import Status from '../assets/icons/status.svg?react';
import Organizations from '../assets/icons/organizations.svg?react';
import Logs from '../assets/icons/logs.svg?react';
import Endpoints from '../assets/icons/endpoints.svg?react';
import Licenses from '../assets/icons/licenses.svg?react';

export type IconCode = 'dashboard' | 'projects' | 'compositions' | 'templates' | 'providers' | 'status' | 'organizations' | 'logs' | 'endpoints' | 'licenses';

export const getIcon = (code: IconCode) => {
  switch (code) {
    case 'dashboard':
      return <Dashboard />

    case 'projects':
      return <Projects />

    case 'compositions':
      return <Projects />

    case 'templates':
      return <Templates />

    case 'providers':
      return <Providers />

    case 'status':
      return <Status />

    case 'organizations':
      return <Organizations />

    case 'logs':
      return <Logs />

    case 'endpoints':
      return <Endpoints />
    
    case 'licenses':
      return <Licenses />
    default:
      return ''
  }
}
