'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Button from '@/components/ui/Button'

const reservationSchema = z.object({
  fullName: z.string().min(2, 'الاسم مطلوب'),
  phone: z.string().min(10, 'رقم هاتف صحيح مطلوب'),
  guests: z.number().min(1, 'عدد الأشخاص مطلوب').max(20, 'الحد الأقصى 20 شخص'),
  date: z.string().min(1, 'تاريخ الحجز مطلوب'),
  time: z.string().min(1, 'وقت الحجز مطلوب'),
  notes: z.string().optional(),
})

type ReservationForm = z.infer<typeof reservationSchema>

export default function ReservationPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [formData, setFormData] = useState<ReservationForm | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ReservationForm>({
    resolver: zodResolver(reservationSchema),
  })

  const onSubmit = async (data: ReservationForm) => {
    setIsSubmitting(true)
    setFormData(data)

    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 800))

    setShowSuccess(true)
    setIsSubmitting(false)

    // Open WhatsApp after brief delay
    setTimeout(() => {
      const message = `مرحبًا قصر جوليا 👋

أرغب في حجز طاولة، وهذه تفاصيل الحجز:

الاسم: ${data.fullName}
رقم الهاتف: ${data.phone}
عدد الأشخاص: ${data.guests}
التاريخ: ${data.date}
الوقت: ${data.time}
${data.notes ? `ملاحظات:\n${data.notes}` : ''}

بانتظار تأكيد الحجز، شكرًا لكم.`

      const encoded = encodeURIComponent(message)
      window.open(`https://wa.me/963969387354?text=${encoded}`, '_blank')
    }, 1500)
  }

  if (showSuccess) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white rounded-2xl shadow-premium p-8 text-center"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-brand-primary mb-2">
            تم تجهيز تفاصيل حجزك ✓
          </h2>
          <p className="text-gray-600 mb-6">
            سيتم الآن فتح واتساب لإرسال طلب الحجز إلى فريق قصر جوليا.
          </p>
          <Button onClick={() => window.location.href = '/'} variant="primary">
            العودة للرئيسية
          </Button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-brand-cream py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-primary mb-3">
            احجز طاولتك
          </h1>
          <div className="w-20 h-1 bg-brand-gold mx-auto" />
          <p className="text-gray-600 mt-4">
            املأ النموذج وسيتم توجيهك إلى واتساب لتأكيد الحجز
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-premium p-6 md:p-8"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label="الاسم الكامل"
                placeholder="أدخل اسمك الكامل"
                {...register('fullName')}
                error={errors.fullName?.message}
                required
              />
              <Input
                label="رقم الهاتف"
                placeholder="09XX XXX XXX"
                type="tel"
                {...register('phone')}
                error={errors.phone?.message}
                required
              />
            </div>

            <Input
              label="عدد الأشخاص"
              type="number"
              min="1"
              max="20"
              {...register('guests', { valueAsNumber: true })}
              error={errors.guests?.message}
              required
            />

            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label="تاريخ الحجز"
                type="date"
                {...register('date')}
                error={errors.date?.message}
                required
              />
              <Input
                label="وقت الحجز"
                type="time"
                {...register('time')}
                error={errors.time?.message}
                required
              />
            </div>

            <Textarea
              label="ملاحظات إضافية"
              placeholder="أي متطلبات خاصة أو مناسبات..."
              rows={4}
              {...register('notes')}
              error={errors.notes?.message}
            />

            <Button
              type="submit"
              variant="gold"
              size="lg"
              isLoading={isSubmitting}
              className="w-full"
            >
              تأكيد الحجز
            </Button>

            <p className="text-sm text-gray-500 text-center mt-4">
              بالضغط على تأكيد الحجز، سيتم فتح واتساب لإرسال طلب الحجز
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
