import { useState } from 'react';
import { AlertTriangle, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

export default function SpamDetector() {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasResult, setHasResult] = useState(false);
  const [validationError, setValidationError] = useState('');

  // Email content validation

  const validateEmailContent = (content) => {
  const trimmedContent = content.trim();

  if (trimmedContent.length < 100) {
    return 'Please enter at least 100 characters of email content for accurate analysis.';
  }

  const wordCount = trimmedContent.split(/\s+/).filter(word => word.length > 0).length;
  if (wordCount < 15) {
    return 'Please enter at least 15 words of email content for proper spam detection.';
  }

  return null; // Body alone is enough
};


 const handleCheck = async () => {
  if (!text.trim()) return;

  const validationErr = validateEmailContent(text);
  if (validationErr) {
    setValidationError(validationErr);
    return;
  }

  setValidationError('');
  setIsLoading(true);
  await new Promise(resolve => setTimeout(resolve, 1500));

  try {
    const response = await fetch('http://localhost:5000/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        subject: '',               // Optional or provide subject input if needed
        message: text.trim()      // Properly map this to `message`
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    let prediction = '';
    if (data.label) {
      prediction = data.label.toLowerCase();
    } else if (data.prediction) {
      prediction = data.prediction.toLowerCase();
    } else if (data.result) {
      prediction = data.result.toLowerCase();
    } else {
      throw new Error('Invalid response format from ML API');
    }

    if (prediction.includes('spam') && !prediction.includes('not')) {
      setResult('spam');
    } else if (prediction.includes('ham') || prediction.includes('not spam') || prediction.includes('legitimate')) {
      setResult('ham');
    } else {
      console.warn('Unclear ML prediction:', prediction);
      setResult('ham');
    }

    setHasResult(true);
  } catch (error) {
    console.error('Error calling ML API:', error);

    if (error.message.includes('Failed to fetch')) {
      setValidationError('Unable to connect to ML service. Please check if the backend server is running on http://localhost:5000');
    } else if (error.message.includes('HTTP error')) {
      setValidationError('ML service returned an error. Please try again or contact support.');
    } else {
      setValidationError('An unexpected error occurred during analysis. Please try again.');
    }

    setResult('error');
    setHasResult(true);
  }

  setIsLoading(false);
};


  const handleNewCheck = () => {
    setText('');
    setResult('');
    setHasResult(false);
    setValidationError('');
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
    if (validationError) {
      setValidationError(''); // Clear validation error when user starts typing
    }
  };

  const getResultColor = () => {
    if (result === 'spam') return 'text-red-400';
    if (result === 'ham' || result === 'not spam') return 'text-green-400';
    return 'text-yellow-400';
  };

  const getResultBg = () => {
    if (result === 'spam') return 'bg-red-500/10 border-red-500/20';
    if (result === 'ham' || result === 'not spam') return 'bg-green-500/10 border-green-500/20';
    return 'bg-yellow-500/10 border-yellow-500/20';
  };

  // Character and word count for user feedback
  const charCount = text.length;
  const wordCount = text.trim().split(/\s+/).filter(word => word.length > 0).length;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-500 via-blue-500 to-cyan-400 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Email Spam Detector</h1>
          <p className="text-lg text-white/90 max-w-3xl mx-auto">      Paste your complete email content below for accurate spam detection analysis
          </p>
        </div>

        <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl p-6 sm:p-8 shadow-2xl">
          {!hasResult ? (
            <>
              <div className="mb-6">
                <label className="block text-white text-sm font-medium mb-3">
                  Email Content
                  <span className="text-white/70 font-normal ml-2">
                 
                  </span>
                </label>
                <textarea
                  className={`w-full h-48 p-4 bg-white/10 border rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:border-transparent resize-none backdrop-blur-sm transition-all duration-300 ${
                    validationError 
                      ? 'border-red-400 focus:ring-red-400/50' 
                      : 'border-white/30 focus:ring-white/50'
                  }`}
                  value={text}
                  onChange={handleTextChange}
                  placeholder="Paste your complete email content here "
                  disabled={isLoading}
                />
                
                {/* Character and word count */}
                <div className="flex justify-between items-center mt-2 text-xs text-white/70">
                  <span>
              
                  </span>
                  <span className={charCount >= 100 && wordCount > 15 ? 'text-green-300' : 'text-yellow-300'}>
  {charCount >= 100 && wordCount > 15 ? 'Ready for analysis' : 'Need more content'}
</span>

                </div>
              </div>

              {/* Validation Error */}
              {validationError && (
                <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                  <p className="text-red-300 text-sm">{validationError}</p>
                </div>
              )}

              <button
                onClick={handleCheck}
                disabled={!text.trim() || isLoading || charCount < 100 || wordCount < 15}
                className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] hover:from-blue-700 hover:to-cyan-700"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Connecting to ML API...
                  </div>
                ) : (
                  'Analyze Email for Spam'
                )}
              </button>
            </>
          ) : (
            <>
              <div className="text-center mb-8">
                <div className={`inline-flex flex-col items-center px-6 py-4 rounded-2xl ${getResultBg()} border mb-4 gap-3`}>
                  {result === 'error' && <XCircle className="w-8 h-8 text-yellow-400" />}
                  {result === 'spam' && <AlertTriangle className="w-8 h-8 text-red-400" />}
                  {result === 'ham' && <CheckCircle2 className="w-8 h-8 text-green-400" />}

                  <div className={`text-2xl font-bold ${getResultColor()}`}>
                    {result === 'error' ? 'Analysis Error' : result === 'spam' ? 'SPAM DETECTED' : 'LEGITIMATE EMAIL'}
                  </div>
                </div>
                
                <p className="text-white/90 text-lg max-w-md mx-auto">
                  {result === 'error'
                    ? 'Unable to analyze the email. Please try again with different content.'
                    : result === 'spam'
                    ? 'This email contains suspicious patterns commonly found in spam messages. Exercise caution!'
                    : 'This email appears to be legitimate and safe based on our analysis.'}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-white text-sm font-medium mb-3">Analyzed Content Preview:</h3>
                <div className="bg-white/10 border border-white/20 rounded-xl p-4 max-h-32 overflow-y-auto">
                  <p className="text-white/80 text-sm break-words">
                    {text.length > 200 ? `${text.slice(0, 200)}...` : text}
                  </p>
                </div>
                <div className="text-xs text-white/60 mt-2">
                  Analyzed {text.length} characters, {text.trim().split(/\s+/).length} words
                </div>
              </div>

              <button
                onClick={handleNewCheck}
                className="w-full px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:from-cyan-700 hover:to-blue-700"
              >
                Analyze Another Email
              </button>
            </>
          )}
        </div>

        <div className="text-center space-y-4 mt-10">
          <div className="space-y-3">
            <p className="text-white/90 text-sm md:text-[18px] mx-auto">
              Advanced machine learning algorithms for accurate spam detection and email security
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-white/80">
            <span className="bg-white/10 px-4 py-2 rounded-full">Machine Learning</span>
            <span className="bg-white/10 px-4 py-2 rounded-full">Real-time Analysis</span>
            <span className="bg-white/10 px-4 py-2 rounded-full">Secure Processing</span>
          </div>

          <div className="border-t border-white/20 my-6"></div>
          
       
        </div>

        <div className="fixed top-20 left-10 w-20 h-20 bg-white/20 rounded-full blur-xl animate-pulse"></div>
        <div className="fixed bottom-20 right-10 w-32 h-32 bg-white/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="fixed top-1/2 right-20 w-16 h-16 bg-cyan-300/30 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
    </div>
  );
}