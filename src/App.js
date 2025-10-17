import React, { useState, useEffect, useRef } from 'react';
import { Send, LogOut, User, Car, X, Check } from 'lucide-react';

<<<<<<< HEAD
// Update this to your hosted backend URL
const API_URL = 'https://vehicle-chatbot-backend.vercel.app';

=======
>>>>>>> 6a239d2 (Update frontend to use hosted backend API)
export default function VehicleChatbotApp() {
  const [currentView, setCurrentView] = useState('login');
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = sessionStorage.getItem('token');
    const storedUser = sessionStorage.getItem('user');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      setCurrentView('chat');
    }
  }, []);

  const handleLogin = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    sessionStorage.setItem('token', authToken);
    sessionStorage.setItem('user', JSON.stringify(userData));
    setCurrentView('chat');
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    setCurrentView('login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentView === 'login' && (
        <LoginPage onLogin={handleLogin} onSwitchToRegister={() => setCurrentView('register')} />
      )}
      {currentView === 'register' && (
        <RegisterPage onRegister={handleLogin} onSwitchToLogin={() => setCurrentView('login')} />
      )}
      {currentView === 'chat' && user && token && (
        <ChatInterface user={user} token={token} onLogout={handleLogout} />
      )}
    </div>
  );
}

function LoginPage({ onLogin, onSwitchToRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://vehicle-chatbot-backend.vercel.app/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        onLogin(data.user, data.token);
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <Car className="w-16 h-16 mx-auto text-blue-600 mb-4" />
          <h1 className="text-3xl font-bold text-gray-900">Vehicle Advisor</h1>
          <p className="text-gray-600 mt-2">Find your perfect car with AI assistance</p>
        </div>

        <div className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-blue-400 transition"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={onSwitchToRegister}
              className="text-blue-600 hover:underline font-semibold"
            >
              Register
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

function RegisterPage({ onRegister, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone_number: '',
    location: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://vehicle-chatbot-backend.vercel.app/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        onRegister(data.user, data.token);
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <Car className="w-16 h-16 mx-auto text-blue-600 mb-4" />
          <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
        </div>

        <div className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone (Optional)</label>
            <input
              type="tel"
              value={formData.phone_number}
              onChange={(e) => setFormData({...formData, phone_number: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location (Optional)</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-blue-400"
          >
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <button onClick={onSwitchToLogin} className="text-blue-600 hover:underline font-semibold">
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
<<<<<<< HEAD
=======
}

function ChatInterface({ user, token, onLogout }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showComparisonModal, setShowComparisonModal] = useState(false);
  const [comparisonVehicles, setComparisonVehicles] = useState([]);
  const [showPreferencesModal, setShowPreferencesModal] = useState(false);
  const [userPreferences, setUserPreferences] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    startConversation();
    loadUserPreferences();
    setMessages([{
      sender: 'bot',
      content: {
        type: 'text',
        content: `Hi ${user.name}! I'm your vehicle advisor. I can help you find the perfect car based on your needs and budget. What are you looking for today?`,
        quick_actions: [
          { label: '🚗 Find a car', action: 'find_car' },
          { label: '💰 Set Budget', action: 'set_budget' },
          { label: '🔍 Browse All', action: 'browse_all' }
        ]
      },
      timestamp: new Date()
    }]);

    window.onShowComparison = (vehicles) => {
      setComparisonVehicles(vehicles);
      setShowComparisonModal(true);
    };

    return () => {
      window.onShowComparison = null;
    };
  }, [user.name]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const loadUserPreferences = async () => {
    try {
      const response = await fetch('https://vehicle-chatbot-backend.vercel.app/api/preferences', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.hasPreferences) {
        setUserPreferences(data.preferences);
      }
    } catch (err) {
      console.error('Error loading preferences:', err);
    }
  };

  const startConversation = async () => {
    try {
      const response = await fetch('https://vehicle-chatbot-backend.vercel.app/api/conversations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setConversationId(data.conversation_id);
    } catch (err) {
      console.error('Error starting conversation:', err);
    }
  };

  const sendMessage = async (message) => {
    if (!message.trim() || !conversationId) return;

    const userMessage = {
      sender: 'user',
      content: { type: 'text', content: message },
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setLoading(true);

    try {
      const response = await fetch(`https://vehicle-chatbot-backend.vercel.app/api/conversations/${conversationId}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ content: message })
      });

      const data = await response.json();
      
      const botMessage = {
        sender: 'bot',
        content: data.bot_response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);

      if (data.bot_response.vehicles) {
        setVehicles(data.bot_response.vehicles);
      }
    } catch (err) {
      console.error('Error sending message:', err);
      const errorMessage = {
        sender: 'bot',
        content: { type: 'text', content: 'Sorry, I encountered an error. Please try again.' },
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickAction = (action) => {
    if (action === 'set_preferences' || action === 'update_preferences') {
      setShowPreferencesModal(true);
      return;
    }

    if (action === 'my_recommendations') {
      sendMessage('Show me my personalized recommendations');
      return;
    }

    const actionMessages = {
      'find_car': 'I want to find a car',
      'set_budget': 'Help me set my budget',
      'browse_all': 'Show me all vehicles',
      'choose_type': 'Choose type',
      'compare': 'Compare these vehicles',
      'see_more': 'Show me more options',
      'refine': 'I want to refine my search',
      'hatchback': 'hatchback',
      'sedan': 'sedan',
      'suv': 'suv',
      'muv': 'muv',
      'under 5 lakhs': 'under 5 lakhs',
      'between 5 and 10 lakhs': 'between 5 and 10 lakhs',
      'between 10 and 15 lakhs': 'between 10 and 15 lakhs',
      'between 15 and 20 lakhs': 'between 15 and 20 lakhs',
      'above 20 lakhs': 'above 20 lakhs',
      'details': 'show details'
    };
    sendMessage(actionMessages[action] || action);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Car className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-xl font-bold text-gray-900">Vehicle Advisor</h1>
            <p className="text-sm text-gray-600">AI-Powered Car Recommendations</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowPreferencesModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
            title="My Preferences"
          >
            <User className="w-4 h-4" />
            <span className="hidden md:inline">Preferences</span>
          </button>
          <div className="flex items-center space-x-2">
            <User className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">{user.name}</span>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center space-x-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.map((message, index) => (
          <MessageBubble
            key={index}
            message={message}
            onQuickAction={handleQuickAction}
            onViewVehicle={(vehicle) => {
              setSelectedVehicle(vehicle);
              setShowVehicleModal(true);
            }}
          />
        ))}
        {loading && (
          <div className="flex items-center space-x-2 text-gray-500">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            <span className="text-sm">Advisor is typing...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="bg-white border-t border-gray-200 px-6 py-4">
        <div className="flex space-x-3">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => { if (e.key === 'Enter') sendMessage(inputMessage); }}
            placeholder="Type your message... (e.g., 'SUV under 15 lakhs')"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={loading}
          />
          <button
            type="button"
            onClick={() => sendMessage(inputMessage)}
            disabled={loading || !inputMessage.trim()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 flex items-center space-x-2"
          >
            <Send className="w-5 h-5" />
            <span>Send</span>
          </button>
        </div>
      </div>

      {showVehicleModal && selectedVehicle && (
        <VehicleDetailModal
          vehicle={selectedVehicle}
          onClose={() => setShowVehicleModal(false)}
        />
      )}

      {showComparisonModal && comparisonVehicles.length > 0 && (
        <ComparisonModal
          vehicles={comparisonVehicles}
          onClose={() => setShowComparisonModal(false)}
        />
      )}

      {showPreferencesModal && (
        <PreferencesModal
          currentPreferences={userPreferences}
          token={token}
          onClose={() => setShowPreferencesModal(false)}
          onSave={(prefs) => {
            setUserPreferences(prefs);
            setShowPreferencesModal(false);
            sendMessage('Show me my personalized recommendations');
          }}
        />
      )}
    </div>
  );
}

function MessageBubble({ message, onQuickAction, onViewVehicle }) {
  const isBot = message.sender === 'bot';
  const content = message.content;

  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div className={`max-w-3xl ${isBot ? 'bg-white' : 'bg-blue-600 text-white'} rounded-lg shadow p-4`}>
        {content.type === 'text' && (
          <p className="whitespace-pre-wrap">{content.content}</p>
        )}

        {content.type === 'vehicle_list' && (
          <div>
            <p className="mb-4">{content.content}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {content.vehicles.map((vehicle) => (
                <VehicleCard key={vehicle.vehicle_id} vehicle={vehicle} onView={onViewVehicle} />
              ))}
            </div>
          </div>
        )}

        {content.type === 'comparison' && (
          <div>
            <p className="mb-4">{content.content}</p>
            <button
              onClick={() => {
                if (window.onShowComparison) {
                  window.onShowComparison(content.vehicles);
                }
              }}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold mb-4"
            >
              View Comparison Table
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {content.vehicles.map((vehicle) => (
                <VehicleCard key={vehicle.vehicle_id} vehicle={vehicle} onView={onViewVehicle} />
              ))}
            </div>
          </div>
        )}

        {content.quick_actions && content.quick_actions.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {content.quick_actions.map((action, idx) => (
              <button
                key={idx}
                onClick={() => onQuickAction(action.action || action.value || action.label)}
                className={`px-3 py-1 rounded-full text-sm transition ${
                  isBot 
                    ? 'bg-blue-50 text-blue-600 hover:bg-blue-100' 
                    : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
                }`}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}

        <p className="text-xs text-gray-500 mt-2">
          {new Date(message.timestamp).toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
}

function VehicleCard({ vehicle, onView }) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-lg transition flex flex-col h-full">
      <div className="flex-1">
        <h3 className="font-bold text-gray-900 text-sm mb-1">
          {vehicle.make} {vehicle.model}
        </h3>
        {vehicle.variant && (
          <p className="text-xs text-gray-500 mb-2">{vehicle.variant}</p>
        )}
        <p className="text-xl font-bold text-blue-600 mb-3">
          ₹{(vehicle.price / 100000).toFixed(2)}L
        </p>
        <div className="space-y-1 text-xs text-gray-600 mb-3">
          <p className="flex items-center gap-1">
            <span>🚗</span> {vehicle.vehicle_type}
          </p>
          <p className="flex items-center gap-1">
            <span>⛽</span> {vehicle.fuel_type} • <span>⚙️</span> {vehicle.transmission}
          </p>
          <p className="flex items-center gap-1">
            <span>👥</span> {vehicle.seating_capacity} Seats • <span>📊</span> {vehicle.mileage} km/l
          </p>
          {vehicle.safety_rating && (
            <p className="flex items-center gap-1">
              <span>⭐</span> Safety: {vehicle.safety_rating}/5
            </p>
          )}
        </div>
      </div>
      <button
        onClick={() => onView(vehicle)}
        className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-semibold mt-auto"
      >
        View Details
      </button>
    </div>
  );
}

function PreferencesModal({ currentPreferences, token, onClose, onSave }) {
  const [preferences, setPreferences] = useState({
    budget_min: currentPreferences?.budget_min || '',
    budget_max: currentPreferences?.budget_max || '',
    preferred_vehicle_types: currentPreferences?.preferred_vehicle_types ? 
      (typeof currentPreferences.preferred_vehicle_types === 'string' ? 
        JSON.parse(currentPreferences.preferred_vehicle_types) : currentPreferences.preferred_vehicle_types) : [],
    preferred_brands: currentPreferences?.preferred_brands ? 
      (typeof currentPreferences.preferred_brands === 'string' ? 
        JSON.parse(currentPreferences.preferred_brands) : currentPreferences.preferred_brands) : [],
    fuel_type_preference: currentPreferences?.fuel_type_preference || '',
    transmission_preference: currentPreferences?.transmission_preference || '',
    must_have_features: currentPreferences?.must_have_features ? 
      (typeof currentPreferences.must_have_features === 'string' ? 
        JSON.parse(currentPreferences.must_have_features) : currentPreferences.must_have_features) : [],
    seating_needed: currentPreferences?.seating_needed || '',
    primary_use_case: currentPreferences?.primary_use_case || ''
  });

  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const vehicleTypes = ['Hatchback', 'Sedan', 'SUV', 'MUV'];
  const brands = ['Maruti Suzuki', 'Hyundai', 'Tata', 'Honda', 'Mahindra', 'Kia', 'Toyota', 'MG'];
  const features = ['ABS', 'Airbags', 'Sunroof', 'Cruise Control', 'Touchscreen', 'Leather Seats', 'Ventilated Seats', 'Wireless Charging', '360 Camera'];

  const toggleArrayItem = (array, item) => {
    if (array.includes(item)) {
      return array.filter(i => i !== item);
    }
    return [...array, item];
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch('https://vehicle-chatbot-backend.vercel.app/api/preferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(preferences)
      });

      const data = await response.json();
      if (data.success) {
        alert('Preferences saved successfully!');
        onSave(preferences);
      } else {
        alert('Failed to save preferences: ' + (data.message || 'Unknown error'));
      }
    } catch (err) {
      console.error('Error saving preferences:', err);
      alert('Failed to save preferences. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all preferences?')) {
      setPreferences({
        budget_min: '',
        budget_max: '',
        preferred_vehicle_types: [],
        preferred_brands: [],
        fuel_type_preference: '',
        transmission_preference: '',
        must_have_features: [],
        seating_needed: '',
        primary_use_case: ''
      });
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete all your saved preferences? This cannot be undone.')) {
      return;
    }

    setDeleting(true);
    try {
      const response = await fetch('https://vehicle-chatbot-backend.vercel.app/api/preferences/delete', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (response.ok) {
        alert('Preferences deleted successfully!');
        onSave(null);
        onClose();
      } else {
        alert('Failed to delete preferences: ' + (data.message || 'Unknown error'));
      }
    } catch (err) {
      console.error('Error deleting preferences:', err);
      alert('Failed to delete preferences. Please try again.');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">My Preferences</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Budget Range</label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Min Budget (₹)</label>
                <input
                  type="number"
                  value={preferences.budget_min}
                  onChange={(e) => setPreferences({...preferences, budget_min: e.target.value})}
                  placeholder="e.g., 500000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Max Budget (₹)</label>
                <input
                  type="number"
                  value={preferences.budget_max}
                  onChange={(e) => setPreferences({...preferences, budget_max: e.target.value})}
                  placeholder="e.g., 1500000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Vehicle Types</label>
            <div className="flex flex-wrap gap-2">
              {vehicleTypes.map(type => (
                <button
                  key={type}
                  onClick={() => setPreferences({
                    ...preferences,
                    preferred_vehicle_types: toggleArrayItem(preferences.preferred_vehicle_types, type)
                  })}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    preferences.preferred_vehicle_types.includes(type)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Brands</label>
            <div className="flex flex-wrap gap-2">
              {brands.map(brand => (
                <button
                  key={brand}
                  onClick={() => setPreferences({
                    ...preferences,
                    preferred_brands: toggleArrayItem(preferences.preferred_brands, brand)
                  })}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    preferences.preferred_brands.includes(brand)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Fuel Type Preference</label>
            <div className="flex flex-wrap gap-2">
              {['Petrol', 'Diesel', 'Electric', 'CNG', 'Hybrid'].map(fuel => (
                <button
                  key={fuel}
                  onClick={() => setPreferences({...preferences, fuel_type_preference: fuel})}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    preferences.fuel_type_preference === fuel
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {fuel}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Transmission Preference</label>
            <div className="flex flex-wrap gap-2">
              {['Manual', 'Automatic', 'AMT', 'CVT', 'DCT'].map(trans => (
                <button
                  key={trans}
                  onClick={() => setPreferences({...preferences, transmission_preference: trans})}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    preferences.transmission_preference === trans
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {trans}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Minimum Seating Capacity</label>
            <select
              value={preferences.seating_needed}
              onChange={(e) => setPreferences({...preferences, seating_needed: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">No preference</option>
              <option value="5">5 Seats</option>
              <option value="7">7 Seats</option>
              <option value="8">8 Seats</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Must-Have Features</label>
            <div className="flex flex-wrap gap-2">
              {features.map(feature => (
                <button
                  key={feature}
                  onClick={() => setPreferences({
                    ...preferences,
                    must_have_features: toggleArrayItem(preferences.must_have_features, feature)
                  })}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                    preferences.must_have_features.includes(feature)
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {feature}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Primary Use Case</label>
            <select
              value={preferences.primary_use_case}
              onChange={(e) => setPreferences({...preferences, primary_use_case: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select use case</option>
              <option value="city driving">City Driving</option>
              <option value="highway">Highway Cruising</option>
              <option value="family">Family Use</option>
              <option value="off-road">Off-Road</option>
              <option value="daily commute">Daily Commute</option>
            </select>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <p className="text-sm text-blue-800">
              <strong>💡 Tip:</strong> Setting your preferences helps us give you better personalized recommendations. 
              You can update these anytime!
            </p>
          </div>
        </div>

        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400"
          >
            {saving ? 'Saving...' : 'Save Preferences'}
          </button>
        </div>
      </div>
    </div>
  );
}

function ComparisonModal({ vehicles, onClose }) {
  const specs = [
    { key: 'price', label: 'Price', format: (v) => `₹${(v.price / 100000).toFixed(2)}L` },
    { key: 'vehicle_type', label: 'Type', format: (v) => v.vehicle_type },
    { key: 'fuel_type', label: 'Fuel', format: (v) => v.fuel_type },
    { key: 'transmission', label: 'Transmission', format: (v) => v.transmission },
    { key: 'seating_capacity', label: 'Seats', format: (v) => v.seating_capacity },
    { key: 'mileage', label: 'Mileage', format: (v) => `${v.mileage} km/l` },
    { key: 'engine_capacity', label: 'Engine', format: (v) => `${v.engine_capacity} cc` },
    { key: 'safety_rating', label: 'Safety', format: (v) => v.safety_rating ? `${v.safety_rating}/5 ⭐` : 'N/A' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Vehicle Comparison</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-4 font-bold text-gray-700">Specification</th>
                  {vehicles.map((vehicle) => (
                    <th key={vehicle.vehicle_id} className="text-center py-4 px-4">
                      <div className="font-bold text-gray-900">{vehicle.make}</div>
                      <div className="text-sm font-semibold text-blue-600">{vehicle.model}</div>
                      {vehicle.variant && <div className="text-xs text-gray-500">{vehicle.variant}</div>}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {specs.map((spec, idx) => (
                  <tr key={spec.key} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="py-3 px-4 font-semibold text-gray-700">{spec.label}</td>
                    {vehicles.map((vehicle) => {
                      const value = spec.format(vehicle);
                      const isLowest = spec.key === 'price' && vehicle.price === Math.min(...vehicles.map(v => v.price));
                      const isHighest = (spec.key === 'mileage' || spec.key === 'safety_rating') && vehicle[spec.key] === Math.max(...vehicles.map(v => v[spec.key]));
                      
                      return (
                        <td 
                          key={vehicle.vehicle_id} 
                          className={`py-3 px-4 text-center ${isLowest || isHighest ? 'bg-green-100 font-bold text-green-700' : ''}`}
                        >
                          {value}
                          {(isLowest || isHighest) && ' ✓'}
                        </td>
                      );
                    })}
                  </tr>
                ))}

                <tr className="bg-white border-t-2 border-gray-200">
                  <td className="py-3 px-4 font-semibold text-gray-700 align-top">Key Features</td>
                  {vehicles.map((vehicle) => (
                    <td key={vehicle.vehicle_id} className="py-3 px-4 text-center align-top">
                      <div className="flex flex-wrap gap-1 justify-center">
                        {(vehicle.features || []).slice(0, 5).map((feature, idx) => (
                          <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>💡 Tips:</strong> Green highlights show the best value in each category. 
              Lower price, higher mileage, and higher safety ratings are highlighted.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function VehicleDetailModal({ vehicle, onClose }) {
  const features = vehicle.features || [];
  const colors = vehicle.colors_available || [];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">
            {vehicle.make} {vehicle.model}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <p className="text-3xl font-bold text-blue-600">₹{(vehicle.price / 100000).toFixed(2)} Lakhs</p>
            <p className="text-gray-600 mt-2">{vehicle.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Type</p>
              <p className="font-semibold">{vehicle.vehicle_type}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Fuel Type</p>
              <p className="font-semibold">{vehicle.fuel_type}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Transmission</p>
              <p className="font-semibold">{vehicle.transmission}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Seating</p>
              <p className="font-semibold">{vehicle.seating_capacity} Seats</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Mileage</p>
              <p className="font-semibold">{vehicle.mileage} km/l</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Engine</p>
              <p className="font-semibold">{vehicle.engine_capacity} cc</p>
            </div>
          </div>

          {features.length > 0 && (
            <div>
              <h3 className="font-bold text-gray-900 mb-3">Features</h3>
              <div className="flex flex-wrap gap-2">
                {features.map((feature, idx) => (
                  <span key={idx} className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm flex items-center">
                    <Check className="w-4 h-4 mr-1" />
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          )}

          {colors.length > 0 && (
            <div>
              <h3 className="font-bold text-gray-900 mb-3">Available Colors</h3>
              <div className="flex flex-wrap gap-2">
                {colors.map((color, idx) => (
                  <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    {color}
                  </span>
                ))}
              </div>
            </div>
          )}

          {vehicle.safety_rating && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-600 font-semibold">Safety Rating</p>
              <p className="text-2xl font-bold text-blue-900">{vehicle.safety_rating} / 5 ⭐</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
>>>>>>> 6a239d2 (Update frontend to use hosted backend API)
}