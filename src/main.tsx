import { createRoot } from 'react-dom/client'
import App from './App'
import { registerCommands } from './core/commands'
import { collectCommands } from './core/registry'
import './styles/theme.css'
registerCommands(collectCommands())
createRoot(document.getElementById('root')!).render(<App />)
