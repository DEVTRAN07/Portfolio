'use client'

import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useMemo, useState } from 'react'
import { auth, loginWithGoogle, logout } from '../../firebase'
import { fetchSiteConfig, saveSiteConfig } from '../../lib/cms'

const ADMIN_EMAILS = [
  'accvippro208@gmail.com','qt7457307@gmail.com'
]

export default function AdminPage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({
    heroTitle: "Hi I'm Faris Edrik Prayoga",
    heroQuote: 'Avoid or just undertake it',
    aboutText: '',
    heroSmallAvatar: '/assets/faris1.png',
    cvHref: '/assets/CV.pdf',
    cvDownloadName: 'Faris_Edrik_Prayoga_CV.pdf',
    profile: {
      name: 'Faris Edrik P',
      title: 'Web Developer',
      handle: 'farisedrikp',
      status: 'Online',
      contactText: 'Contact Me',
      avatarUrl: '/assets/faris.png',
      showUserInfo: true,
      enableTilt: true,
      enableMobileTilt: false,
    },
    tools: [],
    projects: [],
  })
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState({ show: false, type: 'success', message: '' })
  const isAuthorized = useMemo(() => !!user && ADMIN_EMAILS.includes(user.email ?? ''), [user])

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u)
      setLoading(false)
      if (u && ADMIN_EMAILS.includes(u.email ?? '')) {
        const cfg = await fetchSiteConfig()
        if (cfg) setForm((prev) => ({ ...prev, ...cfg }))
      }
    })
    return () => unsub()
  }, [])

  async function handleSave() {
    setSaving(true)
    try {
      await saveSiteConfig(form)
      setToast({ show: true, type: 'success', message: 'Saved successfully!' })
      setTimeout(() => setToast((t) => ({ ...t, show: false })), 2000)
    } catch (e) {
      console.error('saveSiteConfig error:', e)
      setToast({ show: true, type: 'error', message: `Save failed: ${e?.message || 'Unknown error'}` })
      setTimeout(() => setToast((t) => ({ ...t, show: false })), 2500)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="p-6">Loading...</div>

  if (!user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-6">
        <div className="w-full max-w-md rounded-2xl border border-violet-500/30 bg-gradient-to-br from-[#0b0b0b] via-[#121212] to-[#1b1b1b] p-6 shadow-[0_0_40px_rgba(139,92,246,0.25)]">
          <h1 className="text-2xl font-bold mb-2">Admin Login</h1>
          <p className="text-sm text-zinc-400 mb-6">Sign in with your Google account to manage site content.</p>
          <button
            onClick={loginWithGoogle}
            className="w-full rounded-xl bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 py-3 font-semibold shadow hover:opacity-95 transition-opacity focus:outline-none focus:ring-2 focus:ring-pink-400"
          >
            Login with Google
          </button>
        </div>
      </div>
    )
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-6">
        <div className="w-full max-w-md rounded-2xl border border-rose-500/30 bg-gradient-to-br from-[#120a0a] via-[#1a0f10] to-[#241113] p-6 shadow-[0_0_40px_rgba(244,63,94,0.25)]">
          <p className="mb-4">Your account is not authorized.</p>
          <button onClick={logout} className="w-full rounded-xl bg-rose-500 py-3 font-semibold shadow hover:opacity-95 transition-opacity focus:outline-none focus:ring-2 focus:ring-rose-400">Logout</button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="rounded-2xl border border-violet-500/30 bg-gradient-to-r from-violet-600/20 via-fuchsia-600/10 to-pink-600/20 p-[1px]">
        <div className="rounded-2xl bg-gradient-to-br from-[#0b0b0b] via-[#121212] to-[#1b1b1b] px-5 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Admin Settings</h1>
            <p className="text-xs text-zinc-400">Manage content displayed on the public site</p>
          </div>
          <button onClick={logout} className="text-xs px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700">Logout</button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <section className="rounded-2xl border border-violet-500/30 bg-zinc-900/60 backdrop-blur p-5">
          <h2 className="font-semibold mb-4">Hero</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-zinc-400 mb-1">Hero Title</label>
              <input className="w-full rounded-lg bg-zinc-900 border border-zinc-700 p-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
                value={form.heroTitle} onChange={(e)=> setForm({ ...form, heroTitle: e.target.value })} />
            </div>
            <div>
              <label className="block text-xs text-zinc-400 mb-1">Hero Quote</label>
              <input className="w-full rounded-lg bg-zinc-900 border border-zinc-700 p-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
                value={form.heroQuote} onChange={(e)=> setForm({ ...form, heroQuote: e.target.value })} />
            </div>
            <div>
              <label className="block text-xs text-zinc-400 mb-1">Hero Small Avatar (img src)</label>
              <input className="w-full rounded-lg bg-zinc-900 border border-zinc-700 p-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
                value={form.heroSmallAvatar} onChange={(e)=> setForm({ ...form, heroSmallAvatar: e.target.value })} />
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-pink-500/30 bg-zinc-900/60 backdrop-blur p-5">
          <h2 className="font-semibold mb-4">CV</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-zinc-400 mb-1">CV Href</label>
              <input className="w-full rounded-lg bg-zinc-900 border border-zinc-700 p-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                value={form.cvHref} onChange={(e)=> setForm({ ...form, cvHref: e.target.value })} />
            </div>
            <div>
              <label className="block text-xs text-zinc-400 mb-1">CV Download Name</label>
              <input className="w-full rounded-lg bg-zinc-900 border border-zinc-700 p-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                value={form.cvDownloadName} onChange={(e)=> setForm({ ...form, cvDownloadName: e.target.value })} />
            </div>
          </div>
        </section>

        <section className="md:col-span-2 rounded-2xl border border-fuchsia-500/30 bg-zinc-900/60 backdrop-blur p-5">
          <h2 className="font-semibold mb-4">About</h2>
          <textarea
            rows={5}
            className="w-full rounded-lg bg-zinc-900 border border-zinc-700 p-3 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
            value={form.aboutText}
            onChange={(e)=> setForm({ ...form, aboutText: e.target.value })}
          />
        </section>

        <section className="md:col-span-2 rounded-2xl border border-emerald-500/30 bg-zinc-900/60 backdrop-blur p-5">
          <h2 className="font-semibold mb-4">Profile Card</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <input className="rounded-lg bg-zinc-900 border border-zinc-700 p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Name" value={form.profile.name}
              onChange={(e)=> setForm({ ...form, profile: { ...form.profile, name: e.target.value }})} />
            <input className="rounded-lg bg-zinc-900 border border-zinc-700 p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Title" value={form.profile.title}
              onChange={(e)=> setForm({ ...form, profile: { ...form.profile, title: e.target.value }})} />
            <input className="rounded-lg bg-zinc-900 border border-zinc-700 p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Handle" value={form.profile.handle}
              onChange={(e)=> setForm({ ...form, profile: { ...form.profile, handle: e.target.value }})} />
            <input className="rounded-lg bg-zinc-900 border border-zinc-700 p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Status" value={form.profile.status}
              onChange={(e)=> setForm({ ...form, profile: { ...form.profile, status: e.target.value }})} />
            <input className="rounded-lg bg-zinc-900 border border-zinc-700 p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Contact Text" value={form.profile.contactText}
              onChange={(e)=> setForm({ ...form, profile: { ...form.profile, contactText: e.target.value }})} />
            <input className="rounded-lg bg-zinc-900 border border-zinc-700 p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Avatar URL" value={form.profile.avatarUrl}
              onChange={(e)=> setForm({ ...form, profile: { ...form.profile, avatarUrl: e.target.value }})} />
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-4">
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.profile.showUserInfo} onChange={(e)=> setForm({ ...form, profile: { ...form.profile, showUserInfo: e.target.checked }})} /> showUserInfo</label>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.profile.enableTilt} onChange={(e)=> setForm({ ...form, profile: { ...form.profile, enableTilt: e.target.checked }})} /> enableTilt</label>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.profile.enableMobileTilt} onChange={(e)=> setForm({ ...form, profile: { ...form.profile, enableMobileTilt: e.target.checked }})} /> enableMobileTilt</label>
          </div>
        </section>

        <section className="rounded-2xl border border-sky-500/30 bg-zinc-900/60 backdrop-blur p-5">
          <h2 className="font-semibold mb-3">Tools (JSON)</h2>
          <textarea rows={8} className="w-full rounded-lg bg-zinc-900 border border-zinc-700 p-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
            value={JSON.stringify(form.tools, null, 2)}
            onChange={(e)=>{ try { setForm({ ...form, tools: JSON.parse(e.target.value) }) } catch {} }} />
        </section>

        <section className="rounded-2xl border border-amber-500/30 bg-zinc-900/60 backdrop-blur p-5">
          <h2 className="font-semibold mb-3">Projects (JSON)</h2>
          <textarea rows={10} className="w-full rounded-lg bg-zinc-900 border border-zinc-700 p-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            value={JSON.stringify(form.projects, null, 2)}
            onChange={(e)=>{ try { setForm({ ...form, projects: JSON.parse(e.target.value) }) } catch {} }} />
        </section>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="rounded-xl bg-gradient-to-r from-emerald-500 via-cyan-500 to-sky-500 px-6 py-2 font-semibold shadow hover:opacity-95 transition-opacity focus:outline-none focus:ring-2 focus:ring-cyan-400 disabled:opacity-60"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {toast.show && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className={
            `rounded-xl px-4 py-3 shadow-lg border ${toast.type === 'success' ? 'border-emerald-500/40 bg-gradient-to-r from-emerald-600/20 via-teal-600/10 to-cyan-600/20' : 'border-rose-500/40 bg-gradient-to-r from-rose-600/20 via-orange-600/10 to-amber-600/20'}`
          }>
            <div className="flex items-center gap-2">
              <span className={`inline-block h-2 w-2 rounded-full ${toast.type === 'success' ? 'bg-emerald-400' : 'bg-rose-400'}`}></span>
              <span className="text-sm">{toast.message}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


