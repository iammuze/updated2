import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { Loader2 } from 'lucide-react';

export function QRScanner() {
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);

  useEffect(() => {
    // Only initialize scanner if we're not already scanning and don't have a result
    if (!scanning && !scanResult) {
      setScanning(true);
      
      // Small delay to ensure DOM element exists
      setTimeout(() => {
        const scanner = new Html5QrcodeScanner(
          'reader',
          { fps: 10, qrbox: { width: 250, height: 250 } },
          false
        );

        function success(result: string) {
          scanner.clear();
          setScanning(false);
          setScanResult(result);
          // Here you would typically make an API call to verify gym access
          console.log('QR Code detected:', result);
        }

        function error(err: string) {
          console.warn(err);
        }

        scanner.render(success, error);
      }, 100);
    }

    return () => {
      // Cleanup on unmount
      const element = document.getElementById('reader');
      if (element) {
        element.innerHTML = '';
      }
    };
  }, [scanning, scanResult]);

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Scan Gym QR Code</h2>
        
        {/* QR Scanner Container */}
        <div id="reader" className="w-full"></div>
        
        {scanning && (
          <div className="flex items-center justify-center text-sm text-gray-500 mt-4">
            <Loader2 className="animate-spin mr-2" />
            <span>Scanning...</span>
          </div>
        )}

        {scanResult && (
          <div className="text-center space-y-4 mt-4">
            <div className="text-green-600 font-medium">Access Granted!</div>
            <button
              onClick={() => {
                setScanResult(null);
                setScanning(false);
              }}
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
            >
              Scan Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}