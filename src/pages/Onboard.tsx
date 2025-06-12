
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, DollarSign, Shield, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface FinancialProfile {
  age: string;
  income: string;
  monthlyExpenses: string;
  accountsLinked: boolean;
  checkingBalance: string;
  savingsBalance: string;
  investmentBalance: string;
  debts: Array<{
    type: string;
    amount: string;
    interestRate: string;
  }>;
  retirementAge: string;
  majorPurchases: string;
  riskTolerance: string;
}

const Onboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<FinancialProfile>({
    age: "",
    income: "",
    monthlyExpenses: "",
    accountsLinked: false,
    checkingBalance: "",
    savingsBalance: "",
    investmentBalance: "",
    debts: [{ type: "", amount: "", interestRate: "" }],
    retirementAge: "",
    majorPurchases: "",
    riskTolerance: ""
  });

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate("/");
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // Simulate API call to save profile and generate advice
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store profile in localStorage for demo purposes
      localStorage.setItem('financialProfile', JSON.stringify(profile));
      
      toast({
        title: "Profile saved successfully!",
        description: "Generating your personalized financial advice...",
      });
      
      navigate("/results");
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addDebt = () => {
    setProfile({
      ...profile,
      debts: [...profile.debts, { type: "", amount: "", interestRate: "" }]
    });
  };

  const updateDebt = (index: number, field: string, value: string) => {
    const newDebts = [...profile.debts];
    newDebts[index] = { ...newDebts[index], [field]: value };
    setProfile({ ...profile, debts: newDebts });
  };

  const linkPlaidAccount = () => {
    // Simulate Plaid link
    toast({
      title: "Demo Mode",
      description: "In production, this would open Plaid Link to connect your bank accounts securely.",
    });
    setProfile({ ...profile, accountsLinked: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="px-6 py-4 border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              FinanceAI
            </span>
          </div>
          <div className="text-sm text-gray-600">
            Step {currentStep} of {totalSteps}
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Progress Bar */}
        <div className="mb-8">
          <Progress value={progress} className="w-full h-2" />
          <p className="text-sm text-gray-600 mt-2 text-center">
            {Math.round(progress)}% complete
          </p>
        </div>

        <Card className="p-8 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Let's get to know you
                </h2>
                <p className="text-gray-600">
                  Tell us about your basic financial situation
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="25"
                    value={profile.age}
                    onChange={(e) => setProfile({ ...profile, age: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="income">Annual Income (USD)</Label>
                  <Input
                    id="income"
                    type="number"
                    placeholder="75000"
                    value={profile.income}
                    onChange={(e) => setProfile({ ...profile, income: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="expenses">Monthly Expenses (USD)</Label>
                <Input
                  id="expenses"
                  type="number"
                  placeholder="3500"
                  value={profile.monthlyExpenses}
                  onChange={(e) => setProfile({ ...profile, monthlyExpenses: e.target.value })}
                />
                <p className="text-sm text-gray-500">
                  Include rent, utilities, food, transportation, entertainment, etc.
                </p>
              </div>
            </div>
          )}

          {/* Step 2: Account Linking */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Connect Your Accounts
                </h2>
                <p className="text-gray-600">
                  Securely link your bank accounts or enter balances manually
                </p>
              </div>

              {!profile.accountsLinked ? (
                <div className="space-y-6">
                  <Card className="p-6 border-2 border-dashed border-gray-300 text-center">
                    <Shield className="w-8 h-8 text-green-600 mx-auto mb-3" />
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Secure Bank Connection
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      We use bank-level 256-bit encryption via Plaid
                    </p>
                    <Button onClick={linkPlaidAccount} className="bg-green-600 hover:bg-green-700">
                      Connect with Plaid
                    </Button>
                  </Card>

                  <div className="text-center">
                    <span className="text-gray-500">or</span>
                  </div>
                </div>
              ) : (
                <div className="text-center p-6 bg-green-50 rounded-lg">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-green-800 font-medium">Accounts connected successfully!</p>
                </div>
              )}

              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Manual Entry (Optional)</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="checking">Checking Balance</Label>
                    <Input
                      id="checking"
                      type="number"
                      placeholder="5000"
                      value={profile.checkingBalance}
                      onChange={(e) => setProfile({ ...profile, checkingBalance: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="savings">Savings Balance</Label>
                    <Input
                      id="savings"
                      type="number"
                      placeholder="15000"
                      value={profile.savingsBalance}
                      onChange={(e) => setProfile({ ...profile, savingsBalance: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="investments">Investment Balance</Label>
                    <Input
                      id="investments"
                      type="number"
                      placeholder="25000"
                      value={profile.investmentBalance}
                      onChange={(e) => setProfile({ ...profile, investmentBalance: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Debts */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Tell us about your debts
                </h2>
                <p className="text-gray-600">
                  This helps us create a personalized payoff strategy
                </p>
              </div>

              <div className="space-y-4">
                {profile.debts.map((debt, index) => (
                  <Card key={index} className="p-4 border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Debt Type</Label>
                        <Select 
                          value={debt.type} 
                          onValueChange={(value) => updateDebt(index, 'type', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="credit-card">Credit Card</SelectItem>
                            <SelectItem value="student-loan">Student Loan</SelectItem>
                            <SelectItem value="auto-loan">Auto Loan</SelectItem>
                            <SelectItem value="mortgage">Mortgage</SelectItem>
                            <SelectItem value="personal-loan">Personal Loan</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Amount Owed</Label>
                        <Input
                          type="number"
                          placeholder="5000"
                          value={debt.amount}
                          onChange={(e) => updateDebt(index, 'amount', e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Interest Rate (%)</Label>
                        <Input
                          type="number"
                          placeholder="18.5"
                          step="0.1"
                          value={debt.interestRate}
                          onChange={(e) => updateDebt(index, 'interestRate', e.target.value)}
                        />
                      </div>
                    </div>
                  </Card>
                ))}

                <Button 
                  variant="outline" 
                  onClick={addDebt}
                  className="w-full border-dashed"
                >
                  + Add Another Debt
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Goals */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <Target className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  What are your goals?
                </h2>
                <p className="text-gray-600">
                  Help us tailor advice to your financial objectives
                </p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="retirement">Target Retirement Age</Label>
                  <Input
                    id="retirement"
                    type="number"
                    placeholder="65"
                    value={profile.retirementAge}
                    onChange={(e) => setProfile({ ...profile, retirementAge: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="purchases">Major Purchases</Label>
                  <Textarea
                    id="purchases"
                    placeholder="House down payment in 5 years ($50k), new car in 2 years ($30k), vacation next year ($5k)"
                    value={profile.majorPurchases}
                    onChange={(e) => setProfile({ ...profile, majorPurchases: e.target.value })}
                    rows={3}
                  />
                  <p className="text-sm text-gray-500">
                    List any major purchases with approximate timeframes and amounts
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Risk Tolerance */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  What's your risk tolerance?
                </h2>
                <p className="text-gray-600">
                  This helps us recommend the right investment strategy
                </p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  {[
                    {
                      value: "low",
                      title: "Conservative",
                      description: "I prefer stable returns and want to minimize losses, even if it means lower growth"
                    },
                    {
                      value: "medium",
                      title: "Moderate",
                      description: "I'm comfortable with some ups and downs for better long-term growth potential"
                    },
                    {
                      value: "high",
                      title: "Aggressive",
                      description: "I can handle significant volatility for the chance of higher returns"
                    }
                  ].map((option) => (
                    <Card 
                      key={option.value}
                      className={`p-4 cursor-pointer transition-all ${
                        profile.riskTolerance === option.value 
                          ? 'ring-2 ring-blue-600 bg-blue-50' 
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setProfile({ ...profile, riskTolerance: option.value })}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          profile.riskTolerance === option.value 
                            ? 'border-blue-600 bg-blue-600' 
                            : 'border-gray-300'
                        }`} />
                        <div>
                          <h3 className="font-semibold text-gray-900">{option.title}</h3>
                          <p className="text-sm text-gray-600">{option.description}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            <Button 
              variant="outline" 
              onClick={handleBack}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{currentStep === 1 ? "Back to Home" : "Previous"}</span>
            </Button>

            <Button 
              onClick={handleNext}
              disabled={isLoading}
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white flex items-center space-x-2"
            >
              <span>{currentStep === totalSteps ? (isLoading ? "Analyzing..." : "Generate Advice") : "Next"}</span>
              {!isLoading && <ArrowRight className="w-4 h-4" />}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Onboard;
