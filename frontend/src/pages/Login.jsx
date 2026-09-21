import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [formData, setFormData] = useState({ email: '', password: '' });
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
    setLoading(true);
    setError('');
    
    try {
      await login(formData.email, formData.password);
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Failed to login');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-stretch">
      {/* Left side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-white relative">
        <div className="w-full max-w-md">
          
          <Link to="/" className="flex items-center gap-2 mb-12 group w-fit">
            <div className="bg-primary p-2 rounded-lg group-hover:bg-primary/90 transition-colors">
              <ShoppingBag className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl tracking-tight text-foreground">Divi Shopping</span>
          </Link>

          <h1 className="text-3xl font-bold mb-2 text-foreground">Welcome back</h1>
          <p className="text-muted-foreground mb-8">
            Please enter your details to sign in. Try <span className="font-mono bg-secondary px-1 text-xs">demo@divishopping.com</span> / <span className="font-mono bg-secondary px-1 text-xs">password</span>
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1.5 text-foreground">Email</label>
              <input 
                type="email" 
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email" 
                className="w-full p-4 rounded-xl border border-border bg-secondary/50 focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
              />
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
                  className="w-full p-4 pr-12 rounded-xl border border-border bg-secondary/50 focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
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

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded text-primary focus:ring-primary/20" />
                <span className="text-muted-foreground">Remember for 30 days</span>
              </label>
              <button type="button" className="font-medium text-primary hover:underline">Forgot password?</button>
            </div>

            {error && (
              <div className="p-4 rounded-xl bg-destructive/10 text-destructive text-sm font-medium">
                {error}
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25 flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-8">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-primary hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative bg-secondary">
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 to-transparent"></div>
        <img 
          src="https://images.unsplash.com/photo-1555529771-835f59bfc50c?auto=format&fit=crop&q=80&w=1200" 
          alt="Login banner" 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-12 left-12 right-12 z-20 text-white">
          <h2 className="text-3xl font-bold mb-4">"The best shopping experience I've ever had."</h2>
          <p className="text-white/80">Sofia Davis, Divi Shopping Customer</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
