
import React, { useState, useEffect } from 'react';

interface AchievementNotificationProps {
  badgeName: string;
  onDismiss: () => void;
}

const AchievementNotification: React.FC<AchievementNotificationProps> = ({ badgeName, onDismiss }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    const timer = setTimeout(() => {
      setShow(false);
      // Allow time for fade-out animation before dismissing
      setTimeout(onDismiss, 500);
    }, 3000);

    return () => clearTimeout(timer);
  }, [badgeName, onDismiss]);

  return (
    <div
      className={`fixed top-5 z-50 p-5 rounded-lg bg-green-500 text-white shadow-2xl flex items-center gap-4 transition-transform duration-500 ease-in-out ${
        show ? 'right-5 translate-x-0' : 'translate-x-[calc(100%+2.5rem)]'
      }`}
    >
      <span className="text-4xl">🏆</span>
      <div>
        <strong className="block">¡Logro Desbloqueado!</strong>
        <p>{badgeName}</p>
      </div>
    </div>
  );
};

export default AchievementNotification;
