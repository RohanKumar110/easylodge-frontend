import icons from "@/lib/icons";

function Icon({ icon, ...props }) {
    
  const IconComponent = icons[icon];
  return <IconComponent {...props} />;
}

export default Icon;
