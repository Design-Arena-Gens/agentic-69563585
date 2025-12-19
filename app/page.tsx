'use client'

import { useState } from 'react'
import { Bot, Play, Save, Trash2, Plus, Code, MessageSquare } from 'lucide-react'

interface Agent {
  id: string
  name: string
  description: string
  prompt: string
  model: string
  temperature: number
  maxTokens: number
  createdAt: string
}

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function Home() {
  const [agents, setAgents] = useState<Agent[]>([
    {
      id: '1',
      name: 'Kod Asistanı',
      description: 'Yazılım geliştirme ve kod inceleme uzmanı',
      prompt: 'Sen deneyimli bir yazılım geliştiricisisin. Kullanıcılara kod yazma, hata ayıklama ve en iyi uygulamaları öğretme konusunda yardımcı olursun.',
      model: 'gpt-4',
      temperature: 0.7,
      maxTokens: 2000,
      createdAt: new Date().toISOString()
    }
  ])

  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(agents[0])
  const [messages, setMessages] = useState<Message[]>([])
  const [userInput, setUserInput] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState<Partial<Agent>>({})

  const handleCreateAgent = () => {
    const newAgent: Agent = {
      id: Date.now().toString(),
      name: 'Yeni Ajan',
      description: 'Ajan açıklaması',
      prompt: 'Sen yardımcı bir asistansın.',
      model: 'gpt-4',
      temperature: 0.7,
      maxTokens: 2000,
      createdAt: new Date().toISOString()
    }
    setAgents([...agents, newAgent])
    setSelectedAgent(newAgent)
    setIsEditing(true)
    setEditForm(newAgent)
  }

  const handleDeleteAgent = (id: string) => {
    setAgents(agents.filter(a => a.id !== id))
    if (selectedAgent?.id === id) {
      setSelectedAgent(agents[0] || null)
    }
  }

  const handleSaveAgent = () => {
    if (selectedAgent && editForm) {
      const updatedAgents = agents.map(a =>
        a.id === selectedAgent.id ? { ...a, ...editForm } : a
      )
      setAgents(updatedAgents)
      setSelectedAgent({ ...selectedAgent, ...editForm } as Agent)
      setIsEditing(false)
    }
  }

  const handleSendMessage = async () => {
    if (!userInput.trim() || !selectedAgent) return

    const newUserMessage: Message = {
      role: 'user',
      content: userInput
    }

    setMessages([...messages, newUserMessage])
    setUserInput('')

    // Simulated AI response
    setTimeout(() => {
      const aiResponse: Message = {
        role: 'assistant',
        content: `${selectedAgent.name} yanıtı: Bu bir demo uygulamasıdır. Gerçek AI entegrasyonu için API anahtarı gereklidir. Mesajınız: "${userInput}"`
      }
      setMessages(prev => [...prev, aiResponse])
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <nav className="border-b border-white/10 bg-black/20 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Bot className="w-8 h-8 text-purple-400" />
            <h1 className="text-2xl font-bold text-white">AI Agents Platform</h1>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-6 h-[calc(100vh-120px)]">
          {/* Sidebar - Agents List */}
          <div className="col-span-3 bg-black/40 backdrop-blur-lg rounded-xl border border-white/10 p-4 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-white">Ajanlarım</h2>
              <button
                onClick={handleCreateAgent}
                className="p-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              {agents.map(agent => (
                <div
                  key={agent.id}
                  className={`p-3 rounded-lg cursor-pointer transition-all ${
                    selectedAgent?.id === agent.id
                      ? 'bg-purple-600/50 border border-purple-400'
                      : 'bg-white/5 hover:bg-white/10 border border-transparent'
                  }`}
                  onClick={() => {
                    setSelectedAgent(agent)
                    setMessages([])
                    setIsEditing(false)
                  }}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-white font-medium">{agent.name}</h3>
                      <p className="text-gray-400 text-sm mt-1">{agent.description}</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteAgent(agent.id)
                      }}
                      className="p-1 rounded hover:bg-red-500/20 text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-9 bg-black/40 backdrop-blur-lg rounded-xl border border-white/10 overflow-hidden flex flex-col">
            {selectedAgent ? (
              <>
                {/* Header */}
                <div className="border-b border-white/10 p-4 flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-bold text-white">{selectedAgent.name}</h2>
                    <p className="text-gray-400 text-sm">{selectedAgent.description}</p>
                  </div>
                  <button
                    onClick={() => {
                      setIsEditing(!isEditing)
                      setEditForm(selectedAgent)
                    }}
                    className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition-colors flex items-center gap-2"
                  >
                    <Code className="w-4 h-4" />
                    {isEditing ? 'Test Et' : 'Düzenle'}
                  </button>
                </div>

                {/* Content Area */}
                {isEditing ? (
                  <div className="flex-1 overflow-y-auto p-6">
                    <div className="max-w-3xl space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Ajan Adı
                        </label>
                        <input
                          type="text"
                          value={editForm.name || ''}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Açıklama
                        </label>
                        <input
                          type="text"
                          value={editForm.description || ''}
                          onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                          className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          System Prompt
                        </label>
                        <textarea
                          value={editForm.prompt || ''}
                          onChange={(e) => setEditForm({ ...editForm, prompt: e.target.value })}
                          rows={6}
                          className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Model
                          </label>
                          <select
                            value={editForm.model || 'gpt-4'}
                            onChange={(e) => setEditForm({ ...editForm, model: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500"
                          >
                            <option value="gpt-4">GPT-4</option>
                            <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                            <option value="claude-3">Claude 3</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Temperature: {editForm.temperature || 0.7}
                          </label>
                          <input
                            type="range"
                            min="0"
                            max="2"
                            step="0.1"
                            value={editForm.temperature || 0.7}
                            onChange={(e) => setEditForm({ ...editForm, temperature: parseFloat(e.target.value) })}
                            className="w-full"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Max Tokens
                        </label>
                        <input
                          type="number"
                          value={editForm.maxTokens || 2000}
                          onChange={(e) => setEditForm({ ...editForm, maxTokens: parseInt(e.target.value) })}
                          className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500"
                        />
                      </div>

                      <button
                        onClick={handleSaveAgent}
                        className="w-full px-6 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium transition-colors flex items-center justify-center gap-2"
                      >
                        <Save className="w-5 h-5" />
                        Kaydet
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Chat Messages */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4">
                      {messages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                          <MessageSquare className="w-16 h-16 text-purple-400 mb-4" />
                          <h3 className="text-xl font-semibold text-white mb-2">
                            Ajanınızla konuşmaya başlayın
                          </h3>
                          <p className="text-gray-400 max-w-md">
                            Aşağıdaki mesaj kutusuna yazarak {selectedAgent.name} ile etkileşime geçebilirsiniz.
                          </p>
                        </div>
                      ) : (
                        messages.map((msg, idx) => (
                          <div
                            key={idx}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-[70%] px-4 py-3 rounded-lg ${
                                msg.role === 'user'
                                  ? 'bg-purple-600 text-white'
                                  : 'bg-white/10 text-gray-100 border border-white/10'
                              }`}
                            >
                              <p className="whitespace-pre-wrap">{msg.content}</p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    {/* Input Area */}
                    <div className="border-t border-white/10 p-4">
                      <div className="flex gap-3">
                        <input
                          type="text"
                          value={userInput}
                          onChange={(e) => setUserInput(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                          placeholder="Mesajınızı yazın..."
                          className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                        />
                        <button
                          onClick={handleSendMessage}
                          className="px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition-colors flex items-center gap-2"
                        >
                          <Play className="w-5 h-5" />
                          Gönder
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <Bot className="w-20 h-20 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Bir ajan seçin veya oluşturun
                  </h3>
                  <p className="text-gray-400">
                    Sol taraftan bir ajan seçin veya yeni bir ajan oluşturun
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
