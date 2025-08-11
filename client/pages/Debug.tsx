import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Debug() {
  const [status, setStatus] = useState<string>("Initializing...");
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    console.log("Debug page mounted");
    setStatus("Debug page loaded successfully");

    // Test various potential error sources
    const tests = [
      {
        name: "Local Storage",
        test: () => {
          localStorage.setItem("test", "test");
          localStorage.removeItem("test");
          return "OK";
        }
      },
      {
        name: "Fetch API",
        test: async () => {
          try {
            const response = await fetch("/api/ping");
            const data = await response.json();
            return data.message ? "OK" : "No message";
          } catch (err) {
            return `Error: ${err}`;
          }
        }
      },
      {
        name: "JSON Operations",
        test: () => {
          const obj = { test: "value" };
          const json = JSON.stringify(obj);
          const parsed = JSON.parse(json);
          return parsed.test === "value" ? "OK" : "Failed";
        }
      }
    ];

    const runTests = async () => {
      const results: string[] = [];
      for (const test of tests) {
        try {
          const result = await test.test();
          results.push(`${test.name}: ${result}`);
        } catch (err) {
          const errorMsg = `${test.name}: ERROR - ${err}`;
          results.push(errorMsg);
          setErrors(prev => [...prev, errorMsg]);
        }
      }
      setStatus(`Tests completed: ${results.join(", ")}`);
    };

    runTests();
  }, []);

  const testScriptError = () => {
    // Intentionally trigger a script error for testing
    try {
      // @ts-ignore
      window.nonExistentFunction();
    } catch (err) {
      console.error("Intentional test error:", err);
      setErrors(prev => [...prev, `Test error: ${err}`]);
    }
  };

  return (
    <div className="min-h-screen bg-crypto-dark p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="crypto-card-gradient">
          <CardHeader>
            <CardTitle className="text-crypto-gold">Debug Page</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-white font-semibold mb-2">Status:</h3>
              <p className="text-crypto-gold">{status}</p>
            </div>

            {errors.length > 0 && (
              <div>
                <h3 className="text-red-400 font-semibold mb-2">Errors Found:</h3>
                <ul className="text-red-300 space-y-1">
                  {errors.map((error, index) => (
                    <li key={index} className="text-sm">• {error}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="pt-4">
              <Button 
                onClick={testScriptError}
                className="crypto-btn-secondary"
              >
                Test Script Error
              </Button>
            </div>

            <div className="text-white/70 text-sm">
              <p>This page tests basic functionality and error handling.</p>
              <p>Check the browser console for detailed error logs.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
