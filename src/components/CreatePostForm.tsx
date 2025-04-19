
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Image, X, Briefcase } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { usePost } from '../contexts/PostContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';

const CreatePostForm: React.FC = () => {
  const { user, isAdmin } = useAuth();
  const { addPost } = usePost();
  const [content, setContent] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [isJobPosting, setIsJobPosting] = useState(false);
  const [activeTab, setActiveTab] = useState('post');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!user) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (content.trim()) {
      const images = image ? [image] : undefined;
      addPost(content, images, undefined, isJobPosting);
      setContent('');
      setImage(null);
      setIsJobPosting(false);
    }
    
    setIsSubmitting(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, this would upload to storage and return a URL
      // For now we'll use a placeholder or FileReader for demo
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="mb-6">
      <form onSubmit={handleSubmit} className="p-4">
        <div className="flex items-start space-x-3">
          {user.avatar ? (
            <Avatar className="h-10 w-10">
              <img src={user.avatar} alt={user.name} className="object-cover" />
            </Avatar>
          ) : (
            <Avatar className="h-10 w-10 bg-nursing-primary text-white">
              <span>{user.name.charAt(0)}</span>
            </Avatar>
          )}
          
          <div className="flex-1">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-2 bg-gray-100">
                <TabsTrigger value="post" className="flex-1">Regular Post</TabsTrigger>
                {isAdmin && (
                  <TabsTrigger value="job" className="flex-1">Job Posting</TabsTrigger>
                )}
              </TabsList>
              
              <TabsContent value="post" className="mt-0">
                <Textarea
                  placeholder="What's on your mind?"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[100px] resize-none mb-2"
                />
              </TabsContent>
              
              <TabsContent value="job" className="mt-0">
                <Textarea
                  placeholder="Share a job opportunity..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[100px] resize-none mb-2"
                />
                <div className="flex items-center space-x-2 mb-2">
                  <Checkbox 
                    id="job-posting" 
                    checked={isJobPosting}
                    onCheckedChange={(checked) => setIsJobPosting(checked === true)}
                  />
                  <label 
                    htmlFor="job-posting" 
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center"
                  >
                    <Briefcase className="h-4 w-4 mr-1" />
                    Mark as job posting
                  </label>
                </div>
              </TabsContent>
            </Tabs>
            
            {image && (
              <div className="relative mb-2">
                <img src={image} alt="Upload preview" className="rounded-md max-h-40 object-cover" />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2 h-6 w-6 p-0 rounded-full"
                  onClick={() => setImage(null)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )}
            
            <div className="flex justify-between items-center">
              <div>
                <input
                  type="file"
                  accept="image/*"
                  id="image-upload"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                <label htmlFor="image-upload">
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm" 
                    asChild
                    className="text-gray-500 hover:text-nursing-primary"
                  >
                    <span>
                      <Image className="h-4 w-4 mr-1" />
                      Add Image
                    </span>
                  </Button>
                </label>
              </div>
              
              <Button 
                type="submit" 
                disabled={!content.trim() || isSubmitting}
                className="bg-nursing-primary hover:bg-nursing-secondary"
              >
                Post
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Card>
  );
};

export default CreatePostForm;
