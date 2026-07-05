import { Link } from "react-router";
import { Button } from "./button";
import Icon from "./icon";

const LinkWithIcon = ({
  variant,
  className,
  icon,
  to,
  iconProps,
  children,
  ...props
}) => {
  return (
    <Button asChild variant={variant} className={className} {...props}>
      <Link to={to} className="flex items-center justify-center gap-2">
        <Icon icon={icon} size={20} {...iconProps} />
        {children}
      </Link>
    </Button>
  );
};

export { LinkWithIcon };
