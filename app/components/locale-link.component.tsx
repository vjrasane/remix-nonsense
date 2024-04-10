import { useParams, Link } from "@remix-run/react";
import { RemixLinkProps } from "@remix-run/react/dist/components";
import { FunctionComponent, RefAttributes } from "react";

export const LocaleLink: FunctionComponent<
  RemixLinkProps & RefAttributes<HTMLAnchorElement>
> = ({ children, to, ...props }) => {
  const { locale } = useParams();
  return (
    <Link {...props} to={`/${locale}/${to}`}>
      {children}
    </Link>
  );
};
