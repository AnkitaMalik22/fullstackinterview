import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'typescript',
  filename,
  showLineNumbers = true,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-lg overflow-hidden border border-dark-700 bg-dark-950">
      {/* Header */}
      {filename && (
        <div className="flex items-center justify-between px-4 py-2 bg-dark-800 border-b border-dark-700">
          <span className="text-xs text-slate-400 font-mono">{filename}</span>
          <span className="text-xs text-slate-600 uppercase">{language}</span>
        </div>
      )}
      
      {/* Copy Button */}
      <button
        onClick={handleCopy}
        className={`absolute top-2 right-2 p-2 rounded-md transition-all duration-200 z-10
          ${filename ? 'top-12' : 'top-2'}
          ${copied 
            ? 'bg-green-500/20 text-green-400' 
            : 'bg-dark-700/80 text-slate-400 opacity-0 group-hover:opacity-100 hover:bg-dark-600 hover:text-white'
          }`}
        title={copied ? 'Copied!' : 'Copy code'}
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
      </button>

      {/* Code */}
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        showLineNumbers={showLineNumbers}
        customStyle={{
          margin: 0,
          padding: '1rem',
          background: 'transparent',
          fontSize: '0.8rem',
        }}
        lineNumberStyle={{
          color: '#4a5568',
          paddingRight: '1rem',
          minWidth: '2.5rem',
        }}
      >
        {code.trim()}
      </SyntaxHighlighter>
    </div>
  );
};

// Inline code component for single-line highlights
export const InlineCode: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <code className="px-1.5 py-0.5 rounded bg-dark-800 text-brand-300 font-mono text-sm border border-dark-700">
    {children}
  </code>
);
