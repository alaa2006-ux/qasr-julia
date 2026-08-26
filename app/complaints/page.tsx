'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Button from '@/components/ui/Button'

const complaintSchema = z.object({
  category: z.string().min(1, 'يرجى اختيار نوع الشكوى أو الاقتراح'),
  details: z.string().min(10, 'يرجى تفصيل الشكوى (10 أرقام/حروف على الأقل)'),
  phone: z.string().optional(),
})

type ComplaintForm = z.infer<typeof complaintSchema>

export default function ComplaintsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [ticketCode, setTicketCode] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ComplaintForm>({
    resolver: zodResolver(complaintSchema),
  })

  const onSubmit = async (data: ComplaintForm) => {
    setIsSubmitting(true)

    // توليد رمز المراجعة السري الخاص بالشكوى
    const randomNum = Math.floor(1000 + Math.random() * 9000)
    const generatedCode = `CJ-2026-${randomNum}`

    // محاكاة إرسال البيانات
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setTicketCode(generatedCode)
    setIsSubmitting(false)
    reset()
  }

  return (
    <div className="min-h-screen bg-brand-cream py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-primary mb-3">
            صندوق الشكاوى والاقتراحات
          </h1>
          <div className="w-20 h-1 bg-brand-gold mx-auto" />
          <p className="text-gray-600 mt-4">
            رسالتك تصل مباشرة إلى الإدارة العليا بقصر جوليا وبسرية تامة
          </p>
        </div>

        {ticketCode ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-premium p-8 text-center"
          >
            <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4 border border-brand-gold">
              <span className="text-2xl">🔒</span>
            </div>
            <h2 className="text-2xl font-bold text-brand-primary mb-2">
              تم تسجيل ملاحظتك بنجاح وبسرية
            </h2>
            <p className="text-gray-600 mb-4">
              احتفظ برمز المراجعة الخاص بك لمتابعة الشكوى:
            </p>
            <div className="bg-brand-cream py-3 px-6 rounded-lg font-mono text-2xl font-bold text-brand-gold tracking-widest inline-block mb-6 border border-brand-gold/30">
              {ticketCode}
            </div>
            <div>
              <Button
                onClick={() => setTicketCode(null)}
                variant="primary"
              >
                تقديم ملاحظة أخرى
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-premium p-6 md:p-8"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  تصنيف الملاحظة <span className="text-red-500">*</span>
                </label>
                <select
                  {...register('category')}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none bg-white text-gray-800"
                >
                  <option value="">اختر تصنيف الملاحظة...</option>
                  <option value="جودة الطعام">جودة الطعام والشراب</option>
                  <option value="مستوى الخدمة">مستوى الخدمة والمعاملة</option>
                  <option value="النظافة والجو العام">النظافة والجو العام</option>
                  <option value="اقتراح جديد">اقتراح للتطوير</option>
                  <option value="آخر">ملاحظة أخرى</option>
                </select>
                {errors.category && (
                  <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
                )}
              </div>

              <Textarea
                label="تفاصيل الملاحظة أو الشكوى"
                placeholder="اكتب ملاحظتك بكل صراحة، نحرص على الاستماع لك وتحسين تجربتك..."
                rows={5}
                {...register('details')}
                error={errors.details?.message}
                required
              />

              <Input
                label="رقم التواصل (اختياري)"
                placeholder="09XX XXX XXX (اتركه فارغاً إذا كنت تفضل البقاء مجهولاً)"
                type="tel"
                {...register('phone')}
                error={errors.phone?.message}
              />

              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 text-sm text-amber-800">
                🔒 <strong>تعهد بالسرية:</strong> جميع البيانات المقدمة تذهب مباشرة لإدارة المطعم ولا يتم مشاركتها مع أي طرف أو موظف آخر.
              </div>

              <Button
                type="submit"
                variant="gold"
                size="lg"
                isLoading={isSubmitting}
                className="w-full"
              >
                إرسال الملاحظة
              </Button>
            </form>
          </motion.div>
        )}
      </div>
    </div>
  )
}
