import * as React from "react";
import { useEffect, useState } from "react";
import { Alert, Typography, IconButton } from "@material-tailwind/react";
import { CheckCircleIcon, ExclamationTriangleIcon, InformationCircleIcon, XCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { subscribe } from "./notificationBus";

const iconByType = {
  success: <CheckCircleIcon className="h-5 w-5" />,
  error: <XCircleIcon className="h-5 w-5" />,
  warning: <ExclamationTriangleIcon className="h-5 w-5" />,
  info: <InformationCircleIcon className="h-5 w-5" />,
};

const colorByType = {
  success: "green",
  error: "red",
  warning: "orange",
  info: "blue",
};

export function NotificationContainer() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const unsub = subscribe((item) => {
      setItems((prev) => [...prev, item]);
      if (item.duration > 0) {
        setTimeout(() => {
          setItems((prev) => prev.filter((x) => x.id !== item.id));
        }, item.duration);
      }
    });
    return () => { unsub(); };
  }, []);

  const close = (id) => setItems((prev) => prev.filter((x) => x.id !== id));

  return (
    <div className="fixed right-4 top-4 z-[9999] flex flex-col gap-3 w-[92vw] max-w-sm">
      {items.map((n) => (
        <Alert
          key={n.id}
          open={true}
          className="px-4 py-3"
          color={colorByType[n.type] || "blue"}
          icon={iconByType[n.type] || iconByType.info}
          action={
            <IconButton variant="text" color="white" size="sm" onClick={() => close(n.id)}>
              <XMarkIcon className="h-5 w-5" />
            </IconButton>
          }
        >
          {n.title ? (
            <div className="flex flex-col">
              <Typography variant="small" className="font-semibold text-white">
                {n.title}
              </Typography>
              <Typography variant="small" className="text-white/90">
                {n.message}
              </Typography>
            </div>
          ) : (
            <Typography variant="small" className="text-white">
              {n.message}
            </Typography>
          )}
        </Alert>
      ))}
    </div>
  );
}

export default NotificationContainer;