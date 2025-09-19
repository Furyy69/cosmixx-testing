import React, { useState, useEffect } from 'react';
import { Search, Play, Download, Plus, Share2, Clock, User, Disc, Home, History, List, ChevronDown, Pause, Heart, MoreHorizontal, ShoppingCart, X, Music, Star, Zap, Volume2 } from 'lucide-react';

interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  albumArt: string;
  isPlaying?: boolean;
  isLiked?: boolean;
}

interface CartItem extends Song {
  format: 'MP3' | 'FLAC' | 'WAV';
  price: number;
}

type Page = 'home' | 'search' | 'cart' | 'queue' | 'history';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [queue, setQueue] = useState<Song[]>([]);

  // Mock data
  const mockSongs: Song[] = [
    {
      id: '1',
      title: 'Faded',
      artist: 'Alan Walker',
      album: 'Different World',
      duration: '3:33',
      albumArt: 'https://images.pexels.com/photos/210922/pexels-photo-210922.jpeg?auto=compress&cs=tinysrgb&w=300',
      isLiked: true
    },
    {
      id: '2',
      title: 'Alone',
      artist: 'Alan Walker',
      album: 'Different World',
      duration: '2:41',
      albumArt: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: '3',
      title: 'The Spectre',
      artist: 'Alan Walker',
      album: 'Different World',
      duration: '3:13',
      albumArt: 'https://images.pexels.com/photos/2034851/pexels-photo-2034851.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: '4',
      title: 'Darkside',
      artist: 'Alan Walker',
      album: 'Different World',
      duration: '3:27',
      albumArt: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: '5',
      title: 'On My Way',
      artist: 'Alan Walker, Sabrina Carpenter & Farruko',
      album: 'Different World',
      duration: '3:21',
      albumArt: 'https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg?auto=compress&cs=tinysrgb&w=300'
    }
  ];

  useEffect(() => {
    if (searchQuery.trim() && currentPage === 'search') {
      setIsLoading(true);
      const timer = setTimeout(() => {
        const filtered = mockSongs.filter(song =>
          song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
          song.album.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(filtered);
        setIsLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setSearchResults([]);
      setIsLoading(false);
    }
  }, [searchQuery, currentPage]);

  const togglePlay = (songId: string) => {
    setCurrentlyPlaying(currentlyPlaying === songId ? null : songId);
  };

  const toggleLike = (songId: string) => {
    setSearchResults(prev =>
      prev.map(song =>
        song.id === songId ? { ...song, isLiked: !song.isLiked } : song
      )
    );
  };

  const addToCart = (song: Song, format: 'MP3' | 'FLAC' | 'WAV' = 'MP3') => {
    const price = format === 'MP3' ? 0.99 : format === 'FLAC' ? 1.99 : 2.99;
    const cartItem: CartItem = { ...song, format, price };
    setCart(prev => [...prev, cartItem]);
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
  };

  const addToQueue = (song: Song) => {
    setQueue(prev => [...prev, song]);
  };

  const removeFromQueue = (songId: string) => {
    setQueue(prev => prev.filter(song => song.id !== songId));
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setCurrentPage('search');
    }
  };

  const FloatingElements = () => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Floating musical notes and cosmic elements */}
      <div className="absolute top-20 left-10 text-purple-400/20 animate-pulse">
        <Music className="h-8 w-8" />
      </div>
      <div className="absolute top-40 right-20 text-cyan-400/20 animate-bounce">
        <Star className="h-6 w-6" />
      </div>
      <div className="absolute bottom-40 left-20 text-purple-300/20 animate-pulse">
        <Zap className="h-10 w-10" />
      </div>
      <div className="absolute top-60 left-1/3 text-blue-400/20 animate-bounce">
        <Volume2 className="h-7 w-7" />
      </div>
      <div className="absolute bottom-60 right-1/4 text-purple-400/20 animate-pulse">
        <Disc className="h-9 w-9" />
      </div>
      <div className="absolute top-1/3 right-10 text-cyan-300/20 animate-bounce">
        <Music className="h-5 w-5" />
      </div>
    </div>
  );

  const HomePage = () => (
    <div className="min-h-screen flex flex-col items-center justify-center relative">
      <FloatingElements />
      
      {/* Main Content */}
      <div className="text-center z-10 max-w-4xl mx-auto px-4">
        {/* Logo */}
        <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent tracking-wider">
          COSMIC CONVERTER
        </h1>
        
        {/* Tagline */}
        <p className="text-xl sm:text-2xl text-slate-300 mb-4 font-light">
          Your gateway to the audio universe.
        </p>
        
        {/* Development Notice */}
        <p className="text-yellow-400 mb-12 text-lg">
          This site is in active development. Thank you for your patience.
        </p>
        
        {/* Search Section */}
        <div className="bg-slate-800/30 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8 mb-12 max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Enter song name, artist, or album..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1 px-6 py-4 bg-slate-900/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400 transition-all duration-200"
            />
            <button
              onClick={handleSearch}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 min-w-[120px]"
            >
              <Search className="h-5 w-5" />
              Search
            </button>
          </div>
        </div>
        
        {/* Feature Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <button
            onClick={() => setCurrentPage('queue')}
            className="bg-slate-800/30 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 hover:bg-slate-700/40 transition-all duration-200 group"
          >
            <List className="h-8 w-8 text-cyan-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="text-white font-semibold mb-2">Queue</h3>
            <p className="text-slate-400 text-sm">Manage your playlist</p>
          </button>
          
          <button
            onClick={() => setCurrentPage('cart')}
            className="bg-slate-800/30 backdrop-blur-sm border border-green-500/20 rounded-xl p-6 hover:bg-slate-700/40 transition-all duration-200 group relative"
          >
            <ShoppingCart className="h-8 w-8 text-green-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
            {cart.length > 0 && (
              <span className="absolute top-2 right-2 bg-green-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                {cart.length}
              </span>
            )}
            <h3 className="text-white font-semibold mb-2">Cart</h3>
            <p className="text-slate-400 text-sm">Your downloads</p>
          </button>
          
          <button
            onClick={() => setCurrentPage('history')}
            className="bg-slate-800/30 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6 hover:bg-slate-700/40 transition-all duration-200 group"
          >
            <History className="h-8 w-8 text-blue-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="text-white font-semibold mb-2">History</h3>
            <p className="text-slate-400 text-sm">Recent downloads</p>
          </button>
        </div>
      </div>
      
      {/* Footer */}
      <div className="absolute bottom-8 text-slate-500 text-sm">
        © 2025 Cosmic Converter.
      </div>
    </div>
  );

  const SearchPage = () => (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Search Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search for songs, artists, or albums..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-6 py-4 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400 transition-all duration-200"
          />
        </div>
      </div>

      {/* Search Results */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400"></div>
          <span className="ml-3 text-slate-300">Searching...</span>
        </div>
      )}

      {searchQuery && !isLoading && searchResults.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="h-8 w-8 text-slate-400" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No results found</h3>
          <p className="text-slate-400">Try searching with different keywords</p>
        </div>
      )}

      {searchResults.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-semibold">Search Results</h3>
            <span className="text-slate-400">{searchResults.length} songs found</span>
          </div>

          {searchResults.map((song) => (
            <div
              key={song.id}
              className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:bg-slate-700/40 transition-all duration-200"
            >
              <div className="flex items-center gap-6">
                {/* Album Art */}
                <img
                  src={song.albumArt}
                  alt={`${song.album} album art`}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                
                {/* Song Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-lg font-semibold text-white mb-1">{song.title}</h4>
                  <p className="text-slate-300 mb-1">By: {song.artist}</p>
                  <p className="text-slate-400 text-sm">Duration: {song.duration}</p>
                </div>
                
                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => togglePlay(song.id)}
                    className="p-3 bg-purple-500 hover:bg-purple-600 text-white rounded-full transition-colors min-w-[48px] min-h-[48px] flex items-center justify-center"
                  >
                    {currentlyPlaying === song.id ? (
                      <Pause className="h-5 w-5" />
                    ) : (
                      <Play className="h-5 w-5" />
                    )}
                  </button>
                  
                  <button
                    onClick={() => addToQueue(song)}
                    className="p-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-full transition-colors min-w-[48px] min-h-[48px] flex items-center justify-center"
                    title="Add to Queue"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                  
                  <button
                    onClick={() => addToCart(song)}
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold rounded-xl transition-all duration-200"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const CartPage = () => (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8">Your Cart</h2>
      
      {cart.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingCart className="h-16 w-16 text-slate-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
          <p className="text-slate-400 mb-6">Add some songs to get started</p>
          <button
            onClick={() => setCurrentPage('search')}
            className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-xl transition-colors"
          >
            Browse Songs
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={`${item.id}-${item.format}`}
              className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6"
            >
              <div className="flex items-center gap-6">
                <img
                  src={item.albumArt}
                  alt={`${item.album} album art`}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-white">{item.title}</h4>
                  <p className="text-slate-300">{item.artist}</p>
                  <p className="text-slate-400 text-sm">Format: {item.format}</p>
                </div>
                
                <div className="text-right">
                  <p className="text-xl font-bold text-green-400">${item.price}</p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-red-400 hover:text-red-300 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          <div className="bg-slate-800/50 rounded-xl p-6 mt-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-semibold">Total:</span>
              <span className="text-2xl font-bold text-green-400">
                ${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
              </span>
            </div>
            <button className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold rounded-xl transition-all duration-200">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const QueuePage = () => (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8">Queue</h2>
      
      {queue.length === 0 ? (
        <div className="text-center py-12">
          <List className="h-16 w-16 text-slate-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Your queue is empty</h3>
          <p className="text-slate-400 mb-6">Add songs to create your playlist</p>
          <button
            onClick={() => setCurrentPage('search')}
            className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl transition-colors"
          >
            Find Songs
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {queue.map((song, index) => (
            <div
              key={`${song.id}-${index}`}
              className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 hover:bg-slate-700/40 transition-all duration-200"
            >
              <div className="flex items-center gap-4">
                <span className="text-slate-400 font-mono text-sm w-8">{index + 1}</span>
                
                <img
                  src={song.albumArt}
                  alt={`${song.album} album art`}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-white truncate">{song.title}</h4>
                  <p className="text-slate-300 text-sm truncate">{song.artist}</p>
                </div>
                
                <span className="text-slate-400 text-sm">{song.duration}</span>
                
                <button
                  onClick={() => removeFromQueue(song.id)}
                  className="p-2 text-red-400 hover:text-red-300 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const HistoryPage = () => (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8">Download History</h2>
      
      <div className="text-center py-12">
        <History className="h-16 w-16 text-slate-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">No download history</h3>
        <p className="text-slate-400">Your downloaded songs will appear here</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
      {/* Cosmic Background */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-900 to-slate-900"></div>
      
      {/* Navigation */}
      {currentPage !== 'home' && (
        <header className="relative z-50 border-b border-slate-700/50 backdrop-blur-sm bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <button
                onClick={() => setCurrentPage('home')}
                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center font-bold text-sm">
                  C
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Cosmic Converter
                </h1>
              </button>
              
              <nav className="flex space-x-6">
                <button
                  onClick={() => setCurrentPage('search')}
                  className={`flex items-center space-x-2 transition-colors ${
                    currentPage === 'search' ? 'text-purple-400' : 'text-slate-400 hover:text-purple-400'
                  }`}
                >
                  <Search size={18} />
                  <span>Search</span>
                </button>
                <button
                  onClick={() => setCurrentPage('queue')}
                  className={`flex items-center space-x-2 transition-colors ${
                    currentPage === 'queue' ? 'text-cyan-400' : 'text-slate-400 hover:text-cyan-400'
                  }`}
                >
                  <List size={18} />
                  <span>Queue</span>
                  {queue.length > 0 && (
                    <span className="bg-cyan-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {queue.length}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setCurrentPage('cart')}
                  className={`flex items-center space-x-2 transition-colors relative ${
                    currentPage === 'cart' ? 'text-green-400' : 'text-slate-400 hover:text-green-400'
                  }`}
                >
                  <ShoppingCart size={18} />
                  <span>Cart</span>
                  {cart.length > 0 && (
                    <span className="bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cart.length}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setCurrentPage('history')}
                  className={`flex items-center space-x-2 transition-colors ${
                    currentPage === 'history' ? 'text-blue-400' : 'text-slate-400 hover:text-blue-400'
                  }`}
                >
                  <History size={18} />
                  <span>History</span>
                </button>
              </nav>
            </div>
          </div>
        </header>
      )}

      {/* Page Content */}
      <div className="relative z-10">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'search' && <SearchPage />}
        {currentPage === 'cart' && <CartPage />}
        {currentPage === 'queue' && <QueuePage />}
        {currentPage === 'history' && <HistoryPage />}
      </div>
    </div>
  );
}

export default App;