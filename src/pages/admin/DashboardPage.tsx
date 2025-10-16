import React, { useState, useEffect } from 'react';
import BookingCalendar from './BookingCalendar';
import { 
  Calendar, 
  Users, 
  Car, 
  Euro, 
  Clock, 
  MapPin, 
  Phone, 
  Mail,
  Download,
  Filter,
  Search,
  LogOut,
  RefreshCw,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Eye,
  X,
  Plane,
  Train,
  Baby,
  Luggage
} from 'lucide-react';

interface Booking {
  id: string;
  booking_reference: string;
  name: string;
  email: string;
  phone: string;
  pickup_location: string;
  pickup_sub_location?: string;
  pickup_address?: string;
  pickup_flight_number?: string;
  pickup_train_number?: string;
  dropoff_location: string;
  dropoff_sub_location?: string;
  dropoff_address?: string;
  dropoff_flight_number?: string;
  dropoff_train_number?: string;
  passengers: number;
  vehicle_type: string;
  arrival_date: string;
  arrival_time: string;
  trip_type: string;
  return_date?: string;
  return_time?: string;
  price: number;
  payment_method: string;
  status: string;
  created_at: string;
  baby_seat?: number;
  child_seat?: number;
  strollers?: number;
  hand_luggages?: number;
  backpacks?: number;
  suitcases?: number;
  notes?: string;
}

interface DashboardPageProps {
  onLogout: () => void;
}

type SortField = 'created_at' | 'arrival_date' | 'name' | 'price' | 'status' | 'pickup_location' | 'dropoff_location';
type SortDirection = 'asc' | 'desc';

