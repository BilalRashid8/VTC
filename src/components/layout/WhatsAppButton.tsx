import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/33763725036"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 left-4 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-colors"
      aria-label="Contacter Transfert Royal Paris via WhatsApp"
      title="Contacter Transfert Royal Paris via WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
