'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'

export default function ComplaintsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setStatus(null)

    try {
      const { error } = await supabase.from('complaints').insert([
        {
          name: formData.name || 'مجهول',
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
        },
      ])

      if (error) throw error

      setStatus({
        type: 'success',
        message: 'تم إرسال ملاحظتك بنجاح وبسرية تامة. شكراً لمساعدتنا في تحسين خدماتنا!',
      })
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      })
    } catch (err: any) {
      setStatus({
        type: 'error',
        message: err.message || 'حدث خطأ أثناء الإرسال، يرجى المحاولة لاحقاً.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="py-12 px-4 max-w-3xl mx-auto">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-3xl font-bold text-center text-brand-primary mb-2">
          صندوق الشكاوى والاقتراحات
        </h1>
        <p className="text-center text-gray-500 mb-8">
          صوتك يهمنا لتطوير خدماتنا، جميع الملاحظات تُعامل بسرية تامة
        </p>

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
              label="الاسم (اختياري)"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="يمكنك تركه فارغاً للبقاء مجهولاً"
            />
            <Input
              label="رقم الهاتف (اختياري)"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="05xxxxxxxx"
            />
          </div>

          <Input
            label="البريد الإلكتروني (اختياري)"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@gmail.com"
          />

          <Input
            label="عنوان الموضوع"
            name="subject"
            required
            value={formData.subject}
            onChange={handleChange}
            placeholder="اكتب عنواناً مختصراً لملاحظتك"
          />

          <Textarea
            label="تفاصيل الشكوى أو الاقتراح"
            name="message"
            required
            rows={5}
            value={formData.message}
            onChange={handleChange}
            placeholder="اكتب كافة التفاصيل هنا..."
          />

          <Button type="submit" variant="gold" className="w-full text-lg py-3" isLoading={isLoading}>
            إرسال الملاحظة
          </Button>
        </form>
      </div>
    </main>
  )
}
