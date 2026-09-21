import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';

const Register = () => {
  const { register, user } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({ 
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/profile');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    
    try {
      await register({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      });
      addToast({
        title: "Account Created",
        description: "Welcome to Divi Shopping!",
        type: "success"
      });
      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to create account');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-stretch">
      
      {/* Left side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative bg-secondary">
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 to-transparent"></div>
        <img 
          src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=1200" 
          alt="Register banner" 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-12 left-12 right-12 z-20 text-white">
          <h2 className="text-3xl font-bold mb-4">Join our community.</h2>
          <p className="text-white/80">Get access to exclusive deals, personalized recommendations, and much more.</p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-white relative">
        <div className="w-full max-w-md">
          
          <Link to="/" className="flex items-center gap-2 mb-10 group w-fit lg:hidden">
            <div className="bg-primary p-2 rounded-lg">
              <ShoppingBag className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl tracking-tight text-foreground">Divi Shopping</span>
          </Link>

          <h1 className="text-3xl font-bold mb-2 text-foreground">Create an account</h1>
          <p className="text-muted-foreground mb-8">
            Enter your details below to create your account and get started.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5 text-foreground">Full Name</label>
              <input 
                type="text" 
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe" 
                className="w-full p-3 rounded-xl border border-border bg-secondary/50 focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1.5 text-foreground">Email</label>
                <input 
                  type="email" 
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com" 
                  className="w-full p-3 rounded-xl border border-border bg-secondary/50 focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5 text-foreground">Phone</label>
                <input 
                  type="tel" 
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000" 
                  className="w-full p-3 rounded-xl border border-border bg-secondary/50 focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1.5 text-foreground">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••" 
                  className="w-full p-3 pr-12 rounded-xl border border-border bg-secondary/50 focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5 text-foreground">Confirm Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••" 
                  className="w-full p-3 pr-12 rounded-xl border border-border bg-secondary/50 focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
                />
              </div>
            </div>

            {error && (
              <div className="p-4 rounded-xl bg-destructive/10 text-destructive text-sm font-medium mt-2">
                {error}
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 mt-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25 flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-8">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
