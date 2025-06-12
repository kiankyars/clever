
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  DollarSign, 
  TrendingUp, 
  PiggyBank, 
  CreditCard, 
  Shield, 
  Send,
  Bot,
  User,
  Target,
  Calculator,
  Zap
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface FinancialAdvice {
  savingsRate: {
    recommended: number;
    current: number;
    monthly: number;
  };
  investments: {
    emergency: number;
    stocks: number;
    bonds: number;
    retirement: number;
  };
  debtStrategy: {
    priority: string;
    monthlyPayment: number;
    payoffTime: string;
  };
  taxOptimization: string[];
}

const Results = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [advice, setAdvice] = useState<FinancialAdvice | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  useEffect(() => {
    // Simulate loading advice
    const loadAdvice = async () => {
      try {
        const profileData = localStorage.getItem('financialProfile');
        if (!profileData) {
          navigate('/onboard');
          return;
        }

        // Simulate API call to generate advice
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // Mock AI-generated advice
        const mockAdvice: FinancialAdvice = {
          savingsRate: {
            recommended: 22,
            current: 15,
            monthly: 1375
          },
          investments: {
            emergency: 35,
            stocks: 70,
            bonds: 20,
            retirement: 10
          },
          debtStrategy: {
            priority: "Avalanche Method",
            monthlyPayment: 850,
            payoffTime: "2.3 years"
          },
          taxOptimization: [
            "Max out your 401(k) to reduce taxable income by $23,000",
            "Consider Roth IRA conversion during low-income years",
            "Use HSA as a retirement account after age 65",
            "Implement tax-loss harvesting in taxable accounts"
          ]
        };

        setAdvice(mockAdvice);
        
        // Add initial AI greeting
        setChatMessages([{
          id: '1',
          role: 'assistant',
          content: "Hi! I've analyzed your financial situation and created a personalized plan above. Feel free to ask me any questions about your recommendations - I'm here to help you understand every detail!",
          timestamp: new Date()
        }]);
        
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to generate advice. Please try again.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadAdvice();
  }, [navigate, toast]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: newMessage,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setNewMessage("");
    setIsSendingMessage(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Based on your current income and expenses, saving 22% will put you on track to retire comfortably by age 65. The key is automating this savings to make it effortless.",
        "The avalanche method I recommended will save you the most money on interest. Focus on your highest-rate debt first while making minimum payments on others.",
        "Your emergency fund should cover 6 months of expenses. Based on your $3,500 monthly expenses, aim for $21,000 in a high-yield savings account.",
        "For someone your age, a 70/20/10 allocation (stocks/bonds/alternatives) balances growth potential with reasonable risk. We can adjust this based on your comfort level.",
        "Tax optimization can save you thousands annually. Maxing out your 401(k) alone reduces your tax bill by about $5,520 per year in your bracket."
      ];

      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date()
      };

      setChatMessages(prev => [...prev, aiResponse]);
      setIsSendingMessage(false);
    }, 2000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Bot className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Analyzing Your Finances</h2>
          <p className="text-gray-600">Our AI is creating your personalized financial plan...</p>
          <div className="mt-4 w-64 mx-auto bg-gray-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-blue-600 to-green-600 h-2 rounded-full animate-pulse w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!advice) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="px-6 py-4 border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              FinanceAI
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={() => navigate("/onboard")}>
              Update Profile
            </Button>
            <Button variant="outline" onClick={() => navigate("/")}>
              New Analysis
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Results Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Your Personalized Financial Plan
          </h1>
          <p className="text-xl text-gray-600">
            AI-powered recommendations tailored to your goals and situation
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Advice Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Savings Rate */}
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <PiggyBank className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Optimal Savings Rate</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-1">
                    {advice.savingsRate.recommended}%
                  </div>
                  <div className="text-sm text-gray-600">Recommended</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-400 mb-1">
                    {advice.savingsRate.current}%
                  </div>
                  <div className="text-sm text-gray-600">Current</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">
                    ${advice.savingsRate.monthly.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Monthly Target</div>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-green-800">
                  <strong>Action:</strong> Increase your savings rate by 7% to reach your retirement goals. 
                  Set up automatic transfers of $458 more per month to your savings account.
                </p>
              </div>
            </Card>

            {/* Investment Allocation */}
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Investment Allocation</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Emergency Fund</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-red-500 h-2 rounded-full" 
                        style={{ width: `${advice.investments.emergency}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium w-12">{advice.investments.emergency}%</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Stock Market (Index Funds)</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${advice.investments.stocks}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium w-12">{advice.investments.stocks}%</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Bonds</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${advice.investments.bonds}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium w-12">{advice.investments.bonds}%</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">401(k) / IRA</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-500 h-2 rounded-full" 
                        style={{ width: `${advice.investments.retirement}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium w-12">{advice.investments.retirement}%</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Recommendation:</strong> Open a Vanguard or Fidelity account and invest in low-cost index funds like VTSAX (Total Stock Market) and VTIAX (International).
                </p>
              </div>
            </Card>

            {/* Debt Strategy */}
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Debt Payoff Strategy</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600 mb-1">
                    {advice.debtStrategy.priority}
                  </div>
                  <div className="text-sm text-gray-600">Strategy</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    ${advice.debtStrategy.monthlyPayment.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Monthly Payment</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {advice.debtStrategy.payoffTime}
                  </div>
                  <div className="text-sm text-gray-600">Payoff Time</div>
                </div>
              </div>
              
              <div className="p-4 bg-red-50 rounded-lg">
                <p className="text-sm text-red-800">
                  <strong>Action:</strong> Pay minimums on all debts, then attack your highest interest rate debt first. 
                  This saves $3,200 in interest compared to the snowball method.
                </p>
              </div>
            </Card>

            {/* Tax Optimization */}
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Tax Optimization</h3>
              </div>
              
              <div className="space-y-3">
                {advice.taxOptimization.map((tip, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                    <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">{index + 1}</span>
                    </div>
                    <p className="text-sm text-purple-800">{tip}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-1">
            <Card className="h-[800px] bg-white/80 backdrop-blur-sm border-0 shadow-lg flex flex-col">
              <div className="p-4 border-b bg-gradient-to-r from-blue-600 to-green-600 rounded-t-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Financial AI Assistant</h3>
                    <p className="text-xs text-blue-100">Ask me anything about your plan</p>
                  </div>
                </div>
              </div>
              
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {chatMessages.map((message) => (
                    <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`flex items-start space-x-2 max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.role === 'user' 
                            ? 'bg-blue-600' 
                            : 'bg-gradient-to-r from-blue-600 to-green-600'
                        }`}>
                          {message.role === 'user' ? (
                            <User className="w-3 h-3 text-white" />
                          ) : (
                            <Bot className="w-3 h-3 text-white" />
                          )}
                        </div>
                        <div className={`rounded-lg p-3 ${
                          message.role === 'user' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-100 text-gray-900'
                        }`}>
                          <p className="text-sm">{message.content}</p>
                          <p className={`text-xs mt-1 ${
                            message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isSendingMessage && (
                    <div className="flex justify-start">
                      <div className="flex items-start space-x-2 max-w-[80%]">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-600 to-green-600 flex items-center justify-center">
                          <Bot className="w-3 h-3 text-white" />
                        </div>
                        <div className="bg-gray-100 rounded-lg p-3">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
              
              <div className="p-4 border-t">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Ask about your financial plan..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    disabled={isSendingMessage}
                  />
                  <Button 
                    size="sm" 
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim() || isSendingMessage}
                    className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Free tier: Unlimited questions during this session
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
