import React from 'react';
import { Loader2 } from 'lucide-react';

const Loading = ({ fullScreen = false, message = "Loading..." }) => {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
        <p className="text-muted-foreground font-medium animate-pulse">{message}</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[200px] flex flex-col items-center justify-center p-8">
      <Loader2 className="w-8 h-8 text-primary animate-spin mb-3" />
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
};

export default Loading;
