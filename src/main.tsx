import { createRoot } from 'react-dom/client'
import App from './App'
import { registerCommands } from './core/commands'
import { collectCommands } from './core/registry'
import { loadSettings } from './core/settings'
import './styles/theme.css'
registerCommands(collectCommands())
void loadSettings()
createRoot(document.getElementById('root')!).render(<App />)
