import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function BackButton({ to, children = 'Back' }) {
  return (
    <Link 
      to={to} 
      className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-6"
    >
      <ArrowLeft size={18} />
      <span className="font-medium">{children}</span>
    </Link>
  );
}
