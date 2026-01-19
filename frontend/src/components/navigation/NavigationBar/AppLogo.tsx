import { Home } from "@mui/icons-material"
import LinkIconButton from "~/components/inputs/buttons/LinkIconButton"

/**
 * A function that renders the AppLogo component.
 *
 * @todo Change Logo
 *
 * @return {JSX.Element} The rendered AppLogo component.
 */
const AppLogo = () => {
  return <LinkIconButton Icon={Home} to="/" />
}
export default AppLogo
