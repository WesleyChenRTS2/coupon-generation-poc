import { cn } from "../lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
};

function Container({ children, className }: Props) {
  return <div className={cn("container mx-auto", className)}>{children}</div>;
}

export default Container;
