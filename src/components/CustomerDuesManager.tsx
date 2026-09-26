import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  Phone,
  Send,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Plus,
  Search,
  Trash2,
  DollarSign,
  User,
  Package,
  Share2,
  X,
  CreditCard,
  Cloud,
  Check,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';
import {
  subscribeToFirebaseDues,
  syncDueToFirestore,
  updatePaymentInFirestore,
  deleteDueFromFirestore,
  isFirebaseConnected,
  saveFirebaseConfig,
  clearFirebaseConfig,
  getActiveFirebaseConfig,
  FirebaseConfig,
} from '../firebase';

export interface CustomerDueRecord {
  id: string;
  customerName: string;
  phoneNumber: string;
  itemDescription: string;
  totalAmount: number;
  paidAmount: number;
  dueDate: string; // YYYY-MM-DD
  createdAt: string;
  notes?: string;
  status: 'pending' | 'paid' | 'overdue';
}

const INITIAL_SAMPLE_RECORDS: CustomerDueRecord[] = [
  {
    id: 'due-1',
    customerName: 'Rajesh Sharma',
    phoneNumber: '+919876543210',
    itemDescription: 'Dell Latitude Laptop + 512GB SSD Upgrade',
    totalAmount: 28500,
    paidAmount: 18500,
    dueDate: new Date().toISOString().split('T')[0], // Due Today
    createdAt: '2026-09-15',
    notes: 'Invoice #INV-2026-091',
    status: 'pending',
  },
  {
    id: 'due-2',
    customerName: 'Priya Verma',
    phoneNumber: '+919812345678',
    itemDescription: 'AWS Cloud Architecture Setup & Domain Hosting',
    totalAmount: 15000,
    paidAmount: 5000,
    dueDate: '2026-09-24', // Overdue
    createdAt: '2026-09-10',
    notes: 'Balance due after domain DNS propagation',
    status: 'overdue',
  },
  {
    id: 'due-3',
    customerName: 'Amit Patel',
    phoneNumber: '+919900112233',
    itemDescription: 'Mechanical Keyboard + Wireless Mouse Combo',
    totalAmount: 4200,
    paidAmount: 1000,
    dueDate: '2026-10-02', // Upcoming
    createdAt: '2026-09-22',
    notes: 'Token advance paid in cash',
    status: 'pending',
  },
  {
    id: 'due-4',
    customerName: 'Neha Deshmukh',
    phoneNumber: '+919765432109',
    itemDescription: 'Python & AWS Workshop Entry Pass (2x)',
    totalAmount: 1999,
    paidAmount: 1999,
    dueDate: '2026-09-20',
    createdAt: '2026-09-18',
    notes: 'Payment settled via UPI',
    status: 'paid',
  },
];

interface CustomerDuesManagerProps {
  onClose?: () => void;
  businessName?: string;
}

