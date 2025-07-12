
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, X, Bold, Italic, List, Link as LinkIcon, Image, Smile } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import Header from '@/components/Header';
import RichTextEditor from '@/components/RichTextEditor';

const AskQuestion = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const popularTags = [
    'javascript', 'react', 'nodejs', 'python', 'css', 'html',
    'typescript', 'database', 'sql', 'mongodb', 'express',
    'vue', 'angular', 'php', 'java', 'algorithms'
  ];

  const handleAddTag = (tag: string) => {
    if (tag && !tags.includes(tag) && tags.length < 5) {
      setTags([...tags, tag.toLowerCase()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleTagInputKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAddTag(tagInput.trim());
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || tags.length === 0) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Navigate back to home or to the new question
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Ask a Question</h1>
            <p className="text-gray-600 mt-1">Get help from our community of developers</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Question Title</CardTitle>
              <p className="text-sm text-gray-600">
                Be specific and imagine you're asking a question to another person
              </p>
            </CardHeader>
            <CardContent>
              <Input
                placeholder="e.g. How do I implement authentication in React?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-lg"
                maxLength={200}
              />
              <div className="text-right text-sm text-gray-500 mt-1">
                {title.length}/200
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Question Description</CardTitle>
              <p className="text-sm text-gray-600">
                Include all the information someone would need to answer your question
              </p>
            </CardHeader>
            <CardContent>
              <RichTextEditor
                value={description}
                onChange={setDescription}
                placeholder="Describe your problem in detail. Include what you've tried and what results you expected."
              />
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tags</CardTitle>
              <p className="text-sm text-gray-600">
                Add up to 5 tags to describe your question (minimum 1 required)
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Current Tags */}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="px-3 py-1">
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-2 hover:text-red-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}

              {/* Tag Input */}
              {tags.length < 5 && (
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter a tag and press Enter"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleTagInputKeyPress}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleAddTag(tagInput.trim())}
                    disabled={!tagInput.trim() || tags.includes(tagInput.toLowerCase())}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              )}

              {/* Popular Tags */}
              <div>
                <Label className="text-sm font-medium mb-2 block">Popular tags:</Label>
                <div className="flex flex-wrap gap-2">
                  {popularTags
                    .filter(tag => !tags.includes(tag))
                    .slice(0, 10)
                    .map((tag) => (
                      <Button
                        key={tag}
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleAddTag(tag)}
                        disabled={tags.length >= 5}
                        className="text-xs"
                      >
                        {tag}
                      </Button>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Guidelines */}
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg text-blue-900">Writing Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-blue-800 space-y-2">
              <p>• Search for similar questions before posting</p>
              <p>• Write a clear, specific title</p>
              <p>• Include relevant code, error messages, or examples</p>
              <p>• Explain what you've already tried</p>
              <p>• Use proper formatting and tags</p>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex gap-4">
            <Button
              type="submit"
              disabled={!title.trim() || !description.trim() || tags.length === 0 || isSubmitting}
              className="px-8"
            >
              {isSubmitting ? 'Publishing...' : 'Publish Question'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AskQuestion;
