'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'

export default function ReservationPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    notes: '',
  })

  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setStatus(null)

    try {
      const { error } = await supabase.from('reservations').insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          date: formData.date,
          time: formData.time,
          guests: parseInt(formData.guests),
          notes: formData.notes,
        },
      ])

      if (error) throw error

      setStatus({
        type: 'success',
        message: 'تم تأكيد طلب الحجز بنجاح! سنقوم بالتواصل معك لتأكيد التفاصيل.',
      })
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        guests: '2',
        notes: '',
      })
    } catch (err: any) {
      setStatus({
        type: 'error',
        message: err.message || 'حدث خطأ أثناء حفظ الحجز، يرجى المحاولة لاحقاً.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="py-12 px-4 max-w-3xl mx-auto">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-3xl font-bold text-center text-brand-primary mb-2">حجز طاولة</h1>
        <p className="text-center text-gray-500 mb-8">يسعدنا استضافتكم في مطعم قصر جوليا</p>

        {status && (
          <div
            className={`p-4 rounded-lg mb-6 text-sm font-medium ${
              status.type === 'success'
                ? 'bg-green-50 text-green-700 border border-green-200'
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}
          >
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="الاسم الكامل"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="أدخل اسمك الكريم"
            />
            <Input
              label="رقم الهاتف"
              name="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="05xxxxxxxx"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="البريد الإلكتروني"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="example@gmail.com"
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">عدد الأشخاص</label>
              <select
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition text-gray-800"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'شخص' : 'أشخاص'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="تاريخ الحجز"
              name="date"
              type="date"
              required
              value={formData.date}
              onChange={handleChange}
            />
            <Input
              label="وقت الحجز"
              name="time"
              type="time"
              required
              value={formData.time}
              onChange={handleChange}
            />
          </div>

          <Textarea
            label="ملاحظات أو طلبات خاصة (اختياري)"
            name="notes"
            rows={3}
            value={formData.notes}
            onChange={handleChange}
            placeholder="مثال: طاولة بجوار النافذة، احتفال بمناسبة خاصة..."
          />

          <Button type="submit" variant="gold" className="w-full text-lg py-3" isLoading={isLoading}>
            تأكيد الحجز
          </Button>
        </form>
      </div>
    </main>
  )
}
