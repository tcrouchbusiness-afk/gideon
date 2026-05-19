import { useState, useEffect, useCallback } from 'react'

const FIG_UNLOCK_KEY = '__gideon_fig_unlocked'
const figPlaintext: Record<string, string> = {}

const b64decode = (s: string): Uint8Array<ArrayBuffer> => {
  const bin = atob(s)
  const buf = new ArrayBuffer(bin.length)
  const bytes = new Uint8Array(buf)
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i)
  return bytes
}

const deriveFigKey = async (password: string, salt: Uint8Array<ArrayBuffer>, iters: number): Promise<CryptoKey> => {
  const passKey = await crypto.subtle.importKey(
    'raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveKey']
  )
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: iters, hash: 'SHA-256' },
    passKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['decrypt']
  )
}

export async function decryptFig(path: string, password: string): Promise<string> {
  if (figPlaintext[path]) return figPlaintext[path]
  const res = await fetch(path)
  if (!res.ok) throw new Error(`Failed to fetch ${path}`)
  const blob = await res.json()
  const salt = b64decode(blob.salt)
  const iv = b64decode(blob.iv)
  const ct = b64decode(blob.ct)
  const key = await deriveFigKey(password, salt, blob.iters ?? 600000)
  const plain = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, ct)
  const html = new TextDecoder().decode(plain)
  figPlaintext[path] = html
  return html
}

export function useFig(figEnc: string | undefined) {
  const [html, setHtml] = useState<string | null>(null)
  const [locked, setLocked] = useState(true)
  const [error, setError] = useState(false)

  const unlock = useCallback(async (password: string) => {
    if (!figEnc) return
    try {
      const result = await decryptFig(`/${figEnc}`, password)
      setHtml(result)
      setLocked(false)
      sessionStorage.setItem(FIG_UNLOCK_KEY, password)
    } catch {
      setError(true)
    }
  }, [figEnc])

  useEffect(() => {
    const saved = sessionStorage.getItem(FIG_UNLOCK_KEY)
    if (saved && figEnc) unlock(saved)
  }, [figEnc, unlock])

  return { html, locked, error, unlock }
}
