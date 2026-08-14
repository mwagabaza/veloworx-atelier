import { useEffect, useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Clock, ShieldCheck, Sparkles, X } from 'lucide-react'

export interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  initialService?: string
}

export function BookingModal({ isOpen, onClose, initialService = 'Bike Fit ($225)' }: BookingModalProps) {
  const isFittingDefault = initialService.toLowerCase().includes('fit') || initialService.toLowerCase().includes('ride')
  const [activeTab, setActiveTab] = useState<'fitting' | 'service'>(isFittingDefault ? 'fitting' : 'service')

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    fittingType: 'Comprehensive Pro Bike Fit ($225 · 2 hrs)',
    serviceType: initialService,
    ridingStyle: 'Road / Criterium',
    currentBike: '',
    discomforts: '',
    date: '',
    timeSlot: '11:00 — 13:00 (Morning)',
    notes: '',
  })

  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (initialService) {
      const isFit = initialService.toLowerCase().includes('fit') || initialService.toLowerCase().includes('ride')
      setActiveTab(isFit ? 'fitting' : 'service')
      setFormData((prev) => ({
        ...prev,
        serviceType: initialService,
        fittingType: isFit ? initialService : 'Comprehensive Pro Bike Fit ($225 · 2 hrs)',
      }))
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

    const isFitting = activeTab === 'fitting'
    const chosenSubject = isFitting
      ? `🚲 Veloworx Bike Fitting Request: ${formData.fittingType} — ${formData.name}`
      : `🔧 Veloworx Service Request: ${formData.serviceType} — ${formData.name}`

    const payload = isFitting
      ? {
          _subject: chosenSubject,
          _replyto: formData.email,
          'Booking Category': 'Bike Fitting with Sukeun',
          'Fitting Type': formData.fittingType,
          'Full Name': formData.name,
          'Email Address': formData.email,
          'Phone Number': formData.phone,
          'Riding Discipline': formData.ridingStyle,
          'Current Bike Make & Size': formData.currentBike || 'Not specified',
          'Pain / Discomfort / Goals': formData.discomforts || 'None mentioned',
          'Preferred Date': formData.date || 'Flexible',
          'Preferred Time Slot': formData.timeSlot,
          'Additional Notes': formData.notes || 'None',
        }
      : {
          _subject: chosenSubject,
          _replyto: formData.email,
          'Booking Category': 'Atelier Service & Maintenance',
          'Service Selected': formData.serviceType,
          'Full Name': formData.name,
          'Email Address': formData.email,
          'Phone Number': formData.phone,
          'Preferred Date': formData.date || 'Flexible',
          'Preferred Time Slot': formData.timeSlot,
          'Bike Details & Notes': formData.notes || 'None',
        }

    try {
      const response = await fetch('https://formsubmit.co/ajax/matia@wagabaza.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        setSubmitted(true)
      } else {
        setErrorMessage('Failed to submit request. Please try calling Sukeun directly at 310-584-9797.')
      }
    } catch {
      setErrorMessage('Network connection error. Please try again or call us at 310-584-9797.')
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
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl border border-white/15 bg-[#14140f] p-6 text-white shadow-2xl sm:p-8"
          >
            {/* Header */}
            <div className="flex items-start justify-between border-b border-white/10 pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-accent" />
                  <span className="vx-eyebrow text-accent">Veloworx Atelier · Santa Monica, CA</span>
                </div>
                <h2 className="vx-display mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                  {activeTab === 'fitting' ? 'Book a Bike Fitting' : 'Book Workshop Service'}
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

            {/* Tab Switcher */}
            {!submitted && (
              <div className="mt-6 flex rounded-xl border border-white/15 bg-black/40 p-1">
                <button
                  type="button"
                  onClick={() => setActiveTab('fitting')}
                  className={`flex-1 rounded-lg py-2.5 text-xs font-mono uppercase tracking-[0.15em] transition-all ${
                    activeTab === 'fitting'
                      ? 'bg-accent text-white shadow-md font-bold'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  🚲 Book a Fitting (Sukeun)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('service')}
                  className={`flex-1 rounded-lg py-2.5 text-xs font-mono uppercase tracking-[0.15em] transition-all ${
                    activeTab === 'service'
                      ? 'bg-accent text-white shadow-md font-bold'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  🔧 Workshop &amp; Repairs
                </button>
              </div>
            )}

            {submitted ? (
              /* Success Confirmation */
              <div className="py-12 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/20 text-accent">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <h3 className="vx-display text-2xl font-bold">Fitting Request Dispatched!</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/80 max-w-md mx-auto">
                  Thank you, <span className="font-semibold text-white">{formData.name}</span>. Your request for <span className="font-semibold text-accent">{activeTab === 'fitting' ? formData.fittingType : formData.serviceType}</span> has been sent directly to <span className="underline">matia@wagabaza.com</span>.
                </p>
                <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-4 py-2 text-xs text-white/60">
                  <ShieldCheck className="h-4 w-4 text-accent" />
                  <span>Sukeun &amp; the Lincoln Blvd team will confirm your slot within 2 hours.</span>
                </div>
                <div className="mt-8">
                  <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex items-center rounded-full bg-accent px-8 py-3.5 text-xs font-mono uppercase tracking-[0.2em] text-white transition-transform hover:scale-105"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              /* Form */
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                {/* Contact Fields */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="modal-name" className="vx-eyebrow mb-1.5 block text-xs text-white/70">
                      Full Name *
                    </label>
                    <input
                      id="modal-name"
                      type="text"
                      required
                      placeholder="Marisol Ferrante"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-lg border border-white/20 bg-black/50 px-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                  </div>

                  <div>
                    <label htmlFor="modal-email" className="vx-eyebrow mb-1.5 block text-xs text-white/70">
                      Email Address *
                    </label>
                    <input
                      id="modal-email"
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
                    <label htmlFor="modal-phone" className="vx-eyebrow mb-1.5 block text-xs text-white/70">
                      Phone Number *
                    </label>
                    <input
                      id="modal-phone"
                      type="tel"
                      required
                      placeholder="310-584-9797"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full rounded-lg border border-white/20 bg-black/50 px-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                  </div>

                  <div>
                    <label htmlFor="modal-select" className="vx-eyebrow mb-1.5 block text-xs text-white/70">
                      {activeTab === 'fitting' ? 'Fitting Option *' : 'Service / Repair *'}
                    </label>
                    {activeTab === 'fitting' ? (
                      <select
                        id="modal-select"
                        value={formData.fittingType}
                        onChange={(e) => setFormData({ ...formData, fittingType: e.target.value })}
                        className="w-full rounded-lg border border-white/20 bg-[#1e1e19] px-4 py-2.5 text-sm text-white focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                      >
                        <option value="Comprehensive Pro Bike Fit ($225 · 2 hrs)">Comprehensive Pro Bike Fit ($225 · 2 hrs on jig)</option>
                        <option value="New Frame / Bike Sizing Consultation ($175)">New Frame / Bike Sizing Consultation ($175)</option>
                        <option value="Cleat &amp; Pedal Alignment ($75)">Cleat &amp; Pedal Alignment ($75 · 45 min)</option>
                        <option value="Saddle Program &amp; Pressure Optimization ($95)">Saddle Program &amp; Pressure Optimization ($95)</option>
                        <option value="Test Ride: Cervélo Áspero-5">Test Ride: Cervélo Áspero-5 ($8,400)</option>
                      </select>
                    ) : (
                      <select
                        id="modal-select"
                        value={formData.serviceType}
                        onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                        className="w-full rounded-lg border border-white/20 bg-[#1e1e19] px-4 py-2.5 text-sm text-white focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                      >
                        <option value="Tune-Up (from $95)">Tune-Up (from $95 · 48 hrs)</option>
                        <option value="Overhaul (from $320)">Overhaul (from $320 · 5 days)</option>
                        <option value="Wheel Build (from $180)">Wheel Build (from $180 · 7 days)</option>
                        <option value="Suspension Service (from $140)">Suspension Service (from $140)</option>
                        <option value="Flat Repair / Walk-In ($25)">Flat Repair / Walk-In ($25)</option>
                        <option value="Custom Build &amp; Other">Custom Build &amp; Other Workshop Request</option>
                      </select>
                    )}
                  </div>
                </div>

                {/* Additional Fitting Fields when in Fitting Mode */}
                {activeTab === 'fitting' && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="modal-riding-style" className="vx-eyebrow mb-1.5 block text-xs text-white/70">
                        Discipline / Riding Style
                      </label>
                      <select
                        id="modal-riding-style"
                        value={formData.ridingStyle}
                        onChange={(e) => setFormData({ ...formData, ridingStyle: e.target.value })}
                        className="w-full rounded-lg border border-white/20 bg-[#1e1e19] px-4 py-2.5 text-sm text-white focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                      >
                        <option value="Road / Criterium">Road / Criterium</option>
                        <option value="Gravel / Adventure">Gravel / Adventure</option>
                        <option value="Triathlon / Time Trial">Triathlon / Time Trial</option>
                        <option value="Mountain / Singletrack">Mountain / Singletrack</option>
                        <option value="Commuter / Fitness">Commuter / Fitness</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="modal-current-bike" className="vx-eyebrow mb-1.5 block text-xs text-white/70">
                        Current Bike Make &amp; Size
                      </label>
                      <input
                        id="modal-current-bike"
                        type="text"
                        placeholder="e.g. 2023 Pinarello Dogma F (54cm)"
                        value={formData.currentBike}
                        onChange={(e) => setFormData({ ...formData, currentBike: e.target.value })}
                        className="w-full rounded-lg border border-white/20 bg-black/50 px-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                      />
                    </div>
                  </div>
                )}

                {/* Date & Time Slot */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="modal-date" className="vx-eyebrow mb-1.5 block text-xs text-white/70">
                      Preferred Appointment Date
                    </label>
                    <input
                      id="modal-date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full rounded-lg border border-white/20 bg-black/50 px-4 py-2.5 text-sm text-white focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                  </div>

                  <div>
                    <label htmlFor="modal-time" className="vx-eyebrow mb-1.5 block text-xs text-white/70">
                      Preferred Time Window
                    </label>
                    <select
                      id="modal-time"
                      value={formData.timeSlot}
                      onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                      className="w-full rounded-lg border border-white/20 bg-[#1e1e19] px-4 py-2.5 text-sm text-white focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    >
                      <option value="11:00 — 13:00 (Morning Slot)">11:00 — 13:00 (Morning)</option>
                      <option value="13:00 — 15:00 (Afternoon Slot)">13:00 — 15:00 (Afternoon)</option>
                      <option value="15:00 — 17:00 (Late Afternoon)">15:00 — 17:00 (Late Afternoon)</option>
                    </select>
                  </div>
                </div>

                {/* Discomforts & Goals or Notes */}
                <div>
                  <label htmlFor="modal-notes" className="vx-eyebrow mb-1.5 block text-xs text-white/70">
                    {activeTab === 'fitting' ? 'Discomforts, Injuries, or Fit Goals' : 'Bike Details & Special Requests'}
                  </label>
                  <textarea
                    id="modal-notes"
                    rows={3}
                    placeholder={
                      activeTab === 'fitting'
                        ? 'e.g. Lower back stiffness after 30 miles, hand numbness, or preparing for a century ride...'
                        : 'e.g. Bottom bracket creak, replace chain and cables, or custom wheel build details...'
                    }
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full rounded-lg border border-white/20 bg-black/50 px-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                </div>

                {errorMessage && (
                  <p className="text-xs text-accent">{errorMessage}</p>
                )}

                {/* Submit Row */}
                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                  <div className="flex items-center gap-2 text-xs text-white/50">
                    <Clock className="h-4 w-4 text-accent" />
                    <span>Direct submission to matia@wagabaza.com</span>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3 text-xs font-mono uppercase tracking-[0.2em] text-white transition-all hover:bg-red-600 disabled:opacity-50"
                  >
                    {submitting ? 'Sending...' : 'Dispatch Booking →'}
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
