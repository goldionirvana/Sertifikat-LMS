import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { QRCodeSVG } from 'qrcode.react';
import { 
  Award, 
  Printer, 
  User, 
  ChefHat, 
  CheckCircle2,
  Info,
  Share2
} from 'lucide-react';

// --- Types ---
type Rank = 'Pendekar' | 'Jagoan' | 'Pemula' | 'New Commerce';

interface Scores {
  boiler: number;
  aduk: number;
  level: number;
  toping: number;
  knowledge: number;
}

interface CertificateData {
  name: string;
  station: string;
  scores: Scores;
  date: string;
}

// --- Utils ---
const calculateRank = (totalScore: number): Rank => {
  if (totalScore >= 90) return 'Pendekar';
  if (totalScore >= 80) return 'Jagoan';
  if (totalScore >= 70) return 'Pemula';
  return 'New Commerce';
};

const getRankColor = (rank: Rank) => {
  switch (rank) {
    case 'Pendekar': return 'text-brand-magenta bg-brand-magenta/10 border-brand-magenta/20';
    case 'Jagoan': return 'text-brand-cyan bg-brand-cyan/10 border-brand-cyan/20';
    case 'Pemula': return 'text-amber-600 bg-amber-50 border-amber-200';
    case 'New Commerce': return 'text-slate-500 bg-slate-100 border-slate-200';
  }
};

// --- Components ---

const ProgressBar = ({ value, label, variant = 'light' }: { value: number; label: string; variant?: 'light' | 'dark' }) => (
  <div className="space-y-2 font-sans">
    <div className={`flex justify-between text-[11px] font-bold uppercase tracking-tight ${variant === 'dark' ? 'text-white/70' : 'text-brand-navy/60'}`}>
      <span>{label}</span>
      <span className={variant === 'dark' ? 'text-brand-cyan' : 'text-brand-navy'}>{value}/100</span>
    </div>
    <div className={`h-1.5 w-full rounded-full overflow-hidden ${variant === 'dark' ? 'bg-white/10' : 'bg-slate-100'}`}>
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={`h-full ${variant === 'dark' ? 'bg-brand-cyan' : 'bg-brand-navy'}`}
      />
    </div>
  </div>
);

