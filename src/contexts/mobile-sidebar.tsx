import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type MobileSidebarContextType = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

const MobileSidebarContext = createContext<MobileSidebarContextType | null>(
  null,
);

export const MobileSidebarProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((prev) => !prev);

  const value = useMemo(() => ({ isOpen, open, close, toggle }), [isOpen]);

  return (
    <MobileSidebarContext.Provider value={value}>
      {children}
    </MobileSidebarContext.Provider>
  );
};

export const useMobileSidebar = () => {
  const context = useContext(MobileSidebarContext);
  if (!context) {
    throw new Error(
      "useMobileSidebar must be used within a MobileSidebarProvider",
    );
  }
  return context;
};
