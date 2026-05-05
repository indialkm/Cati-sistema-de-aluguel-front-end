// src/components/Vitrine/Slideshow.jsx
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

export default function Slideshow() {
  return (
    <div className="relative w-full h-200px md:h-350px bg-linear-to-r from-purple-600 to-blue-500 rounded-xl overflow-hidden mb-8">
      <div className="absolute inset-0 flex items-center justify-between px-4 text-white">
        <div className="max-w-md">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-2">R$ 50 OFF</h2>
          <p className="text-lg opacity-90">Alugue sua tenda agora com desconto exclusivo para o TCC!</p>
          <button className="mt-4 bg-orange-500 hover:bg-orange-600 px-6 py-2 rounded-full font-bold transition-colors">
            Aproveite
          </button>
        </div>
      </div>
      {/* Controles simples */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        <div className="w-2 h-2 bg-white rounded-full"></div>
        <div className="w-2 h-2 bg-white/50 rounded-full"></div>
        <div className="w-2 h-2 bg-white/50 rounded-full"></div>
      </div>
    </div>
  );
}