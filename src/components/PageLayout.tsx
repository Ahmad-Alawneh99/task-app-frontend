import { ReactNode } from "react";

interface PageLayoutProps {
    children: ReactNode,
}

const PageLayout = ({ children }: PageLayoutProps) => {
    return (
      <div className="page-layout-container">
          {children}
      </div>
    );
}

export default PageLayout;
