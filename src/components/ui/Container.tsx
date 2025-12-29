import { clsx } from 'clsx';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'main';
}

export default function Container({
  children,
  className,
  as: Component = 'div',
}: ContainerProps) {
  return (
    <Component className={clsx('container-custom', className)}>
      {children}
    </Component>
  );
}
