import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';
import { User, MapPin, Settings, Camera, Save } from 'lucide-react';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const { addToast } = useToast();
  
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '123 Main St, Anytown, CA 12345'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
    addToast({
      title: "Profile Updated",
      description: "Your personal information has been saved successfully.",
      type: "success"
    });
  };

  return (
    <div className="container mx-auto px-4 lg:px-8 py-8 md:py-12 max-w-5xl">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="md:w-1/4 shrink-0">
          <div className="bg-white rounded-2xl border border-border overflow-hidden">
            <div className="p-6 text-center border-b border-border bg-secondary/30">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <div className="w-full h-full rounded-full bg-primary/10 flex items-center justify-center text-primary text-3xl font-bold">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-md border border-border hover:bg-secondary transition-colors">
                  <Camera className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
              <h2 className="font-bold text-lg">{user?.name}</h2>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
            <div className="p-2">
              <button 
                onClick={() => setActiveTab('personal')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-medium transition-colors ${activeTab === 'personal' ? 'bg-primary/5 text-primary' : 'text-muted-foreground hover:bg-secondary'}`}
              >
                <User className="w-5 h-5" /> Personal Info
              </button>
              <button 
                onClick={() => setActiveTab('addresses')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-medium transition-colors ${activeTab === 'addresses' ? 'bg-primary/5 text-primary' : 'text-muted-foreground hover:bg-secondary'}`}
              >
                <MapPin className="w-5 h-5" /> Addresses
              </button>
              <button 
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-medium transition-colors ${activeTab === 'settings' ? 'bg-primary/5 text-primary' : 'text-muted-foreground hover:bg-secondary'}`}
              >
                <Settings className="w-5 h-5" /> Account Settings
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="md:w-3/4">
          <div className="bg-white rounded-2xl border border-border p-6 md:p-8">
            
            {activeTab === 'personal' && (
              <div>
                <div className="flex justify-between items-center mb-6 border-b border-border pb-4">
                  <h2 className="text-xl font-bold">Personal Information</h2>
                  {!isEditing && (
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      Edit Profile
                    </button>
                  )}
                </div>
                
                {isEditing ? (
                  <form onSubmit={handleSave} className="space-y-4 max-w-xl animate-in fade-in">
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Full Name</label>
                      <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-3 rounded-xl border border-border bg-secondary focus:ring-2 focus:ring-primary/20 focus:outline-none" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Email Address</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-3 rounded-xl border border-border bg-secondary focus:ring-2 focus:ring-primary/20 focus:outline-none opacity-50" readOnly title="Email cannot be changed" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Phone Number</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full p-3 rounded-xl border border-border bg-secondary focus:ring-2 focus:ring-primary/20 focus:outline-none" />
                    </div>
                    
                    <div className="pt-4 flex gap-3">
                      <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-3 rounded-xl border border-border font-medium hover:bg-secondary transition-colors">
                        Cancel
                      </button>
                      <button type="submit" className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium flex items-center gap-2 hover:bg-primary/90 transition-colors">
                        <Save className="w-4 h-4" /> Save Changes
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-6 max-w-xl">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-1 text-sm font-medium text-muted-foreground">Full Name</div>
                      <div className="col-span-2 text-sm font-medium">{user?.name}</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-1 text-sm font-medium text-muted-foreground">Email Address</div>
                      <div className="col-span-2 text-sm font-medium">{user?.email}</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-1 text-sm font-medium text-muted-foreground">Phone Number</div>
                      <div className="col-span-2 text-sm font-medium">{user?.phone || 'Not provided'}</div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'addresses' && (
              <div>
                <div className="flex justify-between items-center mb-6 border-b border-border pb-4">
                  <h2 className="text-xl font-bold">Addresses</h2>
                  <button className="text-sm font-medium text-primary hover:underline">
                    Add New
                  </button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="border border-primary bg-primary/5 rounded-xl p-5 relative">
                    <span className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs px-2 py-1 rounded font-medium">Default</span>
                    <h3 className="font-bold mb-1">{user?.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {formData.address}
                    </p>
                    <div className="flex gap-4 text-sm font-medium">
                      <button className="text-primary hover:underline">Edit</button>
                      <button className="text-destructive hover:underline">Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div>
                <h2 className="text-xl font-bold mb-6 border-b border-border pb-4">Account Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">Change Password</h3>
                    <p className="text-sm text-muted-foreground mb-4">Ensure your account is using a long, random password to stay secure.</p>
                    <button className="px-4 py-2 bg-secondary text-foreground font-medium rounded-lg hover:bg-secondary/80 transition-colors">
                      Update Password
                    </button>
                  </div>
                  
                  <div className="pt-6 border-t border-border">
                    <h3 className="font-semibold text-destructive mb-2">Delete Account</h3>
                    <p className="text-sm text-muted-foreground mb-4">Once your account is deleted, all of its resources and data will be permanently deleted.</p>
                    <button className="px-4 py-2 border border-destructive text-destructive font-medium rounded-lg hover:bg-destructive/10 transition-colors">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
