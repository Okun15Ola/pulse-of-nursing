
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Avatar } from '@/components/ui/avatar';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || '',
    specialty: user?.specialty || '',
    location: user?.location || '',
    yearsOfExperience: user?.yearsOfExperience?.toString() || '',
    avatar: user?.avatar || '',
  });
  
  const [newAvatar, setNewAvatar] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  if (!user) return null;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, this would upload to storage and return a URL
      // For now we'll use FileReader for demo
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setNewAvatar(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // In a real app, this would make an API call to update the user
    setTimeout(() => {
      toast({
        title: "Profile updated",
        description: "Your profile information has been successfully updated."
      });
      setIsSubmitting(false);
    }, 1000);
  };
  
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Profile Settings</h1>
      
      <form onSubmit={handleSubmit}>
        <Card className="p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Profile Information</h2>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              {newAvatar || user.avatar ? (
                <Avatar className="h-20 w-20">
                  <img 
                    src={newAvatar || user.avatar} 
                    alt={user.name} 
                    className="object-cover"
                  />
                </Avatar>
              ) : (
                <Avatar className="h-20 w-20 bg-nursing-primary text-white text-2xl">
                  <span>{user.name.charAt(0)}</span>
                </Avatar>
              )}
              
              <div>
                <input
                  type="file"
                  accept="image/*"
                  id="avatar-upload"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
                <Label htmlFor="avatar-upload" className="cursor-pointer">
                  <Button type="button" variant="outline">
                    Change Profile Photo
                  </Button>
                </Label>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="resize-none"
                rows={4}
              />
            </div>
          </div>
        </Card>
        
        <Card className="p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Professional Details</h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="specialty">Specialty</Label>
                <Input
                  id="specialty"
                  name="specialty"
                  value={formData.specialty}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <Label htmlFor="yearsOfExperience">Years of Experience</Label>
                <Input
                  id="yearsOfExperience"
                  name="yearsOfExperience"
                  type="number"
                  min="0"
                  value={formData.yearsOfExperience}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Account Settings</h2>
          
          <div className="space-y-4">
            <Button type="button" variant="outline" className="w-full md:w-auto">
              Change Password
            </Button>
            
            <Separator />
            
            <div>
              <Button type="button" variant="destructive" className="w-full md:w-auto">
                Delete Account
              </Button>
              <p className="text-xs text-gray-500 mt-1">
                This action is irreversible. All your data will be permanently deleted.
              </p>
            </div>
          </div>
        </Card>
        
        <div className="flex justify-end">
          <Button 
            type="submit" 
            className="bg-nursing-primary hover:bg-nursing-secondary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SettingsPage;
