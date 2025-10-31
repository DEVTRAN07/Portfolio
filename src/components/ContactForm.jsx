'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    setStatus('submitting')
    setErrorMessage('')

    const form = event.currentTarget
    const formData = new FormData(form)

    try {
      const res = await fetch('https://formsubmit.co/rissoppa21@gmail.com', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) throw new Error('Failed to send form')
      setStatus('success')
      form.reset()
    } catch (err) {
      setStatus('error')
      setErrorMessage(err instanceof Error ? err.message : 'Unknown error')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-zinc-800 p-10 w-full rounded-md"
      autoComplete="off"
      noValidate
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Full Name</label>
          <input
            type="text"
            name="Name"
            placeholder="Input Name..."
            className="border border-zinc-500 p-2 rounded-md"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Email</label>
          <input
            type="email"
            name="Email"
            placeholder="Input Email..."
            className="border border-zinc-500 p-2 rounded-md"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="font-semibold">Message</label>
          <textarea
            name="message"
            id="message"
            cols="45"
            rows="7"
            placeholder="Message..."
            className="border border-zinc-500 p-2 rounded-md"
            required
          ></textarea>
        </div>

        {status === 'error' && (
          <p className="text-red-400 text-sm">{errorMessage}</p>
        )}
        {status === 'success' && (
          <p className="text-green-400 text-sm">Message sent successfully!</p>
        )}

        <div className="text-center">
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="font-semibold bg-[#1a1a1a] p-4 px-6 rounded-full w-full cursor-pointer border border-gray-700 hover:bg-[#222] transition-colors disabled:opacity-60"
          >
            {status === 'submitting' ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>
    </form>
  )
}


