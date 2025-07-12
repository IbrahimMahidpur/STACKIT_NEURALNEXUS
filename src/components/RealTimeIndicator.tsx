import React from 'react';
import { Wifi, WifiOff, CheckCircle, Clock, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface RealTimeIndicatorProps {
  isConnected: boolean;
  lastUpdate?: string;
  activeUsers?: number;
  showStatus?: boolean;
}

const RealTimeIndicator: React.FC<RealTimeIndicatorProps> = ({
  isConnected,
  lastUpdate,
  activeUsers,
  showStatus = true
}) => {
  return (
    <div className="flex items-center gap-2">
      {/* Connection Status */}
      {showStatus && (
        <div className="flex items-center gap-1">
          {isConnected ? (
            <div className="flex items-center gap-1 text-green-600">
              <Wifi className="w-4 h-4" />
              <span className="text-sm font-medium">Live</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-red-600">
              <WifiOff className="w-4 h-4" />
              <span className="text-sm font-medium">Offline</span>
            </div>
          )}
        </div>
      )}

      {/* Active Users */}
      {activeUsers && (
        <div className="flex items-center gap-1 text-blue-600">
          <Users className="w-4 h-4" />
          <span className="text-sm">{activeUsers} online</span>
        </div>
      )}

      {/* Last Update */}
      {lastUpdate && (
        <div className="flex items-center gap-1 text-gray-600">
          <Clock className="w-4 h-4" />
          <span className="text-sm">Updated {lastUpdate}</span>
        </div>
      )}

      {/* Real-time Badge */}
      {isConnected && (
        <Badge variant="outline" className="text-green-600 border-green-600">
          <CheckCircle className="w-3 h-3 mr-1" />
          Real-time
        </Badge>
      )}
    </div>
  );
};

export default RealTimeIndicator; 