export default function App() {
  const [data, setData] = useState<CertificateData>({
    name: "NIKOLAUS GERALD",
    station: "Station Noodle",
    scores: {
      boiler: 98,
      aduk: 92,
      level: 89,
      toping: 95,
      knowledge: 94
    },
    date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
  });

  const totalScore = useMemo(() => {
    const { boiler, aduk, level, toping, knowledge } = data.scores;
    return Math.round((boiler + aduk + level + toping + knowledge) / 5);
  }, [data.scores]);

  const rank = calculateRank(totalScore);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center py-12 px-4 font-sans text-brand-navy">
      {/* Editor - Hidden on Print */}
      <div className="w-full max-w-5xl no-print mb-12 space-y-8">
        <header className="flex flex-col md:flex-row justify-between items-end gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-display font-bold text-brand-navy tracking-tight">
              Sertifikasi <span className="text-brand-cyan">Gacoan</span> Academy
            </h1>
            <p className="text-slate-500 font-medium text-sm italic">PT Pesta Pora Abadi</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={handlePrint}
              className="flex items-center gap-2 px-6 py-3 bg-brand-navy text-white rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-brand-navy/90 transition-all shadow-lg"
            >
              <Printer size={16} />
              Cetak Sertifikat
            </button>
          </div>
        </header>

        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xl shadow-slate-100 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-6 md:col-span-2">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-bold text-brand-navy flex items-center gap-2 uppercase text-[10px] tracking-widest">
                  <User size={14} className="text-brand-cyan" />
                  Informasi Karyawan
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5 tracking-wider">Nama Lengkap</label>
                    <input 
                      type="text" 
                      value={data.name}
                      onChange={(e) => setData({ ...data, name: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-brand-cyan transition-all font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5 tracking-wider">Tanggal Sertifikasi</label>
                    <input 
                      type="text" 
                      value={data.date}
                      onChange={(e) => setData({ ...data, date: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-brand-cyan transition-all font-semibold"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-brand-navy flex items-center gap-2 uppercase text-[10px] tracking-widest">
                  <ChefHat size={14} className="text-brand-cyan" />
                  Metrik Nilai
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {(Object.keys(data.scores) as Array<keyof Scores>).map((key) => (
                    <div key={key}>
                      <label className="block text-[9px] font-bold text-slate-400 mb-1 uppercase tracking-widest">{key === 'knowledge' ? 'Pengetahuan' : key}</label>
                      <input 
                        type="number" 
                        value={data.scores[key]}
                        onChange={(e) => setData({ 
                          ...data, 
                          scores: { ...data.scores, [key]: parseInt(e.target.value) || 0 } 
                        })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold focus:outline-hidden focus:ring-2 focus:ring-brand-cyan transition-all"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-brand-navy rounded-xl p-8 text-white flex flex-col justify-between relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-brand-cyan/20 rounded-full -mr-16 -mt-16 blur-3xl" />
             
             <div className="relative z-10">
                <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-4 block">Tingkat Kompetensi</span>
                <div className={`px-3 py-1.5 rounded text-[11px] font-black tracking-[0.2em] uppercase w-fit ${getRankColor(rank)}`}>
                  {rank}
                </div>
                <div className="mt-8">
                  <div className="text-7xl font-display font-light leading-none">
                    {totalScore}<span className="text-brand-cyan font-bold italic">%</span>
                  </div>
                  <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mt-2">Indeks Agregat</p>
                </div>
             </div>
             
             <div className="pt-6 border-t border-white/10 relative z-10 flex items-start gap-3">
                <div className="shrink-0 mt-0.5">
                  <Info size={16} className="text-brand-cyan" />
                </div>
                <p className="text-[10px] text-white/60 leading-relaxed font-medium">
                  Dihitung secara otomatis berdasarkan penilaian terbaru di modul station.
                </p>
             </div>
          </div>
        </div>
      </div>

      {/* The Certificate - EFSET Inspired */}
      <div className="print:m-0 print:p-0">
        <motion.div 
          key={data.name + totalScore}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-[1123px] h-[794px] bg-white flex flex-col certificate-shadow relative print:shadow-none print:w-full print:border-none"
        >
          {/* Main Layout Container */}
          <div className="flex h-full w-full">
            
            {/* Left Main Section */}
            <div className="flex-grow p-12 flex flex-col justify-between">
              
              {/* Top Bar: Logistics */}
              <div className="flex items-center gap-12">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-slate-300 tracking-[0.3em] mb-2 uppercase">Akreditasi Perusahaan</span>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-brand-navy flex items-center justify-center rounded-lg shadow-lg">
                      <ChefHat className="text-brand-cyan" size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-display font-black text-brand-navy tracking-tight leading-none italic uppercase">PT Pesta Pora Abadi</h3>
                      <p className="text-[9px] font-bold text-brand-magenta tracking-[0.2em] uppercase mt-1 leading-none">Mie Gacoan Academy</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Central Awarding Text */}
              <div className="space-y-12">
                <div className="space-y-5">
                  <h1 className="text-5xl font-display font-black text-brand-navy tracking-tight uppercase leading-none">
                    Sertifikat <span className="text-brand-magenta italic">Kompetensi</span>
                  </h1>
                  <div className="flex items-center gap-4">
                    <div className="h-px w-8 bg-brand-cyan" />
                    <p className="text-slate-400 font-bold uppercase tracking-[0.4em] text-[10px]">Penghargaan ini diberikan kepada</p>
                    <div className="h-px w-8 bg-brand-cyan" />
                  </div>
                </div>

                <div className="relative inline-block max-w-full">
                  <h2 className="text-[72px] font-display font-black tracking-tighter text-brand-navy uppercase leading-none break-words">
                    {data.name}
                  </h2>
                  <div className="absolute -bottom-2 left-0 w-full h-1.5 bg-brand-cyan/30" />
                  <div className="absolute -bottom-6 left-0 w-1/2 h-1.5 bg-brand-magenta/30" />
                </div>

                <div className="max-w-2xl space-y-8 pt-6">
                  <p className="text-xl text-slate-600 leading-snug font-medium text-balance">
                    atas keberhasilan menunjukkan kemampuan khusus dan penguasaan operasional pada modul <span className="text-brand-magenta font-black italic border-b-4 border-brand-cyan px-2 mx-1">{data.station.toUpperCase()}</span>.
                  </p>
                  <div className="space-y-4">
                    <p className="text-slate-400 text-sm leading-relaxed max-w-xl text-balance">
                      Selamat! Berdasarkan evaluasi yang ketat di Gacoan Academy, Anda telah resmi mencapai kompetensi profesional dan memenuhi syarat untuk bertugas sebagai <span className="text-brand-navy font-bold italic underline decoration-brand-cyan decoration-2 underline-offset-4">In-Charge Specialist</span> di station ini.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Footer Info */}
              <div className="flex justify-between items-end">
                <div className="flex items-end gap-6">
                  {/* QR Verification */}
                  <div className="p-2 bg-white border border-slate-100 rounded-lg shadow-sm">
                    <QRCodeSVG 
                      value={`https://gacoan.academy/verify/GAC-ACAD-${data.name.substring(0,3).toUpperCase()}-${totalScore}`}
                      size={64}
                      level="H"
                      includeMargin={false}
                      fgColor="#0d1039"
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-emerald-50 text-emerald-600 p-2.5 rounded-xl border border-emerald-100 flex items-center justify-center">
                        <CheckCircle2 size={18} />
                      </div>
                      <div>
                        <p className="text-[11px] font-black text-brand-navy uppercase tracking-widest leading-none">Identitas Terverifikasi</p>
                        <p className="text-[10px] font-bold text-slate-400 mt-1.5 uppercase tracking-wide">
                          GAC-ACAD-{data.name.substring(0,3).toUpperCase()}-{totalScore}{Math.floor(Math.random()*100)}
                        </p>
                      </div>
                    </div>
                    <p className="text-[11px] font-bold text-slate-300 uppercase tracking-[0.2em]">Diverifikasi pada {data.date.toUpperCase()}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Data Sidebar (EFSET Style) */}
            <div className="w-[340px] bg-brand-navy p-10 text-white flex flex-col justify-between relative shadow-inner shrink-0">
              {/* Background Accent Gradient */}
              <div className="absolute top-0 right-0 w-full h-1/2 bg-gradient-to-b from-brand-cyan/10 to-transparent pointer-events-none" />
              
              <div className="relative z-10 space-y-12">
                <div className="space-y-2">
                  <h4 className="text-[11px] font-black tracking-[0.3em] uppercase text-brand-cyan">Indeks Performa</h4>
                  <div className="h-1.5 w-12 bg-brand-magenta rounded-full" />
                </div>

                <div className="space-y-7">
                  <ProgressBar label="Operasional Boiler" value={data.scores.boiler} variant="dark" />
                  <ProgressBar label="Aduk & Persiapan" value={data.scores.aduk} variant="dark" />
                  <ProgressBar label="Kontrol Kualitas (Level)" value={data.scores.level} variant="dark" />
                  <ProgressBar label="Penyajian & Toping" value={data.scores.toping} variant="dark" />
                  <ProgressBar label="Tes Pengetahuan" value={data.scores.knowledge} variant="dark" />
                </div>

                <div className="pt-8 border-t border-white/5 space-y-8">
                  <div className="flex justify-between items-end">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Kategori</p>
                      <p className="text-3xl font-display font-black tracking-tight text-brand-cyan italic uppercase">{rank}</p>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Nilai Akhir</p>
                      <p className="text-5xl font-display font-light text-brand-magenta">{totalScore}<span className="text-xl font-bold ml-1">%</span></p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative z-10 flex flex-col items-center">
                <div className="mb-6 relative w-full flex flex-col items-center">
                  <span className="font-signature text-7xl text-white/90 absolute bottom-4 select-none whitespace-nowrap">
                    Fikry Abdad
                  </span>
                  <div className="w-full h-px bg-white/20" />
                </div>
                <div className="text-center space-y-1">
                  <p className="text-sm font-black tracking-widest uppercase text-brand-cyan underline decoration-brand-magenta underline-offset-4 decoration-2">Fikry Abdad</p>
                  <p className="text-[9px] font-medium text-white/40 uppercase tracking-[0.2em] max-w-[200px] leading-relaxed">
                    Senior Manager Capability Enhancement
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <footer className="mt-16 no-print text-center opacity-30">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em]">© 2026 PT Pesta Pora Abadi Excellence Framework</p>
      </footer>
    </div>
  );
}
