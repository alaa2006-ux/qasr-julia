import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-brand-cream text-gray-800">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center text-center px-4 bg-gradient-to-b from-gray-900 to-black text-white">
        <div className="max-w-3xl z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-brand-gold tracking-wide">
            مطعم قصر جوليا
          </h1>
          <p className="text-lg md:text-2xl mb-8 font-light text-gray-200">
            تجربة طعام فاخرة تجمع بين أصل الضيافة وفخامة المذاق
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/reservation"
              className="bg-brand-gold text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-amber-600 transition shadow-lg text-lg"
            >
              حجز طاولة الآن
            </Link>
            <Link
              href="/complaints"
              className="bg-white/10 backdrop-blur-md border border-white/30 text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-white/20 transition text-lg"
            >
              صندوق الشكاوى والاقتراحات
            </Link>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-20 px-4 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-primary mb-4">
          أهلاً بكم في قصر جوليا
        </h2>
        <div className="w-20 h-1 bg-brand-gold mx-auto mb-6" />
        <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
          نحرص على تقديم أرقى المأكولات وأجودها وسط أجواء استثنائية، ونهتم بكافة تفاصيل تجربتكم لنضمن لكم أوقاتاً لا تُنسى.
        </p>
      </section>
    </main>
  )
}
