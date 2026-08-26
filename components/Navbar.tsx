'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* الشعار */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-brand-primary">قصر جوليا</span>
          </Link>

          {/* القائمة لسطح المكتب */}
          <div className="hidden md:flex items-center gap-8 font-medium">
            <Link href="/" className="text-gray-700 hover:text-brand-gold transition">
              الرئيسية
            </Link>
            <Link href="/reservation" className="text-gray-700 hover:text-brand-gold transition">
              حجز طاولة
            </Link>
            <Link href="/complaints" className="text-gray-700 hover:text-brand-gold transition">
              الشكاوى والاقتراحات
            </Link>
            <Link
              href="/reservation"
              className="bg-brand-gold text-white px-5 py-2.5 rounded-lg hover:bg-amber-600 transition shadow-sm"
            >
              احجز الآن
            </Link>
          </div>

          {/* زر القائمة للهواتف */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 focus:outline-none p-2"
              aria-label="القائمة"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* قائمة الهواتف المنسدلة */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-4 pt-2 pb-4 space-y-3">
          <Link
            href="/"
            className="block text-gray-700 hover:text-brand-gold font-medium py-1"
            onClick={() => setIsOpen(false)}
          >
            الرئيسية
          </Link>
          <Link
            href="/reservation"
            className="block text-gray-700 hover:text-brand-gold font-medium py-1"
            onClick={() => setIsOpen(false)}
          >
            حجز طاولة
          </Link>
          <Link
            href="/complaints"
            className="block text-gray-700 hover:text-brand-gold font-medium py-1"
            onClick={() => setIsOpen(false)}
          >
            الشكاوى والاقتراحات
          </Link>
        </div>
      )}
    </nav>
  )
}
