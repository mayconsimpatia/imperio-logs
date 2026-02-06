
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Carrega as variáveis de ambiente
  const env = loadEnv(mode, (process as any).cwd(), '');
  
  // LÓGICA DE PRIORIDADE DA CHAVE:
  // 1. Tenta pegar do painel da Vercel (VITE_API_KEY ou API_KEY)
  // 2. Se não tiver, usa a chave fixa que você forneceu (fallback)
  const apiKey = env.VITE_API_KEY || env.API_KEY || "927c44570f6c1c096119a9dd237f830361285adb";
  
  return {
    plugins: [react()],
    define: {
      // Injeta a chave no código do site de forma segura
      'process.env.API_KEY': JSON.stringify(apiKey),
      // Evita erro de 'process is not defined' no navegador
      'process.env': {} 
    },
    server: {
      host: true
    }
  }
})
