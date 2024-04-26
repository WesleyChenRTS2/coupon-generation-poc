import { cn } from "../lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
};

function Section({ children, className }: Props) {
  return <section className={cn("py-8", className)}>{children}</section>;
}

export default Section;
