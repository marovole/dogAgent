import { clsx } from 'clsx';

interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  external?: boolean;
}

export default function CTAButton({
  href,
  children,
  variant = 'primary',
  size = 'md',
  className,
  external = true,
}: CTAButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variants = {
    primary: 'bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500',
    secondary: 'border-2 border-primary-500 bg-transparent text-primary-600 hover:bg-primary-50 focus:ring-primary-500',
  };

  const sizes = {
    sm: 'rounded-md px-4 py-2 text-sm',
    md: 'rounded-lg px-6 py-3 text-base',
    lg: 'rounded-lg px-8 py-4 text-lg',
  };

  const isDogplayLink = href.includes('dogplay.io');

  return (
    <a
      href={href}
      className={clsx(baseStyles, variants[variant], sizes[size], className)}
      {...(external && {
        target: '_blank',
        rel: isDogplayLink ? 'sponsored nofollow noopener' : 'noopener noreferrer',
      })}
    >
      {children}
    </a>
  );
}
