
import { useState, useRef } from 'react';
import { Bold, Italic, Strikethrough, List, ListOrdered, Link as LinkIcon, Image, Smile, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const RichTextEditor = ({ value, onChange, placeholder }: RichTextEditorProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageAlt, setImageAlt] = useState('');

  const insertAtCursor = (before: string, after: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    
    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end);
    onChange(newText);

    // Restore cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length);
    }, 0);
  };

  const formatText = (format: string) => {
    switch (format) {
      case 'bold':
        insertAtCursor('**', '**');
        break;
      case 'italic':
        insertAtCursor('*', '*');
        break;
      case 'strikethrough':
        insertAtCursor('~~', '~~');
        break;
      case 'unordered-list':
        insertAtCursor('\n- ');
        break;
      case 'ordered-list':
        insertAtCursor('\n1. ');
        break;
      case 'code':
        insertAtCursor('`', '`');
        break;
      case 'code-block':
        insertAtCursor('\n```\n', '\n```\n');
        break;
    }
  };

  const insertLink = () => {
    if (linkUrl) {
      const linkMarkdown = `[${linkText || linkUrl}](${linkUrl})`;
      insertAtCursor(linkMarkdown);
      setLinkUrl('');
      setLinkText('');
    }
  };

  const insertImage = () => {
    if (imageUrl) {
      const imageMarkdown = `![${imageAlt || 'Image'}](${imageUrl})`;
      insertAtCursor(imageMarkdown);
      setImageUrl('');
      setImageAlt('');
    }
  };

  const insertEmoji = (emoji: string) => {
    insertAtCursor(emoji);
  };

  const commonEmojis = ['😀', '😂', '🤔', '👍', '👎', '❤️', '🔥', '💯', '🎉', '🚀'];

  return (
    <div className="border border-gray-200 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-gray-200 bg-gray-50">
        {/* Text Formatting */}
        <div className="flex items-center gap-1 pr-2 border-r border-gray-300">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => formatText('bold')}
            title="Bold"
          >
            <Bold className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => formatText('italic')}
            title="Italic"
          >
            <Italic className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => formatText('strikethrough')}
            title="Strikethrough"
          >
            <Strikethrough className="w-4 h-4" />
          </Button>
        </div>

        {/* Lists */}
        <div className="flex items-center gap-1 pr-2 border-r border-gray-300">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => formatText('unordered-list')}
            title="Bullet List"
          >
            <List className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => formatText('ordered-list')}
            title="Numbered List"
          >
            <ListOrdered className="w-4 h-4" />
          </Button>
        </div>

        {/* Code */}
        <div className="flex items-center gap-1 pr-2 border-r border-gray-300">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => formatText('code')}
            title="Inline Code"
            className="font-mono text-xs"
          >
            {'</>'}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => formatText('code-block')}
            title="Code Block"
            className="font-mono text-xs"
          >
            {'{}'}
          </Button>
        </div>

        {/* Link */}
        <Dialog>
          <DialogTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              title="Insert Link"
            >
              <LinkIcon className="w-4 h-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Insert Link</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="linkUrl">URL</Label>
                <Input
                  id="linkUrl"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://example.com"
                />
              </div>
              <div>
                <Label htmlFor="linkText">Link Text (optional)</Label>
                <Input
                  id="linkText"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  placeholder="Link text"
                />
              </div>
              <Button onClick={insertLink} disabled={!linkUrl}>
                Insert Link
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Image */}
        <Dialog>
          <DialogTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              title="Insert Image"
            >
              <Image className="w-4 h-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Insert Image</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input
                  id="imageUrl"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div>
                <Label htmlFor="imageAlt">Alt Text</Label>
                <Input
                  id="imageAlt"
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                  placeholder="Describe the image"
                />
              </div>
              <Button onClick={insertImage} disabled={!imageUrl}>
                Insert Image
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Emoji */}
        <Dialog>
          <DialogTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              title="Insert Emoji"
            >
              <Smile className="w-4 h-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Insert Emoji</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-5 gap-2 p-4">
              {commonEmojis.map((emoji) => (
                <Button
                  key={emoji}
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => insertEmoji(emoji)}
                  className="text-lg h-10 w-10"
                >
                  {emoji}
                </Button>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Editor */}
      <div className="relative">
        <Textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="min-h-[200px] border-0 focus-visible:ring-0 resize-none"
        />
        
        {/* Character count */}
        <div className="absolute bottom-2 right-2 text-xs text-gray-400">
          {value.length} characters
        </div>
      </div>

      {/* Preview hint */}
      <div className="px-3 py-2 bg-gray-50 border-t border-gray-200 text-xs text-gray-600">
        Supports Markdown formatting. Use **bold**, *italic*, `code`, and more.
      </div>
    </div>
  );
};

export default RichTextEditor;
