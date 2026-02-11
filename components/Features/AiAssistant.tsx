import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Sparkles, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from '../../types';

const AiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Olá! Sou a assistente virtual da Luminous Odontologia. Como posso ajudar com seu sorriso hoje?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const apiKey = process.env.API_KEY;
      
      if (!apiKey) {
        throw new Error("API Key not found");
      }

      const ai = new GoogleGenAI({ apiKey });
      
      const systemInstruction = `
        Você é a assistente virtual da clínica "Luminous Odontologia".
        Seu tom é profissional, empático, acolhedor e informativo.
        
        INFORMAÇÕES DA CLÍNICA:
        - Serviços: Implantes, Clareamento Laser, Invisalign (Ortodontia), Harmonização Facial, Odontopediatria.
        - Diferenciais: Tecnologia de ponta, ambiente relaxante, garantia vitalícia em implantes.
        - Localização: Centro da cidade, Rua das Flores 123.
        
        REGRAS:
        1. Responda dúvidas sobre tratamentos de forma resumida e clara.
        2. NÃO dê diagnósticos médicos precisos. Sempre sugira agendar uma avaliação.
        3. Se perguntarem preço, diga que varia conforme o caso e convide para agendar uma avaliação gratuita.
        4. Tente sempre levar o usuário para a conversão (agendar consulta).
        5. Mantenha as respostas curtas (máximo 3 parágrafos curtos).
      `;

      // Construct history for context (last 6 messages to save tokens)
      const history = messages.slice(-6).map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const chat = ai.chats.create({
        model: 'gemini-2.5-flash-latest',
        config: {
          systemInstruction,
          temperature: 0.7,
        },
        history: history,
      });

      const result = await chat.sendMessage({ message: userMessage });
      const responseText = result.text;

      setMessages(prev => [...prev, { role: 'model', text: responseText }]);

    } catch (error) {
      console.error("Error generating response:", error);
      setMessages(prev => [...prev, { role: 'model', text: 'Desculpe, estou com dificuldade de conexão no momento. Por favor, tente agendar pelo botão no topo do site.', isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end pointer-events-none">
      {/* Chat Window */}
      <div 
        className={`bg-white w-80 sm:w-96 rounded-2xl shadow-2xl mb-4 transition-all duration-300 transform origin-bottom-right pointer-events-auto border border-gray-100 flex flex-col ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-10 h-0 overflow-hidden'}`}
        style={{ maxHeight: '500px', height: isOpen ? '500px' : '0' }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-500 p-4 rounded-t-2xl flex justify-between items-center text-white">
          <div className="flex items-center gap-2">
            <div className="bg-white/20 p-1.5 rounded-full">
              <Sparkles size={18} />
            </div>
            <div>
              <h3 className="font-semibold text-sm">Assistente Luminous</h3>
              <p className="text-xs text-primary-100 flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span> Online agora
              </p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 scrollbar-hide">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-primary-600 text-white rounded-br-none' 
                    : 'bg-white text-gray-700 border border-gray-100 rounded-bl-none'
                } ${msg.isError ? 'bg-red-50 text-red-600 border-red-200' : ''}`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm">
                 <Loader2 className="animate-spin text-primary-500 h-5 w-5" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 bg-white border-t border-gray-100 rounded-b-2xl">
          <div className="flex gap-2 items-center bg-gray-50 px-3 py-2 rounded-full border border-gray-200 focus-within:border-primary-400 focus-within:ring-1 focus-within:ring-primary-400 transition-all">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Digite sua dúvida..."
              className="flex-1 bg-transparent text-sm focus:outline-none text-gray-700"
              disabled={isLoading}
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="bg-primary-600 text-white p-2 rounded-full hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send size={16} />
            </button>
          </div>
          <div className="text-center mt-1">
             <span className="text-[10px] text-gray-400">IA pode cometer erros. Consulte um especialista.</span>
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`pointer-events-auto shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 rounded-full p-4 flex items-center justify-center ${isOpen ? 'bg-gray-200 text-gray-600 rotate-90' : 'bg-gradient-to-tr from-primary-600 to-secondary-500 text-white'}`}
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>
    </div>
  );
};

export default AiAssistant;