"use client";

import React, { useState } from "react";
import { X, Sparkles, Calendar, User, Phone, MapPin, CheckCircle } from "lucide-react";

export interface BookNowModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SERVICES = [
  {
    id: "royal-bridal",
    name: "Royal Bridal Metamorphosis",
    duration: "Full Day Private Suite",
    desc: "Complete 5-stage transformation: Hair therapy, HD airbrush makeup, gold jewellery & luxury saree draping.",
  },
  {
    id: "signature-makeup",
    name: "Signature Bridal HD Makeup",
    duration: "4 Hours",
    desc: "HD glass skin base, master eye sculpting, waterproof 24h setting, and personalized shade blend.",
  },
  {
    id: "hair-therapy",
    name: "Couture Hair & Scalp Restoration",
    duration: "3 Hours",
    desc: "Thermal moisture infusion, botanical scalp detox, and elaborate traditional or contemporary bridal weaving.",
  },
  {
    id: "draping-styling",
    name: "Jewellery & Dupatta Master Draping",
    duration: "2 Hours",
    desc: "Pinning, symmetry architecture, heavy can-can management, and temple jewellery placement.",
  },
];

export const BookNowModal: React.FC<BookNowModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedService, setSelectedService] = useState(SERVICES[0].id);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [city, setCity] = useState("New Delhi Flagship");
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const serviceName = SERVICES.find((s) => s.id === selectedService)?.name;
    const message = encodeURIComponent(
      `Hello Nitish Salon Atelier,\n\nI would like to reserve a Bridal Appointment.\n\nBride Name: ${name || "Guest"}\nPhone: ${phone || "Not specified"}\nPreferred Date: ${date || "Flexible"}\nAtelier: ${city}\nService: ${serviceName}\n\nPlease confirm availability.`
    );
    // Open WhatsApp
    window.open(`https://wa.me/919876543210?text=${message}`, "_blank");
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-xl bg-[#0f0f0f] border border-[#d4af37]/40 rounded-3xl p-5 sm:p-8 shadow-2xl overflow-y-auto max-h-[92vh] text-[#faf7f2]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#d4af37] hover:text-black transition-colors"
          aria-label="Close Modal"
        >
          <X className="w-4 h-4" />
        </button>

        {isSubmitted ? (
          <div className="py-8 sm:py-12 flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-full bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center mb-5">
              <CheckCircle className="w-7 h-7 text-[#d4af37]" />
            </div>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#fceec5] mb-2">
              Request Dispatched
            </h3>
            <p className="font-sans text-xs sm:text-sm text-[#faf7f2]/80 max-w-sm mb-6">
              Thank you, {name || "Bride"}. Our bridal concierge at Nitish Salon will connect with you on WhatsApp shortly.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                onClose();
              }}
              className="px-6 py-3 rounded-full bg-[#d4af37] text-black font-sans font-bold text-xs tracking-widest uppercase hover:scale-105 transition-transform"
            >
              CLOSE
            </button>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="mb-5 pr-6">
              <span className="text-[9px] tracking-[0.25em] uppercase text-[#d4af37] font-semibold font-sans">
                NITISH SALON ATELIER RESERVATION
              </span>
              <h2 className="font-serif-luxury text-2xl sm:text-3xl text-[#faf7f2] mt-0.5">
                Reserve Your <span className="italic text-[#fceec5]">Bridal Suite</span>
              </h2>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {/* Service Selection */}
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#d4af37] font-semibold mb-2 font-sans">
                  Select Bridal Service
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {SERVICES.map((s) => (
                    <div
                      key={s.id}
                      onClick={() => setSelectedService(s.id)}
                      className={`cursor-pointer p-3 rounded-xl border transition-all ${
                        selectedService === s.id
                          ? "bg-[#d4af37]/20 border-[#d4af37] text-white shadow-md shadow-[#d4af37]/10"
                          : "bg-white/5 border-white/10 hover:border-white/30 text-white/80"
                      }`}
                    >
                      <span className="font-medium text-xs font-sans text-[#fceec5] block">
                        {s.name}
                      </span>
                      <span className="text-[9px] font-sans text-[#d4af37] block mt-0.5">
                        {s.duration}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Input Fields Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#faf7f2]/80 mb-1 font-sans">
                    Bride / Client Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Radhika Sharma"
                      className="w-full pl-9 pr-3 py-2.5 bg-white/5 border border-white/15 rounded-xl text-xs text-white placeholder-white/30 focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#faf7f2]/80 mb-1 font-sans">
                    WhatsApp Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full pl-9 pr-3 py-2.5 bg-white/5 border border-white/15 rounded-xl text-xs text-white placeholder-white/30 focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#faf7f2]/80 mb-1 font-sans">
                    Wedding / Event Date *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-white/5 border border-white/15 rounded-xl text-xs text-white placeholder-white/30 focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#faf7f2]/80 mb-1 font-sans">
                    Salon Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-[#0f0f0f] border border-white/15 rounded-xl text-xs text-white focus:border-[#d4af37] focus:outline-none appearance-none"
                    >
                      <option value="New Delhi Flagship">New Delhi Flagship (South Ext)</option>
                      <option value="Mumbai Flagship">Mumbai Flagship (Bandra West)</option>
                      <option value="Dubai Atelier">Dubai Atelier (Downtown)</option>
                      <option value="Destination Bridal Team">Destination Wedding (Global)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#d4af37] to-[#aa8228] text-black font-sans font-bold text-[11px] sm:text-xs tracking-[0.2em] uppercase hover:scale-[1.01] transition-transform duration-300 flex items-center justify-center gap-2 shadow-lg shadow-[#d4af37]/25"
              >
                <Sparkles className="w-4 h-4 text-black" />
                <span>CONFIRM &amp; CONNECT VIA WHATSAPP</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
