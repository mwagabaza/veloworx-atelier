import { useEffect, useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Clock, X } from 'lucide-react'

export interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  initialService?: string
}

export function BookingModal({ isOpen, onClose, initialService = 'Bike Fit ($225)' }: BookingModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: initialService,
    date: '',
    timeSlot: '11:00 — 13:00 (Morning)',
    notes: '',
  })

  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, service: initialService }))
    }
  }, [initialService])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      setSubmitted(false)
      setErrorMessage('')
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setErrorMessage('')

    try {
      const response = await fetch('https://formsubmit.co/ajax/matia@wagabaza.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: `🚲 Veloworx Service Booking: ${formData.service} — ${formData.name}`,
          _replyto: formData.email,
          'Full Name': formData.name,
          'Email Address': formData.email,
          'Phone Number': formData.phone,
          'Service / Fitting': formData.service,
          'Preferred Date': formData.date || 'Flexible',
          'Preferred Time': formData.timeSlot,
          'Bike Details & Notes': formData.notes || 'None',
        }),
      })

      if (response.ok) {
        setSubmitted(true)
      } else {
        setErrorMessage('Failed to send booking request. Please try calling us at 310-584-9797.')
      }
    } catch {
      setErrorMessage('Network error. Please try again or call us at 310-584-9797.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-xl overflow-hidden rounded-2xl border border-white/15 bg-[#14140f] p-6 text-white shadow-2xl sm:p-8"
          >
            {/* Header */}
            <div className="flex items-start justify-between border-b border-white/10 pb-5">
              <div>
                <span className="vx-eyebrow text-accent">Veloworx Atelier · Santa Monica</span>
                <h2 className="vx-display mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                  Book a Service or Fitting
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-white/20 p-2 text-white/70 transition-colors hover:border-accent hover:bg-accent hover:text-white"
                aria-label="Close booking modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {submitted ? (
              /* Success Confirmation */
              <div className="py-10 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/20 text-accent">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <h3 className="vx-display text-2xl font-bold">Booking Request Sent!</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/75">
                  Thank you, <span className="font-semibold text-white">{formData.name}</span>. We've routed your booking for <span className="font-semibold text-accent">{formData.service}</span> directly to <span className="underline">matia@wagabaza.com</span>.
                </p>
                <p className="mt-2 text-xs text-white/50">
                  Sukeun &amp; the atelier team will confirm your appointment within 2 hours.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-8 inline-flex items-center rounded-full bg-accent px-8 py-3.5 text-xs font-mono uppercase tracking-[0.2em] text-white transition-transform hover:scale-105"
                >
                  Done
                </button>
              </div>
            ) : (
              /* Form */
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="booking-name" className="vx-eyebrow mb-1.5 block text-xs text-white/70">
                      Full Name *
                    </label>
                    <input
                      id="booking-name"
                      type="text"
                      required
                      placeholder="Marisol Ferrante"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-lg border border-white/20 bg-black/50 px-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                  </div>

                  <div>
                    <label htmlFor="booking-email" className="vx-eyebrow mb-1.5 block text-xs text-white/70">
                      Email Address *
                    </label>
                    <input
                      id="booking-email"
                      type="email"
                      required
                      placeholder="marisol@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-lg border border-white/20 bg-black/50 px-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="booking-phone" className="vx-eyebrow mb-1.5 block text-xs text-white/70">
                      Phone Number *
                    </label>
                    <input
                      id="booking-phone"
                      type="tel"
                      required
                      placeholder="310-555-0199"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full rounded-lg border border-white/20 bg-black/50 px-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                  </div>

                  <div>
                    <label htmlFor="booking-service" className="vx-eyebrow mb-1.5 block text-xs text-white/70">
                      Select Service / Fitting *
                    </label>
                    <select
                      id="booking-service"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full rounded-lg border border-white/20 bg-[#1e1e19] px-4 py-2.5 text-sm text-white focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    >
                      <option value="Bike Fit ($225)">Bike Fit ($225 · 2 hrs)</option>
                      <option value="Tune-Up (from $95)">Tune-Up (from $95 · 48 hrs)</option>
                      <option value="Overhaul (from $320)">Overhaul (from $320 · 5 days)</option>
                      <option value="Wheel Build (from $180)">Wheel Build (from $180 · 7 days)</option>
                      <option value="Suspension Service (from $140)">Suspension Service (from $140)</option>
                      <option value="Flat Repair / Walk-In ($25)">Flat Repair / Walk-In ($25)</option>
                      <option value="Test Ride: Cervélo Áspero-5">Test Ride: Cervélo Áspero-5</option>
                      <option value="Custom Build &amp; Other">Custom Build &amp; Other Inquiry</option>
                    </select>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="booking-date" className="vx-eyebrow mb-1.5 block text-xs text-white/70">
                      Preferred Date
                    </label>
                    <input
                      id="booking-date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full rounded-lg border border-white/20 bg-black/50 px-4 py-2.5 text-sm text-white focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                  </div>

                  <div>
                    <label htmlFor="booking-time" className="vx-eyebrow mb-1.5 block text-xs text-white/70">
                      Preferred Time Slot
                    </label>
                    <select
                      id="booking-time"
                      value={formData.timeSlot}
                      onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                      className="w-full rounded-lg border border-white/20 bg-[#1e1e19] px-4 py-2.5 text-sm text-white focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    >
                      <option value="11:00 — 13:00 (Morning)">11:00 — 13:00 (Morning)</option>
                      <option value="13:00 — 15:00 (Afternoon)">13:00 — 15:00 (Afternoon)</option>
                      <option value="15:00 — 17:00 (Late Afternoon)">15:00 — 17:00 (Late Afternoon)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="booking-notes" className="vx-eyebrow mb-1.5 block text-xs text-white/70">
                    Bike Details or Special Requests
                  </label>
                  <textarea
                    id="booking-notes"
                    rows={3}
                    placeholder="e.g. 2022 Cervélo Áspero, bottom bracket creak under load, or custom fit goals..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full rounded-lg border border-white/20 bg-black/50 px-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                </div>

                {errorMessage && (
                  <p className="text-xs text-accent">{errorMessage}</p>
                )}

                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                  <div className="flex items-center gap-2 text-xs text-white/50">
                    <Clock className="h-4 w-4 text-accent" />
                    <span>Sends to matia@wagabaza.com</span>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3 text-xs font-mono uppercase tracking-[0.2em] text-white transition-all hover:bg-red-600 disabled:opacity-50"
                  >
                    {submitting ? 'Sending...' : 'Confirm Request →'}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