export default function DashboardPage({ onLogout }: DashboardPageProps) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [sortField, setSortField] = useState<SortField>('created_at');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [dateFilter, setDateFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');

  const API_BASE_URL = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : 'https://vtc-backend-ccuj.onrender.com/api';

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`${API_BASE_URL}/admin/bookings`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Erreur lors du chargement des réservations');
      }

      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId: string, newStatus: string) => {
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`${API_BASE_URL}/admin/bookings/${bookingId}/status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        fetchBookings();
      }
    } catch (error) {
      console.error('Erreur mise à jour statut:', error);
    }
  };

  const exportBookings = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`${API_BASE_URL}/admin/bookings/export`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `reservations_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
      }
    } catch (error) {
      console.error('Erreur export:', error);
    }
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return <ArrowUpDown className="h-4 w-4" />;
    return sortDirection === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />;
  };

  const filteredAndSortedBookings = bookings
    .filter(booking => {
      // Filtre par statut
      const matchesStatus = filter === 'all' || booking.status === filter;
      
      // Filtre par recherche
      const matchesSearch = 
        booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.booking_reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.phone.includes(searchTerm) ||
        booking.pickup_location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.dropoff_location.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filtre par date
      let matchesDate = true;
      if (dateFilter !== 'all') {
        const today = new Date();
        const bookingDate = new Date(booking.arrival_date);
        
        switch (dateFilter) {
          case 'today':
            matchesDate = bookingDate.toDateString() === today.toDateString();
            break;
          case 'tomorrow':
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            matchesDate = bookingDate.toDateString() === tomorrow.toDateString();
            break;
          case 'this_week':
            const weekStart = new Date(today);
            weekStart.setDate(today.getDate() - today.getDay());
            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekStart.getDate() + 6);
            matchesDate = bookingDate >= weekStart && bookingDate <= weekEnd;
            break;
          case 'this_month':
            matchesDate = bookingDate.getMonth() === today.getMonth() && 
                         bookingDate.getFullYear() === today.getFullYear();
            break;
        }
      }
      
      // Filtre par méthode de paiement
      const matchesPayment = paymentFilter === 'all' || booking.payment_method === paymentFilter;
      
      return matchesStatus && matchesSearch && matchesDate && matchesPayment;
    })
    .sort((a, b) => {
      let aValue: any = a[sortField];
      let bValue: any = b[sortField];
      
      // Conversion pour les dates
      if (sortField === 'created_at' || sortField === 'arrival_date') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }
      
      // Conversion pour les nombres
      if (sortField === 'price') {
        aValue = Number(aValue);
        bValue = Number(bValue);
      }
      
      // Conversion pour les strings
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
    confirmed: bookings.filter(b => b.status === 'paid' || b.status === 'confirmed').length,
    revenue: bookings.reduce((sum, b) => sum + b.price, 0),
    today: bookings.filter(b => {
      const today = new Date().toDateString();
      const bookingDate = new Date(b.arrival_date).toDateString();
      return bookingDate === today;
    }).length,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'paid': return 'bg-green-100 text-green-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-12 w-12 text-royal-gold-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Chargement du tableau de bord...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-900">Tableau de Bord Admin</h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={fetchBookings}
                className="p-2 text-gray-500 hover:text-gray-700"
                title="Actualiser"
              >
                <RefreshCw className="h-5 w-5" />
              </button>
              <button
                onClick={exportBookings}
                className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </button>
              <button
                onClick={onLogout}
                className="inline-flex items-center px-3 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Calendrier des réservations */}
      <div className="mb-8">
        <BookingCalendar bookings={bookings} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-yellow-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">En Attente</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Confirmées</p>
                <p className="text-2xl font-bold text-gray-900">{stats.confirmed}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-purple-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Aujourd'hui</p>
                <p className="text-2xl font-bold text-gray-900">{stats.today}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Euro className="h-8 w-8 text-royal-gold-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">CA Total</p>
                <p className="text-2xl font-bold text-gray-900">€{stats.revenue}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Recherche */}
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-royal-gold-500 focus:border-royal-gold-500"
                />
              </div>
              
              {/* Filtre par statut */}
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-royal-gold-500 focus:border-royal-gold-500"
              >
                <option value="all">Tous les statuts</option>
                <option value="pending">En attente</option>
                <option value="paid">Payé</option>
                <option value="confirmed">Confirmé</option>
                <option value="cancelled">Annulé</option>
              </select>

              {/* Filtre par date */}
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-royal-gold-500 focus:border-royal-gold-500"
              >
                <option value="all">Toutes les dates</option>
                <option value="today">Aujourd'hui</option>
                <option value="tomorrow">Demain</option>
                <option value="this_week">Cette semaine</option>
                <option value="this_month">Ce mois</option>
              </select>

              {/* Filtre par paiement */}
              <select
                value={paymentFilter}
                onChange={(e) => setPaymentFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-royal-gold-500 focus:border-royal-gold-500"
              >
                <option value="all">Tous les paiements</option>
                <option value="cash">Espèces</option>
                <option value="card">Carte</option>
              </select>

              {/* Résultats */}
              <div className="flex items-center text-sm text-gray-500">
                {filteredAndSortedBookings.length} résultat(s)
              </div>
            </div>
          </div>

          {/* Bookings Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('created_at')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Date Réservation</span>
                      {getSortIcon('created_at')}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Référence
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Client</span>
                      {getSortIcon('name')}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('pickup_location')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Trajet</span>
                      {getSortIcon('pickup_location')}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('arrival_date')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Date/Heure Transfert</span>
                      {getSortIcon('arrival_date')}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Détails
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('price')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Prix</span>
                      {getSortIcon('price')}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('status')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Statut</span>
                      {getSortIcon('status')}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAndSortedBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {formatDateTime(booking.created_at)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {booking.booking_reference}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{booking.name}</div>
                      <div className="text-sm text-gray-500">{booking.email}</div>
                      <div className="text-sm text-gray-500">{booking.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                          {booking.pickup_location} → {booking.dropoff_location}
                        </div>
                        {booking.pickup_sub_location && (
                          <div className="text-xs text-gray-500 mt-1">
                            📍 {booking.pickup_sub_location}
                          </div>
                        )}
                        {booking.pickup_flight_number && (
                          <div className="flex items-center text-xs text-blue-600 mt-1">
                            <Plane className="h-3 w-3 mr-1" />
                            {booking.pickup_flight_number}
                          </div>
                        )}
                        {booking.pickup_train_number && (
                          <div className="flex items-center text-xs text-green-600 mt-1">
                            <Train className="h-3 w-3 mr-1" />
                            {booking.pickup_train_number}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatDate(booking.arrival_date)}
                      </div>
                      <div className="text-sm text-gray-500">{booking.arrival_time}</div>
                      {booking.trip_type === 'round-trip' && booking.return_date && (
                        <div className="text-sm text-blue-600">
                          🔄 {formatDate(booking.return_date)}
                          {booking.return_time && ` ${booking.return_time}`}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <Users className="h-4 w-4 text-gray-400 mr-1" />
                        {booking.passengers}p
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Car className="h-4 w-4 text-gray-400 mr-1" />
                        {booking.vehicle_type}
                      </div>
                      {(booking.baby_seat || booking.child_seat) && (
                        <div className="flex items-center text-xs text-orange-600">
                          <Baby className="h-3 w-3 mr-1" />
                          {booking.baby_seat || 0}+{booking.child_seat || 0}
                        </div>
                      )}
                      {(booking.suitcases || booking.hand_luggages) && (
                        <div className="flex items-center text-xs text-gray-600">
                          <Luggage className="h-3 w-3 mr-1" />
                          {(booking.suitcases || 0) + (booking.hand_luggages || 0)}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">€{booking.price}</div>
                      <div className="text-sm text-gray-500">{booking.payment_method}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => setSelectedBooking(booking)}
                        className="text-royal-gold-600 hover:text-royal-gold-900 mr-3"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <select
                        value={booking.status}
                        onChange={(e) => updateBookingStatus(booking.id, e.target.value)}
                        className="text-xs border border-gray-300 rounded px-2 py-1"
                      >
                        <option value="pending">En attente</option>
                        <option value="confirmed">Confirmé</option>
                        <option value="paid">Payé</option>
                        <option value="cancelled">Annulé</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal de détails */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Détails de la réservation {selectedBooking.booking_reference}
                </h3>
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-4 max-h-96 overflow-y-auto">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900">Informations client</h4>
                    <p className="text-sm text-gray-600">Nom: {selectedBooking.name}</p>
                    <p className="text-sm text-gray-600">Email: {selectedBooking.email}</p>
                    <p className="text-sm text-gray-600">Téléphone: {selectedBooking.phone}</p>
                    <p className="text-sm text-gray-600">Réservé le: {formatDateTime(selectedBooking.created_at)}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900">Détails du voyage</h4>
                    <p className="text-sm text-gray-600">Type: {selectedBooking.trip_type}</p>
                    <p className="text-sm text-gray-600">Véhicule: {selectedBooking.vehicle_type}</p>
                    <p className="text-sm text-gray-600">Passagers: {selectedBooking.passengers}</p>
                    <p className="text-sm text-gray-600">Prix: €{selectedBooking.price}</p>
                    <p className="text-sm text-gray-600">Paiement: {selectedBooking.payment_method}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900">Itinéraire</h4>
                  <p className="text-sm text-gray-600">
                    De: {selectedBooking.pickup_location}
                    {selectedBooking.pickup_sub_location && ` - ${selectedBooking.pickup_sub_location}`}
                  </p>
                  {selectedBooking.pickup_address && (
                    <p className="text-sm text-gray-500">📍 {selectedBooking.pickup_address}</p>
                  )}
                  <p className="text-sm text-gray-600">
                    Vers: {selectedBooking.dropoff_location}
                    {selectedBooking.dropoff_sub_location && ` - ${selectedBooking.dropoff_sub_location}`}
                  </p>
                  {selectedBooking.dropoff_address && (
                    <p className="text-sm text-gray-500">📍 {selectedBooking.dropoff_address}</p>
                  )}
                  {selectedBooking.pickup_flight_number && (
                    <p className="text-sm text-gray-600">✈️ Vol: {selectedBooking.pickup_flight_number}</p>
                  )}
                  {selectedBooking.pickup_train_number && (
                    <p className="text-sm text-gray-600">🚄 Train: {selectedBooking.pickup_train_number}</p>
                  )}
                </div>

                <div>
                  <h4 className="font-medium text-gray-900">Horaires</h4>
                  <p className="text-sm text-gray-600">
                    Départ: {formatDate(selectedBooking.arrival_date)} à {selectedBooking.arrival_time}
                  </p>
                  {selectedBooking.trip_type === 'round-trip' && selectedBooking.return_date && (
                    <p className="text-sm text-gray-600">
                      Retour: {formatDate(selectedBooking.return_date)} 
                      {selectedBooking.return_time && ` à ${selectedBooking.return_time}`}
                    </p>
                  )}
                </div>

                {(selectedBooking.baby_seat || selectedBooking.child_seat || selectedBooking.strollers || 
                  selectedBooking.hand_luggages || selectedBooking.backpacks || selectedBooking.suitcases) && (
                  <div>
                    <h4 className="font-medium text-gray-900">Équipements</h4>
                    {selectedBooking.baby_seat && <p className="text-sm text-gray-600">👶 Sièges bébé: {selectedBooking.baby_seat}</p>}
                    {selectedBooking.child_seat && <p className="text-sm text-gray-600">🧒 Sièges enfant: {selectedBooking.child_seat}</p>}
                    {selectedBooking.strollers && <p className="text-sm text-gray-600">🚼 Poussettes: {selectedBooking.strollers}</p>}
                    {selectedBooking.hand_luggages && <p className="text-sm text-gray-600">🎒 Bagages à main: {selectedBooking.hand_luggages}</p>}
                    {selectedBooking.backpacks && <p className="text-sm text-gray-600">🎒 Sacs à dos: {selectedBooking.backpacks}</p>}
                    {selectedBooking.suitcases && <p className="text-sm text-gray-600">🧳 Valises: {selectedBooking.suitcases}</p>}
                  </div>
                )}
                
                {selectedBooking.notes && (
                  <div>
                    <h4 className="font-medium text-gray-900">Notes</h4>
                    <p className="text-sm text-gray-600">{selectedBooking.notes}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}