export function CustomerDuesManager({ onClose, businessName = 'AWS Builder Hub' }: CustomerDuesManagerProps) {
  const [records, setRecords] = useState<CustomerDueRecord[]>(() => {
    const saved = localStorage.getItem('customer_dues_ledger');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing stored dues:', e);
      }
    }
    return INITIAL_SAMPLE_RECORDS;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [filterTab, setFilterTab] = useState<'all' | 'dueToday' | 'overdue' | 'pending' | 'paid'>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [isFirebaseModalOpen, setIsFirebaseModalOpen] = useState(false);
  const [firebaseActive, setFirebaseActive] = useState<boolean>(isFirebaseConnected());
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'synced' | 'error'>('idle');

  const [selectedRecord, setSelectedRecord] = useState<CustomerDueRecord | null>(null);
  const [payAmount, setPayAmount] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Form State for new entry
  const [formData, setFormData] = useState({
    customerName: '',
    phoneNumber: '',
    itemDescription: '',
    totalAmount: '',
    paidAmount: '',
    dueDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0], // 7 days ahead
    notes: '',
  });

  // Form State for Firebase Credentials
  const currentConfig = getActiveFirebaseConfig();
  const [firebaseForm, setFirebaseForm] = useState<FirebaseConfig>({
    apiKey: currentConfig?.apiKey || '',
    authDomain: currentConfig?.authDomain || '',
    projectId: currentConfig?.projectId || '',
    storageBucket: currentConfig?.storageBucket || '',
    messagingSenderId: currentConfig?.messagingSenderId || '',
    appId: currentConfig?.appId || '',
  });

  // Real-time Firestore sync listener
  useEffect(() => {
    if (!firebaseActive) return;

    setSyncStatus('syncing');
    const unsubscribe = subscribeToFirebaseDues(
      (remoteDues) => {
        if (remoteDues && remoteDues.length > 0) {
          setRecords(remoteDues as CustomerDueRecord[]);
        }
        setSyncStatus('synced');
      },
      (err) => {
        console.error('Firestore listener error:', err);
        setSyncStatus('error');
      }
    );

    return () => {
      unsubscribe();
    };
  }, [firebaseActive]);

  // Persist to local cache
  useEffect(() => {
    localStorage.setItem('customer_dues_ledger', JSON.stringify(records));
  }, [records]);

  const todayStr = new Date().toISOString().split('T')[0];

  const getRecordStatus = (rec: CustomerDueRecord): 'paid' | 'overdue' | 'dueToday' | 'pending' => {
    const pendingBalance = rec.totalAmount - rec.paidAmount;
    if (pendingBalance <= 0) return 'paid';
    if (rec.dueDate === todayStr) return 'dueToday';
    if (rec.dueDate < todayStr) return 'overdue';
    return 'pending';
  };

  const filteredRecords = records.filter((rec) => {
    const status = getRecordStatus(rec);
    const matchesSearch =
      rec.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.phoneNumber.includes(searchQuery) ||
      rec.itemDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (rec.notes && rec.notes.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (filterTab === 'all') return true;
    if (filterTab === 'dueToday') return status === 'dueToday';
    if (filterTab === 'overdue') return status === 'overdue';
    if (filterTab === 'pending') return status === 'pending' || status === 'dueToday' || status === 'overdue';
    if (filterTab === 'paid') return status === 'paid';
    return true;
  });

  // KPI calculations
  const totalPendingAmount = records.reduce((acc, r) => acc + Math.max(0, r.totalAmount - r.paidAmount), 0);
  const totalCollectedAmount = records.reduce((acc, r) => acc + r.paidAmount, 0);

  const duesTodayList = records.filter((r) => getRecordStatus(r) === 'dueToday');
  const duesTodayAmount = duesTodayList.reduce((acc, r) => acc + Math.max(0, r.totalAmount - r.paidAmount), 0);

  const overdueList = records.filter((r) => getRecordStatus(r) === 'overdue');
  const overdueAmount = overdueList.reduce((acc, r) => acc + Math.max(0, r.totalAmount - r.paidAmount), 0);

  const cleanPhoneNumber = (phone: string) => {
    let cleaned = phone.replace(/[^0-9]/g, '');
    if (cleaned.length === 10) {
      cleaned = '91' + cleaned;
    }
    return cleaned;
  };

  const createReminderMessage = (rec: CustomerDueRecord) => {
    const pendingBalance = rec.totalAmount - rec.paidAmount;
    const formattedDate = new Date(rec.dueDate).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    const isOverdue = rec.dueDate < todayStr;
    const isDueToday = rec.dueDate === todayStr;

    let timeContext = `due on ${formattedDate}`;
    if (isDueToday) timeContext = `due today (${formattedDate})`;
    if (isOverdue) timeContext = `was due on ${formattedDate} and is currently overdue`;

    return (
      `Hello ${rec.customerName} ji,\n\n` +
      `This is a friendly reminder from *${businessName}* regarding your pending payment.\n\n` +
      `📦 *Item/Service:* ${rec.itemDescription}\n` +
      `💰 *Pending Balance:* ₹${pendingBalance.toLocaleString('en-IN')}\n` +
      `📅 *Due Date:* ${timeContext}\n\n` +
      `Kindly arrange the settlement at your earliest convenience. If already paid, please ignore this message.\n\n` +
      `Thank you!`
    );
  };

  // 🟢 1-Click WhatsApp Launcher
  const handleSendWhatsApp = (rec: CustomerDueRecord) => {
    const phone = cleanPhoneNumber(rec.phoneNumber);
    const message = encodeURIComponent(createReminderMessage(rec));
    const url = `https://wa.me/${phone}?text=${message}`;
    window.open(url, '_blank');
  };

  // 💬 1-Click Native Phone SIM SMS Launcher
  const handleSendSMS = (rec: CustomerDueRecord) => {
    const phone = cleanPhoneNumber(rec.phoneNumber);
    const message = encodeURIComponent(createReminderMessage(rec));
    const url = `sms:${phone}?body=${message}`;
    window.location.href = url;
  };

  // 📞 Phone call
  const handleCall = (rec: CustomerDueRecord) => {
    window.location.href = `tel:${rec.phoneNumber}`;
  };

  // Add new customer due record
  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerName || !formData.phoneNumber || !formData.totalAmount) {
      alert('Please fill customer name, phone number, and total amount.');
      return;
    }

    const total = parseFloat(formData.totalAmount) || 0;
    const paid = parseFloat(formData.paidAmount) || 0;

    const newRecord: CustomerDueRecord = {
      id: 'due-' + Date.now(),
      customerName: formData.customerName.trim(),
      phoneNumber: formData.phoneNumber.trim(),
      itemDescription: formData.itemDescription.trim() || 'General Store Item',
      totalAmount: total,
      paidAmount: paid,
      dueDate: formData.dueDate,
      createdAt: todayStr,
      notes: formData.notes.trim(),
      status: paid >= total ? 'paid' : formData.dueDate < todayStr ? 'overdue' : 'pending',
    };

    setRecords([newRecord, ...records]);
    setIsAddModalOpen(false);

    // Sync to Firestore if active
    if (firebaseActive) {
      setSyncStatus('syncing');
      await syncDueToFirestore(newRecord);
      setSyncStatus('synced');
    }

    setFormData({
      customerName: '',
      phoneNumber: '',
      itemDescription: '',
      totalAmount: '',
      paidAmount: '',
      dueDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
      notes: '',
    });
  };

  // Record payment
  const handleRecordPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRecord) return;
    const payment = parseFloat(payAmount) || 0;
    if (payment <= 0) return;

    const newPaid = Math.min(selectedRecord.totalAmount, selectedRecord.paidAmount + payment);
    const newStatus = newPaid >= selectedRecord.totalAmount ? 'paid' : selectedRecord.status;

    const updated = records.map((r) => {
      if (r.id === selectedRecord.id) {
        return {
          ...r,
          paidAmount: newPaid,
          status: newStatus as any,
        };
      }
      return r;
    });

    setRecords(updated);
    setIsPayModalOpen(false);

    // Sync to Firestore
    if (firebaseActive) {
      setSyncStatus('syncing');
      await updatePaymentInFirestore(selectedRecord.id, newPaid, newStatus);
      setSyncStatus('synced');
    }

    setSelectedRecord(null);
    setPayAmount('');
  };

  // Delete record
  const handleDeleteRecord = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete the record for "${name}"?`)) {
      setRecords(records.filter((r) => r.id !== id));
      if (firebaseActive) {
        await deleteDueFromFirestore(id);
      }
    }
  };

  // Copy reminder message to clipboard
  const handleCopyReminder = (rec: CustomerDueRecord) => {
    const msg = createReminderMessage(rec);
    navigator.clipboard.writeText(msg);
    setCopiedId(rec.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Save Firebase Config
  const handleSaveFirebase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firebaseForm.apiKey || !firebaseForm.projectId) {
      alert('Please provide at least your Firebase API Key and Project ID.');
      return;
    }

    saveFirebaseConfig(firebaseForm);
    setFirebaseActive(true);
    setIsFirebaseModalOpen(false);

    // Sync all existing local records to Firestore
    setSyncStatus('syncing');
    Promise.all(records.map((r) => syncDueToFirestore(r))).then(() => {
      setSyncStatus('synced');
    });
  };

  const handleDisconnectFirebase = () => {
    if (window.confirm('Disconnect Firebase from this device? (Local data will be kept)')) {
      clearFirebaseConfig();
      setFirebaseActive(false);
      setSyncStatus('idle');
      setIsFirebaseModalOpen(false);
    }
  };

  return (
    <div className="w-full bg-[#0a0414] text-white min-h-screen py-8 px-3 sm:px-6 lg:px-8 font-sans">
      {/* ── Top Header Bar ── */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-purple-900/40 pb-6">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
                Customer Dues & Ledger
              </h1>
            </div>
            <p className="text-sm text-zinc-400">
              Track pending amounts, items given to customers, and send 1-click WhatsApp & SMS reminders.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Firebase Cloud Sync Indicator Button */}
            <button
              onClick={() => setIsFirebaseModalOpen(true)}
              className={`px-3.5 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 border transition-all cursor-pointer ${
                firebaseActive
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30'
                  : 'bg-white/5 text-zinc-400 border-white/10 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Cloud className="w-3.5 h-3.5 text-current" />
              <span>{firebaseActive ? 'Firebase Connected' : 'Connect Firebase'}</span>
              {syncStatus === 'syncing' && <RefreshCw className="w-3 h-3 animate-spin text-amber-400" />}
              {syncStatus === 'synced' && <Check className="w-3 h-3 text-emerald-400" />}
            </button>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-5 py-2 rounded-full bg-gradient-to-r from-[#A855F7] to-[#7C3AED] hover:from-[#9333EA] hover:to-[#6D28D9] text-white font-semibold text-xs sm:text-sm shadow-[0_0_25px_rgba(168,85,247,0.4)] flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Add Customer Due
            </button>

            {onClose && (
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                title="Back to Club Portal"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* ── Executive KPI Summary Stats ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-6">
          {/* Card 1: Total Pending */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#140b24]/90 border border-purple-500/20 backdrop-blur-xl shadow-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-600/10 rounded-full blur-2xl group-hover:bg-purple-600/20 transition-all pointer-events-none" />
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-purple-300">Total Pending Dues</span>
              <DollarSign className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white">
              ₹{totalPendingAmount.toLocaleString('en-IN')}
            </div>
            <div className="text-xs text-zinc-400 mt-1 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-zinc-500" />
              Across {records.filter((r) => r.totalAmount > r.paidAmount).length} pending accounts
            </div>
          </div>

          {/* Card 2: Due Today */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#18112b]/90 border border-amber-500/30 backdrop-blur-xl shadow-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all pointer-events-none" />
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-300">Due Today</span>
              <Calendar className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-amber-300">
              ₹{duesTodayAmount.toLocaleString('en-IN')}
            </div>
            <div className="text-xs text-amber-200/80 mt-1 font-medium">
              {duesTodayList.length} customer{duesTodayList.length === 1 ? '' : 's'} to remind today
            </div>
          </div>

          {/* Card 3: Overdue */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#1b0d1e]/90 border border-rose-500/30 backdrop-blur-xl shadow-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/10 rounded-full blur-2xl group-hover:bg-rose-500/20 transition-all pointer-events-none" />
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-rose-300">Overdue Dues</span>
              <AlertTriangle className="w-4 h-4 text-rose-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-rose-400">
              ₹{overdueAmount.toLocaleString('en-IN')}
            </div>
            <div className="text-xs text-rose-300/80 mt-1 font-medium">
              {overdueList.length} customer{overdueList.length === 1 ? '' : 's'} past due date
            </div>
          </div>

          {/* Card 4: Total Collected */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#0e171b]/90 border border-emerald-500/20 backdrop-blur-xl shadow-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all pointer-events-none" />
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300">Total Collected</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400">
              ₹{totalCollectedAmount.toLocaleString('en-IN')}
            </div>
            <div className="text-xs text-emerald-200/80 mt-1">
              Successfully paid to date
            </div>
          </div>
        </div>

        {/* ── Search & Filter Controls ── */}
        <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search customer, phone, or item..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#140b24] border border-purple-500/20 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-purple-400 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Filter Pill Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {[
              { id: 'all', label: 'All Dues', count: records.length },
              { id: 'dueToday', label: 'Due Today', count: duesTodayList.length },
              { id: 'overdue', label: 'Overdue', count: overdueList.length },
              { id: 'pending', label: 'Pending', count: records.filter((r) => r.totalAmount > r.paidAmount).length },
              { id: 'paid', label: 'Settled', count: records.filter((r) => r.totalAmount <= r.paidAmount).length },
            ].map((tab) => {
              const isActive = filterTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setFilterTab(tab.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-purple-600 text-white shadow-[0_0_12px_rgba(168,85,247,0.4)]'
                      : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-black/40 text-zinc-400'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Main Ledger Cards ── */}
      <div className="max-w-7xl mx-auto space-y-3.5">
        {filteredRecords.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-[#140b24]/50 border border-purple-500/20 max-w-lg mx-auto">
            <Package className="w-12 h-12 text-purple-400/50 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-1">No customer dues found</h3>
            <p className="text-xs text-zinc-400 mb-5">
              {searchQuery ? 'Try changing your search terms or filters.' : 'Add your first customer due entry to get started.'}
            </p>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-5 py-2 rounded-full bg-purple-600 text-white text-xs font-semibold hover:bg-purple-500 transition-colors inline-flex items-center gap-2"
            >
              <Plus className="w-3.5 h-3.5" />
              Add First Customer
            </button>
          </div>
        ) : (
          filteredRecords.map((rec) => {
            const status = getRecordStatus(rec);
            const pendingBalance = Math.max(0, rec.totalAmount - rec.paidAmount);
            const percentagePaid = Math.min(100, Math.round((rec.paidAmount / rec.totalAmount) * 100));

            return (
              <div
                key={rec.id}
                className={`p-4 sm:p-5 rounded-2xl backdrop-blur-xl border transition-all duration-200 ${
                  status === 'overdue'
                    ? 'bg-[#1b0914]/90 border-rose-500/40 shadow-[0_4px_20px_rgba(244,63,94,0.1)]'
                    : status === 'dueToday'
                    ? 'bg-[#1a1205]/90 border-amber-500/40 shadow-[0_4px_20px_rgba(245,158,11,0.1)]'
                    : status === 'paid'
                    ? 'bg-[#091512]/80 border-emerald-500/25'
                    : 'bg-[#130b24]/90 border-purple-500/25 hover:border-purple-500/45'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Left Column: Customer & Item Information */}
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
                        <User className="w-4 h-4 text-purple-400" />
                        {rec.customerName}
                      </h3>

                      {status === 'overdue' && (
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" /> Overdue
                        </span>
                      )}
                      {status === 'dueToday' && (
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1 animate-pulse">
                          <Clock className="w-3 h-3" /> Due Today
                        </span>
                      )}
                      {status === 'pending' && (
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30">
                          Upcoming Due
                        </span>
                      )}
                      {status === 'paid' && (
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Settled
                        </span>
                      )}

                      <span className="text-xs text-zinc-400 font-mono">
                        {rec.phoneNumber}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs sm:text-sm text-zinc-300 font-medium">
                      <Package className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
                      <span>{rec.itemDescription}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-400 pt-0.5">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-zinc-500" />
                        <span>Due: <strong className="text-zinc-200">{rec.dueDate}</strong></span>
                      </div>
                      {rec.notes && (
                        <span className="text-zinc-400 italic">
                          "{rec.notes}"
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Middle Column: Financial Breakdown */}
                  <div className="flex items-center gap-4 bg-black/30 px-4 py-2.5 rounded-xl border border-white/5 min-w-[240px] justify-between">
                    <div>
                      <div className="text-[11px] uppercase tracking-wider text-zinc-400">Total Bill</div>
                      <div className="text-sm font-semibold text-zinc-300">₹{rec.totalAmount.toLocaleString('en-IN')}</div>
                    </div>
                    <div>
                      <div className="text-[11px] uppercase tracking-wider text-zinc-400">Paid</div>
                      <div className="text-sm font-semibold text-emerald-400">₹{rec.paidAmount.toLocaleString('en-IN')}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[11px] uppercase tracking-wider text-zinc-400">Pending Balance</div>
                      <div
                        className={`text-base font-extrabold ${
                          pendingBalance > 0
                            ? status === 'overdue'
                              ? 'text-rose-400'
                              : 'text-amber-300'
                            : 'text-emerald-400'
                        }`}
                      >
                        ₹{pendingBalance.toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: 1-Click WhatsApp & SMS Actions */}
                  <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap justify-end pt-2 lg:pt-0">
                    {/* 🟢 WhatsApp Reminder Button */}
                    {pendingBalance > 0 && (
                      <button
                        onClick={() => handleSendWhatsApp(rec)}
                        title="Send 1-Click WhatsApp Reminder"
                        className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs flex items-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all active:scale-95 cursor-pointer"
                      >
                        <MessageSquare className="w-3.5 h-3.5 fill-white" />
                        <span>WhatsApp</span>
                      </button>
                    )}

                    {/* 💬 Mobile SIM SMS Reminder Button */}
                    {pendingBalance > 0 && (
                      <button
                        onClick={() => handleSendSMS(rec)}
                        title="Send SMS via your Mobile SIM"
                        className="px-3 py-2 rounded-xl bg-purple-600/40 hover:bg-purple-600 text-purple-200 hover:text-white border border-purple-500/40 font-medium text-xs flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>SMS</span>
                      </button>
                    )}

                    {/* 📞 Call Button */}
                    <button
                      onClick={() => handleCall(rec)}
                      title="Call Customer"
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
                    >
                      <Phone className="w-3.5 h-3.5" />
                    </button>

                    {/* 💵 Record Payment */}
                    {pendingBalance > 0 && (
                      <button
                        onClick={() => {
                          setSelectedRecord(rec);
                          setPayAmount(pendingBalance.toString());
                          setIsPayModalOpen(true);
                        }}
                        className="px-3 py-2 rounded-xl bg-blue-600/30 hover:bg-blue-600 text-blue-200 hover:text-white border border-blue-500/40 text-xs font-medium transition-all active:scale-95 cursor-pointer flex items-center gap-1"
                      >
                        <CreditCard className="w-3.5 h-3.5" />
                        <span>Pay</span>
                      </button>
                    )}

                    {/* Copy text to clipboard */}
                    <button
                      onClick={() => handleCopyReminder(rec)}
                      title="Copy Reminder Message"
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer relative"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      {copiedId === rec.id && (
                        <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-purple-900 text-white text-[10px] px-2 py-0.5 rounded shadow whitespace-nowrap">
                          Copied!
                        </span>
                      )}
                    </button>

                    {/* Delete entry */}
                    <button
                      onClick={() => handleDeleteRecord(rec.id, rec.customerName)}
                      title="Delete Entry"
                      className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/30 text-rose-400 hover:text-rose-200 border border-rose-500/20 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {rec.totalAmount > 0 && (
                  <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mt-3.5">
                    <div
                      className={`h-full transition-all duration-500 ${
                        percentagePaid === 100
                          ? 'bg-emerald-400'
                          : percentagePaid > 50
                          ? 'bg-purple-400'
                          : 'bg-amber-400'
                      }`}
                      style={{ width: `${percentagePaid}%` }}
                    />
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* ── Modal: Add New Customer Due ── */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#120822] border border-purple-500/40 rounded-3xl p-6 sm:p-7 max-w-lg w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-5 right-5 text-zinc-400 hover:text-white p-1 rounded-full bg-white/5 hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
              <Plus className="w-5 h-5 text-purple-400" />
              Add Customer Due Record
            </h2>
            <p className="text-xs text-zinc-400 mb-5">
              Record an item or service provided to a customer with pending balance and due date.
            </p>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                  Customer Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-purple-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                  Customer Mobile Phone *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-sm font-mono">+91</span>
                  <input
                    type="tel"
                    required
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    placeholder="9876543210"
                    className="w-full pl-12 pr-4 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-white placeholder-zinc-500 text-sm font-mono focus:outline-none focus:border-purple-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                  Item Given / Service Rendered *
                </label>
                <input
                  type="text"
                  required
                  value={formData.itemDescription}
                  onChange={(e) => setFormData({ ...formData, itemDescription: e.target.value })}
                  placeholder="e.g. Laptop Repair, Hardware Part, Cloud Subscription"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-purple-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                    Total Amount (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.totalAmount}
                    onChange={(e) => setFormData({ ...formData, totalAmount: e.target.value })}
                    placeholder="e.g. 5000"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-white placeholder-zinc-500 text-sm font-mono focus:outline-none focus:border-purple-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                    Paid / Advance (₹)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.paidAmount}
                    onChange={(e) => setFormData({ ...formData, paidAmount: e.target.value })}
                    placeholder="e.g. 1000"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-white placeholder-zinc-500 text-sm font-mono focus:outline-none focus:border-purple-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                  Due Date for Balance *
                </label>
                <input
                  type="date"
                  required
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-white text-sm focus:outline-none focus:border-purple-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                  Notes / Bill / Invoice Reference (Optional)
                </label>
                <input
                  type="text"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="e.g. Bill #104, Promised on next Friday"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-purple-400"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 text-sm font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-semibold shadow-lg shadow-purple-600/30 hover:opacity-95 transition-opacity"
                >
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Modal: Record Payment ── */}
      {isPayModalOpen && selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#120822] border border-purple-500/40 rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl relative">
            <button
              onClick={() => {
                setIsPayModalOpen(false);
                setSelectedRecord(null);
              }}
              className="absolute top-5 right-5 text-zinc-400 hover:text-white p-1 rounded-full bg-white/5 hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-emerald-400" />
              Record Payment
            </h2>
            <p className="text-xs text-zinc-400 mb-4">
              Recording payment for <strong>{selectedRecord.customerName}</strong>
            </p>

            <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 text-xs space-y-1 mb-5">
              <div className="flex justify-between text-zinc-400">
                <span>Total Bill:</span>
                <span className="font-semibold text-white">₹{selectedRecord.totalAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Already Paid:</span>
                <span className="font-semibold text-emerald-400">₹{selectedRecord.paidAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-zinc-400 pt-1 border-t border-white/5">
                <span>Remaining Balance:</span>
                <span className="font-bold text-amber-300">
                  ₹{(selectedRecord.totalAmount - selectedRecord.paidAmount).toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <form onSubmit={handleRecordPayment} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                  Amount Received (₹)
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  max={selectedRecord.totalAmount - selectedRecord.paidAmount}
                  value={payAmount}
                  onChange={(e) => setPayAmount(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-purple-500/30 text-white text-base font-mono focus:outline-none focus:border-purple-400"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPayAmount((selectedRecord.totalAmount - selectedRecord.paidAmount).toString())}
                  className="px-3 py-1.5 rounded-lg bg-purple-600/30 hover:bg-purple-600/50 text-purple-300 border border-purple-500/30 text-xs font-medium"
                >
                  Pay Full Balance
                </button>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsPayModalOpen(false);
                    setSelectedRecord(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 text-sm font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold shadow-lg shadow-emerald-600/30 transition-all"
                >
                  Confirm Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Modal: Firebase Cloud Firestore Configuration ── */}
      {isFirebaseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-[#120822] border border-purple-500/40 rounded-3xl p-6 sm:p-7 max-w-lg w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsFirebaseModalOpen(false)}
              className="absolute top-5 right-5 text-zinc-400 hover:text-white p-1 rounded-full bg-white/5 hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
              <Cloud className="w-5 h-5 text-emerald-400" />
              Firebase Cloud Firestore Sync
            </h2>
            <p className="text-xs text-zinc-400 mb-5">
              Sync customer dues across all your devices in real-time under your Google account.
            </p>

            <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-500/30 text-xs text-zinc-300 mb-5 space-y-1.5">
              <div className="font-semibold text-purple-200">How to get your free Firebase Keys:</div>
              <ol className="list-decimal pl-4 space-y-1 text-zinc-300">
                <li>Go to <a href="https://console.firebase.google.com" target="_blank" rel="noreferrer" className="text-purple-400 underline font-mono">console.firebase.google.com</a> with your Gmail.</li>
                <li>Create a new Project (100% Free Spark Plan).</li>
                <li>Under <strong>Firestore Database</strong>, click <strong>Create Database</strong> (start in Test mode).</li>
                <li>Under <strong>Project Settings</strong> $\rightarrow$ <strong>General</strong> $\rightarrow$ <strong>Add Web App</strong>, copy your keys below.</li>
              </ol>
            </div>

            <form onSubmit={handleSaveFirebase} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                  API Key *
                </label>
                <input
                  type="text"
                  required
                  value={firebaseForm.apiKey}
                  onChange={(e) => setFirebaseForm({ ...firebaseForm, apiKey: e.target.value })}
                  placeholder="AIzaSy..."
                  className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-purple-500/30 text-white placeholder-zinc-500 text-xs font-mono focus:outline-none focus:border-purple-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                  Project ID *
                </label>
                <input
                  type="text"
                  required
                  value={firebaseForm.projectId}
                  onChange={(e) => setFirebaseForm({ ...firebaseForm, projectId: e.target.value })}
                  placeholder="my-customer-ledger-app"
                  className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-purple-500/30 text-white placeholder-zinc-500 text-xs font-mono focus:outline-none focus:border-purple-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                    Auth Domain
                  </label>
                  <input
                    type="text"
                    value={firebaseForm.authDomain}
                    onChange={(e) => setFirebaseForm({ ...firebaseForm, authDomain: e.target.value })}
                    placeholder="my-project.firebaseapp.com"
                    className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-purple-500/30 text-white placeholder-zinc-500 text-xs font-mono focus:outline-none focus:border-purple-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                    App ID
                  </label>
                  <input
                    type="text"
                    value={firebaseForm.appId}
                    onChange={(e) => setFirebaseForm({ ...firebaseForm, appId: e.target.value })}
                    placeholder="1:123456:web:abcd"
                    className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-purple-500/30 text-white placeholder-zinc-500 text-xs font-mono focus:outline-none focus:border-purple-400"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                {firebaseActive ? (
                  <button
                    type="button"
                    onClick={handleDisconnectFirebase}
                    className="px-4 py-2 rounded-xl bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 text-xs font-medium transition-colors"
                  >
                    Disconnect
                  </button>
                ) : <div />}

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsFirebaseModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 text-xs font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-lg shadow-emerald-600/30 transition-all"
                  >
                    Connect & Sync
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
