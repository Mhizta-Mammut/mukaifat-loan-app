import React, { ReactNode } from "react";
import Header from "./Header";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  <>
    <Header />
    <div className="h-full bg-slate-200">
      <div className="container max-w-4xl px-6 py-10 mx-auto">
        {props.children}
      </div>
    </div>
  </>
);

export default Layout;
