import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-2xl font-bold text-brand-gold mb-4">قصر جوليا</h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            مطعم قصر جوليا يقدم لكم أفضل المأكولات والمشروبات بأعلى معايير الجودة والضيافة.
          </p>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">روابط سريعة</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-brand-gold transition">الرئيسية</Link>
            </li>
            <li>
              <Link href="/reservation" className="hover:text-brand-gold transition">حجز طاولة</Link>
            </li>
            <li>
              <Link href="/complaints" className="hover:text-brand-gold transition">الشكاوى والاقتراحات</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">التواصل</h4>
          <p className="text-sm text-gray-400 mb-2">أهلاً بكم دائماً في قصر جوليا</p>
          <p className="text-sm text-gray-400">جميع الحقوق محفوظة © {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  )
}
