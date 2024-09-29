import React, { useState } from 'react';
import { Button } from './components/ui/button';  // Adjust path to Button component
import { Input } from './components/ui/input';    // Adjust path to Input component
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';  // Adjust path
import { Alert, AlertDescription } from './components/ui/alert';  // Adjust path
import { Loader2 } from 'lucide-react';
import Header from './components/header';  // Adjust path to Header component
import { sendSignInLinkToEmail, getAuth } from 'firebase/auth';  // Firebase imports

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const auth = getAuth();  // Initialize Firebase auth

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    const actionCodeSettings = {
      url: `${window.location.origin}/finalize-signin`,  // Redirect URL
      handleCodeInApp: true,
    };

    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem('emailForSignIn', email);
      setMessage({ type: 'success', text: 'Check your email for the login link!' });
    } catch (error) {
      console.error('Error sending sign-in link to email', error);
      setMessage({ type: 'error', text: 'Failed to send login link. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto p-4">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Sign In / Register</CardTitle>
            <CardDescription>
              Enter your email to receive a magic link for authentication.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending Link
                  </>
                ) : (
                  'Send Magic Link'
                )}
              </Button>
            </form>
            {message && (
              <Alert className={`mt-4 ${message.type === 'error' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                <AlertDescription>{message.text}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
