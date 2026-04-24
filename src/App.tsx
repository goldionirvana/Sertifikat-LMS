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
  const [viewMode, setViewMode] = useState<'portal' | 'editor'>('portal');
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
    date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
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
    <div className="min-h-screen bg-[#f8fafc] text-brand-navy selection:bg-brand-cyan/20">
      {/* Navigation Bar */}
      <nav className="no-print sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-brand-navy rounded-lg flex items-center justify-center rotate-3 shadow-lg shadow-brand-navy/10">
              <ChefHat className="text-brand-cyan" size={20} />
            </div>
            <div>
              <p className="text-sm font-black italic tracking-tighter leading-none">GACOAN ACADEMY</p>
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mt-0.5">Verification Portal</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex transition-all bg-slate-100 p-1 rounded-full border border-slate-200">
              <button 
                onClick={() => setViewMode('portal')}
                className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'portal' ? 'bg-white text-brand-navy shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
              >
                Website View
              </button>
              <button 
                onClick={() => setViewMode('editor')}
                className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'editor' ? 'bg-white text-brand-navy shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
              >
                Admin Editor
              </button>
            </div>
            <button 
              onClick={handlePrint}
              className="p-2.5 bg-brand-navy text-white rounded-full hover:bg-brand-navy/90 transition-all shadow-lg"
              title="Print Certificate"
            >
              <Printer size={18} />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {viewMode === 'editor' ? (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="no-print mb-12 space-y-8"
          >
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-6 md:col-span-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-brand-cyan transition-all font-semibold"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5 tracking-wider">Tanggal Sertifikasi</label>
                        <input 
                          type="text" 
                          value={data.date}
                          onChange={(e) => setData({ ...data, date: e.target.value })}
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-brand-cyan transition-all font-semibold"
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

              <div className="bg-brand-navy rounded-2xl p-8 text-white flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-cyan/20 rounded-full -mr-16 -mt-16 blur-3xl opacity-50" />
                <div className="relative z-10">
                  <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-4 block">Tingkat Kompetensi</span>
                  <div className={`px-3 py-1.5 rounded text-[11px] font-black tracking-[0.2em] uppercase w-fit ${getRankColor(rank)} shadow-sm`}>
                    {rank}
                  </div>
                  <div className="mt-8">
                    <div className="text-7xl font-display font-light leading-none">
                      {totalScore}<span className="text-brand-cyan font-bold italic">%</span>
                    </div>
                    <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mt-2">Indeks Agregat</p>
                  </div>
                </div>
                <div className="pt-6 border-t border-white/5 relative z-10 flex items-start gap-3">
                  <div className="shrink-0 mt-0.5">
                    <Info size={16} className="text-brand-cyan" />
                  </div>
                  <p className="text-[10px] text-white/50 leading-relaxed font-medium">
                    Editor mode aktif. Perubahan data akan langsung tercermin pada sertifikat.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Portal / Verification View */
          <div className="no-print space-y-12">
            {/* Verification Banner */}
            <motion.div 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               className="bg-emerald-500 rounded-3xl p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-2xl shadow-emerald-500/20"
            >
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
              <div className="flex items-center gap-6 relative z-10">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 shadow-inner">
                  <CheckCircle2 size={32} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-black uppercase tracking-tight italic">Profil Sertifikasi Terverifikasi</h3>
                  <div className="flex gap-4 mt-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-emerald-100 flex items-center gap-2">
                      <Award size={14} /> GAC-ACAD-VER-{totalScore}{Math.floor(Math.random()*10)}
                    </p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-emerald-100 flex items-center gap-2">
                      <User size={14} /> ID KARYAWAN PT PPA
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 relative z-10 w-full sm:w-auto">
                <button 
                   onClick={handlePrint}
                   className="flex-1 sm:flex-none px-6 py-3 bg-white text-emerald-600 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl hover:scale-105 transition-all"
                >
                  Unduh PDF
                </button>
                <button className="flex-1 sm:flex-none px-6 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl font-black text-xs uppercase tracking-widest backdrop-blur-md transition-all">
                  Bagikan
                </button>
              </div>
            </motion.div>

            {/* Profile Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-12">
                {/* Hero Profile */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-10">
                   <div className="relative group">
                      <div className="absolute inset-0 bg-brand-cyan/20 blur-3xl group-hover:bg-brand-cyan/40 transition-all" />
                      <div className="w-48 h-48 bg-white border-8 border-white rounded-3xl shadow-2xl relative z-10 overflow-hidden flex items-center justify-center p-4">
                         <QRCodeSVG 
                            value={`https://gacoan.academy/verify/GAC-ACAD-${data.name.substring(0,3).toUpperCase()}-${totalScore}`}
                            size={160}
                            level="H"
                         />
                      </div>
                   </div>
                   <div className="text-center sm:text-left space-y-4">
                      <div>
                        <span className="px-3 py-1 bg-brand-magenta text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-md shadow-lg shadow-brand-magenta/20">
                          PROFESIONAL BERSERTIFIKAT
                        </span>
                        <h2 className="text-6xl font-display font-black text-brand-navy tracking-tighter uppercase leading-none mt-4 italic">
                          {data.name}
                        </h2>
                      </div>
                      <p className="text-xl text-slate-500 font-medium leading-relaxed">
                        Karyawan ahli di <span className="text-brand-navy font-bold">{data.station}</span> yang telah menunjukkan keunggulan operasional di PT Pesta Pora Abadi.
                      </p>
                      <div className="flex flex-wrap justify-center sm:justify-start gap-6 pt-4">
                        <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Waktu Sertifikasi</p>
                          <p className="text-lg font-bold text-brand-navy">{data.date}</p>
                        </div>
                        <div className="w-px h-8 bg-slate-200 self-end" />
                        <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Level Kemampuan</p>
                          <p className="text-lg font-bold text-brand-magenta italic uppercase">{rank}</p>
                        </div>
                      </div>
                   </div>
                </div>

                {/* Performance Visualizer */}
                <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl shadow-slate-100/50 space-y-12">
                   <div className="flex items-center justify-between">
                     <h3 className="text-2xl font-display font-black text-brand-navy uppercase italic">Detil Kompetensi</h3>
                     <span className="text-[10px] font-black text-brand-cyan px-2 py-1 bg-brand-cyan/10 rounded tracking-[0.2em]">VERIFIED BY GACOAN ACADEMY</span>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
                      <ProgressBar label="Operasional Boiler" value={data.scores.boiler} />
                      <ProgressBar label="Aduk & Persiapan" value={data.scores.aduk} />
                      <ProgressBar label="Kontrol Kualitas (Level)" value={data.scores.level} />
                      <ProgressBar label="Penyajian & Toping" value={data.scores.toping} />
                      <ProgressBar label="Tes Pengetahuan" value={data.scores.knowledge} />
                   </div>
                </div>
              </div>

              {/* Sidebar Info */}
              <div className="space-y-8">
                 <div className="bg-brand-navy rounded-3xl p-8 text-white space-y-10 relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-magenta/40 rounded-full -mr-16 -mt-16 blur-3xl" />
                    <div>
                      <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-brand-cyan mb-8">Ringkasan Skor</h4>
                      <div className="text-8xl font-display font-light text-white leading-none">
                        {totalScore}<span className="text-3xl font-bold align-top text-brand-cyan ml-1">%</span>
                      </div>
                    </div>
                    <div className="space-y-6 pt-10 border-t border-white/10">
                       <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Status Station</span>
                          <span className="text-xs font-black text-emerald-400 flex items-center gap-2">
                             <CheckCircle2 size={14} /> ACTIVE IN-CHARGE
                          </span>
                       </div>
                       <div className="space-y-4">
                          <p className="text-xs text-white/60 leading-relaxed font-medium">
                            Karyawan ini telah dinyatakan layak untuk memimpin operasional station dan bertanggung jawab penuh atas kualitas output.
                          </p>
                       </div>
                    </div>
                 </div>

                 <div className="bg-white rounded-3xl p-8 border border-slate-200">
                    <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-brand-navy/30 mb-6">Penandatangan Resmi</h4>
                    <div className="space-y-6">
                      <div className="relative">
                        <span className="font-signature text-5xl text-brand-navy absolute -top-4 left-0 opacity-80 pointer-events-none select-none italic">
                          Fikry Abdad
                        </span>
                        <div className="pt-12">
                          <p className="text-sm font-black text-brand-navy uppercase tracking-widest italic leading-none mb-1 underline decoration-brand-cyan decoration-2 underline-offset-4">Fikry Abdad</p>
                          <p className="text-[9px] text-slate-400 uppercase tracking-[0.2em] font-bold">Senior Manager</p>
                        </div>
                      </div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        )}

        {/* The Certificate - Print Optimized */}
        <div className={`${viewMode === 'editor' ? 'block' : 'hidden'} print:block print:m-0 print:p-0 mt-20`}>
          <div className="flex flex-col items-center">
            <p className="no-print text-[10px] font-black text-slate-300 uppercase tracking-widest mb-4">Sertifikat Fisik (A4 Landscape)</p>
            <motion.div 
              key={data.name + totalScore}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-[1123px] h-[794px] bg-white flex flex-col certificate-shadow relative print:shadow-none print:w-full print:border-none overflow-hidden"
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
                      <span className="font-signature text-7xl text-white/90 absolute bottom-4 select-none whitespace-nowrap italic">
                        Fikry Abdad
                      </span>
                      <div className="w-full h-px bg-white/20" />
                    </div>
                    <div className="text-center space-y-1">
                      <p className="text-sm font-black tracking-widest uppercase text-brand-cyan underline decoration-brand-magenta underline-offset-4 decoration-2 italic">Fikry Abdad</p>
                      <p className="text-[9px] font-medium text-white/40 uppercase tracking-[0.2em] max-w-[200px] leading-relaxed">
                        Senior Manager Capability Enhancement
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 py-12 border-t border-slate-200 no-print text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-6">
          <div className="flex gap-8 items-center grayscale opacity-50">
             <div className="font-black italic text-brand-navy text-xl">MIE GACOAN</div>
             <div className="font-black italic text-brand-navy text-xl">PPA EXCELLENCE</div>
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">
            Sistem Verifikasi Sertifikat Resmi Gacoan Academy — © 2026 PT Pesta Pora Abadi
          </p>
        </div>
      </footer>
    </div>
  );
}
